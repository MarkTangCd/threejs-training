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

  // middle circle
  const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const circleGeometry = new THREE.CircleGeometry(0.1, 32);
  const circleMesh = new THREE.Mesh(circleGeometry, whiteMaterial);
  circleMesh.position.set(0, 0, 0.1);
  circleMesh.rotation.x = 1;
  scene.add(circleMesh);

  const ringGeometry = new THREE.RingGeometry(0.9, 1, 20);
  const ringMesh = new THREE.Mesh(ringGeometry, whiteMaterial);
  ringMesh.position.set(0, 0, 9);
  ringMesh.rotation.x = 1;
  scene.add(ringMesh);

  // create line
  const middleLine = createMiddleLine();
  scene.add(middleLine);

  // create goal line
  const [leftLine, rightLine] = createGoalLine();
  scene.add(leftLine);
  scene.add(rightLine);

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
  points.push(new THREE.Vector3(0, -5, -0.01));
  points.push(new THREE.Vector3(0, 5, -0.01));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  line.rotation.x = 2;
  return line;
}

function createGoalLine() {
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const leftPoints = [];
  leftPoints.push(new THREE.Vector3(-10, -2.5, -0.02));
  leftPoints.push(new THREE.Vector3(-7.5, -2.5, -0.02));
  leftPoints.push(new THREE.Vector3(-7.5, 2.5, -0.02));
  leftPoints.push(new THREE.Vector3(-10, 2.5, -0.02));
  const leftGeometry = new THREE.BufferGeometry().setFromPoints(leftPoints);
  const leftLine = new THREE.Line(leftGeometry, material);
  leftLine.rotation.x = 2;

  const rightPoints = [];
  rightPoints.push(new THREE.Vector3(10, -2.5, -0.02));
  rightPoints.push(new THREE.Vector3(7.5, -2.5, -0.02));
  rightPoints.push(new THREE.Vector3(7.5, 2.5, -0.02));
  rightPoints.push(new THREE.Vector3(10, 2.5, -0.02));
  const rightGeometry = new THREE.BufferGeometry().setFromPoints(rightPoints);
  const rightLine = new THREE.Line(rightGeometry, material);
  rightLine.rotation.x = 2;

  return [leftLine, rightLine];
}

init();
