class PossumJS {
    constructor() {
        this.graphics = new GraphicsManager();
    }
}

class GraphicsManager {
    constructor() {
        this.elements = [];
    }

    create(type, id, parent = null) {
        let element;
        switch (type) {
            case "#workspace":
                element = new Workspace(id);
                break;
            case "#scene":
                element = new Scene(id, parent);
                break;
            case "#sphere":
                element = new Sphere(id, parent);
                break;
            case "#cube":
                element = new Cube(id, parent);
                break;
            default:
                throw new Error("Unknown element type");
        }
        this.elements.push(element);
        return element;
    }
}

class GraphicsElement {
    constructor(id, parent = null) {
        this.id = id;
        this.parent = parent;
        this.transform = new Transform();
    }
}

class Workspace extends GraphicsElement {
    constructor(id) {
        super(id);
        this.canvas = document.createElement('canvas');
        this.canvas.id = id;
        document.body.appendChild(this.canvas);
    }

    transform() {
        return this.transform;
    }
}

class Scene extends GraphicsElement {
    constructor(id, parent) {
        super(id, parent);
        this.canvas = document.createElement('canvas');
        this.canvas.id = id;
        parent.canvas.appendChild(this.canvas);
    }
}

class Sphere extends GraphicsElement {
    constructor(id, parent) {
        super(id, parent);
        this.geometry = "sphere";
    }
}

class Cube extends GraphicsElement {
    constructor(id, parent) {
        super(id, parent);
        this.geometry = "cube";
    }
}

class Transform {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.size = { x: 1, y: 1, z: 1 };
    }
}

// Usage:
