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
        return sphere;
    }

    createPlane(ID, posx, posy, posz, width, height, scene) {
        var ground = BABYLON.MeshBuilder.CreateGround(ID, { width: width, height: height }, scene);
        ground.position.x = posx;
        ground.position.y = posy;
        ground.position.z = posz;
        return ground;
    }

    createCube(ID, posx, posy, posz, sizex, sizey, sizez, scene) {
        var cube = BABYLON.MeshBuilder.CreateBox(ID, { width: sizex, height: sizey, depth: sizez }, scene);
        cube.position.x = posx;
        cube.position.y = posy;
        cube.position.z = posz;
        return cube;
    }

    createEntity(ID, meshType, posx, posy, posz, size, scene) {
        let mesh;

        // Based on meshType, create the appropriate shape
        switch (meshType) {
            case "sphere":
                mesh = this.createSphere(ID, posx, posy, posz, size.diameter, size.segments, scene);
                break;
            case "cube":
                mesh = this.createCube(ID, posx, posy, posz, size.sizex, size.sizey, size.sizez, scene);
                break;
            case "plane":
                mesh = this.createPlane(ID, posx, posy, posz, size.width, size.height, scene);
                break;
            default:
                console.error("Unsupported mesh type");
                return null;
        }

        return new Entity(mesh);
    }

    loadTexture(mesh, textureURL) {
        const material = new BABYLON.StandardMaterial("material_" + mesh.id, this.scene);
        material.diffuseTexture = new BABYLON.Texture(textureURL, this.scene);
        mesh.material = material;
    }

    returnScene() {
        return this.scene;
    }
}

// Entity class to handle position, rotation, and scaling
class Entity {
    constructor(mesh) {
        this.mesh = mesh;
        this.position = mesh.position;
        this.rotation = mesh.rotation;
        this.scaling = mesh.scaling;
    }

    setPosition(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    setRotation(x, y, z) {
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;
    }

    setScale(x, y, z) {
        this.scaling.x = x;
        this.scaling.y = y;
        this.scaling.z = z;
    }
}
