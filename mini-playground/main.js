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

  // field
  const filedGeometry = new THREE.PlaneGeometry(20, 10);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x6c9b42),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(filedGeometry, material);
  mesh.rotation.x = 2;
  scene.add(mesh);

  const ringGeometry = new THREE.RingGeometry(0.9, 1, 20);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  // ringMesh.position.y = 1;
  ringMesh.position.set(0, 0, 9);
  ringMesh.rotation.x = 1;
  scene.add(ringMesh);

  // create line
  const middleLine = createMiddleLine();
  scene.add(middleLine);

  // border
  const edges = new THREE.EdgesGeometry(filedGeometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 100 })
  );
  line.rotation.x = 2;
  scene.add(line);

  camera.position.set(0, 0, 30);
  camera.lookAt(scene.position);

  document.getElementById("app").appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

function createMiddleLine() {
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const points = [];
  points.push(new THREE.Vector3(0, -5, 0));
  points.push(new THREE.Vector3(0, 5, 0));
  // TODO: the part of the line is gone
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  line.rotation.x = 2;
  return line;
}

init();
