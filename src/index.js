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


    LODManager.AddBaseLayer('testdraco/LOD_Tile_+026_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+026_+014_medium.glb', 360.9324736996924, 'testdraco/LOD_Tile_+026_+014_high.glb', 89.96944077820594);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+020_medium.glb', 350.60941403713707, 'testdraco/LOD_Tile_+022_+020_high.glb', 78.49937448647778);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+026_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+026_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+026_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+000_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+000_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+000_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+023_medium.glb', 309.76798958383125, 'testdraco/LOD_Tile_+006_+023_high.glb', 33.12001398280466);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+001_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+028_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+028_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+020_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+020_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+017_medium.glb', 298.3374798584201, 'testdraco/LOD_Tile_+002_+017_high.glb', 20.41944762123676);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+007_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+024_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+018_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+018_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+016_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+016_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+011_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+011_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+026_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+026_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+026_+015_medium.glb', 310.43764769465434, 'testdraco/LOD_Tile_+026_+015_high.glb', 33.86407855038588);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+026_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+026_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+026_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+009_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+009_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+027_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+027_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+010_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+010_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+025_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+016_medium.glb', 351.0062062388054, 'testdraco/LOD_Tile_+002_+016_high.glb', 78.94025471055373);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+008_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+029_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+029_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+003_medium.glb', 329.563121832134, 'testdraco/LOD_Tile_+013_+003_high.glb', 55.11460536980773);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+021_medium.glb', 352.00395304137777, 'testdraco/LOD_Tile_+018_+021_high.glb', 80.04886226896745);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+006_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+017_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+017_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+001_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+001_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+001_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+000_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+000_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+000_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+018_medium.glb', 324.70812865899956, 'testdraco/LOD_Tile_+003_+018_high.glb', 49.72016851076941);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+001_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+001_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+011_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+011_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+029_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+029_medium.glb', 350.31953389495317, 'testdraco/LOD_Tile_+015_+029_high.glb', 78.17728543960676);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+019_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+019_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+006_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+006_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+025_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+020_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+020_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+027_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+027_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+027_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+016_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+016_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+019_medium.glb', 284.01236390948264, 'testdraco/LOD_Tile_+023_+019_high.glb', 4.502652122417315);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+008_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+008_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+026_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+026_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+009_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+009_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+019_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+019_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+018_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+018_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+021_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+021_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+024_medium.glb', 325.2973222615911, 'testdraco/LOD_Tile_+007_+024_high.glb', 50.374828069204504);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+024_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+028_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+028_medium.glb', 362.6569974640952, 'testdraco/LOD_Tile_+015_+028_high.glb', 91.885578294209);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+000_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+000_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+000_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+000_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+000_medium.glb', 358.7481424289406, 'testdraco/LOD_Tile_+016_+000_high.glb', 87.54240603292614);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+007_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+007_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+010_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+017_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+017_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+000_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+000_+014_medium.glb', 292.1064767534969, 'testdraco/LOD_Tile_+000_+014_high.glb', 13.49611083798872);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+008_medium.glb', 337.77736883183627, 'testdraco/LOD_Tile_+011_+008_high.glb', 64.24154648058804);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+027_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+027_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+025_medium.glb', 305.7247773607585, 'testdraco/LOD_Tile_+016_+025_high.glb', 28.62755595716822);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+002_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+002_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+000_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+000_+013_medium.glb', 341.1518970093468, 'testdraco/LOD_Tile_+000_+013_high.glb', 67.99102223337746);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+029_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+029_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+003_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+004_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+013_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+013_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+019_medium.glb', 332.5212790962346, 'testdraco/LOD_Tile_+004_+019_high.glb', 58.40144677436389);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+014_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+014_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+028_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+028_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+005_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+005_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+002_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+002_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+024_medium.glb', 321.56997421124487, 'testdraco/LOD_Tile_+016_+024_high.glb', 46.23333023548644);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+012_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+012_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+000_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+000_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+000_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+003_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+023_medium.glb', 286.49147084006523, 'testdraco/LOD_Tile_+016_+023_high.glb', 7.257215378620175);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+015_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+015_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+026_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+026_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+015_medium.glb', 316.2912324200615, 'testdraco/LOD_Tile_+001_+015_high.glb', 40.368061578616036);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+002_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+002_medium.glb', 323.14966118906176, 'testdraco/LOD_Tile_+014_+002_high.glb', 47.988537988616336);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+004_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+004_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+003_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+003_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+001_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+021_medium.glb', 322.7669123213772, 'testdraco/LOD_Tile_+005_+021_high.glb', 47.56326146896684);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+028_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+028_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+009_medium.glb', 342.1405463782681, 'testdraco/LOD_Tile_+006_+009_high.glb', 69.0895215321789);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+026_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+026_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+026_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+012_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+011_medium.glb', 342.85745841019883, 'testdraco/LOD_Tile_+025_+011_high.glb', 69.8860904565464);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+020_medium.glb', 329.76976977720756, 'testdraco/LOD_Tile_+005_+020_high.glb', 55.34421419766719);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+015_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+003_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+029_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+029_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+002_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+002_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+014_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+014_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+001_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+026_medium.glb', 300.5458218378501, 'testdraco/LOD_Tile_+009_+026_high.glb', 22.873160931714477);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+027_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+027_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+013_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+013_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+001_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+011_medium.glb', 297.7647916237301, 'testdraco/LOD_Tile_+010_+011_high.glb', 19.783127360470058);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+010_medium.glb', 335.05507139409536, 'testdraco/LOD_Tile_+025_+010_high.glb', 61.21677154976477);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+005_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+005_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+004_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+003_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+027_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+027_medium.glb', 328.7093670664472, 'testdraco/LOD_Tile_+010_+027_high.glb', 54.16598896348907);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+025_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+012_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+012_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+009_medium.glb', 333.16531089358494, 'testdraco/LOD_Tile_+025_+009_high.glb', 59.11703766030876);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+015_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+015_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+026_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+024_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+002_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+002_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+010_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+010_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+010_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+014_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+014_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+013_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+013_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+005_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+005_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+003_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+006_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+006_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+006_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+008_medium.glb', 331.4925503006781, 'testdraco/LOD_Tile_+025_+008_high.glb', 57.258414779301134);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+004_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+003_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+007_medium.glb', 304.6230658858269, 'testdraco/LOD_Tile_+012_+007_high.glb', 27.4034320961332);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+028_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+028_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+005_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+005_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+010_medium.glb', 358.3040694353988, 'testdraco/LOD_Tile_+011_+010_high.glb', 87.04899159565745);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+002_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+002_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+024_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+024_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+012_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+015_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+023_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+023_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+010_medium.glb', 328.2347739212087, 'testdraco/LOD_Tile_+007_+010_high.glb', 53.63866324655741);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+002_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+002_medium.glb', 350.6132582360714, 'testdraco/LOD_Tile_+020_+002_high.glb', 78.50364581862705);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+026_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+022_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+022_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+027_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+027_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+011_medium.glb', 363.8904260742036, 'testdraco/LOD_Tile_+007_+011_high.glb', 93.25605452766284);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+025_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+025_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+006_medium.glb', 319.53219777666817, 'testdraco/LOD_Tile_+012_+006_high.glb', 43.96913419706789);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+029_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+029_medium.glb', 311.86747305267806, 'testdraco/LOD_Tile_+011_+029_high.glb', 35.45277339263447);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+003_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+003_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+003_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+007_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+007_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+007_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+011_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+013_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+013_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+004_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+004_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+004_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+026_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+026_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+026_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+009_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+009_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+000_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+000_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+000_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+025_medium.glb', 311.3342495758552, 'testdraco/LOD_Tile_+008_+025_high.glb', 34.8603028628313);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+021_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+021_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+007_medium.glb', 338.61236444413885, 'testdraco/LOD_Tile_+003_+007_high.glb', 65.16931938314643);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+014_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+014_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+011_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+011_+011_medium.glb', 331.63820832504416, 'testdraco/LOD_Tile_+011_+011_high.glb', 57.420257028596765);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+024_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+019_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+019_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+007_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+010_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+010_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+001_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+001_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+017_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+017_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+003_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+003_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+003_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+011_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+011_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+006_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+019_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+019_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+019_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+024_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+025_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+020_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+020_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+027_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+027_medium.glb', 364.29431719631555, 'testdraco/LOD_Tile_+016_+027_high.glb', 93.70482244112057);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+016_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+016_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+015_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+015_+008_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+015_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+008_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+008_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+008_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+000_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+000_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+000_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+004_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+004_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+004_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+012_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+012_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+012_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+023_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+023_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+023_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+026_+005_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+026_+005_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+026_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+024_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+024_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+024_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+020_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+020_+017_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+020_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+021_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+021_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+019_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+016_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+016_+018_medium.glb', 364.4365928630348, 'testdraco/LOD_Tile_+016_+018_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+000_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+000_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+000_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+025_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+001_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+024_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+001_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+001_medium.glb', 286.30050534569017, 'testdraco/LOD_Tile_+014_+001_high.glb', 7.04503149598125);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+022_medium.glb', 286.11994555537683, 'testdraco/LOD_Tile_+005_+022_high.glb', 6.8444095067441735);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+020_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+020_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+007_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+007_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+018_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+018_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+020_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+020_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+008_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+016_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+016_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+009_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+009_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+011_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+011_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+022_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+022_+006_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+022_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+018_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+018_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+025_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+025_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+025_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+011_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+011_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+021_+016_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+021_+016_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+021_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+008_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+008_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+008_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+014_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+014_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+010_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+002_+007_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+002_+007_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+002_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+025_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+025_medium.glb', 357.95781106769033, 'testdraco/LOD_Tile_+009_+025_high.glb', 86.66426007598139);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+013_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+013_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+024_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+024_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+005_+015_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+005_+015_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+005_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+012_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+012_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+013_+023_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+013_+023_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+013_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+001_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+001_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+017_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+017_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+017_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+018_+006_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+018_+006_medium.glb', 364.43664324572063, 'testdraco/LOD_Tile_+018_+006_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+001_+010_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+001_+010_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+001_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+014_+009_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+014_+009_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+014_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+009_+022_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+009_+022_medium.glb', 364.4366684370636, 'testdraco/LOD_Tile_+009_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('testdraco/LOD_Tile_+017_+019_low.glb', 2799.5997699930704, 'testdraco/LOD_Tile_+017_+019_medium.glb', 364.4366180543777, 'testdraco/LOD_Tile_+017_+019_high.glb', 93.86293450563403);


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
