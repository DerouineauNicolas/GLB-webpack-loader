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


export default function SceneManager (){
	var scene = new THREE.Scene();
	this.scene = scene;
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	this.camera = camera;
	this.drawingSurface = document.getElementById( 'canvasviewer' );
	var renderer = new THREE.WebGLRenderer();
	this.renderer = renderer;

    var width = Math.floor( $('#canvasviewer').width() );
	var height = Math.floor( $('#canvasviewer').height() );

    this.renderer.setSize(width, height);
    this.drawingSurface.appendChild(this.renderer.domElement);

	this.renderer.gammaOutput = true;
	this.renderer.gammaFactor = 2.2;

	this.controls = new OrbitControls( this.camera, this.renderer.domElement );

	this.controls.update();
	var context = this;


	this.mixer = null;
	var clock = new THREE.Clock();
	var pointLight = new THREE.PointLight(0xffffff, 1, 100);
	pointLight.position.set(-5, 1, 5);
	this.scene.add(pointLight);

	function animate() {
		requestAnimationFrame( animate );
		var delta = clock.getDelta();
		if (context.mixer != null) {
			context.mixer.update(delta);
		};
		renderer.render( scene, camera );
	}
	animate();

	this.animate = animate;

}

SceneManager.prototype.LoadAsset = function LoadAsset(asset) {

	// Instantiate a loader
	var loader = new GLTFLoader();
	var threeDContext = this;
	console.log(threeDContext);

	// Load a glTF resource
	loader.load(
		// resource URL
		asset,
		// called when the resource is loaded
		function ( gltf ) {
			var model = gltf.scene;

			threeDContext.scene.add(model );

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			

			threeDContext.mixer = new THREE.AnimationMixer(model);
			if(gltf.animations[0]){
				threeDContext.mixer.clipAction(gltf.animations[0]).play();
				threeDContext.animate();
			}
			fitCameraToObject(threeDContext.camera, model, 20, threeDContext.controls);
		},
		// called while loading is progressing
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );
			console.log(error);

		}
	);
	
}




