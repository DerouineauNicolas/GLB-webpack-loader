import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const OrbitControls = require('three-orbitcontrols')
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import LOD from './lod.js'

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
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    scene.background = new THREE.Color(0x000000);

    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 3000);
    //camera = new THREE.OrthographicCamera( window.innerWidth / - 2,  window.innerWidth  / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
    camera.up.set(0, 0, 1);


    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    /*var light = new THREE.PointLight( 0xff0000, 10000, 100 );
    light.position.set( 50, 50, -2000 );
    scene.add( light );*/


    renderer = new THREE.WebGLRenderer(scene.fog.color);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.MapControls(camera, renderer.domElement);
    controls.update();

    var gui = new GUI();
    gui.add(params, 'enableRaytracing');
    gui.open();

    loadModels();

}

function loadModels() {

    const loader = new GLTFLoader();


    const originPosition = new THREE.Vector3(0, 0, 0);

    var LODManager = new LOD(scene, camera, renderer, params, mouse, loader);
    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+003_+003_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+003_+003_intermediate_11214.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+003_+003_high.glb', 45.90124675655275);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+000_+000.006_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+000_+000.006_intermediate_14620.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+000_+000.006_high.glb', 46.90519268211903);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+000_+000.002_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+000_+000.002_intermediate_19876.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+000_+000.002_high.glb', 46.90519268211903);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+001_+000_low.glb', 278.692900032515, 1, 'delair_translated/LOD_Tile_+001_+000_high.glb', 84.55579878571187);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+000_+001.010_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+000_+001.010_intermediate_38562.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+000_+001.010_high.glb', 46.90519268211903);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+000_+001.008_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+000_+001.008_intermediate_38916.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+000_+001.008_high.glb', 46.90519268211903);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+001_+001.024_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+001_+001.024_intermediate_60726.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+001_+001.024_high.glb', 37.774540046810586);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+001_+001.025_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+001_+001.025_intermediate_67570.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+001_+001.025_high.glb', 46.781260604926686);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+003.008_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+003.008_intermediate_49720.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+003.008_high.glb', 34.59954447290646);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+003.010_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+003.010_intermediate_59010.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+003.010_high.glb', 49.95625617883081);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+003_+002.029_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+003_+002.029_intermediate_65644.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+003_+002.029_high.glb', 47.135977105982874);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+002.010_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+002.010_intermediate_65352.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+002.010_high.glb', 37.78543390311788);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+002.014_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+002.014_intermediate_86094.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+002.014_high.glb', 46.77036488259399);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+001_+002.023_low.glb', 278.692900032515, 1, 'delair_translated/LOD_Tile_+001_+002.023_high.glb', 51.16645575830279);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+001_+002.020_low.glb', 278.692900032515, 1, 'delair_translated/LOD_Tile_+001_+002.020_high.glb', 33.389343027409076);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+003_+002.028_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+003_+002.028_intermediate_59554.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+003_+002.028_high.glb', 47.135977105982874);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+000_+002.007_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+000_+002.007_intermediate_14376.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+000_+002.007_high.glb', 46.90519268211903);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+000_+002.004_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+000_+002.004_intermediate_25140.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+000_+002.004_high.glb', 46.90519268211903);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+000.006_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+000.006_intermediate_36468.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+000.006_high.glb', 35.519970833450145);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+000.008_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+000.008_intermediate_38358.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+000.008_high.glb', 49.03582795226171);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+001.012_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+001.012_intermediate_53212.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+001.012_high.glb', 21.044222782830253);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+002_+001.010_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+002_+001.010_intermediate_66666.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+002_+001.010_high.glb', 63.51157600288161);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+003_+001.020_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+003_+001.020_intermediate_46868.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+003_+001.020_high.glb', 47.135977105982874);

    LODManager.AddBaseLayer('delair_translated/LOD_Tile_+003_+001.018_low.glb', 278.692900032515, 2, 'delair_translated/LOD_Tile_+003_+001.018_intermediate_52152.glb', 69.67322500812875, 'delair_translated/LOD_Tile_+003_+001.018_high.glb', 47.135977105982874);



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
