import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

const OrbitControls = require('three-orbitcontrols')

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new OrbitControls( camera, renderer.domElement );

camera.position.z = 2;
controls.update();

// Instantiate a loader
var loader = new GLTFLoader();


// Load a glTF resource
loader.load(
	// resource URL
	'Nico.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Scene
		gltf.scenes; // Array<THREE.Scene>
		gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

var light = new THREE.HemisphereLight();
scene.add( light );


var animate = function () {
    requestAnimationFrame( animate );


    renderer.render( scene, camera );
};

animate();
