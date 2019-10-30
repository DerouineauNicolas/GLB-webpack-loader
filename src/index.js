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
    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+020_medium.glb', 1439.049572239774, 'redbull_full/LOD_Tile_+022_+020_high.glb', 78.49937448647778);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+026_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+026_+014_medium.glb', 1444.784605385638, 'redbull_full/LOD_Tile_+026_+014_high.glb', 89.96944077820594);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+000_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+000_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+000_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+026_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+026_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+026_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+023_medium.glb', 1416.3598919879375, 'redbull_full/LOD_Tile_+006_+023_high.glb', 33.12001398280466);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+001_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+028_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+028_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+020_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+020_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+007_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+017_medium.glb', 1410.0096088071537, 'redbull_full/LOD_Tile_+002_+017_high.glb', 20.41944762123676);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+024_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+026_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+016_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+016_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+018_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+018_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+026_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+026_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+026_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+011_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+011_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+026_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+026_+015_medium.glb', 1416.731924271728, 'redbull_full/LOD_Tile_+026_+015_high.glb', 33.86407855038588);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+027_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+027_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+009_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+009_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+016_medium.glb', 1439.270012351812, 'redbull_full/LOD_Tile_+002_+016_high.glb', 78.94025471055373);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+025_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+010_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+010_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+008_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+029_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+029_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+021_medium.glb', 1439.8243161310188, 'redbull_full/LOD_Tile_+018_+021_high.glb', 80.04886226896745);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+003_medium.glb', 1427.357187681439, 'redbull_full/LOD_Tile_+013_+003_high.glb', 55.11460536980773);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+006_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+001_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+001_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+017_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+017_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+001_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+000_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+000_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+000_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+018_medium.glb', 1424.6599692519198, 'redbull_full/LOD_Tile_+003_+018_high.glb', 49.72016851076941);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+001_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+001_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+029_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+029_medium.glb', 1438.8885277163386, 'redbull_full/LOD_Tile_+015_+029_high.glb', 78.17728543960676);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+006_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+006_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+011_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+011_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+025_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+019_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+019_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+020_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+020_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+027_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+027_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+027_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+008_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+008_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+019_medium.glb', 1402.0512110577438, 'redbull_full/LOD_Tile_+023_+019_high.glb', 4.502652122417315);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+016_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+016_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+026_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+026_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+021_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+021_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+019_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+019_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+009_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+009_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+024_medium.glb', 1424.9872990311374, 'redbull_full/LOD_Tile_+007_+024_high.glb', 50.374828069204504);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+024_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+028_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+028_medium.glb', 1445.7426741436398, 'redbull_full/LOD_Tile_+015_+028_high.glb', 91.885578294209);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+018_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+018_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+000_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+000_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+000_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+000_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+000_medium.glb', 1443.5710880129982, 'redbull_full/LOD_Tile_+016_+000_high.glb', 87.54240603292614);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+007_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+007_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+010_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+000_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+000_+014_medium.glb', 1406.5479404155296, 'redbull_full/LOD_Tile_+000_+014_high.glb', 13.49611083798872);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+017_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+017_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+008_medium.glb', 1431.9206582368292, 'redbull_full/LOD_Tile_+011_+008_high.glb', 64.24154648058804);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+027_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+027_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+002_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+002_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+025_medium.glb', 1414.1136629751193, 'redbull_full/LOD_Tile_+016_+025_high.glb', 28.62755595716822);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+000_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+000_+013_medium.glb', 1433.795396113224, 'redbull_full/LOD_Tile_+000_+013_high.glb', 67.99102223337746);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+029_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+029_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+003_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+004_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+019_medium.glb', 1429.0006083837172, 'redbull_full/LOD_Tile_+004_+019_high.glb', 58.40144677436389);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+013_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+013_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+014_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+014_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+005_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+005_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+002_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+002_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+028_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+028_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+024_medium.glb', 1422.9165501142784, 'redbull_full/LOD_Tile_+016_+024_high.glb', 46.23333023548644);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+000_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+000_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+000_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+003_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+023_medium.glb', 1403.4284926858452, 'redbull_full/LOD_Tile_+016_+023_high.glb', 7.257215378620175);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+015_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+015_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+012_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+012_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+026_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+026_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+015_medium.glb', 1419.9839157858432, 'redbull_full/LOD_Tile_+001_+015_high.glb', 40.368061578616036);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+002_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+002_medium.glb', 1423.7941539908434, 'redbull_full/LOD_Tile_+014_+002_high.glb', 47.988537988616336);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+004_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+004_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+021_medium.glb', 1423.5815157310185, 'redbull_full/LOD_Tile_+005_+021_high.glb', 47.56326146896684);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+003_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+003_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+001_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+009_medium.glb', 1434.3446457626246, 'redbull_full/LOD_Tile_+006_+009_high.glb', 69.0895215321789);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+028_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+028_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+026_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+026_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+026_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+011_medium.glb', 1434.7429302248083, 'redbull_full/LOD_Tile_+025_+011_high.glb', 69.8860904565464);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+012_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+020_medium.glb', 1427.4719920953687, 'redbull_full/LOD_Tile_+005_+020_high.glb', 55.34421419766719);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+029_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+029_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+003_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+015_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+002_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+002_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+001_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+027_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+027_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+026_medium.glb', 1411.2364654623925, 'redbull_full/LOD_Tile_+009_+026_high.glb', 22.873160931714477);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+001_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+014_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+014_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+013_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+013_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+011_medium.glb', 1409.6914486767703, 'redbull_full/LOD_Tile_+010_+011_high.glb', 19.783127360470058);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+010_medium.glb', 1430.4082707714176, 'redbull_full/LOD_Tile_+025_+010_high.glb', 61.21677154976477);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+005_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+005_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+004_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+003_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+027_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+027_medium.glb', 1426.8828794782796, 'redbull_full/LOD_Tile_+010_+027_high.glb', 54.16598896348907);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+025_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+012_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+012_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+009_medium.glb', 1429.3584038266895, 'redbull_full/LOD_Tile_+025_+009_high.glb', 59.11703766030876);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+026_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+015_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+015_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+024_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+002_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+002_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+005_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+005_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+010_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+010_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+010_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+003_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+006_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+006_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+006_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+008_medium.glb', 1428.4290923861859, 'redbull_full/LOD_Tile_+025_+008_high.glb', 57.258414779301134);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+013_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+013_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+004_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+003_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+014_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+014_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+007_medium.glb', 1413.5016010446018, 'redbull_full/LOD_Tile_+012_+007_high.glb', 27.4034320961332);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+005_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+005_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+028_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+028_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+002_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+002_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+024_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+024_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+010_medium.glb', 1443.3243807943638, 'redbull_full/LOD_Tile_+011_+010_high.glb', 87.04899159565745);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+023_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+023_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+012_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+010_medium.glb', 1426.6192166198139, 'redbull_full/LOD_Tile_+007_+010_high.glb', 53.63866324655741);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+002_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+002_medium.glb', 1439.0517079058486, 'redbull_full/LOD_Tile_+020_+002_high.glb', 78.50364581862705);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+026_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+015_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+022_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+022_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+027_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+027_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+025_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+025_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+011_medium.glb', 1446.4279122603666, 'redbull_full/LOD_Tile_+007_+011_high.glb', 93.25605452766284);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+029_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+029_medium.glb', 1417.5262716928523, 'redbull_full/LOD_Tile_+011_+029_high.glb', 35.45277339263447);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+006_medium.glb', 1421.7844520950691, 'redbull_full/LOD_Tile_+012_+006_high.glb', 43.96913419706789);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+003_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+003_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+003_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+007_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+007_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+007_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+011_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+004_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+004_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+004_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+026_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+026_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+026_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+009_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+009_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+013_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+013_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+000_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+000_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+000_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+025_medium.glb', 1417.2300364279508, 'redbull_full/LOD_Tile_+008_+025_high.glb', 34.8603028628313);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+007_medium.glb', 1432.3845446881085, 'redbull_full/LOD_Tile_+003_+007_high.glb', 65.16931938314643);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+021_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+021_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+024_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+011_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+011_+011_medium.glb', 1428.5100135108335, 'redbull_full/LOD_Tile_+011_+011_high.glb', 57.420257028596765);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+014_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+014_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+019_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+019_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+007_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+010_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+010_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+001_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+001_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+003_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+003_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+003_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+017_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+017_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+011_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+011_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+006_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+024_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+025_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+027_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+027_medium.glb', 1446.6522962170955, 'redbull_full/LOD_Tile_+016_+027_high.glb', 93.70482244112057);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+019_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+019_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+019_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+020_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+020_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+015_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+015_+008_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+015_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+000_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+000_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+000_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+008_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+008_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+008_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+016_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+016_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+004_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+004_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+004_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+023_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+023_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+023_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+026_+005_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+026_+005_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+026_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+012_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+012_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+012_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+020_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+020_+017_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+020_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+021_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+021_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+024_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+024_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+024_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+019_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+000_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+000_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+000_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+025_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+001_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+016_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+016_+018_medium.glb', 1446.7313382541618, 'redbull_full/LOD_Tile_+016_+018_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+001_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+001_medium.glb', 1403.3224007445258, 'redbull_full/LOD_Tile_+014_+001_high.glb', 7.04503149598125);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+007_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+007_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+022_medium.glb', 1403.2220897499074, 'redbull_full/LOD_Tile_+005_+022_high.glb', 6.8444095067441735);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+020_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+020_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+024_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+020_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+020_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+018_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+018_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+008_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+009_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+009_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+011_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+011_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+016_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+016_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+022_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+022_+006_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+022_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+025_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+025_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+025_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+018_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+018_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+011_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+011_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+021_+016_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+021_+016_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+021_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+014_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+014_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+008_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+008_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+008_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+002_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+002_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+002_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+010_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+007_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+007_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+025_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+025_medium.glb', 1443.132015034526, 'redbull_full/LOD_Tile_+009_+025_high.glb', 86.66426007598139);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+013_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+013_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+024_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+024_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+005_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+005_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+005_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+023_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+023_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+001_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+001_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+018_+006_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+018_+006_medium.glb', 1446.7313662445426, 'redbull_full/LOD_Tile_+018_+006_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+015_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+015_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+017_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+017_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+017_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+013_+012_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+013_+012_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+013_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+001_+010_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+001_+010_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+001_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+017_+019_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+017_+019_medium.glb', 1446.7313522493523, 'redbull_full/LOD_Tile_+017_+019_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+014_+009_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+014_+009_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+014_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbull_full/LOD_Tile_+009_+022_low.glb', 2799.5997699930704, 'redbull_full/LOD_Tile_+009_+022_medium.glb', 1446.7313802397332, 'redbull_full/LOD_Tile_+009_+022_high.glb', 93.86299048639616);


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
