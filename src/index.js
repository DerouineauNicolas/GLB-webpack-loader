import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
var utm = require('utm')

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

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 20000);
    //camera = new THREE.OrthographicCamera( window.innerWidth / - 2,  window.innerWidth  / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
    camera.up.set(0, 0, 1);
    camera.position.z = 5478.996554085081;

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

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+017_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+017_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+017_high.glb', 20.41944762123676);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+018_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+018_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+018_high.glb', 49.720226357556925);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+000_+008_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+000_+008_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+000_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+016_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+016_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+016_high.glb', 78.94025471055373);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+008_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+008_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+009_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+009_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+010_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+010_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+000_+014_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+000_+014_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+000_+014_high.glb', 13.496224665538351);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+011_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+011_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+016_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+016_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+010_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+010_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+000_+009_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+000_+009_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+000_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+017_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+017_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+000_+013_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+000_+013_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+000_+013_high.glb', 67.9911360609271);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+011_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+011_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+019_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+019_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+019_high.glb', 58.40144677436389);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+015_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+015_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+015_high.glb', 40.368061578616036);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+011_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+011_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+016_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+016_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+018_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+018_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+000_+012_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+000_+012_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+000_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+021_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+021_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+021_high.glb', 47.56326146896684);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+010_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+010_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+017_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+017_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+020_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+020_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+020_high.glb', 55.34421419766719);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+010_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+010_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+017_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+017_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+019_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+019_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+018_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+018_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+012_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+012_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+014_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+014_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+016_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+016_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+013_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+013_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+014_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+014_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+009_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+009_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+011_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+011_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+013_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+013_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+015_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+015_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+012_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+012_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+007_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+007_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+007_high.glb', 65.16931938314643);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+009_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+009_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+008_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+008_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+012_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+012_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+015_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+015_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+000_+010_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+000_+010_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+000_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+014_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+014_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+013_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+013_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+015_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+015_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+012_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+012_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+008_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+008_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+022_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+022_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+022_high.glb', 6.8444654875062865);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+003_+009_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+003_+009_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+003_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+000_+011_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+000_+011_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+000_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+014_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+014_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+013_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+013_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+007_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+007_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+004_+014_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+004_+014_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+004_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+011_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+011_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+008_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+008_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+002_+009_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+002_+009_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+002_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+013_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+013_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+015_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+015_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+001_+010_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+001_+010_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+001_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_distance/LOD_Tile_+005_+012_low.glb', 5478.996554085081, 'test_distance/LOD_Tile_+005_+012_medium.glb', 2739.4982770425404, 'test_distance/LOD_Tile_+005_+012_high.glb', 93.86299048639616);



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
