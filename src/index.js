import * as THREE from 'three';


var renderer;
var stats;
var width = window.innerWidth;
var height = window.innerHeight;

function initThree() {
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    // renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.x = 100;
    camera.position.y = 300;
    camera.position.z = 600;
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
    light = new THREE.AmbientLight(0xFF0000);
    light.position.set(100, 100, 200);
    scene.add(light);
}

var mesh;
function initObject() {  
    var geometry = new THREE.BoxGeometry( 100, 100, 100 ); 
    console.log('geometry', geometry)
    for ( var i = 0; i < geometry.faces.length; i += 1 ) {
        var hex = Math.random() * 0xffffff;
        geometry.faces[ i ].color.setHex( hex );
        // geometry.faces[ i + 1 ].color.setHex( hex );
    }
    var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors} );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
    mesh = new THREE.Mesh( geometry, material);
    // mesh.position.set(new THREE.Vector3(0,0,0))
    scene.add(mesh);
}

function initGrid(){
    var helper = new THREE.GridHelper( 1000, 50, 0x0000ff, 0x808080 );
    scene.add( helper );
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initGrid();
    animation();
}

// 帧循环、游戏循环
function animation() {
    mesh.rotateY(0.01);
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}

threeStart()