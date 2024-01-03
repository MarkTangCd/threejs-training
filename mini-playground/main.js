import * as THREE from "three";

let scene = null;
let camera = null;
let renderer = null;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.PlaneGeometry(20, 10);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x6c9b42),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  camera.position.set(0, 0, 30);
  camera.lookAt(scene.position);

  document.getElementById("app").appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

init();
