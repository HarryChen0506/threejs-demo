import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
// camera.position.z = 250;

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var loader = new OBJLoader();

// loader.load( './assets/models/obj/male02/male02.obj', function ( gltf ) {
//     console.log('gltf', gltf)
//     gltf.position.y = - 95;
// 	scene.add( gltf );
//     renderer.render( scene, camera );
// }, undefined, function ( error ) {

// 	console.error( error );

// } );

var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var object;
init();
animate();
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 250;
    // scene
    scene = new THREE.Scene();
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );
    // manager
    function loadModel() {
        object.traverse( function ( child ) {
            if ( child.isMesh ) child.material.map = texture;
        } );
        object.position.y = - 95;
        console.log('loadModel', object)
        scene.add( object );
    }
    var manager = new THREE.LoadingManager( loadModel );
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };
    // texture
    var textureLoader = new THREE.TextureLoader( manager );
    var texture = textureLoader.load( './assets/21263805.png' );
    // model
    function onProgress( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    }
    function onError() {}
    var loader = new OBJLoader( manager );
    loader.load( './assets/models/obj/male02/male02.obj', function ( obj ) {
        object = obj;
    }, onProgress, onError );
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}
//
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}



