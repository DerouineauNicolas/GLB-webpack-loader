import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

const OrbitControls = require('three-orbitcontrols')

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000000);

var renderer = new THREE.WebGLRenderer();
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 2;
camera.position.y = 500;
controls.update();

// Instantiate a loader
var loader = new GLTFLoader();
var mixer = null;
var clock = new THREE.Clock();


// Load a glTF resource
loader.load(
    // resource URL
    'PlanetarySystem.glb',
    // called when the resource is loaded
    function (gltf) {
        var model = gltf.scene;

        scene.add(model);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object


        mixer = new THREE.AnimationMixer(model);
        //if (gltf.animations[0]) {


        gltf.animations.forEach(function (item) {
            mixer.clipAction(item).play();
            animate();
        });

    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');
        console.log(error);

    }
);

var pointLight = new THREE.PointLight(0xffffff, 1, 10000000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);


var animate = function () {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    if (mixer != null) {
        mixer.update(delta);
    };
    renderer.render(scene, camera);


};

animate();
