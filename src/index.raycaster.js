import * as THREE from 'three';


var renderer;
var stats;
var width = window.innerWidth;
var height = window.innerHeight;
var radius = 500, theta = 0;
var mouse = new THREE.Vector2()
var selectedObject

function initThree() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  // camera.position.x = 100;
  // camera.position.y = 300;
  // camera.position.z = 600;
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;
  camera.lookAt(0, 0, 0);
}

var scene;
function initScene() {
  scene = new THREE.Scene();
}

var light;
function initLight() {
  // light = new THREE.AmbientLight(0xFFFFFF);
  // light.position.set(100, 100, 200);
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
}

function initObject() {
  var geometry = new THREE.BoxGeometry(20, 20, 20);
  console.log('geometry', geometry)
  // var material = new THREE.MeshBasicMaterial( { vertexColors: Math.random() * 0xffffff} );
  for (var i = 0; i < 1000; i++) {
    var material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 800 * Math.random() - 400
    mesh.position.y = 800 * Math.random() - 400
    mesh.position.z = 800 * Math.random() - 400
    mesh.rotation.x = Math.random() * 2 * Math.PI
    mesh.rotation.y = Math.random() * 2 * Math.PI
    mesh.rotation.z = Math.random() * 2 * Math.PI
    mesh.scale.x = Math.random() + 0.5
    mesh.scale.y = Math.random() + 0.5
    mesh.scale.z = Math.random() + 0.5
    // mesh.position.set(new THREE.Vector3(0,0,0))
    scene.add(mesh);
  }

}

function initGrid() {
  var helper = new THREE.GridHelper(1000, 50, 0x0000ff, 0x808080);
  scene.add(helper);
}

function threeStart() {
  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  // initGrid();
  bindEvent();
  initRaysacter();
  animation();
}

var raycaster
function initRaysacter() {
  raycaster = new THREE.Raycaster();
}

function bindEvent() {
  document.addEventListener('mousemove', onDocumentMouseMove, false);
}


function onDocumentMouseMove(event) {
  // console.log('event', event)
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function renderSelected() {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    if (selectedObject !== intersects[0].object) {
      selectedObject && selectedObject.material.emissive.setHex(selectedObject.currentHex);
      selectedObject = intersects[0].object
      selectedObject.currentHex = selectedObject.material.emissive.getHex();
      selectedObject.material.emissive.setHex(0xff0000);
    }
  } else {
    selectedObject && selectedObject.material.emissive.setHex(selectedObject.currentHex);
    selectedObject = null
  }
}

// 帧循环、游戏循环
function animation() {
  theta += 0.01
  camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  renderSelected()
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

threeStart()