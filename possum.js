const possumjs = {
    // Graphics management: Create scenes, cameras, objects, etc.
    graphics: {
      create: function (element, id, parentId = null) {
        const canvas = document.querySelector(element);
  
        if (element === "#workspace") {
          // Initialize a Babylon.js engine and scene
          const engine = new BABYLON.Engine(canvas, true);
          const scene = new BABYLON.Scene(engine);
          canvas.id = id;
          canvas.style.border = "1px solid black";
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
  
          // Create a camera and add it to the scene
          const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
          camera.attachControl(canvas, true);
  
          // Create a light
          const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);
          light.intensity = 0.7;
  
          // Store scene, camera, and engine for easy access
          canvas.scene = scene;
          canvas.camera = camera;
          canvas.engine = engine;
        }
  
        if (element === "#scene") {
          // Create and add a new scene to a parent scene (in Babylon.js this is not typical, we create one scene per canvas)
          const sceneElement = document.createElement("div");
          sceneElement.id = id;
          sceneElement.style.position = "absolute";
          sceneElement.style.width = "100%";
          sceneElement.style.height = "100%";
          document.getElementById(parentId).appendChild(sceneElement);
        }
  
        if (element === "#cube") {
          // Create a cube with Babylon.js
          const cube = BABYLON.MeshBuilder.CreateBox(id, {}, canvas.scene);
          cube.name = id;
  
          // Add cube to the scene
          canvas.scene.addMesh(cube);
        }
  
        if (element === "#PerspectiveCamera") {
          // Perspective camera created in the workspace creation, no additional setup here.
        }
  
        if (element === "#FreeCamera") {
          // Free camera setup can be added here (though Babylon handles this with ArcRotateCamera, as shown above)
        }
      },
  
      // Load a texture and apply it to an object
      loadTexture: function (textureName, objectId) {
        const texture = new BABYLON.Texture(textureName, canvas.scene);
  
        const object = canvas.scene.getMeshByName(objectId);
        if (object) {
          object.material = new BABYLON.StandardMaterial("material", canvas.scene);
          object.material.diffuseTexture = texture;
        }
      }
    },
  
    // Transformations (position, size, rotation)
    transform: {
      position: function (id, vector3, scene) {
        const object = scene.getMeshByName(id);
        if (object) {
          object.position = new BABYLON.Vector3(vector3.x, vector3.y, vector3.z);
        }
      },
  
      size: function (id, vector3, scene) {
        const object = scene.getMeshByName(id);
        if (object) {
          object.scaling = new BABYLON.Vector3(vector3.x, vector3.y, vector3.z);
        }
      },
  
      rotation: function (id, rotationVector, scene) {
        const object = scene.getMeshByName(id);
        if (object) {
          object.rotation = new BABYLON.Vector3(rotationVector.x, rotationVector.y, rotationVector.z);
        }
      }
    },
  
    // Create a vector3 for easy handling of 3D transformations
    vector3: function (x, y, z) {
      return { x, y, z };
    },
  
    // Render loop (Babylon handles this internally with a `runRenderLoop` method)
    render: function (canvas) {
      const engine = canvas.engine;
      const scene = canvas.scene;
  
      engine.runRenderLoop(() => {
        scene.render();
      });
  
      window.addEventListener("resize", () => {
        engine.resize();
      });
    }
  };
  