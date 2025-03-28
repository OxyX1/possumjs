class babylonwrapper {
    constructor() {
        // Check if BABYLON is already loaded globally from the CDN
        if (typeof BABYLON === 'undefined') {
            this.loadBabylonJS();
        } else {
            this.init();
        }
    }

    // Dynamically load Babylon.js if not loaded
    loadBabylonJS() {
        const script = document.createElement('script');
        script.src = "https://cdn.babylonjs.com/babylon.js";
        script.onload = () => {
            this.init();  // Initialize once the script is loaded
        };
        document.head.appendChild(script);
    }

    init() {
        this.canvas = document.getElementById("renderCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true);  // Initialize Babylon.js engine
        this.scene = this.InitScene();  // Initialize the scene
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

    returnScene() {
        return this.scene;
    }
}
