// possum.js
export class PossumJS {
    constructor() {
        this.graphics = new GraphicsManager();
    }
}

class GraphicsManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.objects = [];
        this.animationFrame = null;
    }

    create(type, id, parent = null) {
        let element;
        switch (type) {
            case "#workspace":
                element = new Workspace(id, this.renderer);
                break;
            case "#scene":
                element = new Scene(id, this.scene, parent);
                break;
            case "#sphere":
                element = new Sphere(id, this.scene);
                break;
            case "#cube":
                element = new Cube(id, this.scene);
                break;
            default:
                throw new Error("Unknown element type");
        }
        this.objects.push(element);
        return element;
    }

    animate() {
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationFrame);
    }
}

class GraphicsElement {
    constructor(id) {
        this.id = id;
        this.transform = new Transform();
    }
}

class Workspace extends GraphicsElement {
    constructor(id, renderer) {
        super(id);
        this.renderer = renderer;
    }
}

class Scene extends GraphicsElement {
    constructor(id, scene, parent) {
        super(id);
        this.scene = scene;
        this.parent = parent;
    }
}

class Sphere extends GraphicsElement {
    constructor(id, scene) {
        super(id);
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
    }
}

class Cube extends GraphicsElement {
    constructor(id, scene) {
        super(id);
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
    }
}

class Transform {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }

    applyTo(mesh) {
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        mesh.scale.set(this.scale.x, this.scale.y, this.scale.z);
    }
}
