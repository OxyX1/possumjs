class possumjs {
    constructor() {
        // Check if BABYLON is already loaded globally from the CDN
        if (typeof BABYLON === 'undefined') {
            this.loadpossumjs();
        } else {
            this.init();
        }
    }

    loadpossumjs() {
        const script = document.createElement('script');
        script.src = "https://cdn.babylonjs.com/babylon.js";
        script.onload = () => {
            this.init();
        };
        document.head.appendChild(script);
    }

    init() {
        this.canvas = document.getElementById("renderCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.InitScene();
    }

    InitScene() {
        return new BABYLON.Scene(this.engine);
    }

    createCamera(ID, posx, posy, posz, scene) {
        const camera = new BABYLON.FreeCamera(ID, new BABYLON.Vector3(posx, posy, posz), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);
    }

    createLight(ID, posx, posy, posz, scene) {
        var light = new BABYLON.HemisphericLight(ID, new BABYLON.Vector3(posx, posy, posz), scene);
        light.intensity = 0.7;
    }

    createSphere(ID, posx, posy, posz, diameter, segments, scene) {
        var sphere = BABYLON.MeshBuilder.CreateSphere(ID, { diameter: diameter, segments: segments }, scene);
        sphere.position.y = posy;
        sphere.position.x = posx;
        sphere.position.z = posz;
    }

    createPlane(ID, posx, posy, posz, width, height, scene) {
        var ground = BABYLON.MeshBuilder.CreateGround(ID, { width: width, height: height }, scene);
        ground.position.x = posx;
        ground.position.y = posy;
        ground.position.z = posz;
    }

    createCube(ID, posx, posy, posz, sizex, sizey, sizez, scene) {
        var cube = BABYLON.MeshBuilder.CreateBox(ID, { width: sizex, height: sizey, depth: sizez }, scene);
        cube.position.x = posx;
        cube.position.y = posy;
        cube.position.z = posz;
    }

    createVertex(ID, positions, scene) {
        // Positions should be an array of vectors, e.g., [{x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}]
        const vertexData = new BABYLON.VertexData();
        
        // Flatten positions into an array of floats for the vertex positions
        const flatPositions = positions.reduce((acc, pos) => {
            acc.push(pos.x, pos.y, pos.z);
            return acc;
        }, []);
    
        // Set the positions for the vertex
        vertexData.positions = flatPositions;
    
        // Create a custom mesh using the vertex data
        const customMesh = new BABYLON.Mesh(ID, scene);
        vertexData.applyToMesh(customMesh, true);
    
        return customMesh;
    }
    

    returnScene() {
        return this.scene;
    }
}
