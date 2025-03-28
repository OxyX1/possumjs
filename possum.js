const possumjs = {
    // Graphics management: Create scenes, cameras, objects, etc.
    graphics: {
      create: function (element, id, parentId = null) {
        const canvas = document.querySelector(element);
  
        if (element === "#workspace") {
          // Initialize a Three.js scene
          const scene = new THREE.Scene();
          canvas.id = id;
          canvas.style.border = "1px solid black";
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
  
          const renderer = new THREE.WebGLRenderer({ canvas });
          renderer.setSize(window.innerWidth, window.innerHeight);
  
          // Create a camera and add it to the scene
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.z = 5;
  
          // Store scene, camera, and renderer for easy access
          canvas.scene = scene;
          canvas.camera = camera;
          canvas.renderer = renderer;
        }
  
        if (element === "#scene") {
          // Create and add a new scene to a parent scene
          const sceneElement = document.createElement("div");
          sceneElement.id = id;
          sceneElement.style.position = "absolute";
          sceneElement.style.width = "100%";
          sceneElement.style.height = "100%";
          document.getElementById(parentId).appendChild(sceneElement);
        }
  
        if (element === "#cube") {
          const geometry = new THREE.BoxGeometry();
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          const cube = new THREE.Mesh(geometry, material);
          cube.name = id;
  
          // Add cube to the scene
          const scene = document.getElementById(parentId).scene;
          scene.add(cube);
        }
  
        if (element === "#PerspectiveCamera") {
          // Perspective camera created in the workspace creation, no additional setup here.
        }
  
        if (element === "#FreeCamera") {
          // Free camera setup can be added here
        }
      }
    },
  
    // Transformations (position, size, rotation)
    transform: {
      position: function (id, vector3, scene) {
        const object = scene.getObjectByName(id);
        if (object) {
          object.position.set(vector3.x, vector3.y, vector3.z);
        }
      },
  
      size: function (id, vector3, scene) {
        const object = scene.getObjectByName(id);
        if (object) {
          object.scale.set(vector3.x, vector3.y, vector3.z);
        }
      },
  
      rotation: function (id, rotationVector, scene) {
        const object = scene.getObjectByName(id);
        if (object) {
          object.rotation.set(rotationVector.x, rotationVector.y, rotationVector.z);
        }
      }
    },
  
    // Create a vector3 for easy handling of 3D transformations
    vector3: function (x, y, z) {
      return { x, y, z };
    },
  
    // Render loop
    render: function (canvas) {
      const scene = canvas.scene;
      const camera = canvas.camera;
      const renderer = canvas.renderer;
  
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
  
      animate();
    }
  };
  