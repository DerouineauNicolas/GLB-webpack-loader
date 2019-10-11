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
    scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
    scene.add( new THREE.AmbientLight( 0xffffff, 1 ) );
    scene.background = new THREE.Color( 0x000000 );

    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    /*var light = new THREE.PointLight( 0xff0000, 10000, 100 );
    light.position.set( 50, 50, -2000 );
    scene.add( light );*/

    raycaster = new THREE.Raycaster();
    controls = new THREE.MapControls(camera, renderer);
    controls.update();

    controls.minDistance = 1;

    renderer = new THREE.WebGLRenderer(scene.fog.color );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    //renderer.setClearColor(0xf0f0f0);
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
        camera.position.z=-2000;


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

                var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
                var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
                var mesh = new THREE.Mesh( geometry, material );
                mesh.position.set(target.x,target.y,target.z);
                console.log("Adding geometry");
                scene.add( mesh );


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

}