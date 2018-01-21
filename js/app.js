"use strict";

// parallax
// bg and torch (l and r)

// if (matchMedia("(max-width: 400px)").matches);

const prompt = document.querySelector("#js-prompt");
const prompt2 = document.querySelector("#js-prompt-2");
const section1 = document.querySelector("section")[0];
const scrollJack = document.querySelector("#js-scroll-jack");
const jsHero = document.querySelector("#js-hero");
const jsYear = document.querySelector("#js-year");
const jsTitle = document.querySelector("#js-title");
const jsDots = document.querySelector("#js-dots");

prompt.onclick = () => {
  scrollJack.scrollIntoView({ behavior: "smooth" });
};

prompt2.onclick = () => {
  section1.scrollIntoView({ behavior: "smooth" });
};

// Carousel Model
const path = "assets/images/hackbca_";
const extension = ".jpg";

const carouselModel = {
  2014: {
    name: "hackBCA I"
  },
  2015: {
    name: "hackBCA II"
  },
  2016: {
    name: "hackBCA III"
  },
  2017: {
    name: "hackBCA IV"
  }
};

const keys = Object.keys(carouselModel);
const i = keys.length;

for (const k in keys) {
  const year = keys[k];
  const event = carouselModel[year];
  const image = path + year + extension;

  // Create image element.
  const imgEl = document.createElement("img");
  imgEl.src = image;
  imgEl.classList.add("section__img");
  jsHero.appendChild(imgEl);

  // Create year element.
  const yearEl = document.createElement("h1");
  yearEl.innerHTML = year;
  yearEl.classList.add("section__year");
  jsYear.appendChild(yearEl);

  // Create title element.
  const titleEl = document.createElement("h2");
  titleEl.innerHTML = event.name;
  titleEl.classList.add("section__title-text");
  jsTitle.appendChild(titleEl);

  const dotEl = document.createElement("div");
  dotEl.classList.add("section__dot");
  // Dot index.
  dotEl.dataset.i = k;
  // dotEl.onclick = () => snapCarousel(k);
  jsDots.appendChild(dotEl);
}

let p = 0;
const dots = jsDots.children;
const imgW = 800;
const yearH = 384;
const dotMinScale = 0.5;

const renderCarousel = (p, actualP) => {
  actualP = actualP || p;

  // Translate percentage.
  const imgP = (-p * (i - 1) * imgW) | 0;
  const yearP = (-p * (i - 1) * yearH) | 0;
  const index = (actualP / (1 / i) - 0.05) | 0;

  let currDot;
  for (const dot of dots) {
    if (dot.dataset.i == index) {
      currDot = dot;
      break;
    }
  }

  currDot.style.transform =
    "scale(" +
    (dotMinScale + ((actualP % (1 / i)) * i * dotMinScale)) +
    ")";
  jsHero.style.transform = "translateX(" + imgP + "px)";
  jsYear.style.transform = "translateY(" + yearP + "px)";
  jsTitle.style.transform = "translateX(" + imgP + "px)";
};

const animate = ({ callback, lerp, from = 0, to = 1, duration = 1 }) => {
  const startTime = new Date();
  duration *= 1000;
  const _animate = () => {
    const diff = new Date() - startTime;
    const _p = diff / duration;
    if (_p < 1) {
      requestAnimationFrame(_animate);
      callback((p = lerp(from + _p * (to - from))), from + _p * (to - from));
    } else {
      callback((p = to), to);
    }
  };
  requestAnimationFrame(_animate);
};

const snapCarousel = toIndex => {
  const index = toIndex || (p / (1 / i)) | 0;
  const newP = 1 / (i - 1) * index;

  const cubic = t => t;

  animate({
    callback: renderCarousel,
    lerp: cubic,
    from: p,
    to: newP,
    duration: 0.5
  });
};

const _handleMouseWheel = e => {
  const { top } = scrollJack.getBoundingClientRect();
  const EPSILON = 300;

  if (Math.abs(top) <= EPSILON) {
    // ON SCROLL END, SNAP
    scrollJack.scrollIntoView({ behavior: "smooth" });

    // Clamp percentage.
    p = Math.min(Math.max(p, 0), 1);

    // Add scroll percentage relative to container.
    let d = e.deltaY;
    // if (e.wheelDelta < 0) {
    //   d = Math.max(e.deltaY, e.deltaX);
    // } else {
    //   d = Math.min(e.deltaY, e.deltaX);
    // }

    p += d / scrollJack.clientWidth;

    // add posiion fixed class
    // and top property

    if (p >= 0 && p <= 1) {
      e.preventDefault();
      renderCarousel(p);
    } else {
      // snapCarousel();
    }
  }
};

scrollJack.addEventListener("wheel", _handleMouseWheel, {
  passive: false
});

scrollJack.addEventListener("mouseup", snapCarousel);

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("webgl");

if (ctx) {
  const fallbackImage = document.querySelector("#js-image-fallback");
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
