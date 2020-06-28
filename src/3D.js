import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import $ from "jquery";

const OrbitControls = require('three-orbitcontrols')

const fitCameraToObject = function ( camera, object, offset, controls ) {

    offset = offset || 1.25;

    const boundingBox = new THREE.Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject( object );

    const center = boundingBox.getCenter();

    const size = boundingBox.getSize();

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max( size.x, size.y, size.z );
    const fov = camera.fov * ( Math.PI / 180 );
    let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    if ( controls ) {

      // set camera to rotate around center of loaded object
      controls.target = center;

      // prevent camera from zooming out far enough to create far plane cutoff
      controls.maxDistance = cameraToFarEdge * 2;

      controls.saveState();

    } else {

        camera.lookAt( center )
   }
}

export function LoadAsset(asset) {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	var drawingSurface = document.getElementById( 'canvasviewer' );
	var renderer = new THREE.WebGLRenderer();

    var width = Math.floor( $('#canvasviewer').width() );
	var height = Math.floor( $('#canvasviewer').height() );

	console.log(width);
	console.log(height);
	
    renderer.setSize(width, height);
    drawingSurface.appendChild(renderer.domElement);

	renderer.gammaOutput = true;
	renderer.gammaFactor = 2.2;

	var controls = new OrbitControls( camera, renderer.domElement );

	camera.position.z = 2;
	controls.update();

	// Instantiate a loader
	var loader = new GLTFLoader();
	var mixer = null;
	var clock = new THREE.Clock();


	// Load a glTF resource
	loader.load(
		// resource URL
		'Nicolasd.glb',
		// called when the resource is loaded
		function ( gltf ) {
			var model = gltf.scene;

			scene.add(model );

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			

			mixer = new THREE.AnimationMixer(model);
			if(gltf.animations[0]){
				mixer.clipAction(gltf.animations[0]).play();
				animate();
			}
			

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

	var pointLight = new THREE.PointLight(0xffffff, 1, 100);
	pointLight.position.set(-5, 1, 5);
	scene.add(pointLight);


	var animate = function () {
		requestAnimationFrame( animate );
		var delta = clock.getDelta();
		if (mixer != null) {
			mixer.update(delta);
		};
		renderer.render(scene, camera);
	};

	animate();
}
