import * as THREE from 'three';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var container, stats;
var camera, controls, scene, renderer;
var cross;
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 500 );
    // camera.position.z = 0.2;
    camera.position.set( 0, 0, 0.2 );
    scene = new THREE.Scene();
    scene.add( camera );

    // light
    var dirLight = new THREE.DirectionalLight( 0xffff00 );
    dirLight.position.set( 0, 0, 1 ).normalize();

    camera.add( dirLight );
    // camera.add( dirLight.target );
    // scene.add(dirLight);

    // var light = new THREE.AmbientLight(0xffff00)
    // light.position.set(100, 100, 200)
    // scene.add(light)

    
    var loader = new VTKLoader();

    loader.load( "./assets/models/vtk/bunny.vtk", function ( geometry ) {
        geometry.center();
        geometry.computeVertexNormals();
        var material = new THREE.MeshLambertMaterial( { color:0xffffff, side: THREE.DoubleSide } );
        var mesh = new THREE.Mesh( geometry, material );
        // mesh.position.set( - 0.075, 0.005, 0 );
        mesh.position.set( 0, 0, 0 );
        mesh.scale.multiplyScalar( 0.5 );
        scene.add( mesh );
    } );

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setClearColor(0xffffff, 1)

    container = document.createElement( 'div' );
    document.body.appendChild( container );
    container.appendChild( renderer.domElement );

    // controls
    controls = new OrbitControls( camera, renderer.domElement );
    // controls = new TrackballControls( camera, renderer.domElement );
    // controls.rotateSpeed = 5.0;
    // controls.zoomSpeed = 5;
    // controls.panSpeed = 2;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.3;
    controls.update();

    stats = new Stats();
    container.appendChild( stats.dom );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
}

function animate() {
    requestAnimationFrame( animate );
    // controls.update();
    renderer.render( scene, camera );
    stats.update();
}


