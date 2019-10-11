import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

const OrbitControls = require('three-orbitcontrols')
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'


var container;
var camera, scene, raycaster, renderer, controls;

var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100,
    theta = 0;
var model;

const mixers = [];
const clock = new THREE.Clock();

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

    var light = new THREE.HemisphereLight();
    scene.add(light);


    raycaster = new THREE.Raycaster();
    controls = new THREE.MapControls(camera, renderer);
    controls.update();

    controls.maxDistance = 200;
    controls.minDistance = 160;
    controls.maxPolarAngle = Math.PI / 2 * 1;

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    loadModels();

}

function loadModels() {

    const loader = new GLTFLoader();
    const onLoad = (gltf, position) => {

        const model = gltf.scene.children[0];
        model.position.copy(position);
        const animation = gltf.animations[0];
        const mixer = new THREE.AnimationMixer(model);
        model.rotateX(Math.PI);
        scene.add(model);

        camera.lookAt(model);


        function clicked(event) {

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObject(model, true);

            console.log(intersects.length)

            if (intersects.length > 0) {
                var position = {
                    x: controls.target.x,
                    y: controls.target.y,
                    z: controls.target.z
                };
                console.log("position", position);

                var target = {
                    x: intersects[0].point.x,
                    y: intersects[0].point.y,
                    z: intersects[0].point.z
                }

                console.log("target", target);
                console.log("clicked");

            } else {

                INTERSECTED = null;
            }
        }

        renderer.domElement.addEventListener('mousedown', function (event) {
            // find intersections

            clicked(event);
            camera.updateMatrixWorld();


        });

    };


    const onProgress = () => { };


    const onError = (errorMessage) => {
        console.log(errorMessage);
    };


    const parrotPosition = new THREE.Vector3(0, 0, 0);
    loader.load('test.glb', gltf => onLoad(gltf, parrotPosition), onProgress, onError);

}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

    //const delta = clock.getDelta();

    /*mixers.forEach((mixer) => {
      mixer.update(delta);
    });*/

}