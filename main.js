window.addEventListener("keyup", event => {
  // 80 = "p", "esc" = 27
  if (event.isComposing || event.keyCode === 80 || event.keyCode === 27) {
    // toggle screen
    var modal = document.getElementById("myModal");
    var canvas = document.getElementById("renderCanvas");
    if (modal.style.display === "block") {
      modal.style.display = "none";
      canvas.style.display = "block";
    } else {
      modal.style.display = "block";
      canvas.style.display = "none";
    }
    return;
  }
});

window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

  var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  var physicsPlugin = new BABYLON.CannonJSPlugin();

  var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics(gravityVector, physicsPlugin);

    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    var files = [
      "imgs/skybox/Daylight Box_Right.bmp",
      "imgs/skybox/Daylight Box_Top.bmp",
      "imgs/skybox/Daylight Box_Front.bmp",
      "imgs/skybox/Daylight Box_Left.bmp",

      "imgs/skybox/Daylight Box_Bottom.bmp",
      "imgs/skybox/Daylight Box_Back.bmp",
    ];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;	

    var camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 1, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(4, 8, -8));
    camera.attachControl(canvas, false);
    camera.wheelDeltaPercentage = 0.01;

    skybox.position = camera.position;

    var light1 = new BABYLON.DirectionalLight("Directionallight1", new BABYLON.Vector3(-1, -1, -1), scene);
    light1.position = new BABYLON.Vector3(40, 40, 40);
    var shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light1);
    //shadowGenerato1.bias = 0.0001;
    light1.shadowMaxZ = 130;
    light1.shadowMinZ = 10;
    shadowGenerator1.useContactHardeningShadow = true;
    shadowGenerator1.setDarkness(0.5);

    var sea = BABYLON.MeshBuilder.CreateGround("gd", { width: 600, height: 600, subdivisions: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    sea.position.z = 300;
    var matSea = new BABYLON.StandardMaterial("matSea", scene);
    matSea.diffuseTexture = new BABYLON.Texture("imgs/ground/sea.jpg", scene);
    matSea.diffuseTexture = new BABYLON.Texture("imgs/ground/sea.jpg", scene);
    matSea.diffuseTexture.uScale = 30;
    matSea.diffuseTexture.vScale = 30;
    //matSea.bumpTexture = new BABYLON.Texture("imgs/ground/seanormals.png", scene);	
    //matSea.bumpTexture.uScale = 60;
    //matSea.bumpTexture.vScale = 60;
    //matSea.useParallax = true;
    //matSea.useParallaxOcclusion = true;
    //matSea.parallaxScaleBias = 0.1;
    sea.material = matSea;


    var beach = BABYLON.MeshBuilder.CreateGround("gd", { width: 600, height: 600, subdivisions: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    beach.position.z = -295;
    beach.position.y = 52;
    //beach.position.x = 100;
    beach.rotation.x = Math.PI / 18;
    beach.physicsImpostor = new BABYLON.PhysicsImpostor(beach, BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
    beach.receiveShadows = true;
    var matBeach = new BABYLON.StandardMaterial("matBeach", scene);
    matBeach.specularColor = new BABYLON.Color3(0, 0, 0);
    matBeach.diffuseTexture = new BABYLON.Texture("imgs/ground/beach.png", scene);
    matBeach.diffuseTexture.uScale = 60;
    matBeach.diffuseTexture.vScale = 60;
    //matBeach.bumpTexture = new BABYLON.Texture("imgs/ground/pebblenormals.png", scene);	
    //matBeach.bumpTexture.uScale = 60;
    //matBeach.bumpTexture.vScale = 60;
    //matBeach.useParallax = true;
    //matBeach.useParallaxOcclusion = true;
    //matBeach.parallaxScaleBias = 0.1;
    beach.material = matBeach;

    var box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);

    var dummy = new BABYLON.Mesh("dummy", scene);

    //BABYLON.SceneLoader.LoadAssetContainer("models/", "companion-cube-1x1.gltf", scene, function (container) {
    //  var meshes = container.meshes;
    //  var materials = container.materials;

    //  let t = 0.0088;

    //  let mesh = meshes[1];
    //  container.scene.addMesh(mesh);
    //  mesh.PhysicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 1, friction: 0.5, restitution: 0.7 }, scene); 
    //  //mesh.scaling = new BABYLON.Vector3(t, t, t);
    //  //mesh.isVisible = false;
    //  mesh.parent = dummy;
    //  mesh.translate(new BABYLON.Vector3(0, 1.5, 0), BABYLON.Space.WORLD);

    //  for (var index = 0; index < 2; index++) {
    //    var newInstance = mesh.createInstance("i" + index);
    //    newInstance.position.x = 1.1 + index*1.1;
    //    newInstance.PhysicsImpostor = new BABYLON.PhysicsImpostor(newInstance, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 1, friction: 0.5, restitution: 0.7 }, scene); 

    //    newInstance.parent = dummy;
    //    shadowGenerator1.addShadowCaster(newInstance);
    //  }

    //});
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
