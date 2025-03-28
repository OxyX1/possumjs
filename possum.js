/*

WARNING THIS IS A THREE WRAPPER. ALL CREDITS GO TO THREE.js

reasons why I made this package.

for quick, simple, and easy syntax.
and for retarded people, like me :)

*/

class THREEW {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
    }

    sceneInit(width, height, background) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(background);
        return this.scene;
    }

    PerspectiveCamera(FOV, ASPECT_RATIO, CLIPPING_RANGE, FAR_CLIPPING_RANGE, POSX, POSY, POSZ) {
        this.camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, CLIPPING_RANGE, FAR_CLIPPING_RANGE);
        this.camera.position.set(POSX, POSY, POSZ);
        return this.camera;
    }

    Renderer(Width, Height, setClearColor, shadowMap) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(Width, Height);
        this.renderer.setClearColor(setClearColor);
        this.renderer.shadowMap.enabled = shadowMap;
        return this.renderer;
    }

    RenderPlane(posx, posy, sizex, sizey, rotx, roty, color) {
        const planeGeometry = new THREE.PlaneGeometry(sizex, sizey);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        const baseplate = new THREE.Mesh(planeGeometry, planeMaterial);
        baseplate.position.set(posx, posy, 0);
        baseplate.rotation.set(rotx || 0, roty || 0, 0);
        this.scene.add(baseplate);
        return baseplate;
    }

    RenderCube(posx, posy, posz, sizex, sizey, sizez, rotx, roty, rotz, color) {
        const cubeGeometry = new THREE.BoxGeometry(sizex, sizey, sizez);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(posx, posy, posz);
        cube.rotation.set(rotx || 0, roty || 0, rotz || 0);
        this.scene.add(cube);
        return cube;
    }

    RenderCylinder(posx, posy, posz, radiusTop, radiusBottom, height, radialSegments, rotx, roty, rotz, color) {
        const cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.set(posx, posy, posz);
        cylinder.rotation.set(rotx || 0, roty || 0, rotz || 0);
        this.scene.add(cylinder);
        return cylinder;
    }

    RenderSphere(posx, posy, posz, radius, widthSegments, heightSegments, rotx, roty, rotz, color) {
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(posx, posy, posz);
        sphere.rotation.set(rotx || 0, roty || 0, rotz || 0);
        this.scene.add(sphere);
        return sphere;
    }
}
