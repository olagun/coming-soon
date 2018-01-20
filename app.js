var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
var container, stats;

var camera, scene, renderer;

var mouseX = 0,
  mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement("div");

  container.style.background = "linear-gradient(to right, #f7b733, #fc4a1a)";

  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 600;

  // scene

  scene = new THREE.Scene();

  var keyLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(30, 100%, 75%)"),
    1.0
  );
  keyLight.position.set(-100, 0, 100);

  var fillLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(240, 100%, 75%)"),
    0.75
  );
  fillLight.position.set(100, 0, 100);

  var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  backLight.position.set(100, 0, -100).normalize();

  // scene.add(keyLight);
  // scene.add(fillLight);
  scene.add(backLight);

  // texture
  var loader = new THREE.ObjectLoader();

  loader.load(
    // resource URL
    "object.json",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function(obj) {
      // Add the loaded object to the scene
      
      object = obj;
      object.position.x = -45;
      object.position.y = -90;
      object.scale.x = 20;
      object.scale.y = 20;
      object.scale.z = 20;
      scene.add(obj);
    }
  );

  // var manager = new THREE.LoadingManager();
  // manager.onProgress = function(item, loaded, total) {
  //   console.log(item, loaded, total);
  // };

  // // model
  // var mtlLoader = new THREE.MTLLoader(manager);
  // mtlLoader.load("test.mtl", function(materials) {
  //   materials.preload();

  //   var objLoader = new THREE.OBJLoader(manager);
  //   objLoader.setMaterials(materials);
  //   objLoader.load("test.obj", function(object) {
  //     object.rotation.x = -90 * Math.PI / 180;
  //     object.rotation.z = 0 * Math.PI / 180;
  //     object.scale.x = 30;
  //     object.scale.y = 30;
  //     object.scale.z = 30;
  //     scene.add(object);
  //   });
  // });

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onDocumentMouseMove, false);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
  // obj.rotation.z = .01;
  // obj.rotation.x = .02;
  requestAnimationFrame(animate);
  render();
}

function render() {
  // obj.rotation.x += (0.2 * (Math.PI / 180));

  // obj.rotation.x += .001;
  // obj.rotation.z += .001;
  // obj.rotation.y += .002;

  camera.position.x += (mouseX - camera.position.x) * 0.8;
  camera.position.y += (-mouseY - camera.position.y) * 0.8;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
