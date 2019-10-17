import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
var utm = require('utm')

const OrbitControls = require('three-orbitcontrols')
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'

var offset_x = 399619;
var offset_y = 4810459;
var offset_z = 399;


//PROJCS["WGS 84 / UTM zone 31N",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],
//AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],
//AUTHORITY["EPSG","4326"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",3],
//PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],
//AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","32631"]]



var zoneNum;
var zoneLetter;
var northern;

var container;
var camera, scene, raycaster, renderer, controls;

var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100,
    theta = 0;
var model;
var scale;

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

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
    //camera = new THREE.OrthographicCamera( window.innerWidth / - 2,  window.innerWidth  / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
    camera.up.set(0,0,1);

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    /*var light = new THREE.PointLight( 0xff0000, 10000, 100 );
    light.position.set( 50, 50, -2000 );
    scene.add( light );*/

    raycaster = new THREE.Raycaster();
   

    renderer = new THREE.WebGLRenderer(scene.fog.color );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.MapControls(camera, renderer.domElement);
    controls.update();
    loadModels();

}

function loadModels() {

    const loader = new GLTFLoader();
    const onLoad = (gltf, position) => {

        const model = gltf.scene.children[0];
        model.position.copy(position);
        const animation = gltf.animations[0];
        const mixer = new THREE.AnimationMixer(model);

        var camera_height;
        var boundingSphere;

        

        if(model.geometry === undefined ){
            model.children[0].geometry.computeBoundingSphere();
            boundingSphere = model.children[0].geometry.boundingSphere;
        }else{
            model.geometry.computeBoundingSphere();
            scale = model.geometry.boundingSphere.radius;
            boundingSphere = model.geometry.boundingSphere;
        }

        model.position.z = (-1) * boundingSphere.center.z;

        scene.add(model);

        camera.position.z = 5 * Math.abs(boundingSphere.center.z);

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

                var geometry = new THREE.BoxBufferGeometry( 5/scale, 5/scale, 5/scale );
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
    loader.load('mesh_with_geojson/Model.glb', gltf => onLoad(gltf, parrotPosition), onProgress, onError);
    //loader.load('test.glb', gltf => onLoad(gltf, parrotPosition), onProgress, onError);

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