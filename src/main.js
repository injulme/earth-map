import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  /** texture loader */
  const textureLoader = new THREE.TextureLoader();

  /** scene */
  const scene = new THREE.Scene();

  /** camera */
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.z = 130;

  /** orbit controls */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.maxDistance = 50;
  controls.minDistance = 30;

  /** sphere (earth) */
  const earthGeometry = new THREE.SphereGeometry(15, 64, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("assets/earth-daymap.jpg"),
    side: THREE.FrontSide,
    opacity: 0.8,
    transparent: true,
  });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  /** sphere (cloud) */
  const cloudGeometry = new THREE.SphereGeometry(16, 64, 32);
  const cloudMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("assets/earth-clouds.jpg"),
    side: THREE.FrontSide,
    opacity: 0.2,
    transparent: true,
  });
  const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(cloud);

  /** ambient light */
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  render();

  function render() {
    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);

    controls.update();
  }

  window.addEventListener("resize", handleResize);

  // const gui = new GUI();

  // const lightGui = gui.addFolder("light");
  // lightGui.add(ambientLight, "intensity");
}
