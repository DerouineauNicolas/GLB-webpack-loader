import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
var utm = require('utm')

const OrbitControls = require('three-orbitcontrols')
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import MeshonLoad from './mesh_update.js'

var offset_x = 399619;
var offset_y = 4810459;
var offset_z = 399;


//PROJCS["WGS 84 / UTM zone 31N",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],
//AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],
//AUTHORITY["EPSG","4326"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",3],
//PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],
//AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","32631"]]


var params = {
    enableRaytracing: false,
};
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

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 20000);
    //camera = new THREE.OrthographicCamera( window.innerWidth / - 2,  window.innerWidth  / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
    camera.up.set(0,0,1);

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    /*var light = new THREE.PointLight( 0xff0000, 10000, 100 );
    light.position.set( 50, 50, -2000 );
    scene.add( light );*/


    renderer = new THREE.WebGLRenderer(scene.fog.color );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.MapControls(camera, renderer.domElement);
    controls.update();

    var gui = new GUI();
    gui.add( params, 'enableRaytracing' );
    gui.open();
    
    loadModels();

}

function loadModels() {

    const loader = new GLTFLoader();


    const onProgress = () => { };


    const onError = (errorMessage) => {
        console.log(errorMessage);
    };


    const originPosition = new THREE.Vector3(0, 0, 0);
    //
    loader.load('caca/LOD_Model.002_low.glb', gltf => MeshonLoad(gltf, loader, scene, camera, renderer, params, mouse, 'caca/LOD_Model.002_medium.glb', 2123.5369085736793, 'caca/LOD_Model.002_high.glb'), onProgress, onError);

    loader.load('caca/LOD_Model_low.glb', gltf => MeshonLoad(gltf, loader, scene, camera, renderer, params, mouse, 'caca/LOD_Model_medium.glb', 2123.5369085736793, 'caca/LOD_Model_high.glb'), onProgress, onError);
    
    loader.load('caca/LOD_Model.001_low.glb', gltf => MeshonLoad(gltf, loader, scene, camera, renderer, params, mouse, 'caca/LOD_Model.001_medium.glb', 2123.5369085736793, 'caca/LOD_Model.001_high.glb'), onProgress, onError);
    
    loader.load('caca/LOD_Model.003_low.glb', gltf => MeshonLoad(gltf, loader, scene, camera, renderer, params, mouse, 'caca/LOD_Model.003_medium.glb', 2123.5369085736793, 'caca/LOD_Model.003_high.glb'), onProgress, onError);

    
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
