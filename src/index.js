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

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+020_intermediate_698.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+020_intermediate_1396.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+020_high.glb', 78.49937448647778);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+026_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+026_+014_intermediate_2122.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+026_+014_intermediate_4244.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+026_+014_high.glb', 89.96944077820594);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+026_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+026_+013_intermediate_2178.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+026_+013_intermediate_4356.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+026_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+006_intermediate_2596.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+006_intermediate_5192.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+018_intermediate_2972.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+018_intermediate_5944.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+008_intermediate_2562.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+008_intermediate_5124.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+016_intermediate_3504.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+016_intermediate_7008.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+000_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+000_intermediate_2756.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+000_intermediate_5512.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+000_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+023_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+006_+023_intermediate_248.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+023_intermediate_496.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+023_intermediate_992.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+006_+023_high.glb', 33.12001398280466);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+001_+009_intermediate_2380.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+009_intermediate_4760.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+015_intermediate_2722.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+015_intermediate_5444.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+011_intermediate_4732.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+011_intermediate_9464.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+005_intermediate_2752.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+005_intermediate_5504.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+012_intermediate_1344.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+012_intermediate_2688.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+010_intermediate_2902.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+010_intermediate_5804.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+020_intermediate_2668.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+020_intermediate_5336.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+020_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+028_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+028_intermediate_2450.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+028_intermediate_4900.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+007_low.glb', 2799.5997699930704, 2, 'redbullnew/LOD_Tile_+017_+007_intermediate_3360.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+024_intermediate_2486.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+024_intermediate_4972.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+017_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+002_+017_intermediate_90.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+017_intermediate_180.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+017_intermediate_360.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+002_+017_high.glb', 20.41944762123676);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+012_intermediate_2458.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+012_intermediate_4916.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+018_intermediate_3368.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+018_intermediate_6736.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+018_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+021_intermediate_2570.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+021_intermediate_5140.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+016_intermediate_3338.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+016_intermediate_6676.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+016_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+019_intermediate_2896.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+019_intermediate_5792.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+015_intermediate_2438.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+015_intermediate_4876.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+023_intermediate_2536.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+023_intermediate_5072.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+010_intermediate_2422.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+010_intermediate_4844.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+011_intermediate_3106.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+011_intermediate_6212.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+011_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+026_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+026_intermediate_2596.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+026_intermediate_5192.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+026_+012_low.glb', 2799.5997699930704, 1, 'redbullnew/LOD_Tile_+026_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+007_low.glb', 2799.5997699930704, 1, 'redbullnew/LOD_Tile_+021_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+005_low.glb', 2799.5997699930704, 1, 'redbullnew/LOD_Tile_+025_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+026_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+026_+015_intermediate_126.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+026_+015_intermediate_252.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+026_+015_high.glb', 33.86407855038588);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+017_intermediate_3180.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+017_intermediate_6360.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+021_intermediate_2268.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+021_intermediate_4536.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+019_intermediate_3222.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+019_intermediate_6444.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+017_intermediate_3066.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+017_intermediate_6132.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+009_intermediate_3574.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+009_intermediate_7148.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+009_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+009_intermediate_2992.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+009_intermediate_5984.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+010_intermediate_3070.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+010_intermediate_6140.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+027_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+027_intermediate_2490.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+027_intermediate_4980.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+014_intermediate_2464.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+014_intermediate_4928.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+010_intermediate_3504.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+010_intermediate_7008.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+010_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+025_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+025_intermediate_2480.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+025_intermediate_4960.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+022_intermediate_2544.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+022_intermediate_5088.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+011_intermediate_2534.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+011_intermediate_5068.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+008_intermediate_3320.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+008_intermediate_6640.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+016_intermediate_1248.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+016_intermediate_2496.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+016_high.glb', 78.94025471055373);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+013_intermediate_2614.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+013_intermediate_5228.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+018_intermediate_2956.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+018_intermediate_5912.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+029_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+029_intermediate_2184.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+029_intermediate_4368.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+021_intermediate_1320.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+021_intermediate_2640.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+021_high.glb', 80.04886226896745);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+020_intermediate_2598.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+020_intermediate_5196.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+003_intermediate_374.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+003_intermediate_748.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+003_high.glb', 55.11460536980773);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+006_intermediate_3318.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+006_intermediate_6636.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+017_intermediate_3224.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+017_intermediate_6448.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+017_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+022_intermediate_1688.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+022_intermediate_3376.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+001_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+001_intermediate_3102.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+001_intermediate_6204.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+013_intermediate_2974.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+013_intermediate_5948.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+004_intermediate_2606.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+004_intermediate_5212.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+001_+008_intermediate_1676.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+008_intermediate_3352.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+014_intermediate_2700.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+014_intermediate_5400.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+000_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+000_+008_intermediate_1146.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+000_+008_intermediate_2292.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+000_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+018_intermediate_376.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+018_intermediate_752.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+018_high.glb', 49.72016851076941);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+011_intermediate_3154.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+011_intermediate_6308.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+022_intermediate_2592.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+022_intermediate_5184.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+019_intermediate_2316.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+019_intermediate_4632.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+011_intermediate_3374.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+011_intermediate_6748.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+011_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+001_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+001_intermediate_2812.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+001_intermediate_5624.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+019_intermediate_2974.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+019_intermediate_5948.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+019_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+029_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+029_intermediate_716.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+029_intermediate_1432.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+029_high.glb', 78.17728543960676);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+016_intermediate_3254.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+016_intermediate_6508.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+006_intermediate_3066.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+006_intermediate_6132.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+006_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+025_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+025_intermediate_2372.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+025_intermediate_4744.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+014_intermediate_2874.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+014_intermediate_5748.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+016_intermediate_2858.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+016_intermediate_5716.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+020_intermediate_2728.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+020_intermediate_5456.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+020_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+027_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+027_intermediate_2432.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+027_intermediate_4864.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+027_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+013_intermediate_2908.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+013_intermediate_5816.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+013_intermediate_2676.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+013_intermediate_5352.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+017_intermediate_3148.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+017_intermediate_6296.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+011_intermediate_2688.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+011_intermediate_5376.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+008_intermediate_3132.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+008_intermediate_6264.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+008_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+016_intermediate_2946.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+016_intermediate_5892.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+016_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+010_intermediate_3400.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+010_intermediate_6800.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+019_low.glb', 2799.5997699930704, 5, 'redbullnew/LOD_Tile_+023_+019_intermediate_12.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+019_intermediate_24.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+019_intermediate_48.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+023_+019_intermediate_96.glb', 10.935936601535431, 'redbullnew/LOD_Tile_+023_+019_high.glb', 4.502652122417315);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+005_intermediate_2270.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+005_intermediate_4540.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+022_intermediate_2470.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+022_intermediate_4940.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+014_intermediate_2738.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+014_intermediate_5476.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+010_intermediate_2708.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+010_intermediate_5416.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+007_intermediate_2400.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+007_intermediate_4800.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+017_intermediate_2674.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+017_intermediate_5348.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+026_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+026_intermediate_2534.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+026_intermediate_5068.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+026_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+010_intermediate_2382.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+010_intermediate_4764.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+009_intermediate_4638.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+009_intermediate_9276.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+018_intermediate_3258.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+018_intermediate_6516.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+018_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+009_intermediate_3162.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+009_intermediate_6324.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+009_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+023_intermediate_2476.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+023_intermediate_4952.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+019_intermediate_3056.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+019_intermediate_6112.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+019_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+021_intermediate_2416.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+021_intermediate_4832.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+021_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+015_intermediate_2460.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+015_intermediate_4920.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+011_intermediate_3232.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+011_intermediate_6464.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+017_intermediate_2090.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+017_intermediate_4180.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+024_intermediate_2454.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+024_intermediate_4908.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+024_intermediate_458.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+024_intermediate_916.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+024_high.glb', 50.374828069204504);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+012_intermediate_2506.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+012_intermediate_5012.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+028_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+028_intermediate_1924.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+028_intermediate_3848.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+028_high.glb', 91.885578294209);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+016_intermediate_3482.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+016_intermediate_6964.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+000_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+000_+009_intermediate_2384.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+000_+009_intermediate_4768.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+000_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+000_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+000_intermediate_1076.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+000_intermediate_2152.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+000_high.glb', 87.54240603292614);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+012_intermediate_940.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+012_intermediate_1880.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+010_intermediate_3236.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+010_intermediate_6472.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+023_intermediate_2168.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+023_intermediate_4336.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+006_intermediate_2574.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+006_intermediate_5148.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+017_intermediate_3056.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+017_intermediate_6112.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+017_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+016_intermediate_2540.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+016_intermediate_5080.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+015_intermediate_2778.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+015_intermediate_5556.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+007_intermediate_3242.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+007_intermediate_6484.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+007_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+004_intermediate_1266.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+004_intermediate_2532.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+018_intermediate_1526.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+018_intermediate_3052.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+017_intermediate_1512.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+017_intermediate_3024.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+005_intermediate_2264.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+005_intermediate_4528.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+008_intermediate_2732.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+008_intermediate_5464.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+000_+014_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+000_+014_intermediate_34.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+000_+014_intermediate_68.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+000_+014_intermediate_136.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+000_+014_high.glb', 13.49611083798872);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+018_intermediate_3170.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+018_intermediate_6340.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+010_intermediate_2554.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+010_intermediate_5108.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+012_intermediate_3158.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+012_intermediate_6316.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+008_intermediate_234.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+008_intermediate_468.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+008_high.glb', 64.24154648058804);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+011_intermediate_4444.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+011_intermediate_8888.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+005_intermediate_3274.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+005_intermediate_6548.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+019_intermediate_2572.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+019_intermediate_5144.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+027_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+027_intermediate_2562.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+027_intermediate_5124.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+015_intermediate_3476.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+015_intermediate_6952.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+002_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+002_intermediate_2296.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+002_intermediate_4592.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+018_intermediate_2698.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+018_intermediate_5396.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+025_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+016_+025_intermediate_124.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+025_intermediate_248.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+025_intermediate_496.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+016_+025_high.glb', 28.62755595716822);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+000_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+000_+013_intermediate_884.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+000_+013_intermediate_1768.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+000_+013_high.glb', 67.99102223337746);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+011_intermediate_2600.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+011_intermediate_5200.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+029_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+029_intermediate_2364.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+029_intermediate_4728.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+021_intermediate_2638.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+021_intermediate_5276.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+016_intermediate_2846.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+016_intermediate_5692.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+017_intermediate_2470.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+017_intermediate_4940.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+003_intermediate_3048.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+003_intermediate_6096.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+004_intermediate_3152.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+004_intermediate_6304.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+018_intermediate_2472.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+018_intermediate_4944.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+004_intermediate_1756.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+004_intermediate_3512.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+013_intermediate_3334.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+013_intermediate_6668.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+013_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+020_intermediate_2530.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+020_intermediate_5060.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+016_intermediate_2842.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+016_intermediate_5684.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+011_intermediate_2582.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+011_intermediate_5164.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+014_intermediate_3060.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+014_intermediate_6120.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+014_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+019_intermediate_488.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+019_intermediate_976.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+019_high.glb', 58.40144677436389);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+016_intermediate_3548.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+016_intermediate_7096.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+014_intermediate_3332.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+014_intermediate_6664.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+013_intermediate_2862.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+013_intermediate_5724.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+005_intermediate_3306.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+005_intermediate_6612.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+005_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+016_intermediate_2602.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+016_intermediate_5204.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+028_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+028_intermediate_2506.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+028_intermediate_5012.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+010_intermediate_2730.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+010_intermediate_5460.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+002_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+002_intermediate_2926.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+002_intermediate_5852.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+015_intermediate_3168.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+015_intermediate_6336.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+015_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+024_intermediate_552.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+024_intermediate_1104.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+024_high.glb', 46.23333023548644);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+011_intermediate_3104.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+011_intermediate_6208.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+012_intermediate_3544.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+012_intermediate_7088.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+012_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+000_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+000_+012_intermediate_2226.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+000_+012_intermediate_4452.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+000_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+003_intermediate_2470.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+003_intermediate_4940.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+020_intermediate_2634.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+020_intermediate_5268.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+017_intermediate_2752.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+017_intermediate_5504.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+023_low.glb', 2799.5997699930704, 5, 'redbullnew/LOD_Tile_+016_+023_intermediate_6.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+023_intermediate_12.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+023_intermediate_24.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+016_+023_intermediate_48.glb', 10.935936601535431, 'redbullnew/LOD_Tile_+016_+023_high.glb', 7.257215378620175);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+004_intermediate_3180.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+004_intermediate_6360.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+017_intermediate_2622.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+017_intermediate_5244.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+019_intermediate_2758.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+019_intermediate_5516.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+026_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+026_intermediate_2732.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+026_intermediate_5464.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+010_intermediate_2480.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+010_intermediate_4960.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+018_intermediate_2576.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+018_intermediate_5152.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+021_intermediate_2560.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+021_intermediate_5120.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+026_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+026_intermediate_2606.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+026_intermediate_5212.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+010_intermediate_2430.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+010_intermediate_4860.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+018_intermediate_2328.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+018_intermediate_4656.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+015_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+001_+015_intermediate_490.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+015_intermediate_980.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+015_intermediate_1960.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+001_+015_high.glb', 40.368061578616036);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+009_intermediate_2972.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+009_intermediate_5944.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+019_intermediate_2728.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+019_intermediate_5456.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+004_intermediate_4256.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+004_intermediate_8512.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+004_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+002_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+002_intermediate_894.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+002_intermediate_1788.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+002_high.glb', 47.988537988616336);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+017_intermediate_2522.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+017_intermediate_5044.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+001_+012_intermediate_2498.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+012_intermediate_4996.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+020_intermediate_2644.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+020_intermediate_5288.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+021_intermediate_796.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+021_intermediate_1592.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+021_high.glb', 47.56326146896684);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+003_intermediate_4548.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+003_intermediate_9096.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+003_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+021_intermediate_2608.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+021_intermediate_5216.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+009_intermediate_720.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+009_intermediate_1440.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+009_high.glb', 69.0895215321789);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+028_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+028_intermediate_2492.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+028_intermediate_4984.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+016_intermediate_2570.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+016_intermediate_5140.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+005_intermediate_2982.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+005_intermediate_5964.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+019_intermediate_2206.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+019_intermediate_4412.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+017_intermediate_2872.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+017_intermediate_5744.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+010_intermediate_2776.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+010_intermediate_5552.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+011_intermediate_1286.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+011_intermediate_2572.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+012_intermediate_3424.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+012_intermediate_6848.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+026_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+026_+006_intermediate_3956.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+026_+006_intermediate_7912.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+026_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+016_intermediate_1816.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+016_intermediate_3632.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+011_intermediate_1478.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+011_intermediate_2956.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+011_high.glb', 69.8860904565464);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+004_intermediate_2210.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+004_intermediate_4420.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+013_intermediate_3334.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+013_intermediate_6668.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+014_intermediate_3214.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+014_intermediate_6428.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+004_intermediate_3024.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+004_intermediate_6048.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+015_intermediate_3560.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+015_intermediate_7120.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+020_intermediate_1098.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+020_intermediate_2196.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+020_high.glb', 55.34421419766719);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+018_intermediate_2498.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+018_intermediate_4996.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+003_intermediate_2206.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+003_intermediate_4412.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+029_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+029_intermediate_2398.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+029_intermediate_4796.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+011_intermediate_3056.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+011_intermediate_6112.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+017_intermediate_2470.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+017_intermediate_4940.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+002_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+002_intermediate_3826.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+002_intermediate_7652.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+016_intermediate_2540.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+016_intermediate_5080.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+014_intermediate_3364.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+014_intermediate_6728.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+014_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+001_+013_intermediate_2438.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+013_intermediate_4876.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+013_intermediate_3276.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+013_intermediate_6552.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+013_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+027_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+027_intermediate_2580.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+027_intermediate_5160.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+020_intermediate_2588.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+020_intermediate_5176.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+019_intermediate_2622.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+019_intermediate_5244.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+016_intermediate_3390.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+016_intermediate_6780.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+021_intermediate_2614.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+021_intermediate_5228.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+026_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+009_+026_intermediate_104.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+026_intermediate_208.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+026_intermediate_416.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+009_+026_high.glb', 22.873160931714477);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+011_intermediate_2574.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+011_intermediate_5148.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+001_+014_intermediate_1908.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+014_intermediate_3816.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+005_intermediate_2274.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+005_intermediate_4548.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+011_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+010_+011_intermediate_96.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+011_intermediate_192.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+011_intermediate_384.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+010_+011_high.glb', 19.783127360470058);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+010_intermediate_1332.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+010_intermediate_2664.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+010_high.glb', 61.21677154976477);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+018_intermediate_2726.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+018_intermediate_5452.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+005_intermediate_4374.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+005_intermediate_8748.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+005_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+015_intermediate_3714.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+015_intermediate_7428.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+004_intermediate_3194.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+004_intermediate_6388.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+012_intermediate_3074.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+012_intermediate_6148.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+018_intermediate_2604.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+018_intermediate_5208.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+003_intermediate_3124.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+003_intermediate_6248.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+020_intermediate_2552.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+020_intermediate_5104.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+016_intermediate_2692.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+016_intermediate_5384.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+016_intermediate_2470.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+016_intermediate_4940.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+006_intermediate_2866.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+006_intermediate_5732.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+025_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+025_intermediate_2538.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+025_intermediate_5076.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+027_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+027_intermediate_670.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+027_intermediate_1340.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+027_high.glb', 54.16598896348907);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+012_intermediate_3224.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+012_intermediate_6448.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+012_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+013_intermediate_2548.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+013_intermediate_5096.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+020_intermediate_2600.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+020_intermediate_5200.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+014_intermediate_3256.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+014_intermediate_6512.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+013_intermediate_3336.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+013_intermediate_6672.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+011_intermediate_2548.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+011_intermediate_5096.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+009_intermediate_726.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+009_intermediate_1452.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+009_high.glb', 59.11703766030876);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+014_intermediate_2336.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+014_intermediate_4672.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+008_intermediate_3404.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+008_intermediate_6808.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+018_intermediate_2604.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+018_intermediate_5208.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+022_intermediate_2652.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+022_intermediate_5304.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+005_intermediate_2578.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+005_intermediate_5156.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+007_intermediate_3070.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+007_intermediate_6140.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+015_intermediate_3556.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+015_intermediate_7112.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+015_intermediate_3282.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+015_intermediate_6564.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+015_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+026_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+026_intermediate_2158.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+026_intermediate_4316.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+010_intermediate_2328.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+010_intermediate_4656.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+012_intermediate_3320.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+012_intermediate_6640.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+023_intermediate_2502.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+023_intermediate_5004.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+015_intermediate_2436.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+015_intermediate_4872.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+019_intermediate_2426.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+019_intermediate_4852.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+009_intermediate_2922.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+009_intermediate_5844.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+017_intermediate_2696.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+017_intermediate_5392.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+024_intermediate_2494.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+024_intermediate_4988.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+021_intermediate_2500.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+021_intermediate_5000.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+021_intermediate_2538.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+021_intermediate_5076.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+012_intermediate_2588.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+012_intermediate_5176.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+010_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+010_+017_intermediate_2666.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+010_+017_intermediate_5332.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+010_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+002_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+002_intermediate_3126.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+002_intermediate_6252.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+013_intermediate_3564.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+013_intermediate_7128.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+013_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+014_intermediate_3762.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+014_intermediate_7524.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+014_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+009_intermediate_2310.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+009_intermediate_4620.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+007_intermediate_3122.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+007_intermediate_6244.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+006_intermediate_2270.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+006_intermediate_4540.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+005_intermediate_3102.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+005_intermediate_6204.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+005_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+006_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+006_+019_intermediate_2552.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+006_+019_intermediate_5104.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+006_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+003_intermediate_1994.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+003_intermediate_3988.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+008_intermediate_1370.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+008_intermediate_2740.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+008_high.glb', 57.258414779301134);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+004_intermediate_2390.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+004_intermediate_4780.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+012_intermediate_3516.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+012_intermediate_7032.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+013_intermediate_3244.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+013_intermediate_6488.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+004_intermediate_2354.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+004_intermediate_4708.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+014_intermediate_3270.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+014_intermediate_6540.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+008_intermediate_2932.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+008_intermediate_5864.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+003_intermediate_2290.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+003_intermediate_4580.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+006_intermediate_2246.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+006_intermediate_4492.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+014_intermediate_3486.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+014_intermediate_6972.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+005_intermediate_3220.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+005_intermediate_6440.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+005_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+019_intermediate_2628.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+019_intermediate_5256.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+013_intermediate_3348.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+013_intermediate_6696.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+009_intermediate_2450.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+009_intermediate_4900.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+007_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+012_+007_intermediate_274.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+007_intermediate_548.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+007_intermediate_1096.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+012_+007_high.glb', 27.4034320961332);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+010_intermediate_1216.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+010_intermediate_2432.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+010_high.glb', 87.04899159565745);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+028_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+028_intermediate_1752.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+028_intermediate_3504.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+028_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+015_intermediate_3512.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+015_intermediate_7024.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+002_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+002_intermediate_2946.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+002_intermediate_5892.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+021_intermediate_2630.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+021_intermediate_5260.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+024_intermediate_2292.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+024_intermediate_4584.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+024_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+015_intermediate_2932.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+015_intermediate_5864.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+012_intermediate_3520.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+012_intermediate_7040.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+017_intermediate_2824.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+017_intermediate_5648.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+012_intermediate_2650.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+012_intermediate_5300.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+023_intermediate_1834.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+023_intermediate_3668.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+023_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+010_intermediate_434.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+010_intermediate_868.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+010_high.glb', 53.63866324655741);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+017_intermediate_2458.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+017_intermediate_4916.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+013_intermediate_3184.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+013_intermediate_6368.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+026_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+026_intermediate_2398.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+026_intermediate_4796.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+019_intermediate_2534.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+019_intermediate_5068.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+002_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+002_intermediate_1350.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+002_intermediate_2700.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+002_high.glb', 78.50364581862705);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+015_intermediate_2746.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+015_intermediate_5492.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+021_intermediate_2510.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+021_intermediate_5020.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+007_intermediate_2680.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+007_intermediate_5360.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+005_intermediate_2446.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+005_intermediate_4892.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+015_intermediate_3172.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+015_intermediate_6344.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+009_intermediate_2926.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+009_intermediate_5852.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+009_intermediate_3326.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+009_intermediate_6652.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+012_intermediate_3750.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+012_intermediate_7500.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+022_intermediate_2108.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+022_intermediate_4216.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+022_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+014_intermediate_3732.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+014_intermediate_7464.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+018_intermediate_2542.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+018_intermediate_5084.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+027_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+027_intermediate_2476.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+027_intermediate_4952.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+014_intermediate_2616.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+014_intermediate_5232.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+011_intermediate_1902.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+011_intermediate_3804.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+011_high.glb', 93.25605452766284);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+025_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+025_intermediate_2348.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+025_intermediate_4696.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+025_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+008_intermediate_2278.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+008_intermediate_4556.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+016_intermediate_2448.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+016_intermediate_4896.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+013_intermediate_2628.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+013_intermediate_5256.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+029_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+011_+029_intermediate_280.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+029_intermediate_560.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+029_intermediate_1120.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+011_+029_high.glb', 35.45277339263447);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+006_intermediate_896.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+006_intermediate_1792.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+006_high.glb', 43.96913419706789);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+012_intermediate_2954.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+012_intermediate_5908.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+015_intermediate_3778.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+015_intermediate_7556.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+003_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+003_intermediate_3050.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+003_intermediate_6100.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+003_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+020_intermediate_2676.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+020_intermediate_5352.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+020_intermediate_2632.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+020_intermediate_5264.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+007_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+007_+018_intermediate_2566.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+007_+018_intermediate_5132.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+007_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+013_intermediate_3572.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+013_intermediate_7144.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+013_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+016_intermediate_2832.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+016_intermediate_5664.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+008_intermediate_2132.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+008_intermediate_4264.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+004_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+004_intermediate_3022.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+004_intermediate_6044.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+004_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+026_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+026_intermediate_1582.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+026_intermediate_3164.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+026_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+000_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+000_+010_intermediate_2374.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+000_+010_intermediate_4748.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+000_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+009_intermediate_3458.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+009_intermediate_6916.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+009_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+022_intermediate_2496.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+022_intermediate_4992.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+023_intermediate_2446.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+023_intermediate_4892.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+025_low.glb', 2799.5997699930704, 4, 'redbullnew/LOD_Tile_+008_+025_intermediate_68.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+025_intermediate_136.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+025_intermediate_272.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+008_+025_high.glb', 34.8603028628313);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+015_intermediate_2766.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+015_intermediate_5532.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+007_intermediate_602.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+007_intermediate_1204.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+007_high.glb', 65.16931938314643);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+014_intermediate_3138.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+014_intermediate_6276.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+014_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+021_intermediate_1866.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+021_intermediate_3732.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+021_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+011_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+011_+011_intermediate_1262.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+011_+011_intermediate_2524.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+011_+011_high.glb', 57.420257028596765);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+006_intermediate_3958.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+006_intermediate_7916.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+012_intermediate_2616.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+012_intermediate_5232.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+024_intermediate_2424.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+024_intermediate_4848.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+019_intermediate_3162.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+019_intermediate_6324.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+019_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+007_intermediate_3310.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+007_intermediate_6620.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+013_intermediate_2758.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+013_intermediate_5516.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+009_intermediate_2432.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+009_intermediate_4864.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+010_intermediate_3168.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+010_intermediate_6336.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+010_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+006_intermediate_2310.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+006_intermediate_4620.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+014_intermediate_2796.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+014_intermediate_5592.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+012_intermediate_1812.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+012_intermediate_3624.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+013_intermediate_3230.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+013_intermediate_6460.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+008_intermediate_4564.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+008_intermediate_9128.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+015_intermediate_2960.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+015_intermediate_5920.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+014_intermediate_3140.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+014_intermediate_6280.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+017_intermediate_3304.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+017_intermediate_6608.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+017_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+008_intermediate_3204.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+008_intermediate_6408.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+011_intermediate_3298.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+011_intermediate_6596.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+016_intermediate_3424.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+016_intermediate_6848.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+018_intermediate_3356.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+018_intermediate_6712.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+001_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+001_intermediate_1352.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+001_intermediate_2704.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+003_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+003_+008_intermediate_2352.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+003_+008_intermediate_4704.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+003_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+015_intermediate_2882.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+015_intermediate_5764.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+011_intermediate_3450.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+011_intermediate_6900.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+011_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+012_intermediate_1632.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+012_intermediate_3264.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+006_intermediate_3090.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+006_intermediate_6180.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+009_intermediate_3806.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+009_intermediate_7612.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+014_intermediate_2992.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+014_intermediate_5984.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+024_intermediate_2194.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+024_intermediate_4388.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+019_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+019_+007_intermediate_4150.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+019_+007_intermediate_8300.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+019_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+025_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+025_intermediate_2510.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+025_intermediate_5020.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+016_intermediate_3668.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+016_intermediate_7336.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+016_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+020_intermediate_2930.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+020_intermediate_5860.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+020_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+013_intermediate_2634.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+013_intermediate_5268.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+027_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+027_intermediate_1000.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+027_intermediate_2000.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+027_high.glb', 93.70482244112057);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+015_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+015_+008_intermediate_3668.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+015_+008_intermediate_7336.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+015_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+008_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+008_+023_intermediate_2508.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+008_+023_intermediate_5016.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+008_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+013_intermediate_3096.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+013_intermediate_6192.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+000_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+000_+011_intermediate_2322.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+000_+011_intermediate_4644.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+000_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+019_intermediate_1746.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+019_intermediate_3492.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+009_intermediate_2964.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+009_intermediate_5928.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+015_intermediate_3132.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+015_intermediate_6264.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+004_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+004_+014_intermediate_2612.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+004_+014_intermediate_5224.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+004_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+012_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+012_+022_intermediate_2464.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+012_+022_intermediate_4928.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+012_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+023_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+023_+007_intermediate_2620.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+023_+007_intermediate_5240.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+023_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+007_intermediate_2894.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+007_intermediate_5788.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+010_intermediate_3340.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+010_intermediate_6680.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+012_intermediate_3658.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+012_intermediate_7316.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+017_intermediate_3076.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+017_intermediate_6152.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+024_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+024_+012_intermediate_4578.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+024_+012_intermediate_9156.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+024_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+020_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+020_+017_intermediate_3046.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+020_+017_intermediate_6092.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+020_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+026_+005_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+026_+005_intermediate_1630.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+026_+005_intermediate_3260.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+026_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+015_intermediate_1706.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+015_intermediate_3412.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+021_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+021_intermediate_3072.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+021_intermediate_6144.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+019_intermediate_1750.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+019_intermediate_3500.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+009_intermediate_2592.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+009_intermediate_5184.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+016_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+016_+018_intermediate_3374.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+016_+018_intermediate_6748.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+016_+018_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+014_intermediate_2462.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+014_intermediate_4924.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+010_intermediate_4904.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+010_intermediate_9808.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+000_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+000_intermediate_1952.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+000_intermediate_3904.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+000_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+022_intermediate_2554.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+022_intermediate_5108.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+001_+011_intermediate_2542.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+011_intermediate_5084.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+023_intermediate_2532.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+023_intermediate_5064.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+008_intermediate_3698.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+008_intermediate_7396.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+025_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+025_intermediate_2624.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+025_intermediate_5248.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+013_intermediate_2494.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+013_intermediate_4988.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+020_intermediate_1714.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+020_intermediate_3428.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+020_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+007_intermediate_3402.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+007_intermediate_6804.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+007_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+024_intermediate_2482.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+024_intermediate_4964.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+018_intermediate_3330.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+018_intermediate_6660.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+018_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+006_intermediate_3032.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+006_intermediate_6064.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+001_low.glb', 2799.5997699930704, 5, 'redbullnew/LOD_Tile_+014_+001_intermediate_6.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+001_intermediate_12.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+001_intermediate_24.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+014_+001_intermediate_48.glb', 10.935936601535431, 'redbullnew/LOD_Tile_+014_+001_high.glb', 7.04503149598125);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+022_low.glb', 2799.5997699930704, 5, 'redbullnew/LOD_Tile_+005_+022_intermediate_6.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+022_intermediate_12.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+022_intermediate_24.glb', 43.743746406141724, 'redbullnew/LOD_Tile_+005_+022_intermediate_48.glb', 10.935936601535431, 'redbullnew/LOD_Tile_+005_+022_high.glb', 6.8444095067441735);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+012_intermediate_2708.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+012_intermediate_5416.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+008_intermediate_2456.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+008_intermediate_4912.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+015_intermediate_2548.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+015_intermediate_5096.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+020_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+020_intermediate_2434.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+020_intermediate_4868.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+009_intermediate_3480.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+009_intermediate_6960.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+009_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+016_intermediate_3046.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+016_intermediate_6092.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+016_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+011_intermediate_3576.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+011_intermediate_7152.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+011_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+013_intermediate_3798.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+013_intermediate_7596.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+014_intermediate_2770.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+014_intermediate_5540.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+008_intermediate_3152.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+008_intermediate_6304.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+022_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+022_+006_intermediate_2464.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+022_+006_intermediate_4928.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+022_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+025_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+025_+013_intermediate_2994.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+025_+013_intermediate_5988.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+025_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+018_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+018_intermediate_3140.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+018_intermediate_6280.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+014_intermediate_3654.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+014_intermediate_7308.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+011_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+011_intermediate_3130.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+011_intermediate_6260.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+021_+016_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+021_+016_intermediate_3440.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+021_+016_intermediate_6880.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+021_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+009_intermediate_2408.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+009_intermediate_4816.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+014_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+014_intermediate_2610.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+014_intermediate_5220.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+008_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+008_intermediate_3582.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+008_intermediate_7164.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+008_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+010_intermediate_3400.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+010_intermediate_6800.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+007_intermediate_3312.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+007_intermediate_6624.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+002_+007_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+002_+007_intermediate_974.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+002_+007_intermediate_1948.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+002_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+013_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+013_intermediate_2810.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+013_intermediate_5620.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+025_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+025_intermediate_1366.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+025_intermediate_2732.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+025_high.glb', 86.66426007598139);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+015_intermediate_3270.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+015_intermediate_6540.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+012_intermediate_2678.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+012_intermediate_5356.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+024_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+024_intermediate_2508.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+024_intermediate_5016.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+012_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+012_intermediate_3046.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+012_intermediate_6092.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+017_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+017_intermediate_3272.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+017_intermediate_6544.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+017_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+013_+023_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+013_+023_intermediate_2506.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+013_+023_intermediate_5012.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+013_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+006_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+006_intermediate_3780.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+006_intermediate_7560.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+006_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+005_+015_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+005_+015_intermediate_2576.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+005_+015_intermediate_5152.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+005_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+018_+001_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+018_+001_intermediate_3424.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+018_+001_intermediate_6848.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+018_+001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+001_+010_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+001_+010_intermediate_2470.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+001_+010_intermediate_4940.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+001_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+014_+009_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+014_+009_intermediate_3590.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+014_+009_intermediate_7180.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+014_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+017_+019_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+017_+019_intermediate_2358.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+017_+019_intermediate_4716.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+017_+019_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('redbullnew/LOD_Tile_+009_+022_low.glb', 2799.5997699930704, 3, 'redbullnew/LOD_Tile_+009_+022_intermediate_2602.glb', 699.8999424982676, 'redbullnew/LOD_Tile_+009_+022_intermediate_5204.glb', 174.9749856245669, 'redbullnew/LOD_Tile_+009_+022_high.glb', 93.86299048639616);





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
