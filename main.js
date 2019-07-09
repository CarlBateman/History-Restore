window.addEventListener('DOMContentLoaded', function () {
  // game loop
  // set up
  // 
  // loop
  //   get user input
  //   update
  //   render
  // end loop

  // game states
  //   - pause
  //   - play
  //   - restart
  // end condition

  // create terrain (plane and blocks) (companion shapes ???)
  // instance models
  // move around
  // pick up / throw
  // teleport
  // power ups
  // portals
  // physics
  // Velno

  // gravity
  // portals
  // time rewind








  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

  var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  var physicsPlugin = new BABYLON.CannonJSPlugin();

  var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics(gravityVector, physicsPlugin);

    var camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 1, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(4, 8, -8));
    camera.attachControl(canvas, false);
    camera.wheelDeltaPercentage = 0.01;

    var light1 = new BABYLON.DirectionalLight("Directionallight1", new BABYLON.Vector3(1, -1, 1), scene);
    light1.position = new BABYLON.Vector3(-40, 40, -40);
    var shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light1);
    //shadowGenerato1.bias = 0.0001;
    light1.shadowMaxZ = 130;
    light1.shadowMinZ = 10;
    shadowGenerator1.useContactHardeningShadow = true;
    shadowGenerator1.setDarkness(0.5);

    var ground = BABYLON.MeshBuilder.CreateGround("gd", { width: 6, height: 6, subdivisions: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
    ground.receiveShadows = true;

    //var box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);

    var dummy = new BABYLON.Mesh("dummy", scene);

    BABYLON.SceneLoader.LoadAssetContainer("models/", "companion-cube-1x1.gltf", scene, function (container) {
      var meshes = container.meshes;
      var materials = container.materials;

      let t = 0.0088;

      let mesh = meshes[1];
      container.scene.addMesh(mesh);
      mesh.PhysicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 1, friction: 0.5, restitution: 0.7 }, scene); 
      //mesh.scaling = new BABYLON.Vector3(t, t, t);
      //mesh.isVisible = false;
      mesh.parent = dummy;
      mesh.translate(new BABYLON.Vector3(0, 1.5, 0), BABYLON.Space.WORLD);

      for (var index = 0; index < 2; index++) {
        var newInstance = mesh.createInstance("i" + index);
        newInstance.position.x = 1.1 + index*1.1;
        newInstance.PhysicsImpostor = new BABYLON.PhysicsImpostor(newInstance, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 1, friction: 0.5, restitution: 0.7 }, scene); 

        newInstance.parent = dummy;
        shadowGenerator1.addShadowCaster(newInstance);
      }

    });
    return scene;
  }

  var scene = createScene();

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener('resize', function () {
    engine.resize();
  });
});
