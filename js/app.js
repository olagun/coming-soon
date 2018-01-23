"use strict";

let p = 0,
  imgW = 800,
  yearH = 384;

if (matchMedia("(max-width: 800px)").matches) {
  imgW = 400;
}

const prompt = document.querySelector("#js-prompt");
const prompt2 = document.querySelector("#js-prompt-2");
const section1 = document.querySelectorAll("section")[0];
const scrollJack = document.querySelector("#js-scroll-jack");
const jsHero = document.querySelector("#js-hero");
const jsYear = document.querySelector("#js-year");
const jsTitle = document.querySelector("#js-title");
const jsDots = document.querySelector("#js-dots");
const fallbackImage = document.querySelector("#js-image-fallback");

const midPageX = window.innerWidth / 2;
const midPageY = window.innerHeight / 2;
const scale = 5; // percentage for parallax

section1.onmousemove = ({ pageX: x, pageY: y }) => {
  const diffX = midPageX - x;
  const diffY = midPageY - y;
  const pX = diffX / midPageX;
  const pY = diffY / midPageY;

  fallbackImage.style.transform =
    "translate(" + pX * -scale + "%, " + pY * -scale + "%)";
  section1.style.backgroundPosition = -pX * scale + "% " + -pY * scale + "%";
};

prompt.onclick = () => {
  scrollJack.scrollIntoView({ behavior: "smooth" });
};

prompt2.onclick = () => {
  section1.scrollIntoView({ behavior: "smooth" });
};

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("webgl");

if (ctx) {
  var clock = new THREE.Clock();
  var delta = clock.getDelta(); // seconds.
  var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
  var container, stats;

  fallbackImage.style.visibility = "hidden";

  var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
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

    scene.add(backLight);

    // texture
    var loader = new THREE.ObjectLoader();

    loader.load("assets/obj/torch.json", function(object) {
      object.position.x = -45;
      object.position.y = -90;
      object.scale.x = 20;
      object.scale.y = 20;
      object.scale.z = 20;
      scene.add(object);
    });

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
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.8;
    camera.position.y += (-mouseY - camera.position.y) * 0.8;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
}

$(document).ready(function(){
  $('.slider').slick({
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: true,
  speed: 700,
  fade: true,
  cssEase: 'linear'
});
});
  
