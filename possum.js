class PossumJS {
    constructor() {
        this.gl = null; // WebGL context
        this.camera = null;
        this.light = null;

        // Graphics namespace
        this.graphics = {
            create: (shape, x, y, z, size) => this.createShape(shape, x, y, z, size)
        };
    }

    createCanvas(width, height) {
        const canvas = document.createElement('canvas');
        this.gl = canvas.getContext("webgl");
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        this.gl.viewport(0, 0, canvas.width, canvas.height);
        return canvas;
    }

    setBackground(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    addCamera(fov, aspect, near, far, position) {
        this.camera = {
            projectionMatrix: mat4.perspective(mat4.create(), fov, aspect, near, far),
            viewMatrix: mat4.lookAt(mat4.create(), position, [0, 0, 0], [0, 1, 0])
        };
    }

    addLight(position, color) {
        this.light = { position, color };
    }

    createShape(shape, x, y, z, size) {
        if (!this.camera || !this.light) {
            console.error("Camera and light must be added before creating shapes.");
            return;
        }

        let vertices;

        switch (shape) {
            case "#cube":
                vertices = this.createCubeVertices(x, y, z, size);
                break;
            case "#pyramid":
                vertices = this.createPyramidVertices(x, y, z, size);
                break;
            default:
                console.error(`Shape ${shape} not recognized.`);
                return;
        }

        // Bind and render with lighting
        const program = this.createShaderProgram();
        this.bindBuffersAndDraw(vertices, program);
    }

    createCubeVertices(x, y, z, size) {
        const half = size / 2;
        return new Float32Array([
            // Front face
            x - half, y - half, z + half,
            x + half, y - half, z + half,
            x + half, y + half, z + half,
            x - half, y + half, z + half,
            // Other faces go here...
        ]);
    }

    createPyramidVertices(x, y, z, size) {
        return new Float32Array([
            // Base
            x - size, y, z - size,
            x + size, y, z - size,
            x, y + size, z
        ]);
    }

    createShaderProgram() {
        const vertexShaderSource = `
            attribute vec4 position;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform vec3 lightPosition;
            varying vec3 vLighting;

            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * position;

                // Simple lighting calculations
                vec3 lightDirection = normalize(lightPosition - position.xyz);
                float brightness = max(dot(vec3(0.0, 0.0, 1.0), lightDirection), 0.0);
                vLighting = vec3(1.0, 1.0, 1.0) * brightness;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            varying vec3 vLighting;

            void main() {
                gl_FragColor = vec4(vLighting, 1.0);
            }
        `;

        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error("Program link failed:", this.gl.getProgramInfoLog(program));
        }

        this.gl.useProgram(program);
        return program;
    }

    bindBuffersAndDraw(vertices, program) {
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(program, "position");
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);

        const lightPositionLocation = this.gl.getUniformLocation(program, "lightPosition");
        this.gl.uniform3fv(lightPositionLocation, this.light.position);

        const projectionMatrixLocation = this.gl.getUniformLocation(program, "projectionMatrix");
        this.gl.uniformMatrix4fv(projectionMatrixLocation, false, this.camera.projectionMatrix);

        const modelViewMatrixLocation = this.gl.getUniformLocation(program, "modelViewMatrix");
        this.gl.uniformMatrix4fv(modelViewMatrixLocation, false, this.camera.viewMatrix);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 3);
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error("Shader compile failed:", this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
}
