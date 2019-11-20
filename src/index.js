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


    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+008_medium.glb', 280.02839836618506, 'test_tiling/LOD_Tile_+021_+008_high.glb', 0.07602374097558182);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+008.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+008.005_medium.glb', 279.98560331277974, 'test_tiling/LOD_Tile_+021_+008.005_high.glb', 0.02847368163634675);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+018.005_medium.glb', 280.1200881368356, 'test_tiling/LOD_Tile_+022_+018.005_high.glb', 0.17790126392059705);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+008.003_medium.glb', 280.6976466978295, 'test_tiling/LOD_Tile_+021_+008.003_high.glb', 0.8196329983582769);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+018_medium.glb', 280.7015345617583, 'test_tiling/LOD_Tile_+022_+018_high.glb', 0.8239528471680377);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+008.004_medium.glb', 281.321894893849, 'test_tiling/LOD_Tile_+021_+008.004_high.glb', 1.5132421050465679);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+020_medium.glb', 350.60941403713707, 'test_tiling/LOD_Tile_+022_+020_high.glb', 78.49937448647778);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+008.002_medium.glb', 316.7515252796181, 'test_tiling/LOD_Tile_+021_+008.002_high.glb', 40.879498089234474);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+008.001_medium.glb', 327.64512015675257, 'test_tiling/LOD_Tile_+021_+008.001_high.glb', 52.983492397161676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+018.004_medium.glb', 281.37570192296965, 'test_tiling/LOD_Tile_+022_+018.004_high.glb', 1.5730276929584175);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+018.003_medium.glb', 288.43227739850886, 'test_tiling/LOD_Tile_+022_+018.003_high.glb', 9.413667110224218);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.008_medium.glb', 281.7363176767374, 'test_tiling/LOD_Tile_+022_+011.008_high.glb', 1.9737118638114348);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.004_medium.glb', 279.97714573923963, 'test_tiling/LOD_Tile_+022_+011.004_high.glb', 0.019076377702888316);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011_medium.glb', 279.9781701871863, 'test_tiling/LOD_Tile_+022_+011_high.glb', 0.020214653199196825);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.005_medium.glb', 280.4544561906711, 'test_tiling/LOD_Tile_+022_+011.005_high.glb', 0.5494213237378673);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+018.002_medium.glb', 344.06228812836633, 'test_tiling/LOD_Tile_+022_+018.002_high.glb', 71.22479014339919);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+018.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+018.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.007_medium.glb', 280.440822635866, 'test_tiling/LOD_Tile_+022_+011.007_high.glb', 0.5342729295099454);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.006_medium.glb', 280.26820651569653, 'test_tiling/LOD_Tile_+022_+011.006_high.glb', 0.3424772404327694);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.003_medium.glb', 282.8096351493173, 'test_tiling/LOD_Tile_+022_+011.003_high.glb', 3.166286833344666);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016.006_medium.glb', 280.709382504799, 'test_tiling/LOD_Tile_+022_+016.006_high.glb', 0.8326727838799225);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016.007_medium.glb', 280.2785064161178, 'test_tiling/LOD_Tile_+022_+016.007_high.glb', 0.35392157423417936);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016.004_medium.glb', 281.284173376914, 'test_tiling/LOD_Tile_+022_+016.004_high.glb', 1.4713293084521657);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016.005_medium.glb', 280.13915294518097, 'test_tiling/LOD_Tile_+022_+016.005_high.glb', 0.199084384304358);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+026_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+026_+014_medium.glb', 360.9324736996924, 'test_tiling/LOD_Tile_+026_+014_high.glb', 89.96944077820594);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016.003_medium.glb', 281.14589473660976, 'test_tiling/LOD_Tile_+022_+016.003_high.glb', 1.3176863747807663);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016_medium.glb', 280.4223204341799, 'test_tiling/LOD_Tile_+022_+016_high.glb', 0.5137149276364522);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+006.004_medium.glb', 279.96669133191494, 'test_tiling/LOD_Tile_+021_+006.004_high.glb', 0.0074603695643301856);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+006.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+006.005_medium.glb', 280.0216840335772, 'test_tiling/LOD_Tile_+021_+006.005_high.glb', 0.06856337141125163);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+026_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+026_+013_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+026_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+006.001_medium.glb', 324.3721214884493, 'test_tiling/LOD_Tile_+021_+006.001_high.glb', 49.34682721015805);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+011.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+006.003_medium.glb', 280.2163392199831, 'test_tiling/LOD_Tile_+021_+006.003_high.glb', 0.2848469118622908);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016.001_medium.glb', 318.1174402005749, 'test_tiling/LOD_Tile_+022_+016.001_high.glb', 42.397181334742044);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+011.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+011.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+016.002_medium.glb', 326.27920523579576, 'test_tiling/LOD_Tile_+022_+016.002_high.glb', 51.4658091516541);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+006_medium.glb', 280.32114864204254, 'test_tiling/LOD_Tile_+021_+006_high.glb', 0.40130182526167);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+006.002_medium.glb', 320.02452394792135, 'test_tiling/LOD_Tile_+021_+006.002_high.glb', 44.5161632762381);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+000_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+000_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+000_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+015_medium.glb', 280.4121212991304, 'test_tiling/LOD_Tile_+010_+015_high.glb', 0.5023825553592693);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+010.003_medium.glb', 280.81895980836765, 'test_tiling/LOD_Tile_+014_+010.003_high.glb', 0.9544253434006458);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+023_medium.glb', 309.76798958383125, 'test_tiling/LOD_Tile_+006_+023_high.glb', 33.12001398280466);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+010.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+010.005_medium.glb', 280.1386927833164, 'test_tiling/LOD_Tile_+014_+010.005_high.glb', 0.19857309334372103);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+010.004_medium.glb', 280.9491906543105, 'test_tiling/LOD_Tile_+014_+010.004_high.glb', 1.09912628333711);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+009.001_medium.glb', 320.6646611636515, 'test_tiling/LOD_Tile_+001_+009.001_high.glb', 45.227426849271595);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+009_medium.glb', 323.731985952142, 'test_tiling/LOD_Tile_+001_+009_high.glb', 48.635565503149955);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+015.002_medium.glb', 334.9205865700395, 'test_tiling/LOD_Tile_+010_+015.002_high.glb', 61.067343967480525);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+015.001_medium.glb', 309.47605886633113, 'test_tiling/LOD_Tile_+010_+015.001_high.glb', 32.79564651891562);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+010_medium.glb', 287.64919946460566, 'test_tiling/LOD_Tile_+014_+010_high.glb', 8.543580516998418);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+010.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+010.006_medium.glb', 289.3280597213524, 'test_tiling/LOD_Tile_+014_+010.006_high.glb', 10.40898080227259);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+010.002_medium.glb', 355.1491560268902, 'test_tiling/LOD_Tile_+014_+010.002_high.glb', 83.54353225287011);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+010.001_medium.glb', 343.273162592732, 'test_tiling/LOD_Tile_+014_+010.001_high.glb', 70.34798399269435);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.008_medium.glb', 281.3526451264779, 'test_tiling/LOD_Tile_+018_+018.008_high.glb', 1.547409030189861);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.009_medium.glb', 280.24665448209043, 'test_tiling/LOD_Tile_+018_+018.009_high.glb', 0.31853053642600365);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018_medium.glb', 280.05053987721624, 'test_tiling/LOD_Tile_+018_+018_high.glb', 0.10062541989907586);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.006_medium.glb', 279.980375269406, 'test_tiling/LOD_Tile_+018_+018.006_high.glb', 0.022664744554365793);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.007_medium.glb', 280.6186147373005, 'test_tiling/LOD_Tile_+018_+018.007_high.glb', 0.731819708881585);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.005_medium.glb', 280.006206472468, 'test_tiling/LOD_Tile_+018_+018.005_high.glb', 0.05136608128997425);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.004_medium.glb', 280.056382589358, 'test_tiling/LOD_Tile_+018_+018.004_high.glb', 0.10711732227884191);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.003_medium.glb', 280.17682407943005, 'test_tiling/LOD_Tile_+018_+018.003_high.glb', 0.24094120013664674);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+005_medium.glb', 279.97483989164823, 'test_tiling/LOD_Tile_+013_+005_high.glb', 0.01651432482349228);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+012.005_medium.glb', 281.03954696320744, 'test_tiling/LOD_Tile_+010_+012.005_high.glb', 1.1995221821115205);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+012.004_medium.glb', 283.57436538843774, 'test_tiling/LOD_Tile_+010_+012.004_high.glb', 4.015987099034121);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+012.003_medium.glb', 280.3179207912991, 'test_tiling/LOD_Tile_+010_+012.003_high.glb', 0.3977153244355963);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+005.002_medium.glb', 310.9632365151402, 'test_tiling/LOD_Tile_+013_+005.002_high.glb', 34.448066128703445);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+005.001_medium.glb', 333.43341060065336, 'test_tiling/LOD_Tile_+013_+005.001_high.glb', 59.414926223718105);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+012.002_medium.glb', 339.50312361319794, 'test_tiling/LOD_Tile_+010_+012.002_high.glb', 66.1590517932121);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+012_medium.glb', 282.7290161341823, 'test_tiling/LOD_Tile_+010_+012_high.glb', 3.076710149861398);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+020.001_medium.glb', 325.56905959858165, 'test_tiling/LOD_Tile_+018_+020.001_high.glb', 50.67675844363844);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+020_medium.glb', 318.82756064644605, 'test_tiling/LOD_Tile_+018_+020_high.glb', 43.186204052376645);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+012.001_medium.glb', 304.8935235025956, 'test_tiling/LOD_Tile_+010_+012.001_high.glb', 27.703940559209457);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+007_medium.glb', 280.20852318597684, 'test_tiling/LOD_Tile_+017_+007_high.glb', 0.27616242963307797);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+007.003_medium.glb', 284.17367919320424, 'test_tiling/LOD_Tile_+017_+007.003_high.glb', 4.681891326552425);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.001_medium.glb', 314.69273590617445, 'test_tiling/LOD_Tile_+018_+018.001_high.glb', 38.59195434096377);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+007.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+007.005_medium.glb', 279.99580244782925, 'test_tiling/LOD_Tile_+017_+007.005_high.glb', 0.03980605391352965);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+018.002_medium.glb', 329.70388433885324, 'test_tiling/LOD_Tile_+018_+018.002_high.glb', 55.27100815505133);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+007.004_medium.glb', 284.1775233921386, 'test_tiling/LOD_Tile_+017_+007.004_high.glb', 4.686162658701687);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+007.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+007.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+028.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+028.001_medium.glb', 322.0038211989714, 'test_tiling/LOD_Tile_+014_+028.001_high.glb', 46.71538244407148);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+017_medium.glb', 279.96735806279173, 'test_tiling/LOD_Tile_+014_+017_high.glb', 0.008201181649632608);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+017.003_medium.glb', 280.36025400341697, 'test_tiling/LOD_Tile_+014_+017.003_high.glb', 0.44475222678879067);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+007.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+007.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+028_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+028_medium.glb', 322.3928242373993, 'test_tiling/LOD_Tile_+014_+028_high.glb', 47.14760804232467);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+012_medium.glb', 317.1284834972696, 'test_tiling/LOD_Tile_+006_+012_high.glb', 41.298340553291716);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+016.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+016.004_medium.glb', 279.9978513437226, 'test_tiling/LOD_Tile_+018_+016.004_high.glb', 0.04208260490614666);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+012.001_medium.glb', 327.2681636185239, 'test_tiling/LOD_Tile_+006_+012.001_high.glb', 52.56465179912984);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+016.003_medium.glb', 280.06524826265394, 'test_tiling/LOD_Tile_+018_+016.003_high.glb', 0.11696807038541998);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+024.001_medium.glb', 321.4022788000652, 'test_tiling/LOD_Tile_+010_+024.001_high.glb', 46.047002000842355);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+024_medium.glb', 322.99436831572837, 'test_tiling/LOD_Tile_+010_+024_high.glb', 47.815990351579195);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+016_medium.glb', 279.99713423015993, 'test_tiling/LOD_Tile_+018_+016_high.glb', 0.041285812058730706);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+021_medium.glb', 279.9666392698062, 'test_tiling/LOD_Tile_+014_+021_high.glb', 0.007402522776812868);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+019_medium.glb', 279.98006793502196, 'test_tiling/LOD_Tile_+014_+019_high.glb', 0.02232326190547324);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+017_medium.glb', 298.3374798584201, 'test_tiling/LOD_Tile_+002_+017_high.glb', 20.41944762123676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+016.001_medium.glb', 325.33417215805997, 'test_tiling/LOD_Tile_+018_+016.001_high.glb', 50.41577239861435);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+016.002_medium.glb', 319.0624480869677, 'test_tiling/LOD_Tile_+018_+016.002_high.glb', 43.44719009740074);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+021.002_medium.glb', 308.7874904540661, 'test_tiling/LOD_Tile_+014_+021.002_high.glb', 32.030570505287784);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+021.001_medium.glb', 335.60915666172747, 'test_tiling/LOD_Tile_+014_+021.001_high.glb', 61.83242184713376);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+017.001_medium.glb', 320.88268551920174, 'test_tiling/LOD_Tile_+014_+017.001_high.glb', 45.469676133216296);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+011_medium.glb', 280.0279885870064, 'test_tiling/LOD_Tile_+018_+011_high.glb', 0.07556843077705841);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+011.005_medium.glb', 280.02455416725076, 'test_tiling/LOD_Tile_+018_+011.005_high.glb', 0.07175240882631924);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+011.004_medium.glb', 280.6117996393208, 'test_tiling/LOD_Tile_+018_+011.004_high.glb', 0.7242473777930277);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+017.002_medium.glb', 323.5139599171689, 'test_tiling/LOD_Tile_+014_+017.002_high.glb', 48.39331435317985);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+011.006_medium.glb', 280.6885223934126, 'test_tiling/LOD_Tile_+018_+011.006_high.glb', 0.809494882339516);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+011.003_medium.glb', 280.6112605445816, 'test_tiling/LOD_Tile_+018_+011.003_high.glb', 0.7236483836384129);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+019.001_medium.glb', 323.1418199637125, 'test_tiling/LOD_Tile_+014_+019.001_high.glb', 47.979825516006066);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+019.002_medium.glb', 321.254827152081, 'test_tiling/LOD_Tile_+014_+019.002_high.glb', 45.883166836415484);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+023.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+023.003_medium.glb', 280.30797692852485, 'test_tiling/LOD_Tile_+010_+023.003_high.glb', 0.3866665880197887);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+023_medium.glb', 279.97033064126, 'test_tiling/LOD_Tile_+010_+023_high.glb', 0.011504046614331066);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+023.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+023.002_medium.glb', 310.8900993288617, 'test_tiling/LOD_Tile_+010_+023.002_high.glb', 34.366802588394044);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+015_medium.glb', 322.1987333370754, 'test_tiling/LOD_Tile_+006_+015_high.glb', 46.9319514864093);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+011.002_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+011.002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+023.001_medium.glb', 333.50654610750894, 'test_tiling/LOD_Tile_+010_+023.001_high.glb', 59.49618789800211);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+011.001_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+011.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+015.001_medium.glb', 322.1979137787181, 'test_tiling/LOD_Tile_+006_+015.001_high.glb', 46.93104086601225);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+026.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+026.001_medium.glb', 318.4837895039983, 'test_tiling/LOD_Tile_+014_+026.001_high.glb', 42.80423611632359);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+026_medium.glb', 325.91285761179523, 'test_tiling/LOD_Tile_+014_+026_high.glb', 51.05875623609796);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+010_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+002_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009.004_medium.glb', 280.38283048496976, 'test_tiling/LOD_Tile_+017_+009.004_high.glb', 0.4698372062918649);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009.003_medium.glb', 280.2912431591139, 'test_tiling/LOD_Tile_+017_+009.003_high.glb', 0.36807351089648055);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009.007_medium.glb', 279.98350235477767, 'test_tiling/LOD_Tile_+017_+009.007_high.glb', 0.026139283856212416);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009.006_medium.glb', 280.03293448733916, 'test_tiling/LOD_Tile_+017_+009.006_high.glb', 0.0810638755912036);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009.005_medium.glb', 280.05722733905833, 'test_tiling/LOD_Tile_+017_+009.005_high.glb', 0.1080559330569455);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009_medium.glb', 280.139127753838, 'test_tiling/LOD_Tile_+017_+009_high.glb', 0.19905639392330124);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009.001_medium.glb', 323.9207211729545, 'test_tiling/LOD_Tile_+017_+009.001_high.glb', 48.84527130405265);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.003_medium.glb', 282.2771875658573, 'test_tiling/LOD_Tile_+022_+017.003_high.glb', 2.5746784072780398);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.004_medium.glb', 280.57143806964456, 'test_tiling/LOD_Tile_+022_+017.004_high.glb', 0.6794011892638764);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.005_medium.glb', 280.3132402397788, 'test_tiling/LOD_Tile_+022_+017.005_high.glb', 0.39251471163524915);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.006_medium.glb', 280.0486404499577, 'test_tiling/LOD_Tile_+022_+017.006_high.glb', 0.09851494516739566);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.007_medium.glb', 280.06057106997935, 'test_tiling/LOD_Tile_+022_+017.007_high.glb', 0.11177118963588031);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017_medium.glb', 279.96699866629893, 'test_tiling/LOD_Tile_+022_+017_high.glb', 0.007801852213222738);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.009_medium.glb', 281.33081934694513, 'test_tiling/LOD_Tile_+022_+017.009_high.glb', 1.5231581640422784);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.008_medium.glb', 280.19098161416855, 'test_tiling/LOD_Tile_+022_+017.008_high.glb', 0.25667179429054954);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+009.002_medium.glb', 320.4758738807303, 'test_tiling/LOD_Tile_+017_+009.002_high.glb', 45.01766320158138);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+017.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+017.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+017.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+010_medium.glb', 279.96889473471174, 'test_tiling/LOD_Tile_+022_+010_high.glb', 0.009908594894095369);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+026_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+026_+012_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+026_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+010.003_medium.glb', 279.9947763204597, 'test_tiling/LOD_Tile_+022_+010.003_high.glb', 0.03866591239181735);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+005_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+025_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+007_medium.glb', 319.6372137677398, 'test_tiling/LOD_Tile_+021_+007_high.glb', 44.08581863159193);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+007.001_medium.glb', 324.75943334805373, 'test_tiling/LOD_Tile_+021_+007.001_high.glb', 49.77717372082962);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+010.004_medium.glb', 279.97914593187, 'test_tiling/LOD_Tile_+022_+010.004_high.glb', 0.021298813958795584);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+026_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+026_+015_medium.glb', 310.43764769465434, 'test_tiling/LOD_Tile_+026_+015_high.glb', 33.86407855038588);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+009_medium.glb', 280.0036940558644, 'test_tiling/LOD_Tile_+021_+009_high.glb', 0.04857450728591272);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+010.001_medium.glb', 307.75009919538013, 'test_tiling/LOD_Tile_+022_+010.001_high.glb', 30.87791355119231);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+009.003_medium.glb', 280.64049929663355, 'test_tiling/LOD_Tile_+021_+009.003_high.glb', 0.7561358859183);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+010.002_medium.glb', 336.6465462409905, 'test_tiling/LOD_Tile_+022_+010.002_high.glb', 62.98507693520384);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+009.004_medium.glb', 284.6742815603283, 'test_tiling/LOD_Tile_+021_+009.004_high.glb', 5.23811617891249);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+021_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010_medium.glb', 279.9774530736237, 'test_tiling/LOD_Tile_+018_+010_high.glb', 0.01941786035178087);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+019_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010.003_medium.glb', 284.23999960208016, 'test_tiling/LOD_Tile_+018_+010.003_high.glb', 4.755580669747872);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010.007_medium.glb', 280.5144972374608, 'test_tiling/LOD_Tile_+018_+010.007_high.glb', 0.6161335979485649);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010.006_medium.glb', 280.57799789534903, 'test_tiling/LOD_Tile_+018_+010.006_high.glb', 0.6866898844910583);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+009.002_medium.glb', 309.8481484371016, 'test_tiling/LOD_Tile_+021_+009.002_high.glb', 33.20907937532729);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+009.001_medium.glb', 334.54849699926905, 'test_tiling/LOD_Tile_+021_+009.001_high.glb', 60.65391111106886);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010.005_medium.glb', 279.9806322211041, 'test_tiling/LOD_Tile_+018_+010.005_high.glb', 0.02295024644114481);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010.004_medium.glb', 280.0778556900895, 'test_tiling/LOD_Tile_+018_+010.004_high.glb', 0.13097632309162976);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+018_medium.glb', 280.0112296262525, 'test_tiling/LOD_Tile_+014_+018_high.glb', 0.0569473632726935);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+018.003_medium.glb', 280.02973014851574, 'test_tiling/LOD_Tile_+014_+018.003_high.glb', 0.07750349912078289);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010.001_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+010.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+010.002_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+010.002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+014.001_medium.glb', 327.79533949361564, 'test_tiling/LOD_Tile_+006_+014.001_high.glb', 53.15040277145398);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+014_medium.glb', 316.601305942755, 'test_tiling/LOD_Tile_+006_+014_high.glb', 40.71258771494217);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+022_medium.glb', 325.2147030538259, 'test_tiling/LOD_Tile_+010_+022_high.glb', 50.28302894946533);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+027.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+027.001_medium.glb', 324.4306510546619, 'test_tiling/LOD_Tile_+014_+027.001_high.glb', 49.41186006150534);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+027_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+027_medium.glb', 319.9659943817088, 'test_tiling/LOD_Tile_+014_+027_high.glb', 44.451130424890806);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+022.001_medium.glb', 319.1819423825448, 'test_tiling/LOD_Tile_+010_+022.001_high.glb', 43.57996153693082);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+008.003_medium.glb', 280.0117418502258, 'test_tiling/LOD_Tile_+017_+008.003_high.glb', 0.05751650102084775);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+018.002_medium.glb', 321.0430015463196, 'test_tiling/LOD_Tile_+014_+018.002_high.glb', 45.64780505223616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+008_medium.glb', 279.9873969363979, 'test_tiling/LOD_Tile_+017_+008_high.glb', 0.030466596767588533);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+011.001_medium.glb', 322.90303626214774, 'test_tiling/LOD_Tile_+002_+011.001_high.glb', 47.71451029204519);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+011_medium.glb', 321.4936091742229, 'test_tiling/LOD_Tile_+002_+011_high.glb', 46.14848019435096);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+025_medium.glb', 279.97432766767486, 'test_tiling/LOD_Tile_+010_+025_high.glb', 0.01594518707533803);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+008.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+008.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+018.001_medium.glb', 323.35364389005105, 'test_tiling/LOD_Tile_+014_+018.001_high.glb', 48.21518543415999);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+013_medium.glb', 281.4020016850106, 'test_tiling/LOD_Tile_+006_+013_high.glb', 1.602249650781682);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+008.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+008.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+025.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+025.002_medium.glb', 322.4853335664071, 'test_tiling/LOD_Tile_+010_+025.002_high.glb', 47.25039618566673);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+025.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+025.001_medium.glb', 321.9113118699635, 'test_tiling/LOD_Tile_+010_+025.001_high.glb', 46.61259430072942);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017.003_medium.glb', 280.48546337499823, 'test_tiling/LOD_Tile_+018_+017.003_high.glb', 0.5838737507679395);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017.004_medium.glb', 280.0194806307804, 'test_tiling/LOD_Tile_+018_+017.004_high.glb', 0.06611514608148644);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017.005_medium.glb', 280.28352956990227, 'test_tiling/LOD_Tile_+018_+017.005_high.glb', 0.3595028562168986);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+013.001_medium.glb', 326.05369737196617, 'test_tiling/LOD_Tile_+006_+013.001_high.glb', 51.21524485851013);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017.007_medium.glb', 279.96115595415716, 'test_tiling/LOD_Tile_+018_+017.007_high.glb', 0.001309949833456676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+013.002_medium.glb', 318.3429480644045, 'test_tiling/LOD_Tile_+006_+013.002_high.glb', 42.64774562788601);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017.006_medium.glb', 280.7170188405589, 'test_tiling/LOD_Tile_+018_+017.006_high.glb', 0.8411576013909303);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017_medium.glb', 279.97099569271387, 'test_tiling/LOD_Tile_+018_+017_high.glb', 0.012242992674229703);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006_medium.glb', 279.9613608437465, 'test_tiling/LOD_Tile_+017_+006_high.glb', 0.0015376049327183775);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006.005_medium.glb', 280.599575120298, 'test_tiling/LOD_Tile_+017_+006.005_high.glb', 0.7106645788788808);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006.004_medium.glb', 282.2147533414873, 'test_tiling/LOD_Tile_+017_+006.004_high.glb', 2.5053070468669496);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006.006_medium.glb', 280.0210693648092, 'test_tiling/LOD_Tile_+017_+006.006_high.glb', 0.06788040611346653);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+016.001_medium.glb', 332.3089933286086, 'test_tiling/LOD_Tile_+002_+016.001_high.glb', 58.16557369922392);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+016_medium.glb', 351.0062062388054, 'test_tiling/LOD_Tile_+002_+016_high.glb', 78.94025471055373);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017.001_medium.glb', 320.3922050336754, 'test_tiling/LOD_Tile_+018_+017.001_high.glb', 44.92469781596484);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006.007_medium.glb', 280.1381033058914, 'test_tiling/LOD_Tile_+017_+006.007_high.glb', 0.19791811842699272);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+017.002_medium.glb', 324.0044152113523, 'test_tiling/LOD_Tile_+018_+017.002_high.glb', 48.938264680050246);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006.003_medium.glb', 284.10072170517213, 'test_tiling/LOD_Tile_+017_+006.003_high.glb', 4.600827450961221);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+021.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+021.003_medium.glb', 283.18054576523764, 'test_tiling/LOD_Tile_+018_+021.003_high.glb', 3.578409739922882);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+021.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+021.006_medium.glb', 282.8267014444552, 'test_tiling/LOD_Tile_+018_+021.006_high.glb', 3.1852493834979234);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+021_medium.glb', 279.9623852916932, 'test_tiling/LOD_Tile_+018_+021_high.glb', 0.002675880429026885);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+029_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+029_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+014_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+020_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+014_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+021.002_medium.glb', 352.00395304137777, 'test_tiling/LOD_Tile_+018_+021.002_high.glb', 80.04886226896745);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+021.001_medium.glb', 346.03612893453317, 'test_tiling/LOD_Tile_+018_+021.001_high.glb', 73.41794659469566);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+021.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+021.005_medium.glb', 284.6432743760012, 'test_tiling/LOD_Tile_+018_+021.005_high.glb', 5.203663751882418);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+021.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+021.004_medium.glb', 283.275360941837, 'test_tiling/LOD_Tile_+018_+021.004_high.glb', 3.68375993614434);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+006.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+006.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+006.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+013_medium.glb', 288.97211444256783, 'test_tiling/LOD_Tile_+010_+013_high.glb', 10.013486048067497);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+016.003_medium.glb', 280.16462643117313, 'test_tiling/LOD_Tile_+014_+016.003_high.glb', 0.22738825762896034);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+016_medium.glb', 280.3514907749157, 'test_tiling/LOD_Tile_+014_+016_high.glb', 0.4350153062318435);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+013.001_medium.glb', 321.4975037558432, 'test_tiling/LOD_Tile_+010_+013.001_high.glb', 46.15280750726234);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+003_medium.glb', 329.563121832134, 'test_tiling/LOD_Tile_+013_+003_high.glb', 55.11460536980773);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+013.002_medium.glb', 322.89914168052746, 'test_tiling/LOD_Tile_+010_+013.002_high.glb', 47.71018297913381);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+022_medium.glb', 339.65544390806315, 'test_tiling/LOD_Tile_+006_+022_high.glb', 66.32829656528453);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+014.003_medium.glb', 280.8209062594663, 'test_tiling/LOD_Tile_+010_+014.003_high.glb', 0.9565880668436321);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+014_medium.glb', 280.0002613155316, 'test_tiling/LOD_Tile_+010_+014_high.glb', 0.044760351360577336);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+022.001_medium.glb', 304.7412015283075, 'test_tiling/LOD_Tile_+006_+022.001_high.glb', 27.534693921111614);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+001.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+001.004_medium.glb', 280.5662872797225, 'test_tiling/LOD_Tile_+017_+001.004_high.glb', 0.6736780893504694);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+001_medium.glb', 280.05986739179957, 'test_tiling/LOD_Tile_+017_+001_high.glb', 0.11098932499169463);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+014.002_medium.glb', 304.97101543235885, 'test_tiling/LOD_Tile_+010_+014.002_high.glb', 27.79004270339088);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+001.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+001.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+001.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+001.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+001.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+001.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+004_medium.glb', 280.1097344948827, 'test_tiling/LOD_Tile_+013_+004_high.glb', 0.16639721730626597);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+001.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+001.003_medium.glb', 280.25013928453205, 'test_tiling/LOD_Tile_+017_+001.003_high.glb', 0.3224025391388564);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+014.001_medium.glb', 339.4256300040118, 'test_tiling/LOD_Tile_+010_+014.001_high.glb', 66.07294778300526);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+004.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+004.002_medium.glb', 334.19860100163845, 'test_tiling/LOD_Tile_+013_+004.002_high.glb', 60.2651377803682);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+004.001_medium.glb', 310.1980444347322, 'test_tiling/LOD_Tile_+013_+004.001_high.glb', 33.59785270602795);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019_medium.glb', 280.0179943415463, 'test_tiling/LOD_Tile_+018_+019_high.glb', 0.06446371359913722);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.008_medium.glb', 280.2771746337871, 'test_tiling/LOD_Tile_+018_+019.008_high.glb', 0.35244181608897834);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.009_medium.glb', 283.02994184053887, 'test_tiling/LOD_Tile_+018_+019.009_high.glb', 3.4110720458131083);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+016.001_medium.glb', 317.89685136631226, 'test_tiling/LOD_Tile_+014_+016.001_high.glb', 42.152082630005765);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.003_medium.glb', 280.0610967293356, 'test_tiling/LOD_Tile_+018_+019.003_high.glb', 0.11235525558726484);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.005_medium.glb', 280.0591502782369, 'test_tiling/LOD_Tile_+018_+019.005_high.glb', 0.11019253214427868);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.004_medium.glb', 279.9811444450774, 'test_tiling/LOD_Tile_+018_+019.004_high.glb', 0.023519384189299067);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+016.002_medium.glb', 326.4997940700584, 'test_tiling/LOD_Tile_+014_+016.002_high.glb', 51.71090785639038);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.006_medium.glb', 280.11783267193005, 'test_tiling/LOD_Tile_+018_+019.006_high.glb', 0.17539519180331453);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.007_medium.glb', 279.9992872502708, 'test_tiling/LOD_Tile_+018_+019.007_high.glb', 0.043678056626382356);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.009_medium.glb', 279.99277780725225, 'test_tiling/LOD_Tile_+014_+011.009_high.glb', 0.03644534216131387);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.008_medium.glb', 280.1108630670469, 'test_tiling/LOD_Tile_+014_+011.008_high.glb', 0.1676511863776091);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+008_medium.glb', 336.0136876439504, 'test_tiling/LOD_Tile_+001_+008_high.glb', 62.28190071627034);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.006_medium.glb', 280.1219842052484, 'test_tiling/LOD_Tile_+014_+011.006_high.glb', 0.18000800660146965);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+008.001_medium.glb', 308.38295779242026, 'test_tiling/LOD_Tile_+001_+008.001_high.glb', 31.581089770125804);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.007_medium.glb', 280.1030218416977, 'test_tiling/LOD_Tile_+014_+011.007_high.glb', 0.15893871376733956);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.005_medium.glb', 280.0413651901134, 'test_tiling/LOD_Tile_+014_+011.005_high.glb', 0.09043132311820147);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.010_medium.glb', 279.99733911974926, 'test_tiling/LOD_Tile_+014_+011.010_high.glb', 0.04151346715799241);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.004_medium.glb', 280.0540750623437, 'test_tiling/LOD_Tile_+014_+011.004_high.glb', 0.1045534033740421);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.003_medium.glb', 280.13003032018696, 'test_tiling/LOD_Tile_+014_+011.003_high.glb', 0.1889481343110009);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011_medium.glb', 279.96130878163774, 'test_tiling/LOD_Tile_+014_+011_high.glb', 0.0014797581452010598);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019.004_medium.glb', 279.9815542242561, 'test_tiling/LOD_Tile_+019_+019.004_high.glb', 0.02397469438782247);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019_medium.glb', 280.5122165812123, 'test_tiling/LOD_Tile_+019_+019_high.glb', 0.6135995354502256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019.005_medium.glb', 279.96064373018385, 'test_tiling/LOD_Tile_+019_+019.005_high.glb', 0.0007408120853024222);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.001_medium.glb', 316.86509960960166, 'test_tiling/LOD_Tile_+018_+019.001_high.glb', 41.0056917892162);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019.007_medium.glb', 280.34277792910035, 'test_tiling/LOD_Tile_+019_+019.007_high.glb', 0.42533436643700984);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019.006_medium.glb', 280.24626989425474, 'test_tiling/LOD_Tile_+019_+019.006_high.glb', 0.3181032166085371);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+019.002_medium.glb', 327.53152063542603, 'test_tiling/LOD_Tile_+018_+019.002_high.glb', 52.857270706798886);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019.003_medium.glb', 291.7090178209518, 'test_tiling/LOD_Tile_+019_+019.003_high.glb', 13.05448980182748);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.001_medium.glb', 328.59466416429945, 'test_tiling/LOD_Tile_+014_+011.001_high.glb', 54.038541294435994);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+011.002_medium.glb', 315.8019812720712, 'test_tiling/LOD_Tile_+014_+011.002_high.glb', 39.82444919196015);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+008.001_medium.glb', 308.4562494856022, 'test_tiling/LOD_Tile_+000_+008.001_high.glb', 31.66252498477236);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+008_medium.glb', 335.94039763019134, 'test_tiling/LOD_Tile_+000_+008_high.glb', 62.20046736764918);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+011.003_medium.glb', 280.25810982544175, 'test_tiling/LOD_Tile_+015_+011.003_high.glb', 0.3312586957052174);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+011_medium.glb', 280.97215172369897, 'test_tiling/LOD_Tile_+015_+011_high.glb', 1.124638582657651);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+022.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+022.003_medium.glb', 279.96571726665417, 'test_tiling/LOD_Tile_+007_+022.003_high.glb', 0.0063780748301352115);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+022_medium.glb', 279.96787028676505, 'test_tiling/LOD_Tile_+007_+022_high.glb', 0.008770319397786863);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019.002_medium.glb', 300.61993308938935, 'test_tiling/LOD_Tile_+019_+019.002_high.glb', 22.95550676675808);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+019.001_medium.glb', 343.7767140264042, 'test_tiling/LOD_Tile_+019_+019.001_high.glb', 70.90748558566347);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+011.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+011.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+011.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+011.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+022.001_medium.glb', 324.5992701484164, 'test_tiling/LOD_Tile_+007_+022.001_high.glb', 49.59921461012151);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+022.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+022.002_medium.glb', 319.79737528795425, 'test_tiling/LOD_Tile_+007_+022.002_high.glb', 44.26377587627464);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+018_medium.glb', 324.70812865899956, 'test_tiling/LOD_Tile_+003_+018_high.glb', 49.72016851076941);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+001_medium.glb', 280.92848504982754, 'test_tiling/LOD_Tile_+016_+001_high.glb', 1.0761200561338518);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+001.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+001.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+001.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+001.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+001.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+001.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+006_medium.glb', 279.98557812143684, 'test_tiling/LOD_Tile_+016_+006_high.glb', 0.028445691255289986);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+006.003_medium.glb', 284.51847646302156, 'test_tiling/LOD_Tile_+016_+006.003_high.glb', 5.064999404127197);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+006.004_medium.glb', 280.84227859482604, 'test_tiling/LOD_Tile_+016_+006.004_high.glb', 0.9803351061321928);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+006.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+006.005_medium.glb', 280.12475189412726, 'test_tiling/LOD_Tile_+016_+006.005_high.glb', 0.18308321646690642);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+006.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+006.006_medium.glb', 280.0185065655196, 'test_tiling/LOD_Tile_+016_+006.006_high.glb', 0.06503285134729148);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+014_medium.glb', 316.4960346794081, 'test_tiling/LOD_Tile_+011_+014_high.glb', 40.59561964455675);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+006.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+006.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+006.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+006.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+014.001_medium.glb', 327.9006107569625, 'test_tiling/LOD_Tile_+011_+014.001_high.glb', 53.2673708418394);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+029_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+029_medium.glb', 350.31953389495317, 'test_tiling/LOD_Tile_+015_+029_high.glb', 78.17728543960676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+016_medium.glb', 313.81509806794713, 'test_tiling/LOD_Tile_+015_+016_high.glb', 37.61680118737788);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+016.001_medium.glb', 317.10254984941287, 'test_tiling/LOD_Tile_+003_+016.001_high.glb', 41.269525389006475);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+016.001_medium.glb', 330.5814969857376, 'test_tiling/LOD_Tile_+015_+016.001_high.glb', 56.246133318256156);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+016_medium.glb', 327.2940955869578, 'test_tiling/LOD_Tile_+003_+016_high.glb', 52.593465097389675);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+025.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+025.001_medium.glb', 321.7779556180719, 'test_tiling/LOD_Tile_+011_+025.001_high.glb', 46.46442068751651);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+020.001_medium.glb', 318.12364230920946, 'test_tiling/LOD_Tile_+015_+020.001_high.glb', 42.40407256655823);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+025_medium.glb', 322.6186914977216, 'test_tiling/LOD_Tile_+011_+025_high.glb', 47.39857166490504);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+020_medium.glb', 326.2729527444753, 'test_tiling/LOD_Tile_+015_+020_high.glb', 51.45886193907581);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+013_medium.glb', 322.7602483714552, 'test_tiling/LOD_Tile_+011_+013_high.glb', 47.55585708016462);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+013.001_medium.glb', 321.6363970649154, 'test_tiling/LOD_Tile_+011_+013.001_high.glb', 46.30713340623152);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+013_medium.glb', 281.1496364907494, 'test_tiling/LOD_Tile_+007_+013_high.glb', 1.321843879380398);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.005_medium.glb', 281.45233062938115, 'test_tiling/LOD_Tile_+019_+017.005_high.glb', 1.658170700082294);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.004_medium.glb', 280.1026624452049, 'test_tiling/LOD_Tile_+019_+017.004_high.glb', 0.15853938433092968);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.006_medium.glb', 280.11106795663625, 'test_tiling/LOD_Tile_+019_+017.006_high.glb', 0.16787884147687082);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.007_medium.glb', 280.190251065223, 'test_tiling/LOD_Tile_+019_+017.007_high.glb', 0.2558600732399033);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.003_medium.glb', 280.87759181937486, 'test_tiling/LOD_Tile_+019_+017.003_high.glb', 1.019572022297568);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017_medium.glb', 279.9612063368431, 'test_tiling/LOD_Tile_+019_+017_high.glb', 0.0013659305955702093);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+013.001_medium.glb', 323.33139993422526, 'test_tiling/LOD_Tile_+007_+013.001_high.glb', 48.19046992768687);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.008_medium.glb', 280.13192638859977, 'test_tiling/LOD_Tile_+019_+017.008_high.glb', 0.19105487699187354);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+013.002_medium.glb', 321.0652455021454, 'test_tiling/LOD_Tile_+007_+013.002_high.glb', 45.67252055870927);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+027_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+027_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+027_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+027.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+027.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+027.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.018_medium.glb', 280.14117832915423, 'test_tiling/LOD_Tile_+019_+010.018_high.glb', 0.20133481094132202);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.019_medium.glb', 280.031166055064, 'test_tiling/LOD_Tile_+019_+010.019_high.glb', 0.07909895084101858);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.002_medium.glb', 316.9713449382093, 'test_tiling/LOD_Tile_+019_+017.002_high.glb', 41.123742154335815);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+011_medium.glb', 320.52822820907414, 'test_tiling/LOD_Tile_+003_+011_high.glb', 45.075834677518955);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+017.001_medium.glb', 327.42530049816133, 'test_tiling/LOD_Tile_+019_+017.001_high.glb', 52.73924833206033);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+011.001_medium.glb', 323.8684172272965, 'test_tiling/LOD_Tile_+003_+011.001_high.glb', 48.78715580887719);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+008_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+008_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.020_medium.glb', 279.9721880829469, 'test_tiling/LOD_Tile_+019_+010.020_high.glb', 0.013567870710916653);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.008_medium.glb', 280.25422699978157, 'test_tiling/LOD_Tile_+019_+010.008_high.glb', 0.32694444497166775);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.009_medium.glb', 280.2165306741895, 'test_tiling/LOD_Tile_+019_+010.009_high.glb', 0.28505963875832224);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.021_medium.glb', 280.1032771139729, 'test_tiling/LOD_Tile_+019_+010.021_high.glb', 0.15922234962871482);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+008.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+008.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.023_medium.glb', 279.97437805036077, 'test_tiling/LOD_Tile_+019_+010.023_high.glb', 0.01600116783745156);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.022_medium.glb', 280.0644287042966, 'test_tiling/LOD_Tile_+019_+010.022_high.glb', 0.11605744998837317);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010_medium.glb', 280.0273739182384, 'test_tiling/LOD_Tile_+019_+010_high.glb', 0.07488546547927331);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.007_medium.glb', 280.4959312177058, 'test_tiling/LOD_Tile_+019_+010.007_high.glb', 0.5955046871097279);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.013_medium.glb', 280.44669053935075, 'test_tiling/LOD_Tile_+019_+010.013_high.glb', 0.5407928222707682);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.012_medium.glb', 281.5243913056041, 'test_tiling/LOD_Tile_+019_+010.012_high.glb', 1.7382381181078765);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.006_medium.glb', 279.95997699930706, 'test_tiling/LOD_Tile_+019_+010.006_high.glb', 0.0);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.010_medium.glb', 279.97858164578787, 'test_tiling/LOD_Tile_+019_+010.010_high.glb', 0.02067182942312401);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.004_medium.glb', 280.1504554610517, 'test_tiling/LOD_Tile_+019_+010.004_high.glb', 0.21164273527182725);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.005_medium.glb', 280.37028687560297, 'test_tiling/LOD_Tile_+019_+010.005_high.glb', 0.45589986255099896);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.011_medium.glb', 279.97117539096024, 'test_tiling/LOD_Tile_+019_+010.011_high.glb', 0.012442657392434638);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.015_medium.glb', 280.1889192828923, 'test_tiling/LOD_Tile_+019_+010.015_high.glb', 0.25438031509470227);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.014_medium.glb', 280.1133738042277, 'test_tiling/LOD_Tile_+019_+010.014_high.glb', 0.17044089435626686);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.016_medium.glb', 280.03347190265544, 'test_tiling/LOD_Tile_+019_+010.016_high.glb', 0.08166100372041461);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.003_medium.glb', 280.75407362661707, 'test_tiling/LOD_Tile_+019_+010.003_high.glb', 0.8823295859000302);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.017_medium.glb', 280.051821276861, 'test_tiling/LOD_Tile_+019_+010.017_high.glb', 0.10204919728216338);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+022_medium.glb', 279.9687922899171, 'test_tiling/LOD_Tile_+011_+022_high.glb', 0.009794767344464519);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+019_+010.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+018.003_medium.glb', 279.98278356179213, 'test_tiling/LOD_Tile_+015_+018.003_high.glb', 0.02534062498339268);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+018_medium.glb', 280.2197736397388, 'test_tiling/LOD_Tile_+015_+018_high.glb', 0.28866293381303);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+010.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+019_+010.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+014.001_medium.glb', 325.6398892578458, 'test_tiling/LOD_Tile_+007_+014.001_high.glb', 50.75545806504305);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+014_medium.glb', 318.7567561785248, 'test_tiling/LOD_Tile_+007_+014_high.glb', 43.10753242135309);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+022.001_medium.glb', 333.30512620580924, 'test_tiling/LOD_Tile_+011_+022.001_high.glb', 59.27238800722463);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+018.004_medium.glb', 280.0528961074936, 'test_tiling/LOD_Tile_+015_+018.004_high.glb', 0.10324345354058544);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+022.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+022.002_medium.glb', 311.0915192305614, 'test_tiling/LOD_Tile_+011_+022.002_high.glb', 34.59060247917152);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+018.005_medium.glb', 280.3386767784679, 'test_tiling/LOD_Tile_+015_+018.005_high.glb', 0.4207775324009682);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+019_medium.glb', 284.01236390948264, 'test_tiling/LOD_Tile_+023_+019_high.glb', 4.502652122417315);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+009_medium.glb', 280.00564218638596, 'test_tiling/LOD_Tile_+020_+009_high.glb', 0.05073909675430267);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+009.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+009.005_medium.glb', 280.20911266340187, 'test_tiling/LOD_Tile_+020_+009.005_high.glb', 0.27681740454980636);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+009.004_medium.glb', 281.52582553272947, 'test_tiling/LOD_Tile_+020_+009.004_high.glb', 1.7398317038027085);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+009.003_medium.glb', 280.4816964295156, 'test_tiling/LOD_Tile_+020_+009.003_high.glb', 0.579688255787251);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+005_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+007.004_medium.glb', 280.01399731513135, 'test_tiling/LOD_Tile_+020_+007.004_high.glb', 0.06002257313813025);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+007.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+007.005_medium.glb', 280.29916163791484, 'test_tiling/LOD_Tile_+020_+007.005_high.glb', 0.37687182067532415);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+018.002_medium.glb', 326.0858835111434, 'test_tiling/LOD_Tile_+015_+018.002_high.glb', 51.25100723537366);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+007.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+007.006_medium.glb', 279.9723291544674, 'test_tiling/LOD_Tile_+020_+007.006_high.glb', 0.013724616844834548);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+010_medium.glb', 318.2594085329101, 'test_tiling/LOD_Tile_+023_+010_high.glb', 42.55492392622556);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+007.003_medium.glb', 281.5590361198534, 'test_tiling/LOD_Tile_+020_+007.003_high.glb', 1.7767323561625457);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+009.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+020_+009.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+010.001_medium.glb', 326.13723858288347, 'test_tiling/LOD_Tile_+023_+010.001_high.glb', 51.30806842619599);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+007_medium.glb', 279.99175335930556, 'test_tiling/LOD_Tile_+020_+007_high.glb', 0.03530706666500537);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+018.001_medium.glb', 318.3107115425414, 'test_tiling/LOD_Tile_+015_+018.001_high.glb', 42.61192727026037);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+009.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+020_+009.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+007.001_medium.glb', 318.54672587580444, 'test_tiling/LOD_Tile_+020_+007.001_high.glb', 42.874165418330406);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+017.003_medium.glb', 285.2559395925318, 'test_tiling/LOD_Tile_+023_+017.003_high.glb', 5.884402881360808);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+017_medium.glb', 280.10563502367313, 'test_tiling/LOD_Tile_+023_+017_high.glb', 0.16184224929562815);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+007.002_medium.glb', 325.8499195605662, 'test_tiling/LOD_Tile_+020_+007.002_high.glb', 50.98882506806574);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+017.002_medium.glb', 331.8356832624377, 'test_tiling/LOD_Tile_+023_+017.002_high.glb', 57.63967362570076);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+017.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+017.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+026.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+026.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+026.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+019_medium.glb', 280.4164273393522, 'test_tiling/LOD_Tile_+015_+019_high.glb', 0.5071670444945725);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+026_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+026_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+010_medium.glb', 325.524264352546, 'test_tiling/LOD_Tile_+003_+010_high.glb', 50.626985948043306);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+010.001_medium.glb', 318.8723810838246, 'test_tiling/LOD_Tile_+003_+010.001_high.glb', 43.236004538352844);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011_medium.glb', 280.2543160091933, 'test_tiling/LOD_Tile_+019_+011_high.glb', 0.3270433443180683);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.008_medium.glb', 279.9632569121593, 'test_tiling/LOD_Tile_+019_+011.008_high.glb', 0.003644347613591009);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.004_medium.glb', 280.2593912250865, 'test_tiling/LOD_Tile_+019_+011.004_high.glb', 0.33268247308830484);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.003_medium.glb', 283.6769714077004, 'test_tiling/LOD_Tile_+019_+011.003_high.glb', 4.129993787103736);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+009.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+009.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+019.001_medium.glb', 327.8795474354097, 'test_tiling/LOD_Tile_+015_+019.001_high.glb', 53.24396715122514);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+009_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+009_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+019.002_medium.glb', 316.51704761827506, 'test_tiling/LOD_Tile_+015_+019.002_high.glb', 40.618967354408895);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.007_medium.glb', 280.04561916822644, 'test_tiling/LOD_Tile_+019_+011.007_high.glb', 0.09515796546598745);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.005_medium.glb', 282.30213875133893, 'test_tiling/LOD_Tile_+019_+011.005_high.glb', 2.602401946702065);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.006_medium.glb', 281.07819216271724, 'test_tiling/LOD_Tile_+019_+011.006_high.glb', 1.242461292678004);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+023.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+023.003_medium.glb', 279.98191362074886, 'test_tiling/LOD_Tile_+011_+023.003_high.glb', 0.02437402382423234);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.002_medium.glb', 322.211955433279, 'test_tiling/LOD_Tile_+019_+011.002_high.glb', 46.94664270441329);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+011.001_medium.glb', 322.18469000309165, 'test_tiling/LOD_Tile_+019_+011.001_high.glb', 46.91634778198286);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+023_medium.glb', 280.1185497854927, 'test_tiling/LOD_Tile_+011_+023_high.glb', 0.1761919846507305);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+015_medium.glb', 280.3581026627289, 'test_tiling/LOD_Tile_+007_+015_high.glb', 0.44236184824654284);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+023.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+023.002_medium.glb', 316.3475065213685, 'test_tiling/LOD_Tile_+011_+023.002_high.glb', 40.43058835784605);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+021_medium.glb', 281.1078658852908, 'test_tiling/LOD_Tile_+015_+021_high.glb', 1.2754320955374716);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+023.001_medium.glb', 328.0491389150021, 'test_tiling/LOD_Tile_+011_+023.001_high.glb', 53.432402128550095);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+015.001_medium.glb', 316.34883830369915, 'test_tiling/LOD_Tile_+007_+015.001_high.glb', 40.43206811599125);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+015.002_medium.glb', 328.0478071326715, 'test_tiling/LOD_Tile_+007_+015.002_high.glb', 53.4309223704049);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+021.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+021.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+021.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+021.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+017.001_medium.glb', 328.3603410098599, 'test_tiling/LOD_Tile_+003_+017.001_high.glb', 53.77818223394757);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+017_medium.glb', 316.0363044265108, 'test_tiling/LOD_Tile_+003_+017_high.glb', 40.08480825244858);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+024.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+024.003_medium.glb', 280.44543433104894, 'test_tiling/LOD_Tile_+011_+024.003_high.glb', 0.5393970352687374);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+024_medium.glb', 280.21449353425623, 'test_tiling/LOD_Tile_+011_+024_high.glb', 0.2827961499435317);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+012.001_medium.glb', 320.9138472104322, 'test_tiling/LOD_Tile_+007_+012.001_high.glb', 45.50430023458352);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+012_medium.glb', 323.48279822593844, 'test_tiling/LOD_Tile_+007_+012_high.glb', 48.35869025181263);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+024.001_medium.glb', 321.6750405850024, 'test_tiling/LOD_Tile_+011_+024.001_high.glb', 46.3500706507726);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+016.003_medium.glb', 280.0671963931755, 'test_tiling/LOD_Tile_+019_+016.003_high.glb', 0.11913265985380991);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+016.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+016.004_medium.glb', 282.12803634193534, 'test_tiling/LOD_Tile_+019_+016.004_high.glb', 2.40895482514254);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+024.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+024.002_medium.glb', 322.7216048513683, 'test_tiling/LOD_Tile_+011_+024.002_high.glb', 47.51291983562355);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+016_medium.glb', 280.045464661323, 'test_tiling/LOD_Tile_+019_+016_high.glb', 0.09498629112883927);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+017_medium.glb', 280.23427713558715, 'test_tiling/LOD_Tile_+015_+017_high.glb', 0.3047779292001124);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+016.001_medium.glb', 317.65120218408185, 'test_tiling/LOD_Tile_+019_+016.001_high.glb', 41.879139094194215);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+024_medium.glb', 325.2973222615911, 'test_tiling/LOD_Tile_+007_+024_high.glb', 50.374828069204504);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+016.002_medium.glb', 326.74544493171163, 'test_tiling/LOD_Tile_+019_+016.002_high.glb', 51.983853258227334);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+012.005_medium.glb', 280.0228126057414, 'test_tiling/LOD_Tile_+011_+012.005_high.glb', 0.06981734048259478);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+012.001_medium.glb', 342.64906890361596, 'test_tiling/LOD_Tile_+011_+012.001_high.glb', 69.65454656034322);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+012.004_medium.glb', 297.97143788938075, 'test_tiling/LOD_Tile_+011_+012.004_high.glb', 20.01273432230412);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+012_medium.glb', 279.97145753400133, 'test_tiling/LOD_Tile_+011_+012_high.glb', 0.012756149660270423);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+012.003_medium.glb', 297.0729920018759, 'test_tiling/LOD_Tile_+011_+012.003_high.glb', 19.014461113965346);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+007_medium.glb', 280.1833839051345, 'test_tiling/LOD_Tile_+016_+007_high.glb', 0.24822989536382875);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+012.002_medium.glb', 301.7475782121776, 'test_tiling/LOD_Tile_+011_+012.002_high.glb', 24.208445792078333);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+017.002_medium.glb', 318.5085945796908, 'test_tiling/LOD_Tile_+015_+017.002_high.glb', 42.83179731153748);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+017.001_medium.glb', 325.88800047399394, 'test_tiling/LOD_Tile_+015_+017.001_high.glb', 51.03113719409655);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+010.004_medium.glb', 279.9990302985727, 'test_tiling/LOD_Tile_+015_+010.004_high.glb', 0.04339255473960334);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+010.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+010.005_medium.glb', 280.4522511084515, 'test_tiling/LOD_Tile_+015_+010.005_high.glb', 0.5469712323826985);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+009_medium.glb', 322.56528753008814, 'test_tiling/LOD_Tile_+000_+009_high.glb', 47.3392339230901);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+007.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+007.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+009.001_medium.glb', 321.83135958570534, 'test_tiling/LOD_Tile_+000_+009.001_high.glb', 46.52375842933145);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+028.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+028.001_medium.glb', 362.6569974640952, 'test_tiling/LOD_Tile_+015_+028.001_high.glb', 91.885578294209);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+028_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+028_medium.glb', 346.36237194055553, 'test_tiling/LOD_Tile_+015_+028_high.glb', 73.78043882360943);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+010.003_medium.glb', 280.0359843192591, 'test_tiling/LOD_Tile_+015_+010.003_high.glb', 0.08445257772447613);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+007.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+007.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+010_medium.glb', 280.4069957005513, 'test_tiling/LOD_Tile_+015_+010_high.glb', 0.4966874458269192);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018.003_medium.glb', 280.54717040926835, 'test_tiling/LOD_Tile_+019_+018.003_high.glb', 0.6524371221791911);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018.007_medium.glb', 280.32858008821313, 'test_tiling/LOD_Tile_+019_+018.007_high.glb', 0.4095589876734162);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018_medium.glb', 279.9773002461431, 'test_tiling/LOD_Tile_+019_+018_high.glb', 0.019248052040036486);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018.006_medium.glb', 280.4432829903609, 'test_tiling/LOD_Tile_+019_+018.006_high.glb', 0.5370066567264896);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018.004_medium.glb', 280.0005686499156, 'test_tiling/LOD_Tile_+019_+018.004_high.glb', 0.045101834009469884);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+010.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+010.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018.005_medium.glb', 280.1314662267352, 'test_tiling/LOD_Tile_+019_+018.005_high.glb', 0.19054358603123658);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+000_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+000_medium.glb', 358.7481424289406, 'test_tiling/LOD_Tile_+016_+000_high.glb', 87.54240603292614);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+010.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+010.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+006.003_medium.glb', 280.118447340698, 'test_tiling/LOD_Tile_+020_+006.003_high.glb', 0.17607815710109964);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+023.001_medium.glb', 311.8274977502604, 'test_tiling/LOD_Tile_+007_+023.001_high.glb', 35.40835638994819);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+006.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+006.006_medium.glb', 288.31583293485176, 'test_tiling/LOD_Tile_+020_+006.006_high.glb', 9.28428437282742);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+006.001_medium.glb', 322.54996279645957, 'test_tiling/LOD_Tile_+020_+006.001_high.glb', 47.322206441280564);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+023_medium.glb', 332.5691493655331, 'test_tiling/LOD_Tile_+007_+023_high.glb', 58.45463596247337);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+006.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+006.005_medium.glb', 280.0580217060727, 'test_tiling/LOD_Tile_+020_+006.005_high.glb', 0.10893856307293553);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+015.001_medium.glb', 327.2630380199448, 'test_tiling/LOD_Tile_+011_+015.001_high.glb', 52.55895668959749);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+015_medium.glb', 317.1336090958487, 'test_tiling/LOD_Tile_+011_+015_high.glb', 41.30403566282406);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018.002_medium.glb', 318.24521069202285, 'test_tiling/LOD_Tile_+019_+018.002_high.glb', 42.53914854746197);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+018.001_medium.glb', 326.15143474434785, 'test_tiling/LOD_Tile_+019_+018.001_high.glb', 51.32384193893418);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+006.004_medium.glb', 280.09420655108767, 'test_tiling/LOD_Tile_+020_+006.004_high.glb', 0.14914394642287504);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+006.002_medium.glb', 321.8466843193339, 'test_tiling/LOD_Tile_+020_+006.002_high.glb', 46.540785911140986);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+006_medium.glb', 284.28451102565185, 'test_tiling/LOD_Tile_+020_+006_high.glb', 4.805037807049775);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+016.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+016.004_medium.glb', 281.4732411234534, 'test_tiling/LOD_Tile_+023_+016.004_high.glb', 1.681404582384814);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+016_medium.glb', 279.9613608437465, 'test_tiling/LOD_Tile_+023_+016_high.glb', 0.0015376049327183775);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+016.003_medium.glb', 294.8467121068419, 'test_tiling/LOD_Tile_+023_+016.003_high.glb', 16.54081678614981);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+016.001_medium.glb', 353.00872151094205, 'test_tiling/LOD_Tile_+023_+016.001_high.glb', 81.16527167959443);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+004_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+016.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+016.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+008_medium.glb', 280.14079374131853, 'test_tiling/LOD_Tile_+020_+008_high.glb', 0.20090749112385536);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+018_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+008.003_medium.glb', 281.911599040991, 'test_tiling/LOD_Tile_+020_+008.003_high.glb', 2.168468935204417);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+008.004_medium.glb', 279.99764645413325, 'test_tiling/LOD_Tile_+020_+008.004_high.glb', 0.04185494980688496);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+008.002_medium.glb', 313.1060272613656, 'test_tiling/LOD_Tile_+020_+008.002_high.glb', 36.828944735620645);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+008.001_medium.glb', 331.290618175005, 'test_tiling/LOD_Tile_+020_+008.001_high.glb', 57.0340457507755);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+011.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+011.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+011_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+017_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+005.003_medium.glb', 282.06499584591165, 'test_tiling/LOD_Tile_+023_+005.003_high.glb', 2.3389098295606834);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+005.002_medium.glb', 330.55843347155445, 'test_tiling/LOD_Tile_+023_+005.002_high.glb', 56.22050719138598);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+005.001_medium.glb', 313.8382119648162, 'test_tiling/LOD_Tile_+023_+005.001_high.glb', 37.642483295010166);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+005_medium.glb', 280.4513811674083, 'test_tiling/LOD_Tile_+023_+005_high.glb', 0.5460046312235382);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+010_medium.glb', 279.9919582488949, 'test_tiling/LOD_Tile_+024_+010_high.glb', 0.03553472176426707);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+012.001_medium.glb', 322.27084439598434, 'test_tiling/LOD_Tile_+020_+012.001_high.glb', 47.012074885196995);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+010.004_medium.glb', 284.179854431073, 'test_tiling/LOD_Tile_+024_+010.004_high.glb', 4.68875270196214);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+010.003_medium.glb', 282.2664157476114, 'test_tiling/LOD_Tile_+024_+010.003_high.glb', 2.5627097203381664);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+012_medium.glb', 322.1258010403863, 'test_tiling/LOD_Tile_+020_+012_high.glb', 46.850915601199155);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+010.002_medium.glb', 318.9846219520546, 'test_tiling/LOD_Tile_+024_+010.002_high.glb', 43.36071661416396);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+014_medium.glb', 292.1064767534969, 'test_tiling/LOD_Tile_+000_+014_high.glb', 13.49611083798872);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+010.001_medium.glb', 325.412023484316, 'test_tiling/LOD_Tile_+024_+010.001_high.glb', 50.50227387223218);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.003_medium.glb', 281.59747642977385, 'test_tiling/LOD_Tile_+019_+005.003_high.glb', 1.8194438116297678);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.005_medium.glb', 280.06017472618356, 'test_tiling/LOD_Tile_+019_+005.005_high.glb', 0.11133080764058718);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.011_medium.glb', 279.96269262607717, 'test_tiling/LOD_Tile_+019_+005.011_high.glb', 0.0030173630779194373);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.010_medium.glb', 279.9650001530915, 'test_tiling/LOD_Tile_+019_+005.010_high.glb', 0.005581281982719256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.004_medium.glb', 280.03839261164524, 'test_tiling/LOD_Tile_+019_+005.004_high.glb', 0.08712845815350301);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.012_medium.glb', 279.97622373608766, 'test_tiling/LOD_Tile_+019_+005.012_high.glb', 0.01805192975621066);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.006_medium.glb', 280.07744591091085, 'test_tiling/LOD_Tile_+019_+005.006_high.glb', 0.13052101289310633);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.002_medium.glb', 341.56206581412215, 'test_tiling/LOD_Tile_+019_+005.002_high.glb', 68.44676534979455);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005_medium.glb', 280.05663786163325, 'test_tiling/LOD_Tile_+019_+005_high.glb', 0.10740095814021716);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.001_medium.glb', 302.8345796222485, 'test_tiling/LOD_Tile_+019_+005.001_high.glb', 25.4162251366016);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.007_medium.glb', 280.6407562483316, 'test_tiling/LOD_Tile_+019_+005.007_high.glb', 0.756421387805079);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.009_medium.glb', 279.9828860065868, 'test_tiling/LOD_Tile_+019_+005.009_high.glb', 0.02545445253302353);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+005.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+005.008_medium.glb', 280.0258355668955, 'test_tiling/LOD_Tile_+019_+005.008_high.glb', 0.07317618620940676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+021_medium.glb', 280.02875776267786, 'test_tiling/LOD_Tile_+008_+021_high.glb', 0.07642307041199169);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+008_medium.glb', 337.77736883183627, 'test_tiling/LOD_Tile_+011_+008_high.glb', 64.24154648058804);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+019_medium.glb', 325.27395141302395, 'test_tiling/LOD_Tile_+008_+019_high.glb', 50.34886045968545);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+019.001_medium.glb', 319.12269570276953, 'test_tiling/LOD_Tile_+008_+019.001_high.glb', 43.5141318927361);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+015_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+020_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+019_+002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+021.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+021.004_medium.glb', 279.9656148218595, 'test_tiling/LOD_Tile_+008_+021.004_high.glb', 0.006264247280504361);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+018.001_medium.glb', 324.3617174638105, 'test_tiling/LOD_Tile_+012_+018.001_high.glb', 49.33526718278161);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+027_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+027_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+012_+027_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+018_medium.glb', 320.0349279725601, 'test_tiling/LOD_Tile_+012_+018_high.glb', 44.52772330361455);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+021.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+021.005_medium.glb', 279.9817070517367, 'test_tiling/LOD_Tile_+008_+021.005_high.glb', 0.024144502699566854);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+011_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+004_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+021.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+021.003_medium.glb', 280.0067186964414, 'test_tiling/LOD_Tile_+008_+021.003_high.glb', 0.0519352190381285);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+025_medium.glb', 305.7247773607585, 'test_tiling/LOD_Tile_+016_+025_high.glb', 28.62755595716822);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+021.001_medium.glb', 317.99043720537554, 'test_tiling/LOD_Tile_+008_+021.001_high.glb', 42.256066895631655);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+013_medium.glb', 341.1518970093468, 'test_tiling/LOD_Tile_+000_+013_high.glb', 67.99102223337746);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+021.002_medium.glb', 326.4062082309951, 'test_tiling/LOD_Tile_+008_+021.002_high.glb', 51.60692359076449);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+016.001_medium.glb', 330.09542330580484, 'test_tiling/LOD_Tile_+004_+016.001_high.glb', 55.70605145166422);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+016_medium.glb', 314.3012221305658, 'test_tiling/LOD_Tile_+004_+016_high.glb', 38.15693903473192);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+029_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+029_medium.glb', 322.46595974425486, 'test_tiling/LOD_Tile_+012_+029_high.glb', 47.22886971660867);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+029.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+029.001_medium.glb', 321.9306856921158, 'test_tiling/LOD_Tile_+012_+029.001_high.glb', 46.63412076978748);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+003_medium.glb', 280.1221387121518, 'test_tiling/LOD_Tile_+015_+003_high.glb', 0.18017968093861783);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+020.001_medium.glb', 322.5970622106638, 'test_tiling/LOD_Tile_+012_+020.001_high.glb', 47.3745391237297);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+013.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+013.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+020_medium.glb', 321.79958322570684, 'test_tiling/LOD_Tile_+012_+020_high.glb', 46.488451362666446);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+017.001_medium.glb', 322.0074605083164, 'test_tiling/LOD_Tile_+008_+017.001_high.glb', 46.71942612112148);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+003.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+003.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+003.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+017_medium.glb', 322.38918492805425, 'test_tiling/LOD_Tile_+008_+017_high.glb', 47.14356436527466);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+014_medium.glb', 280.14079374131853, 'test_tiling/LOD_Tile_+016_+014_high.glb', 0.20090749112385536);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+014.003_medium.glb', 280.73516164575227, 'test_tiling/LOD_Tile_+016_+014.003_high.glb', 0.8613162738280137);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+016_medium.glb', 331.2060021334552, 'test_tiling/LOD_Tile_+012_+016_high.glb', 56.94002792683122);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+003.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+003.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+003.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+013_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+013_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+016.001_medium.glb', 313.19064498233837, 'test_tiling/LOD_Tile_+012_+016.001_high.glb', 36.92296442559033);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+018.001_medium.glb', 330.8960814382422, 'test_tiling/LOD_Tile_+004_+018.001_high.glb', 56.59567159881684);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.008_medium.glb', 279.9779669770199, 'test_tiling/LOD_Tile_+012_+011.008_high.glb', 0.019988864125338908);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+018_medium.glb', 313.5005656775513, 'test_tiling/LOD_Tile_+004_+018_high.glb', 37.26732075360471);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.009_medium.glb', 279.97786453222517, 'test_tiling/LOD_Tile_+012_+011.009_high.glb', 0.01987503657570806);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+004.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+004.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+014.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+014.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+004_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011_medium.glb', 280.0017979874516, 'test_tiling/LOD_Tile_+012_+011_high.glb', 0.046467764605040096);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.006_medium.glb', 279.9650001530915, 'test_tiling/LOD_Tile_+012_+011.006_high.glb', 0.005581281982719256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.003_medium.glb', 280.83520654514825, 'test_tiling/LOD_Tile_+012_+011.003_high.glb', 0.9724772731568564);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.007_medium.glb', 279.9754545604162, 'test_tiling/LOD_Tile_+012_+011.007_high.glb', 0.017197290121277388);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+014.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+014.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.011_medium.glb', 279.9725340440568, 'test_tiling/LOD_Tile_+012_+011.011_high.glb', 0.013952271944096248);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.010_medium.glb', 279.967306000683, 'test_tiling/LOD_Tile_+012_+011.010_high.glb', 0.008143334862115291);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.005_medium.glb', 280.7815456258167, 'test_tiling/LOD_Tile_+012_+011.005_high.glb', 0.912854029455136);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.003_medium.glb', 280.95621232130236, 'test_tiling/LOD_Tile_+024_+011.003_high.glb', 1.1069281355503329);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.009_medium.glb', 280.5139077600357, 'test_tiling/LOD_Tile_+024_+011.009_high.glb', 0.6154786230318365);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.008_medium.glb', 280.2310996675296, 'test_tiling/LOD_Tile_+024_+011.008_high.glb', 0.3012474091361522);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011_medium.glb', 280.1747231214279, 'test_tiling/LOD_Tile_+024_+011_high.glb', 0.2386068023565124);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.014_medium.glb', 280.31863790486176, 'test_tiling/LOD_Tile_+024_+011.014_high.glb', 0.3985121172830123);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.004_medium.glb', 280.1324402919959, 'test_tiling/LOD_Tile_+012_+011.004_high.glb', 0.19162588076543158);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.011_medium.glb', 279.9603867784857, 'test_tiling/LOD_Tile_+024_+011.011_high.glb', 0.000455310198523403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.010_medium.glb', 279.979760600638, 'test_tiling/LOD_Tile_+024_+011.010_high.glb', 0.02198177925658069);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.005_medium.glb', 281.82995389848656, 'test_tiling/LOD_Tile_+024_+011.005_high.glb', 2.0777521101994365);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.004_medium.glb', 280.7607375765391, 'test_tiling/LOD_Tile_+024_+011.004_high.glb', 0.8897339747022468);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.012_medium.glb', 280.5943739476901, 'test_tiling/LOD_Tile_+024_+011.012_high.glb', 0.7048854982033603);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.002_medium.glb', 311.4037457733658, 'test_tiling/LOD_Tile_+024_+011.002_high.glb', 34.9375208600653);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.001_medium.glb', 332.99289966300483, 'test_tiling/LOD_Tile_+024_+011.001_high.glb', 58.92546962633085);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.013_medium.glb', 280.27538101016904, 'test_tiling/LOD_Tile_+024_+011.013_high.glb', 0.3504489009577365);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.006_medium.glb', 280.719119798561, 'test_tiling/LOD_Tile_+024_+011.006_high.glb', 0.8434919991710647);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.001_medium.glb', 318.32495976611455, 'test_tiling/LOD_Tile_+012_+011.001_high.glb', 42.62775862978607);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+011.007_medium.glb', 282.1989684459942, 'test_tiling/LOD_Tile_+024_+011.007_high.glb', 2.4877682740967795);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.009_medium.glb', 280.56172596722547, 'test_tiling/LOD_Tile_+020_+014.009_high.glb', 0.6686099643537908);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+011.002_medium.glb', 326.071687349679, 'test_tiling/LOD_Tile_+012_+011.002_high.glb', 51.23523372263548);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+004_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.008_medium.glb', 280.5872498359035, 'test_tiling/LOD_Tile_+020_+014.008_high.glb', 0.6969698184405068);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.006_medium.glb', 280.46491059799587, 'test_tiling/LOD_Tile_+020_+014.006_high.glb', 0.5610373318764256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.007_medium.glb', 280.06509543517336, 'test_tiling/LOD_Tile_+020_+014.007_high.glb', 0.11679826207367558);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.011_medium.glb', 279.98719204680856, 'test_tiling/LOD_Tile_+020_+014.011_high.glb', 0.03023894166832683);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.005_medium.glb', 280.4220130997959, 'test_tiling/LOD_Tile_+020_+014.005_high.glb', 0.5133734449875597);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.010_medium.glb', 280.71942713294504, 'test_tiling/LOD_Tile_+020_+014.010_high.glb', 0.8438334818199573);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.004_medium.glb', 280.1292628239384, 'test_tiling/LOD_Tile_+020_+014.004_high.glb', 0.18809536070147143);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.003_medium.glb', 280.12275338091985, 'test_tiling/LOD_Tile_+020_+014.003_high.glb', 0.18086264623640294);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014_medium.glb', 280.1143982521744, 'test_tiling/LOD_Tile_+020_+014_high.glb', 0.17157916985257538);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+013.004_medium.glb', 280.0215312060966, 'test_tiling/LOD_Tile_+020_+013.004_high.glb', 0.06839356309950724);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+013.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+013.005_medium.glb', 280.1965556186522, 'test_tiling/LOD_Tile_+020_+013.005_high.glb', 0.2628651326057101);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+013.003_medium.glb', 280.31387170277543, 'test_tiling/LOD_Tile_+020_+013.003_high.glb', 0.39321633718707205);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+013_medium.glb', 279.9614112264324, 'test_tiling/LOD_Tile_+020_+013_high.glb', 0.0015935856948319108);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+016_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.001_medium.glb', 325.72015055591083, 'test_tiling/LOD_Tile_+020_+014.001_high.glb', 50.84463728511532);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015_medium.glb', 280.2102395561432, 'test_tiling/LOD_Tile_+016_+015_high.glb', 0.2780695075957457);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+014.002_medium.glb', 318.67649655988265, 'test_tiling/LOD_Tile_+020_+014.002_high.glb', 43.01835506730624);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+013.001_medium.glb', 322.62248363454717, 'test_tiling/LOD_Tile_+020_+013.001_high.glb', 47.40278515026678);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015.003_medium.glb', 280.3597669707866, 'test_tiling/LOD_Tile_+016_+015.003_high.glb', 0.44421107942169324);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+019_medium.glb', 332.5212790962346, 'test_tiling/LOD_Tile_+004_+019_high.glb', 58.40144677436389);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015.007_medium.glb', 281.2475787527204, 'test_tiling/LOD_Tile_+016_+015.007_high.glb', 1.4306686149037027);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+013.002_medium.glb', 321.7741618018235, 'test_tiling/LOD_Tile_+020_+013.002_high.glb', 46.46020533612936);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015.006_medium.glb', 280.0597649470049, 'test_tiling/LOD_Tile_+016_+015.006_high.glb', 0.11087549744206378);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015.004_medium.glb', 280.36092073429376, 'test_tiling/LOD_Tile_+016_+015.004_high.glb', 0.44549303887409314);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015.005_medium.glb', 280.0864660911102, 'test_tiling/LOD_Tile_+016_+015.005_high.glb', 0.14054343533683256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+010_medium.glb', 279.9706883583299, 'test_tiling/LOD_Tile_+012_+010_high.glb', 0.01190151002533715);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+010.003_medium.glb', 279.9745325572642, 'test_tiling/LOD_Tile_+012_+010.003_high.glb', 0.01617284217459973);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+015.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+005.003_medium.glb', 280.22479511410035, 'test_tiling/LOD_Tile_+015_+005.003_high.glb', 0.2942423497703454);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+005_medium.glb', 281.1440507303057, 'test_tiling/LOD_Tile_+015_+005_high.glb', 1.315637478887411);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+015.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+015.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+005.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+005.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+012_medium.glb', 280.0111271814578, 'test_tiling/LOD_Tile_+016_+012_high.glb', 0.056833535723062656);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+005.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+005.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+010.002_medium.glb', 315.86491764387733, 'test_tiling/LOD_Tile_+012_+010.002_high.glb', 39.894378493966975);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+010.001_medium.glb', 328.5317277924933, 'test_tiling/LOD_Tile_+012_+010.001_high.glb', 53.968611992429175);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+012.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+012.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+012.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+012.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+028.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+028.001_medium.glb', 321.1380232919311, 'test_tiling/LOD_Tile_+012_+028.001_high.glb', 45.753384769582276);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+016.001_medium.glb', 325.1221416627092, 'test_tiling/LOD_Tile_+008_+016.001_high.glb', 50.18018295933575);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+028_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+028_medium.glb', 323.2586221444395, 'test_tiling/LOD_Tile_+012_+028_high.glb', 48.109605716813874);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+016_medium.glb', 319.2745037736614, 'test_tiling/LOD_Tile_+008_+016_high.glb', 43.68280752706039);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+017.003_medium.glb', 280.04244170016887, 'test_tiling/LOD_Tile_+012_+017.003_high.glb', 0.0916274454020273);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+002.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+002.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+002.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+017_medium.glb', 280.0874922184797, 'test_tiling/LOD_Tile_+012_+017_high.glb', 0.14168357685854485);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+003_medium.glb', 280.9615428094708, 'test_tiling/LOD_Tile_+019_+003_high.glb', 1.1128509001819447);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+024_medium.glb', 321.56997421124487, 'test_tiling/LOD_Tile_+016_+024_high.glb', 46.23333023548644);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+017.001_medium.glb', 318.93752253785044, 'test_tiling/LOD_Tile_+012_+017.001_high.glb', 43.308383931714836);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+012_medium.glb', 311.92641407749215, 'test_tiling/LOD_Tile_+000_+012_high.glb', 35.518263420205685);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+012.001_medium.glb', 332.47023303830133, 'test_tiling/LOD_Tile_+000_+012.001_high.glb', 58.344728932215865);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+003.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+003.002_medium.glb', 316.98728434060587, 'test_tiling/LOD_Tile_+019_+003.002_high.glb', 41.141452601443135);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+020_medium.glb', 326.33814626060985, 'test_tiling/LOD_Tile_+008_+020_high.glb', 51.531299179225314);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+020.001_medium.glb', 318.0585008551837, 'test_tiling/LOD_Tile_+008_+020.001_high.glb', 42.331693173196236);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+003.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+003.001_medium.glb', 327.4093610957648, 'test_tiling/LOD_Tile_+019_+003.001_high.glb', 52.72153788495301);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+017.002_medium.glb', 325.4591245779431, 'test_tiling/LOD_Tile_+012_+017.002_high.glb', 50.55460842070672);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+021_medium.glb', 280.5707461474248, 'test_tiling/LOD_Tile_+012_+021_high.glb', 0.6786323867975171);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+019_medium.glb', 281.9029886399704, 'test_tiling/LOD_Tile_+012_+019_high.glb', 2.158901822959214);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.006_medium.glb', 280.0035412283838, 'test_tiling/LOD_Tile_+019_+004.006_high.glb', 0.048404698974168346);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.007_medium.glb', 280.1427418718401, 'test_tiling/LOD_Tile_+019_+004.007_high.glb', 0.20307208059224535);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.005_medium.glb', 280.0307562758853, 'test_tiling/LOD_Tile_+019_+004.005_high.glb', 0.07864364064249517);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+017.001_medium.glb', 319.9588198872363, 'test_tiling/LOD_Tile_+004_+017.001_high.glb', 44.44315876436584);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.004_medium.glb', 279.9632065294734, 'test_tiling/LOD_Tile_+019_+004.004_high.glb', 0.0035883668514774757);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+019.001_medium.glb', 319.013990019667, 'test_tiling/LOD_Tile_+012_+019.001_high.glb', 43.39334780039995);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+021.002_medium.glb', 325.63420105260747, 'test_tiling/LOD_Tile_+012_+021.002_high.glb', 50.74913783700043);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+019.002_medium.glb', 325.38265541670364, 'test_tiling/LOD_Tile_+012_+019.002_high.glb', 50.469642685996206);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+017_medium.glb', 324.4378272285572, 'test_tiling/LOD_Tile_+004_+017_high.glb', 49.41983358805571);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+021.001_medium.glb', 318.7624460631861, 'test_tiling/LOD_Tile_+012_+021.001_high.glb', 43.11385451542112);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.003_medium.glb', 280.9172094047226, 'test_tiling/LOD_Tile_+019_+004.003_high.glb', 1.0635915615728428);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004_medium.glb', 279.96602460103816, 'test_tiling/LOD_Tile_+019_+004_high.glb', 0.006719557479027764);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.008_medium.glb', 279.96920206909573, 'test_tiling/LOD_Tile_+019_+004.008_high.glb', 0.010250077542987922);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+023.001_medium.glb', 286.49147084006523, 'test_tiling/LOD_Tile_+016_+023.001_high.glb', 7.257215378620175);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.001_medium.glb', 341.51250604542304, 'test_tiling/LOD_Tile_+019_+004.001_high.glb', 68.39169894012888);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+023_medium.glb', 284.57316183029974, 'test_tiling/LOD_Tile_+016_+023_high.glb', 5.125760923325226);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+004.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+004.002_medium.glb', 302.8841393909476, 'test_tiling/LOD_Tile_+019_+004.002_high.glb', 25.47129154626728);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+009_medium.glb', 280.2450405567187, 'test_tiling/LOD_Tile_+011_+009_high.glb', 0.31673728601296686);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+010.001_medium.glb', 319.6130737435012, 'test_tiling/LOD_Tile_+004_+010.001_high.glb', 44.05899638243793);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+026_medium.glb', 323.8151677665665, 'test_tiling/LOD_Tile_+012_+026_high.glb', 48.727989741399405);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+010_medium.glb', 324.78357169286943, 'test_tiling/LOD_Tile_+004_+010_high.glb', 49.80399410395821);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+026.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+026.001_medium.glb', 320.581479349227, 'test_tiling/LOD_Tile_+012_+026.001_high.glb', 45.13500261102215);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+018_medium.glb', 319.89608672559666, 'test_tiling/LOD_Tile_+008_+018_high.glb', 44.37345525143288);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+018.001_medium.glb', 324.500558710774, 'test_tiling/LOD_Tile_+008_+018.001_high.glb', 49.48953523496327);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+009.001_medium.glb', 317.2057705374435, 'test_tiling/LOD_Tile_+011_+009.001_high.glb', 41.384215042373874);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+009.002_medium.glb', 327.1908748989271, 'test_tiling/LOD_Tile_+011_+009.002_high.glb', 52.47877544402227);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+010_medium.glb', 327.1396222719817, 'test_tiling/LOD_Tile_+005_+010_high.glb', 52.42182808074958);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+010.001_medium.glb', 317.25702316438895, 'test_tiling/LOD_Tile_+005_+010.001_high.glb', 41.44116240564657);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+019_medium.glb', 280.04008379046866, 'test_tiling/LOD_Tile_+013_+019_high.glb', 0.08900754573511394);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+026_medium.glb', 321.99623692532026, 'test_tiling/LOD_Tile_+013_+026_high.glb', 46.70695547334799);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+018.001_medium.glb', 321.1509380537507, 'test_tiling/LOD_Tile_+009_+018.001_high.glb', 45.76773450493738);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+019.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+019.003_medium.glb', 280.26046773514196, 'test_tiling/LOD_Tile_+013_+019.003_high.glb', 0.3338785953721307);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.014_medium.glb', 280.0183016759303, 'test_tiling/LOD_Tile_+018_+004.014_high.glb', 0.06480519624802977);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+018_medium.glb', 323.24570738261997, 'test_tiling/LOD_Tile_+009_+018_high.glb', 48.09525598145877);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+026.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+026.001_medium.glb', 322.4004101904733, 'test_tiling/LOD_Tile_+013_+026.001_high.glb', 47.15603687907356);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+019.001_medium.glb', 319.845193495144, 'test_tiling/LOD_Tile_+013_+019.001_high.glb', 44.316907217596594);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.013_medium.glb', 279.9649480909827, 'test_tiling/LOD_Tile_+018_+004.013_high.glb', 0.005523435195201939);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+019.002_medium.glb', 324.5514519412267, 'test_tiling/LOD_Tile_+013_+019.002_high.glb', 49.546083268799556);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.007_medium.glb', 281.102637841917, 'test_tiling/LOD_Tile_+018_+004.007_high.glb', 1.2696231584554905);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.003_medium.glb', 286.28492533978635, 'test_tiling/LOD_Tile_+018_+004.003_high.glb', 7.027720378310342);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.001_medium.glb', 344.4398358234429, 'test_tiling/LOD_Tile_+018_+004.001_high.glb', 71.64428758237317);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.012_medium.glb', 280.10732620249655, 'test_tiling/LOD_Tile_+018_+004.012_high.glb', 0.16372133687723908);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.006_medium.glb', 280.4317503935579, 'test_tiling/LOD_Tile_+018_+004.006_high.glb', 0.5241926602787018);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.010_medium.glb', 280.0618138428983, 'test_tiling/LOD_Tile_+018_+004.010_high.glb', 0.1131520484346808);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.002_medium.glb', 329.89305620961017, 'test_tiling/LOD_Tile_+018_+004.002_high.glb', 55.48119912255901);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.004_medium.glb', 283.6945499268117, 'test_tiling/LOD_Tile_+018_+004.004_high.glb', 4.149525475005147);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.005_medium.glb', 280.2656940990929, 'test_tiling/LOD_Tile_+018_+004.005_high.glb', 0.3396856664287079);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.011_medium.glb', 280.1435614301974, 'test_tiling/LOD_Tile_+018_+004.011_high.glb', 0.20398270098929214);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004_medium.glb', 279.98754976387846, 'test_tiling/LOD_Tile_+018_+004_high.glb', 0.030636405079332914);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.008_medium.glb', 280.30797692852485, 'test_tiling/LOD_Tile_+018_+004.008_high.glb', 0.3866665880197887);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+004.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+004.009_medium.glb', 280.57894676926685, 'test_tiling/LOD_Tile_+018_+004.009_high.glb', 0.6877441888441965);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+015_medium.glb', 316.2912324200615, 'test_tiling/LOD_Tile_+001_+015_high.glb', 40.368061578616036);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+012_medium.glb', 279.9817070517367, 'test_tiling/LOD_Tile_+001_+012_high.glb', 0.024144502699566854);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+017.001_medium.glb', 320.09771151688574, 'test_tiling/LOD_Tile_+005_+017.001_high.glb', 44.597482797309624);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+017_medium.glb', 324.2989339194849, 'test_tiling/LOD_Tile_+005_+017_high.glb', 49.265507689086526);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+003.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+003.003_medium.glb', 281.70633494035695, 'test_tiling/LOD_Tile_+018_+003.003_high.glb', 1.9403977122776712);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+012.002_medium.glb', 320.1160608910913, 'test_tiling/LOD_Tile_+001_+012.002_high.glb', 44.61787099087137);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+020.001_medium.glb', 318.2802165821877, 'test_tiling/LOD_Tile_+009_+020.001_high.glb', 42.57804398097845);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+012.001_medium.glb', 324.28058622470223, 'test_tiling/LOD_Tile_+001_+012.001_high.glb', 49.24512136155018);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+020_medium.glb', 326.11643053360586, 'test_tiling/LOD_Tile_+009_+020_high.glb', 51.2849483714431);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+021.001_medium.glb', 329.42392118867775, 'test_tiling/LOD_Tile_+013_+021.001_high.glb', 54.95993798818965);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+021_medium.glb', 314.9727242476929, 'test_tiling/LOD_Tile_+013_+021_high.glb', 38.90305249820649);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+003_medium.glb', 280.47797986671884, 'test_tiling/LOD_Tile_+018_+003_high.glb', 0.5755587415686761);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+003.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+003.002_medium.glb', 345.4211561909883, 'test_tiling/LOD_Tile_+018_+003.002_high.glb', 72.73464354631248);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+002_medium.glb', 323.14966118906176, 'test_tiling/LOD_Tile_+014_+002_high.glb', 47.988537988616336);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+017.003_medium.glb', 280.5772035283346, 'test_tiling/LOD_Tile_+013_+017.003_high.glb', 0.6858072544750683);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+017_medium.glb', 279.9779149149111, 'test_tiling/LOD_Tile_+013_+017_high.glb', 0.01993101733782159);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+021_medium.glb', 322.7669123213772, 'test_tiling/LOD_Tile_+005_+021_high.glb', 47.56326146896684);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+028_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+028_medium.glb', 327.3696410656224, 'test_tiling/LOD_Tile_+013_+028_high.glb', 52.67740451812811);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+016.001_medium.glb', 323.13295261099375, 'test_tiling/LOD_Tile_+009_+016.001_high.glb', 47.96997290187409);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+028.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+028.001_medium.glb', 317.0270043707483, 'test_tiling/LOD_Tile_+013_+028.001_high.glb', 41.18558596826804);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+016_medium.glb', 321.2636928253769, 'test_tiling/LOD_Tile_+009_+016_high.glb', 45.89301758452206);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+017.001_medium.glb', 314.5322653721531, 'test_tiling/LOD_Tile_+013_+017.001_high.glb', 38.41365374760676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+017.002_medium.glb', 329.8643800642175, 'test_tiling/LOD_Tile_+013_+017.002_high.glb', 55.44933673878939);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+003.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+003.001_medium.glb', 332.952410457191, 'test_tiling/LOD_Tile_+018_+003.001_high.glb', 58.880481619871006);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+010_medium.glb', 281.6851674945866, 'test_tiling/LOD_Tile_+013_+010_high.glb', 1.9168783280883723);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+010.002_medium.glb', 318.01088753758324, 'test_tiling/LOD_Tile_+013_+010.002_high.glb', 42.27878948697354);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+009_medium.glb', 342.1405463782681, 'test_tiling/LOD_Tile_+006_+009_high.glb', 69.0895215321789);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+010.001_medium.glb', 326.3857578987874, 'test_tiling/LOD_Tile_+013_+010.001_high.glb', 51.584200999422606);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015_medium.glb', 280.11980599379456, 'test_tiling/LOD_Tile_+017_+015_high.glb', 0.17758777165276127);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+005.001_medium.glb', 322.26407968069054, 'test_tiling/LOD_Tile_+014_+005.001_high.glb', 47.004558534870554);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+012_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+019.001_medium.glb', 319.1443233104045, 'test_tiling/LOD_Tile_+005_+019.001_high.glb', 43.53816256788604);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+005_medium.glb', 322.13256743510294, 'test_tiling/LOD_Tile_+014_+005_high.glb', 46.858433817551);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+019_medium.glb', 325.25232212596615, 'test_tiling/LOD_Tile_+005_+019_high.glb', 50.3248279185101);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+011_medium.glb', 316.38215301504056, 'test_tiling/LOD_Tile_+009_+011_high.glb', 40.46908446192612);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+011.001_medium.glb', 328.0144924213301, 'test_tiling/LOD_Tile_+009_+011.001_high.glb', 53.39390602447002);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015.006_medium.glb', 279.9676905885187, 'test_tiling/LOD_Tile_+017_+015.006_high.glb', 0.008570654679581926);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015.007_medium.glb', 279.968202812492, 'test_tiling/LOD_Tile_+017_+015.007_high.glb', 0.00913979242773618);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015.005_medium.glb', 279.9858333937121, 'test_tiling/LOD_Tile_+017_+015.005_high.glb', 0.028729327116665218);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015.004_medium.glb', 280.4374402782191, 'test_tiling/LOD_Tile_+017_+015.004_high.glb', 0.5305147543467235);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015.003_medium.glb', 280.0922063584573, 'test_tiling/LOD_Tile_+017_+015.003_high.glb', 0.14692151016696778);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.003_medium.glb', 281.54950371568066, 'test_tiling/LOD_Tile_+021_+013.003_high.glb', 1.7661407959706652);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.005_medium.glb', 279.9604892232804, 'test_tiling/LOD_Tile_+021_+013.005_high.glb', 0.0005691377481542538);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.004_medium.glb', 279.96453831180406, 'test_tiling/LOD_Tile_+021_+013.004_high.glb', 0.005068124996678536);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.006_medium.glb', 280.3332455249277, 'test_tiling/LOD_Tile_+021_+013.006_high.glb', 0.4147428062451294);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.007_medium.glb', 279.9757115121143, 'test_tiling/LOD_Tile_+021_+013.007_high.glb', 0.017482792008056407);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.009_medium.glb', 280.0745253945514, 'test_tiling/LOD_Tile_+021_+013.009_high.glb', 0.1272759947159252);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.008_medium.glb', 279.9737129989069, 'test_tiling/LOD_Tile_+021_+013.008_high.glb', 0.015262221777552926);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013_medium.glb', 280.0085123200595, 'test_tiling/LOD_Tile_+021_+013_high.glb', 0.05392813416937028);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+026_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+026_+006_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+026_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.001_medium.glb', 320.49383866710014, 'test_tiling/LOD_Tile_+021_+013.001_high.glb', 45.03762407532566);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+013.002_medium.glb', 323.90280844869335, 'test_tiling/LOD_Tile_+021_+013.002_high.glb', 48.82536827709589);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015.001_medium.glb', 325.4327811509077, 'test_tiling/LOD_Tile_+017_+015.001_high.glb', 50.525337946222955);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+014.003_medium.glb', 280.18897134500105, 'test_tiling/LOD_Tile_+021_+014.003_high.glb', 0.25443816188221957);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+015.002_medium.glb', 318.963813902777, 'test_tiling/LOD_Tile_+017_+015.002_high.glb', 43.337596559411075);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+014.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+014.006_medium.glb', 279.9786320284738, 'test_tiling/LOD_Tile_+021_+014.006_high.glb', 0.020727810185237543);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+016_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+025_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+014.005_medium.glb', 279.99344453812904, 'test_tiling/LOD_Tile_+021_+014.005_high.glb', 0.037186154246616296);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+014.004_medium.glb', 280.67955427532206, 'test_tiling/LOD_Tile_+021_+014.004_high.glb', 0.799530306683307);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+014_medium.glb', 280.03126849985864, 'test_tiling/LOD_Tile_+021_+014_high.glb', 0.07921277839064943);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+014.001_medium.glb', 317.5366537888375, 'test_tiling/LOD_Tile_+021_+014.001_high.glb', 41.75186309947829);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+014.002_medium.glb', 326.859993326956, 'test_tiling/LOD_Tile_+021_+014.002_high.glb', 52.11112925294326);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+004.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+004.003_medium.glb', 280.0323450099141, 'test_tiling/LOD_Tile_+014_+004.003_high.glb', 0.08040890067447524);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+011.001_medium.glb', 333.48245814537916, 'test_tiling/LOD_Tile_+025_+011.001_high.glb', 59.46942349563563);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+004_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+011_medium.glb', 342.85745841019883, 'test_tiling/LOD_Tile_+025_+011_high.glb', 69.8860904565464);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+004_medium.glb', 280.0349078092036, 'test_tiling/LOD_Tile_+014_+004_high.glb', 0.0832564554406503);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+004.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+004.002_medium.glb', 315.9184257357283, 'test_tiling/LOD_Tile_+014_+004.002_high.glb', 39.95383192935695);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+011_medium.glb', 280.0028241148211, 'test_tiling/LOD_Tile_+013_+011_high.glb', 0.047607906126752385);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+011.006_medium.glb', 279.9730462680301, 'test_tiling/LOD_Tile_+013_+011.006_high.glb', 0.014521409692250502);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+011.005_medium.glb', 279.972789316332, 'test_tiling/LOD_Tile_+013_+011.005_high.glb', 0.014235907805471484);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+011.004_medium.glb', 280.04346614811556, 'test_tiling/LOD_Tile_+013_+011.004_high.glb', 0.0927657208983358);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+011.003_medium.glb', 279.9950332721578, 'test_tiling/LOD_Tile_+013_+011.003_high.glb', 0.03895141427859637);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+004.001_medium.glb', 328.4782213800652, 'test_tiling/LOD_Tile_+014_+004.001_high.glb', 53.9091604230646);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+014_medium.glb', 280.0377006894255, 'test_tiling/LOD_Tile_+017_+014_high.glb', 0.08635965568714382);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+014.003_medium.glb', 280.50629661561874, 'test_tiling/LOD_Tile_+017_+014.003_high.glb', 0.6070217959018854);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+016.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+016.004_medium.glb', 279.96218040210385, 'test_tiling/LOD_Tile_+013_+016.004_high.glb', 0.0024482253297651835);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+020_medium.glb', 321.8964489776224, 'test_tiling/LOD_Tile_+005_+020_high.glb', 46.59607997590592);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+018_medium.glb', 321.2712787784509, 'test_tiling/LOD_Tile_+005_+018_high.glb', 45.901446421270954);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+011.001_medium.glb', 328.8525126742096, 'test_tiling/LOD_Tile_+013_+011.001_high.glb', 54.32503963878064);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+020.001_medium.glb', 329.76976977720756, 'test_tiling/LOD_Tile_+005_+020.001_high.glb', 55.34421419766719);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+018.001_medium.glb', 323.1253683373426, 'test_tiling/LOD_Tile_+005_+018.001_high.glb', 47.96154593115059);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+011.002_medium.glb', 315.54413276216104, 'test_tiling/LOD_Tile_+013_+011.002_high.glb', 39.53795084761552);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+016.003_medium.glb', 280.3319641252829, 'test_tiling/LOD_Tile_+013_+016.003_high.glb', 0.4133190288620418);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+016_medium.glb', 279.9657676493401, 'test_tiling/LOD_Tile_+013_+016_high.glb', 0.006434055592248745);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+003_medium.glb', 282.1294201863748, 'test_tiling/LOD_Tile_+014_+003_high.glb', 2.4104924300752586);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+003.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+003.003_medium.glb', 280.0254761704028, 'test_tiling/LOD_Tile_+014_+003.003_high.glb', 0.07277685677299689);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+014.001_medium.glb', 313.8755757646813, 'test_tiling/LOD_Tile_+017_+014.001_high.glb', 37.683998628193564);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+014.002_medium.glb', 330.5210192890035, 'test_tiling/LOD_Tile_+017_+014.002_high.glb', 56.17893587744047);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+003.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+003.001_medium.glb', 340.10338629188226, 'test_tiling/LOD_Tile_+014_+003.001_high.glb', 66.82601032508353);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+003.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+003.002_medium.glb', 335.1708491268757, 'test_tiling/LOD_Tile_+014_+003.002_high.glb', 61.34541347507627);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+029.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+029.001_medium.glb', 324.64042608510704, 'test_tiling/LOD_Tile_+013_+029.001_high.glb', 49.64494342866665);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+013.003_medium.glb', 282.48003329756807, 'test_tiling/LOD_Tile_+017_+013.003_high.glb', 2.8000625536233357);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+013_medium.glb', 279.9828356239009, 'test_tiling/LOD_Tile_+017_+013_high.glb', 0.025398471770909994);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+029_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+029_medium.glb', 319.75622103068645, 'test_tiling/LOD_Tile_+013_+029_high.glb', 44.2180489237549);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+016.002_medium.glb', 324.59286315019256, 'test_tiling/LOD_Tile_+013_+016.002_high.glb', 49.59209572320607);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+017_medium.glb', 283.6504230910757, 'test_tiling/LOD_Tile_+009_+017_high.glb', 4.100495657520711);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+020.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+020.004_medium.glb', 280.56674912100993, 'test_tiling/LOD_Tile_+013_+020.004_high.glb', 0.6741912463365102);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+017.002_medium.glb', 330.30155902690507, 'test_tiling/LOD_Tile_+009_+017.002_high.glb', 55.93509114177554);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+017.001_medium.glb', 314.09508640946564, 'test_tiling/LOD_Tile_+009_+017.001_high.glb', 37.92789934462061);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+016.001_medium.glb', 319.80378228617815, 'test_tiling/LOD_Tile_+013_+016.001_high.glb', 44.27089476319008);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+013.002_medium.glb', 328.5302415032592, 'test_tiling/LOD_Tile_+017_+013.002_high.glb', 53.96696055994682);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+016_medium.glb', 323.40622829932715, 'test_tiling/LOD_Tile_+005_+016_high.glb', 48.27361255557789);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+020.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+020.003_medium.glb', 280.48074755559776, 'test_tiling/LOD_Tile_+013_+020.003_high.glb', 0.5786339514341128);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+013.001_medium.glb', 315.8663535504256, 'test_tiling/LOD_Tile_+017_+013.001_high.glb', 39.89597394568721);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+016.001_medium.glb', 320.9904171370435, 'test_tiling/LOD_Tile_+005_+016.001_high.glb', 45.58937793081826);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+020_medium.glb', 280.1393595141932, 'test_tiling/LOD_Tile_+013_+020_high.glb', 0.19931390542902347);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+002.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+002.004_medium.glb', 280.23691718832845, 'test_tiling/LOD_Tile_+018_+002.004_high.glb', 0.3077113211348615);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+002_medium.glb', 280.73444453218957, 'test_tiling/LOD_Tile_+018_+002_high.glb', 0.8605194809805976);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+002.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+002.003_medium.glb', 280.1276472191438, 'test_tiling/LOD_Tile_+018_+002.003_high.glb', 0.1863002442630308);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+020.001_medium.glb', 331.5199702377689, 'test_tiling/LOD_Tile_+013_+020.001_high.glb', 57.28888137606872);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+002.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+002.001_medium.glb', 340.011926602164, 'test_tiling/LOD_Tile_+018_+002.001_high.glb', 66.72438844761884);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+019.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+019.003_medium.glb', 288.04199463985907, 'test_tiling/LOD_Tile_+009_+019.003_high.glb', 8.98001960061335);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+002.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+002.002_medium.glb', 335.7378760270932, 'test_tiling/LOD_Tile_+018_+002.002_high.glb', 61.97544336420682);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+020.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+020.002_medium.glb', 312.87667519860173, 'test_tiling/LOD_Tile_+013_+020.002_high.glb', 36.57410911032742);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+019_medium.glb', 279.97771002532176, 'test_tiling/LOD_Tile_+009_+019_high.glb', 0.01970336223855989);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+013_medium.glb', 322.06199304811406, 'test_tiling/LOD_Tile_+001_+013_high.glb', 46.780017832007765);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+013.001_medium.glb', 322.3346523882566, 'test_tiling/LOD_Tile_+001_+013.001_high.glb', 47.08297265438838);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+021.001_medium.glb', 326.0298142994257, 'test_tiling/LOD_Tile_+009_+021.001_high.glb', 51.18870811124292);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+021_medium.glb', 318.36683281636783, 'test_tiling/LOD_Tile_+009_+021_high.glb', 42.67428424117863);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+019.002_medium.glb', 322.0412874436311, 'test_tiling/LOD_Tile_+009_+019.002_high.glb', 46.757011604804504);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+011.003_medium.glb', 282.6229236330552, 'test_tiling/LOD_Tile_+005_+011.003_high.glb', 2.958829593053527);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+011_medium.glb', 280.7836986459276, 'test_tiling/LOD_Tile_+005_+011_high.glb', 0.9152462740227877);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+027_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+027_medium.glb', 329.42443341265107, 'test_tiling/LOD_Tile_+013_+027_high.glb', 54.96050712593781);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+027.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+027.001_medium.glb', 314.9722120237196, 'test_tiling/LOD_Tile_+013_+027.001_high.glb', 38.90248336045834);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+019.001_medium.glb', 322.3553596721624, 'test_tiling/LOD_Tile_+009_+019.001_high.glb', 47.105980747617046);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+026_medium.glb', 300.5458218378501, 'test_tiling/LOD_Tile_+009_+026_high.glb', 22.873160931714477);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+011.002_medium.glb', 325.856376941476, 'test_tiling/LOD_Tile_+005_+011.002_high.glb', 50.99599993574329);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+011.001_medium.glb', 318.54026849489463, 'test_tiling/LOD_Tile_+005_+011.001_high.glb', 42.86699055065285);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.004_medium.glb', 281.8328240321601, 'test_tiling/LOD_Tile_+018_+005.004_high.glb', 2.080941147614504);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.010_medium.glb', 280.23002315747414, 'test_tiling/LOD_Tile_+018_+005.010_high.glb', 0.3000512868523264);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.011_medium.glb', 280.0706291335083, 'test_tiling/LOD_Tile_+018_+005.011_high.glb', 0.12294681577914532);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+014_medium.glb', 334.85426616116365, 'test_tiling/LOD_Tile_+001_+014_high.glb', 60.99365462428508);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.005_medium.glb', 280.9521111706699, 'test_tiling/LOD_Tile_+018_+005.005_high.glb', 1.1023713015142913);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.013_medium.glb', 280.06089183974626, 'test_tiling/LOD_Tile_+018_+005.013_high.glb', 0.11212760048800313);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+014.001_medium.glb', 309.542379275207, 'test_tiling/LOD_Tile_+001_+014.001_high.glb', 32.869335862111065);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.007_medium.glb', 280.0145095391047, 'test_tiling/LOD_Tile_+018_+005.007_high.glb', 0.06059171088628451);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.012_medium.glb', 280.31879241176523, 'test_tiling/LOD_Tile_+018_+005.012_high.glb', 0.3986837916201605);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.006_medium.glb', 279.9872424294945, 'test_tiling/LOD_Tile_+018_+005.006_high.glb', 0.030294922430440362);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.016_medium.glb', 280.1799494853788, 'test_tiling/LOD_Tile_+018_+005.016_high.glb', 0.24441387341308954);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.003_medium.glb', 281.96110842700426, 'test_tiling/LOD_Tile_+018_+005.003_high.glb', 2.223479364107982);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.017_medium.glb', 280.48295095839455, 'test_tiling/LOD_Tile_+018_+005.017_high.glb', 0.581082176763878);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.015_medium.glb', 280.1480202978998, 'test_tiling/LOD_Tile_+018_+005.015_high.glb', 0.2089369984363398);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.014_medium.glb', 280.0183016759303, 'test_tiling/LOD_Tile_+018_+005.014_high.glb', 0.06480519624802977);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005_medium.glb', 280.4815167312692, 'test_tiling/LOD_Tile_+018_+005_high.glb', 0.5794885910690462);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.008_medium.glb', 280.9655398358857, 'test_tiling/LOD_Tile_+018_+005.008_high.glb', 1.1172920406429516);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.009_medium.glb', 280.0299350381051, 'test_tiling/LOD_Tile_+018_+005.009_high.glb', 0.07773115422004458);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.002_medium.glb', 310.27845856027784, 'test_tiling/LOD_Tile_+018_+005.002_high.glb', 33.68720173441196);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.009_medium.glb', 280.10461057572644, 'test_tiling/LOD_Tile_+021_+015.009_high.glb', 0.16070397379931967);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.008_medium.glb', 280.60544470320565, 'test_tiling/LOD_Tile_+021_+015.008_high.glb', 0.7171863376651074);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+005.001_medium.glb', 340.0185132986343, 'test_tiling/LOD_Tile_+018_+005.001_high.glb', 66.73170699925248);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.010_medium.glb', 279.98667982283524, 'test_tiling/LOD_Tile_+021_+015.010_high.glb', 0.02966980392017258);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.004_medium.glb', 280.28414591809315, 'test_tiling/LOD_Tile_+021_+015.004_high.glb', 0.3601876875400875);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.011_medium.glb', 280.24411687414386, 'test_tiling/LOD_Tile_+021_+015.011_high.glb', 0.31571097204088544);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.005_medium.glb', 280.3590767279897, 'test_tiling/LOD_Tile_+021_+015.005_high.glb', 0.4434441429807378);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+018.001_medium.glb', 315.6078383096386, 'test_tiling/LOD_Tile_+013_+018.001_high.glb', 39.60873478925727);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.013_medium.glb', 280.2552900744541, 'test_tiling/LOD_Tile_+021_+015.013_high.glb', 0.3281256390522633);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.007_medium.glb', 280.1543752340149, 'test_tiling/LOD_Tile_+021_+015.007_high.glb', 0.21599803856426011);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.012_medium.glb', 280.1054805167697, 'test_tiling/LOD_Tile_+021_+015.012_high.glb', 0.16167057495847997);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+018_medium.glb', 328.788807126732, 'test_tiling/LOD_Tile_+013_+018_high.glb', 54.25425569713887);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.006_medium.glb', 279.9711501996173, 'test_tiling/LOD_Tile_+021_+015.006_high.glb', 0.012414667011377872);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.016_medium.glb', 280.0775483557055, 'test_tiling/LOD_Tile_+021_+015.016_high.glb', 0.1306348404427372);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.015_medium.glb', 279.96525542536676, 'test_tiling/LOD_Tile_+021_+015.015_high.glb', 0.005864917844094491);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.003_medium.glb', 287.6956858894647, 'test_tiling/LOD_Tile_+021_+015.003_high.glb', 8.595232100175172);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+005_medium.glb', 281.0558457620968, 'test_tiling/LOD_Tile_+022_+005_high.glb', 1.2176319586552484);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.014_medium.glb', 280.50283700452013, 'test_tiling/LOD_Tile_+021_+015.014_high.glb', 0.6031777835700894);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015_medium.glb', 280.02855287308853, 'test_tiling/LOD_Tile_+021_+015_high.glb', 0.07619541531272998);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+005.003_medium.glb', 280.42529301264807, 'test_tiling/LOD_Tile_+022_+005.003_high.glb', 0.5170177926011507);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+005.002_medium.glb', 315.807209315445, 'test_tiling/LOD_Tile_+022_+005.002_high.glb', 39.830258129042136);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+012.003_medium.glb', 280.38393218636816, 'test_tiling/LOD_Tile_+021_+012.003_high.glb', 0.4710613189567475);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+012_medium.glb', 280.15519479237224, 'test_tiling/LOD_Tile_+021_+012_high.glb', 0.21690865896130693);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.002_medium.glb', 320.76665251414613, 'test_tiling/LOD_Tile_+021_+015.002_high.glb', 45.34075057204342);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+005.001_medium.glb', 328.58943780034855, 'test_tiling/LOD_Tile_+022_+005.001_high.glb', 54.032734223379414);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+011_medium.glb', 297.7647916237301, 'test_tiling/LOD_Tile_+010_+011_high.glb', 19.783127360470058);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+010_medium.glb', 335.05507139409536, 'test_tiling/LOD_Tile_+025_+010_high.glb', 61.21677154976477);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+004_medium.glb', 280.2534191973843, 'test_tiling/LOD_Tile_+017_+004_high.glb', 0.3260468867524474);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+004.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+004.003_medium.glb', 279.9848861992171, 'test_tiling/LOD_Tile_+017_+004.003_high.glb', 0.027676888788930796);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+004.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+004.004_medium.glb', 280.31584502463994, 'test_tiling/LOD_Tile_+017_+004.004_high.glb', 0.3954089170365188);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+012.001_medium.glb', 322.5636987960594, 'test_tiling/LOD_Tile_+021_+012.001_high.glb', 47.33746866305812);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+012.002_medium.glb', 321.83294831973416, 'test_tiling/LOD_Tile_+021_+012.002_high.glb', 46.52552368936343);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+014.004_medium.glb', 280.4941241587048, 'test_tiling/LOD_Tile_+014_+014.004_high.glb', 0.5934968437752559);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+014.003_medium.glb', 280.1792844339249, 'test_tiling/LOD_Tile_+014_+014.003_high.glb', 0.24367492735319093);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+014.005_medium.glb', 279.9723291544674, 'test_tiling/LOD_Tile_+014_+014.005_high.glb', 0.013724616844834548);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+004.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+004.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+004.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+004.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+004.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+018_medium.glb', 324.2139584814423, 'test_tiling/LOD_Tile_+006_+018_high.glb', 49.171090535705844);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+018.001_medium.glb', 320.18268695492833, 'test_tiling/LOD_Tile_+006_+018.001_high.glb', 44.691899950690306);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+015.001_medium.glb', 323.62999460164735, 'test_tiling/LOD_Tile_+021_+015.001_high.glb', 48.52224178037813);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+014_medium.glb', 279.9751472260322, 'test_tiling/LOD_Tile_+014_+014_high.glb', 0.016855807472384833);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+014.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+014.006_medium.glb', 279.97586433959486, 'test_tiling/LOD_Tile_+014_+014.006_high.glb', 0.01765260031980079);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+003_medium.glb', 280.2695382980272, 'test_tiling/LOD_Tile_+017_+003_high.glb', 0.3439569985779704);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+016_medium.glb', 281.06845318953236, 'test_tiling/LOD_Tile_+010_+016_high.glb', 1.2316402113614582);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+003.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+003.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+003.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+020_medium.glb', 326.5793365751379, 'test_tiling/LOD_Tile_+006_+020_high.glb', 51.79928841758982);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+003.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+003.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+003.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+020.001_medium.glb', 317.81730886123273, 'test_tiling/LOD_Tile_+006_+020.001_high.glb', 42.06370206880632);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+014.001_medium.glb', 317.1888066871003, 'test_tiling/LOD_Tile_+014_+014.001_high.glb', 41.365366319770246);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+013.003_medium.glb', 280.6014980594766, 'test_tiling/LOD_Tile_+014_+013.003_high.glb', 0.712801177966214);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+014.002_medium.glb', 327.20783874927037, 'test_tiling/LOD_Tile_+014_+014.002_high.glb', 52.4976241666259);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+013_medium.glb', 280.14253698225076, 'test_tiling/LOD_Tile_+014_+013_high.glb', 0.20284442549298362);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+016.001_medium.glb', 314.57931608309434, 'test_tiling/LOD_Tile_+010_+016.001_high.glb', 38.46593231531918);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+006.004_medium.glb', 280.04807952272137, 'test_tiling/LOD_Tile_+013_+006.004_high.glb', 0.09789169268253166);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+006.003_medium.glb', 279.9922655832789, 'test_tiling/LOD_Tile_+013_+006.003_high.glb', 0.03587620441315962);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+016.002_medium.glb', 329.8173310326992, 'test_tiling/LOD_Tile_+010_+016.002_high.glb', 55.39706003710237);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+006_medium.glb', 279.97043308605464, 'test_tiling/LOD_Tile_+013_+006_high.glb', 0.011617874163961915);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+012.005_medium.glb', 280.1255714524846, 'test_tiling/LOD_Tile_+018_+012.005_high.glb', 0.1839938368639532);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+012_medium.glb', 280.03265234429807, 'test_tiling/LOD_Tile_+018_+012_high.glb', 0.0807503833233678);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+012.004_medium.glb', 284.2751314489597, 'test_tiling/LOD_Tile_+018_+012.004_high.glb', 4.794616055169639);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+012.003_medium.glb', 280.777803871677, 'test_tiling/LOD_Tile_+018_+012.003_high.glb', 0.9086965248555043);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+013.001_medium.glb', 329.9376700779766, 'test_tiling/LOD_Tile_+014_+013.001_high.glb', 55.530770087410545);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+006.001_medium.glb', 322.97232924949185, 'test_tiling/LOD_Tile_+013_+006.001_high.glb', 47.79150250020533);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+006.002_medium.glb', 321.4243161868788, 'test_tiling/LOD_Tile_+013_+006.002_high.glb', 46.07148798619082);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+016_medium.glb', 280.0041558971518, 'test_tiling/LOD_Tile_+006_+016_high.glb', 0.04908766427195344);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+013.002_medium.glb', 314.4589753583941, 'test_tiling/LOD_Tile_+014_+013.002_high.glb', 38.332220398985605);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+020_medium.glb', 281.6624633768962, 'test_tiling/LOD_Tile_+010_+020_high.glb', 1.8916515306546104);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+016.002_medium.glb', 314.92300997209037, 'test_tiling/LOD_Tile_+006_+016.002_high.glb', 38.84781441420366);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+016.001_medium.glb', 329.4736354642803, 'test_tiling/LOD_Tile_+006_+016.001_high.glb', 55.01517607219248);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+012.001_medium.glb', 324.86373054613983, 'test_tiling/LOD_Tile_+018_+012.001_high.glb', 49.893059496480845);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+012.002_medium.glb', 319.53288969888786, 'test_tiling/LOD_Tile_+018_+012.002_high.glb', 43.96990299953425);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+025_medium.glb', 321.75873462340024, 'test_tiling/LOD_Tile_+014_+025_high.glb', 46.4430640267702);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+025.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+025.001_medium.glb', 322.6379108129704, 'test_tiling/LOD_Tile_+014_+025.001_high.glb', 47.41992645962595);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+011_medium.glb', 280.02096692001453, 'test_tiling/LOD_Tile_+006_+011_high.glb', 0.06776657856383568);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+020.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+020.002_medium.glb', 323.50565685053226, 'test_tiling/LOD_Tile_+010_+020.002_high.glb', 48.38408872358354);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+013.001_medium.glb', 322.4590925841664, 'test_tiling/LOD_Tile_+002_+013.001_high.glb', 47.2212395387326);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+020.001_medium.glb', 320.8909885858384, 'test_tiling/LOD_Tile_+010_+020.001_high.glb', 45.478901762812605);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+008_medium.glb', 280.5538326797675, 'test_tiling/LOD_Tile_+013_+008_high.glb', 0.659839644956004);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+013_medium.glb', 321.93755285220425, 'test_tiling/LOD_Tile_+002_+013_high.glb', 46.64175094766355);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+027_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+027_medium.glb', 328.7093670664472, 'test_tiling/LOD_Tile_+010_+027_high.glb', 54.16598896348907);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+008.003_medium.glb', 280.22669118251315, 'test_tiling/LOD_Tile_+013_+008.003_high.glb', 0.2963490924512181);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.005_medium.glb', 280.26369558588544, 'test_tiling/LOD_Tile_+018_+015.005_high.glb', 0.3374650961982044);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.004_medium.glb', 280.3946956074997, 'test_tiling/LOD_Tile_+018_+015.004_high.glb', 0.483020675769602);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.010_medium.glb', 281.5273638840724, 'test_tiling/LOD_Tile_+018_+015.010_high.glb', 1.741540983072575);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.007_medium.glb', 279.9968789578847, 'test_tiling/LOD_Tile_+018_+015.007_high.glb', 0.041002176197355474);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+011.001_medium.glb', 325.98963242799584, 'test_tiling/LOD_Tile_+006_+011.001_high.glb', 51.14406158743197);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.006_medium.glb', 279.977350628829, 'test_tiling/LOD_Tile_+018_+015.006_high.glb', 0.01930403280215002);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+011.002_medium.glb', 318.4070130083748, 'test_tiling/LOD_Tile_+006_+011.002_high.glb', 42.71892889896417);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+008.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+013_+008.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015_medium.glb', 280.86698290514676, 'test_tiling/LOD_Tile_+018_+015_high.glb', 1.007784339821862);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.008_medium.glb', 280.2986494139415, 'test_tiling/LOD_Tile_+018_+015.008_high.glb', 0.3763026829271699);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.003_medium.glb', 281.15076338349076, 'test_tiling/LOD_Tile_+018_+015.003_high.glb', 1.3230959824263375);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.009_medium.glb', 280.1112207841168, 'test_tiling/LOD_Tile_+018_+015.009_high.glb', 0.1680486497886152);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+008.001_medium.glb', 355.88861766960787, 'test_tiling/LOD_Tile_+013_+008.001_high.glb', 84.36515630033423);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+018.004_medium.glb', 280.2969078524322, 'test_tiling/LOD_Tile_+010_+018.004_high.glb', 0.3743676145834454);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+018.005_medium.glb', 284.9993724822664, 'test_tiling/LOD_Tile_+010_+018.005_high.glb', 5.599328314399256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+018.003_medium.glb', 281.2461949082809, 'test_tiling/LOD_Tile_+010_+018.003_high.glb', 1.4291310099709844);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+018_medium.glb', 280.63517048788793, 'test_tiling/LOD_Tile_+010_+018_high.glb', 0.7502149873120919);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.002_medium.glb', 324.822601480215, 'test_tiling/LOD_Tile_+018_+015.002_high.glb', 49.847360534342165);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+015.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+015.005_medium.glb', 280.7570462050853, 'test_tiling/LOD_Tile_+022_+015.005_high.glb', 0.8856324508647286);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+018.002_medium.glb', 316.6983765842599, 'test_tiling/LOD_Tile_+010_+018.002_high.glb', 40.82044398328091);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+014.001_medium.glb', 319.96927429456105, 'test_tiling/LOD_Tile_+002_+014.001_high.glb', 44.4547747725044);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+015.001_medium.glb', 319.57402044423554, 'test_tiling/LOD_Tile_+018_+015.001_high.glb', 44.01560382769833);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+014_medium.glb', 324.42737114180966, 'test_tiling/LOD_Tile_+002_+014_high.glb', 49.40821571389174);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+022_medium.glb', 316.7310245647245, 'test_tiling/LOD_Tile_+014_+022_high.glb', 40.85671951713048);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+018.001_medium.glb', 327.6982688521108, 'test_tiling/LOD_Tile_+010_+018.001_high.glb', 53.04254650311524);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+022.001_medium.glb', 327.6656208716462, 'test_tiling/LOD_Tile_+014_+022.001_high.glb', 53.00627096926567);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+009_medium.glb', 333.16531089358494, 'test_tiling/LOD_Tile_+025_+009_high.glb', 59.11703766030876);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+015.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+015.004_medium.glb', 282.35856735954934, 'test_tiling/LOD_Tile_+022_+015.004_high.glb', 2.6651004002692225);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+015_medium.glb', 280.28142861190014, 'test_tiling/LOD_Tile_+022_+015_high.glb', 0.35716845843676426);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+015.003_medium.glb', 280.14945452502513, 'test_tiling/LOD_Tile_+022_+015.003_high.glb', 0.21053058413117173);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.008_medium.glb', 280.19814435268097, 'test_tiling/LOD_Tile_+021_+005.008_high.glb', 0.26463039263769017);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.005_medium.glb', 280.4809524451871, 'test_tiling/LOD_Tile_+021_+005.005_high.glb', 0.5788616065333746);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.004_medium.glb', 281.4077923350436, 'test_tiling/LOD_Tile_+021_+005.004_high.glb', 1.6086837063739308);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.007_medium.glb', 280.0455671061177, 'test_tiling/LOD_Tile_+021_+005.007_high.glb', 0.09510011867847014);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.006_medium.glb', 279.9808874933793, 'test_tiling/LOD_Tile_+021_+005.006_high.glb', 0.023233882302520048);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.003_medium.glb', 280.1228037636057, 'test_tiling/LOD_Tile_+021_+005.003_high.glb', 0.18091862699851646);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.002_medium.glb', 319.83130466806364, 'test_tiling/LOD_Tile_+021_+005.002_high.glb', 44.30147518750729);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+015.002_medium.glb', 318.1945223511595, 'test_tiling/LOD_Tile_+022_+015.002_high.glb', 42.48282816872494);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005_medium.glb', 280.01773906927104, 'test_tiling/LOD_Tile_+021_+005_high.glb', 0.06418007773776199);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012_medium.glb', 280.0014906530676, 'test_tiling/LOD_Tile_+022_+012_high.glb', 0.04612628195614754);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.008_medium.glb', 280.0622756841857, 'test_tiling/LOD_Tile_+022_+012.008_high.glb', 0.11366520542072152);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.007_medium.glb', 280.79395824020014, 'test_tiling/LOD_Tile_+022_+012.007_high.glb', 0.9266458232145068);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.006_medium.glb', 280.78293786737044, 'test_tiling/LOD_Tile_+022_+012.006_high.glb', 0.9144009645148734);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+015.001_medium.glb', 326.20212308521116, 'test_tiling/LOD_Tile_+022_+015.001_high.glb', 51.3801623176712);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+005.001_medium.glb', 324.5653424477299, 'test_tiling/LOD_Tile_+021_+005.001_high.glb', 49.56151716491426);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.004_medium.glb', 280.81198180637017, 'test_tiling/LOD_Tile_+022_+012.004_high.glb', 0.9466720078479215);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.005_medium.glb', 280.54600824864684, 'test_tiling/LOD_Tile_+022_+012.005_high.glb', 0.6511458325997723);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.003_medium.glb', 280.6100312070456, 'test_tiling/LOD_Tile_+022_+012.003_high.glb', 0.7222824530428428);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+007.003_medium.glb', 282.35979669708536, 'test_tiling/LOD_Tile_+025_+007.003_high.glb', 2.6664663308647927);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+007_medium.glb', 279.99882540898335, 'test_tiling/LOD_Tile_+025_+007_high.glb', 0.043164899640341634);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+007.002_medium.glb', 313.8332929352493, 'test_tiling/LOD_Tile_+025_+007.002_high.glb', 37.63701770660248);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+007.001_medium.glb', 330.56335418054425, 'test_tiling/LOD_Tile_+025_+007.001_high.glb', 56.22597464581907);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+010_medium.glb', 280.7806219432418, 'test_tiling/LOD_Tile_+006_+010_high.glb', 0.9118277154830546);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+014.004_medium.glb', 280.2255642897718, 'test_tiling/LOD_Tile_+018_+014.004_high.glb', 0.29509698940527873);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+014.003_medium.glb', 281.04036820098764, 'test_tiling/LOD_Tile_+018_+014.003_high.glb', 1.200434668533971);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+012.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+022_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+010.001_medium.glb', 315.7343290808646, 'test_tiling/LOD_Tile_+006_+010.001_high.glb', 39.74928009061951);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+026_medium.glb', 314.69801433223415, 'test_tiling/LOD_Tile_+010_+026_high.glb', 38.59781925880785);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+010.002_medium.glb', 328.6623180349289, 'test_tiling/LOD_Tile_+006_+010.002_high.glb', 54.11371226180204);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+026.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+026.001_medium.glb', 329.69863110413655, 'test_tiling/LOD_Tile_+010_+026.001_high.glb', 55.26517122758829);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+014.005_medium.glb', 279.96243735380193, 'test_tiling/LOD_Tile_+018_+014.005_high.glb', 0.0027337272165442027);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+014_medium.glb', 281.03093656218675, 'test_tiling/LOD_Tile_+018_+014_high.glb', 1.1899550698663177);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009_medium.glb', 285.77706954531527, 'test_tiling/LOD_Tile_+013_+009_high.glb', 6.46343616223133);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009.003_medium.glb', 281.85563227406806, 'test_tiling/LOD_Tile_+013_+009.003_high.glb', 2.1062836386233004);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009.006_medium.glb', 280.0629424150625, 'test_tiling/LOD_Tile_+013_+009.006_high.glb', 0.11440601750602394);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009.007_medium.glb', 280.0241443880721, 'test_tiling/LOD_Tile_+013_+009.007_high.glb', 0.07129709862779583);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009.005_medium.glb', 282.0994374499944, 'test_tiling/LOD_Tile_+013_+009.005_high.glb', 2.3771782785414945);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009.004_medium.glb', 284.228801210427, 'test_tiling/LOD_Tile_+013_+009.004_high.glb', 4.743138012355438);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+023_medium.glb', 280.3940809387317, 'test_tiling/LOD_Tile_+014_+023_high.glb', 0.48233771047181684);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009.001_medium.glb', 318.49296251167823, 'test_tiling/LOD_Tile_+013_+009.001_high.glb', 42.81442834707905);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+009.002_medium.glb', 325.9036829246924, 'test_tiling/LOD_Tile_+013_+009.002_high.glb', 51.04856213931709);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+014.002_medium.glb', 320.0101480882106, 'test_tiling/LOD_Tile_+018_+014.002_high.glb', 44.50019009878171);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+014.001_medium.glb', 324.3864721568171, 'test_tiling/LOD_Tile_+018_+014.001_high.glb', 49.362772397233385);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+023.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+023.002_medium.glb', 319.7515572733948, 'test_tiling/LOD_Tile_+014_+023.002_high.glb', 44.21286697120859);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+019.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+019.003_medium.glb', 284.65670304121704, 'test_tiling/LOD_Tile_+010_+019.003_high.glb', 5.218584491011079);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+023.001_medium.glb', 324.6450898423987, 'test_tiling/LOD_Tile_+014_+023.001_high.glb', 49.65012538121296);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+015.001_medium.glb', 318.9816493735864, 'test_tiling/LOD_Tile_+002_+015.001_high.glb', 43.357413749199274);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+019.002_medium.glb', 322.82759490770064, 'test_tiling/LOD_Tile_+010_+019.002_high.glb', 47.630686564881785);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+019_medium.glb', 281.75061628299636, 'test_tiling/LOD_Tile_+010_+019_high.glb', 1.9895992040992554);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+019.001_medium.glb', 321.56905220809284, 'test_tiling/LOD_Tile_+010_+019.001_high.glb', 46.232305787539765);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+015_medium.glb', 325.41499606278427, 'test_tiling/LOD_Tile_+002_+015_high.glb', 50.50557673719688);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+013.003_medium.glb', 280.7385960655079, 'test_tiling/LOD_Tile_+018_+013.003_high.glb', 0.8651322957787528);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+013_medium.glb', 280.194197708952, 'test_tiling/LOD_Tile_+018_+013_high.glb', 0.26024523293879676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+013.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+013.005_medium.glb', 280.6184619098199, 'test_tiling/LOD_Tile_+018_+013.005_high.glb', 0.7316499005698406);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+013.004_medium.glb', 280.0619683498017, 'test_tiling/LOD_Tile_+018_+013.004_high.glb', 0.11332372277182896);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+021.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+021.003_medium.glb', 279.96059166807504, 'test_tiling/LOD_Tile_+010_+021.003_high.glb', 0.0006829652977851046);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+021_medium.glb', 280.0060015828787, 'test_tiling/LOD_Tile_+010_+021_high.glb', 0.051138426190712544);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+017.001_medium.glb', 323.7766770739601, 'test_tiling/LOD_Tile_+006_+017.001_high.glb', 48.685222305170065);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+024_medium.glb', 281.4285500016353, 'test_tiling/LOD_Tile_+014_+024_high.glb', 1.6317477803647062);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+017_medium.glb', 320.61996836241053, 'test_tiling/LOD_Tile_+006_+017_high.glb', 45.177768181226085);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+021.002_medium.glb', 323.21485302577344, 'test_tiling/LOD_Tile_+010_+021.002_high.glb', 48.060973362740434);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+024.001_medium.glb', 329.03645650159274, 'test_tiling/LOD_Tile_+014_+024.001_high.glb', 54.529421669206336);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+013.002_medium.glb', 313.64773518249444, 'test_tiling/LOD_Tile_+018_+013.002_high.glb', 37.43084242576374);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+024.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+024.003_medium.glb', 280.20711415019446, 'test_tiling/LOD_Tile_+014_+024.003_high.glb', 0.2745968343193029);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+012.001_medium.glb', 326.3408098252712, 'test_tiling/LOD_Tile_+002_+012.001_high.glb', 51.53425869551572);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+012_medium.glb', 318.05583561109944, 'test_tiling/LOD_Tile_+002_+012_high.glb', 42.328731790880425);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+013.001_medium.glb', 330.7488850625333, 'test_tiling/LOD_Tile_+018_+013.001_high.glb', 56.43212007025135);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+021.001_medium.glb', 321.1817924105972, 'test_tiling/LOD_Tile_+010_+021.001_high.glb', 45.80201712365571);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+017_medium.glb', 280.03008954500854, 'test_tiling/LOD_Tile_+010_+017_high.glb', 0.07790282855719274);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+024.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+024.002_medium.glb', 315.3601889347779, 'test_tiling/LOD_Tile_+014_+024.002_high.glb', 39.333568817189814);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+017.003_medium.glb', 280.526617632266, 'test_tiling/LOD_Tile_+010_+017.003_high.glb', 0.6296007032876771);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+017.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+017.006_medium.glb', 280.2687187396699, 'test_tiling/LOD_Tile_+010_+017.006_high.glb', 0.34304637818092365);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+017.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+017.005_medium.glb', 280.3234561690569, 'test_tiling/LOD_Tile_+010_+017.005_high.glb', 0.40386574416646986);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+017.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+017.004_medium.glb', 280.5912989244272, 'test_tiling/LOD_Tile_+010_+017.004_high.glb', 0.701468805689031);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+021_medium.glb', 279.9820160655435, 'test_tiling/LOD_Tile_+006_+021_high.glb', 0.02448785137386319);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+002_medium.glb', 280.02862844711734, 'test_tiling/LOD_Tile_+017_+002_high.glb', 0.07627938645590028);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+021.002_medium.glb', 330.8565142355804, 'test_tiling/LOD_Tile_+006_+021.002_high.glb', 56.55170804030369);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+017.002_medium.glb', 321.29813442945965, 'test_tiling/LOD_Tile_+010_+017.002_high.glb', 45.93128603350288);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+010_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+010_+017.001_medium.glb', 323.098511006911, 'test_tiling/LOD_Tile_+010_+017.001_high.glb', 47.93170445289327);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+021.001_medium.glb', 313.54013120079026, 'test_tiling/LOD_Tile_+006_+021.001_high.glb', 37.31128244609247);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+002.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+002.002_medium.glb', 338.56926205634954, 'test_tiling/LOD_Tile_+017_+002.002_high.glb', 65.12142784115832);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+007.003_medium.glb', 280.0271690286491, 'test_tiling/LOD_Tile_+013_+007.003_high.glb', 0.07465781038001161);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+002.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+002.001_medium.glb', 338.45143374825295, 'test_tiling/LOD_Tile_+017_+002.001_high.glb', 64.99050749882879);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+007.004_medium.glb', 280.0484893019, 'test_tiling/LOD_Tile_+013_+007.004_high.glb', 0.09834700288105507);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+007.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+007.005_medium.glb', 280.0873377115763, 'test_tiling/LOD_Tile_+013_+007.005_high.glb', 0.1415119025213967);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+007_medium.glb', 284.4118717379211, 'test_tiling/LOD_Tile_+013_+007_high.glb', 4.946549709571172);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.008_medium.glb', 282.1357751224899, 'test_tiling/LOD_Tile_+014_+012.008_high.glb', 2.417553470203179);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.005_medium.glb', 280.05663786163325, 'test_tiling/LOD_Tile_+014_+012.005_high.glb', 0.10740095814021716);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+007.001_medium.glb', 314.4756335537762, 'test_tiling/LOD_Tile_+013_+007.001_high.glb', 38.35072950496574);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.004_medium.glb', 279.9625397985966, 'test_tiling/LOD_Tile_+014_+012.004_high.glb', 0.0028475547661750535);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+007.002_medium.glb', 329.92101356201727, 'test_tiling/LOD_Tile_+013_+007.002_high.glb', 55.51226284745581);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.006_medium.glb', 280.1559135853578, 'test_tiling/LOD_Tile_+014_+012.006_high.glb', 0.21770731783412667);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.007_medium.glb', 280.7086653912363, 'test_tiling/LOD_Tile_+014_+012.007_high.glb', 0.8318759910325065);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012_medium.glb', 279.97402033329087, 'test_tiling/LOD_Tile_+014_+012_high.glb', 0.015603704426445476);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.003_medium.glb', 281.6779930001141, 'test_tiling/LOD_Tile_+014_+012.003_high.glb', 1.9089066675634052);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+005_medium.glb', 279.9722267096727, 'test_tiling/LOD_Tile_+017_+005_high.glb', 0.013610789295203696);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+005.003_medium.glb', 280.0250932619899, 'test_tiling/LOD_Tile_+017_+005.003_high.glb', 0.07235140298093405);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.007_medium.glb', 280.3852135860129, 'test_tiling/LOD_Tile_+014_+015.007_high.glb', 0.472485096339835);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.006_medium.glb', 279.9607965576644, 'test_tiling/LOD_Tile_+014_+015.006_high.glb', 0.000910620397046806);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+009.001_medium.glb', 312.48659732954127, 'test_tiling/LOD_Tile_+005_+009.001_high.glb', 36.140689255815815);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+005.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+005.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+009_medium.glb', 331.9100497862522, 'test_tiling/LOD_Tile_+005_+009_high.glb', 57.722303096605735);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+005.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+005.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.004_medium.glb', 280.92781831895076, 'test_tiling/LOD_Tile_+014_+015.004_high.glb', 1.0753792440485492);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.005_medium.glb', 282.20127429358564, 'test_tiling/LOD_Tile_+014_+015.005_high.glb', 2.4903303269761756);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+014_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.008_medium.glb', 279.9637691361326, 'test_tiling/LOD_Tile_+014_+015.008_high.glb', 0.0042134853617452625);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.003_medium.glb', 280.0258876290043, 'test_tiling/LOD_Tile_+014_+015.003_high.glb', 0.07323403299692409);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+012.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+014_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015_medium.glb', 279.96115595415716, 'test_tiling/LOD_Tile_+014_+015_high.glb', 0.001309949833456676);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+013_medium.glb', 280.2020406137241, 'test_tiling/LOD_Tile_+022_+013_high.glb', 0.2689595715744701);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+006_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+025_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+013.003_medium.glb', 280.0197879651644, 'test_tiling/LOD_Tile_+022_+013.003_high.glb', 0.066456628730379);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+013.004_medium.glb', 280.1662655478878, 'test_tiling/LOD_Tile_+022_+013.004_high.glb', 0.22920949842305396);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+019.001_medium.glb', 319.7749281219619, 'test_tiling/LOD_Tile_+006_+019.001_high.glb', 44.238834580727655);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+006_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+006_+019_medium.glb', 324.62171899383156, 'test_tiling/LOD_Tile_+006_+019_high.glb', 49.624157771693895);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+013.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+013.005_medium.glb', 280.390031850208, 'test_tiling/LOD_Tile_+022_+013.005_high.glb', 0.47783872322329257);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+014_medium.glb', 280.0557158584812, 'test_tiling/LOD_Tile_+022_+014_high.glb', 0.1063765101935395);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+014.003_medium.glb', 280.86457293333774, 'test_tiling/LOD_Tile_+022_+014.003_high.glb', 1.005106593367431);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+003_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+013.002_medium.glb', 321.2515976219147, 'test_tiling/LOD_Tile_+022_+013.002_high.glb', 45.87957846956401);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+014.005_medium.glb', 280.05356283837034, 'test_tiling/LOD_Tile_+022_+014.005_high.glb', 0.10398426562588785);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+013.001_medium.glb', 323.145047814456, 'test_tiling/LOD_Tile_+022_+013.001_high.glb', 47.98341201683214);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+014.001_medium.glb', 327.95673203078894, 'test_tiling/LOD_Tile_+022_+014.001_high.glb', 53.32972781275767);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+014.002_medium.glb', 316.4399134055817, 'test_tiling/LOD_Tile_+022_+014.002_high.glb', 40.53326267363848);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+014.004_medium.glb', 283.00398132191634, 'test_tiling/LOD_Tile_+022_+014.004_high.glb', 3.382227025121409);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+008.003_medium.glb', 279.96622949062754, 'test_tiling/LOD_Tile_+024_+008.003_high.glb', 0.006947212578289465);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.002_medium.glb', 322.35356436912144, 'test_tiling/LOD_Tile_+014_+015.002_high.glb', 47.1039859664604);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+004_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+008_medium.glb', 331.4925503006781, 'test_tiling/LOD_Tile_+025_+008_high.glb', 57.258414779301134);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+008.004_medium.glb', 280.61507955217303, 'test_tiling/LOD_Tile_+024_+008.004_high.glb', 0.7278917254066187);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+015.001_medium.glb', 322.0430810672492, 'test_tiling/LOD_Tile_+014_+015.001_high.glb', 46.75900451993575);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+008_medium.glb', 279.97012407224776, 'test_tiling/LOD_Tile_+024_+008_high.glb', 0.011274525489665578);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+008.001_medium.glb', 324.1286757090157, 'test_tiling/LOD_Tile_+024_+008.001_high.glb', 49.07633189967626);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+008.002_medium.glb', 320.2679714067778, 'test_tiling/LOD_Tile_+024_+008.002_high.glb', 44.78666045274529);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+004.001_medium.glb', 329.0489111015478, 'test_tiling/LOD_Tile_+020_+004.001_high.glb', 54.5432601136008);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+014.004_medium.glb', 280.229151537008, 'test_tiling/LOD_Tile_+023_+014.004_high.glb', 0.2990828196677623);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+014_medium.glb', 280.0319352307354, 'test_tiling/LOD_Tile_+023_+014_high.glb', 0.07995359047595185);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+014.003_medium.glb', 279.97432766767486, 'test_tiling/LOD_Tile_+023_+014.003_high.glb', 0.01594518707533803);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+004_medium.glb', 315.34773601424575, 'test_tiling/LOD_Tile_+020_+004_high.glb', 39.31973223882075);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+013_medium.glb', 280.03623959153435, 'test_tiling/LOD_Tile_+023_+013_high.glb', 0.08473621358585136);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+013.003_medium.glb', 282.8899468300682, 'test_tiling/LOD_Tile_+023_+013.003_high.glb', 3.2555220341790414);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+003_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+020_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+006_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+014.001_medium.glb', 323.8319267273204, 'test_tiling/LOD_Tile_+023_+014.001_high.glb', 48.74661080890376);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+014.002_medium.glb', 320.5647187090502, 'test_tiling/LOD_Tile_+023_+014.002_high.glb', 45.11637967749238);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+015_medium.glb', 279.98447474061555, 'test_tiling/LOD_Tile_+015_+015_high.glb', 0.027219712565003606);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+005_medium.glb', 279.9688695433688, 'test_tiling/LOD_Tile_+016_+005_high.glb', 0.009880604513038604);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+013.001_medium.glb', 323.83961512518914, 'test_tiling/LOD_Tile_+023_+013.001_high.glb', 48.75515347320229);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+019.001_medium.glb', 320.00525424998665, 'test_tiling/LOD_Tile_+007_+019.001_high.glb', 44.49475250075508);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+019_medium.glb', 324.3913928658069, 'test_tiling/LOD_Tile_+007_+019_high.glb', 49.36823985166647);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+010_medium.glb', 282.47045051070944, 'test_tiling/LOD_Tile_+011_+010_high.glb', 2.7894150126693416);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+005.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+005.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+005.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+005.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+010.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+010.005_medium.glb', 281.0663001694215, 'test_tiling/LOD_Tile_+011_+010.005_high.glb', 1.2292479667938065);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+015.002_medium.glb', 318.00381548790546, 'test_tiling/LOD_Tile_+015_+015.002_high.glb', 42.2709316539982);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+010.004_medium.glb', 284.43124556007336, 'test_tiling/LOD_Tile_+011_+010.004_high.glb', 4.968076178629229);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+009_medium.glb', 318.8146710759694, 'test_tiling/LOD_Tile_+004_+009_high.glb', 43.1718823074026);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+013.002_medium.glb', 320.5570319906044, 'test_tiling/LOD_Tile_+023_+013.002_high.glb', 45.10783887921926);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+015.001_medium.glb', 326.3927795657793, 'test_tiling/LOD_Tile_+015_+015.001_high.glb', 51.59200285163583);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+009.001_medium.glb', 325.58197436040126, 'test_tiling/LOD_Tile_+004_+009.001_high.glb', 50.691108178993545);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+010.003_medium.glb', 283.88915473053174, 'test_tiling/LOD_Tile_+011_+010.003_high.glb', 4.365753034694072);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+007_medium.glb', 304.6230658858269, 'test_tiling/LOD_Tile_+012_+007_high.glb', 27.4034320961332);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+012_medium.glb', 280.0488990810787, 'test_tiling/LOD_Tile_+015_+012_high.glb', 0.09880231307957847);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+017_medium.glb', 280.07713857652686, 'test_tiling/LOD_Tile_+011_+017_high.glb', 0.1301795302442138);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+028_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+028_medium.glb', 309.4159926281985, 'test_tiling/LOD_Tile_+011_+028_high.glb', 32.72890625432386);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+017.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+017.004_medium.glb', 280.1117850701989, 'test_tiling/LOD_Tile_+011_+017.004_high.glb', 0.16867563432428678);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+028.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+028.001_medium.glb', 334.98065448759496, 'test_tiling/LOD_Tile_+011_+028.001_high.glb', 61.13408609809768);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+010.002_medium.glb', 358.3040694353988, 'test_tiling/LOD_Tile_+011_+010.002_high.glb', 87.04899159565745);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+010.001_medium.glb', 357.96560191035366, 'test_tiling/LOD_Tile_+011_+010.001_high.glb', 86.67291656782955);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+017.003_medium.glb', 280.24801313518697, 'test_tiling/LOD_Tile_+011_+017.003_high.glb', 0.3200401509776653);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+012.002_medium.glb', 325.04121531319026, 'test_tiling/LOD_Tile_+015_+012.002_high.glb', 50.090264793203595);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+021_medium.glb', 279.96448792911815, 'test_tiling/LOD_Tile_+007_+021_high.glb', 0.0050121442345650025);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+012.001_medium.glb', 319.35537974049447, 'test_tiling/LOD_Tile_+015_+012.001_high.glb', 43.772669712430435);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+002_medium.glb', 281.79505213253924, 'test_tiling/LOD_Tile_+016_+002_high.glb', 2.038972370257988);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+021.001_medium.glb', 320.32301617054884, 'test_tiling/LOD_Tile_+007_+021.001_high.glb', 44.847821301379724);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+024_medium.glb', 280.98137679348764, 'test_tiling/LOD_Tile_+015_+024_high.glb', 1.1348886602006387);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+017.002_medium.glb', 324.2528068911186, 'test_tiling/LOD_Tile_+011_+017.002_high.glb', 49.21425543534618);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+021.002_medium.glb', 324.0736309452447, 'test_tiling/LOD_Tile_+007_+021.002_high.glb', 49.01517105104182);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+017.001_medium.glb', 320.14383854525204, 'test_tiling/LOD_Tile_+011_+017.001_high.glb', 44.64873505104997);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+002.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+002.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+002.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+002.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+002.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+002.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+012.001_medium.glb', 326.25686051459815, 'test_tiling/LOD_Tile_+003_+012.001_high.glb', 51.44098168365675);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.009_medium.glb', 280.0698616372597, 'test_tiling/LOD_Tile_+019_+013.009_high.glb', 0.12209404216961584);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.008_medium.glb', 279.9889336083179, 'test_tiling/LOD_Tile_+019_+013.008_high.glb', 0.03217401001205129);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.010_medium.glb', 279.9766335152663, 'test_tiling/LOD_Tile_+019_+013.010_high.glb', 0.018507239954734064);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.004_medium.glb', 280.3741445099202, 'test_tiling/LOD_Tile_+019_+013.004_high.glb', 0.46018612290349176);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+024.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+024.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+012_medium.glb', 318.1397866011954, 'test_tiling/LOD_Tile_+003_+012_high.glb', 42.4220106687648);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.005_medium.glb', 280.035420033177, 'test_tiling/LOD_Tile_+019_+013.005_high.glb', 0.08382559318880455);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+024.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+024.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+024.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.007_medium.glb', 280.2317143362976, 'test_tiling/LOD_Tile_+019_+013.007_high.glb', 0.30193037443393733);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.006_medium.glb', 279.9887807808373, 'test_tiling/LOD_Tile_+019_+013.006_high.glb', 0.032004201700306906);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013_medium.glb', 280.06422381470725, 'test_tiling/LOD_Tile_+019_+013_high.glb', 0.11582979488911146);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.003_medium.glb', 280.18358879472385, 'test_tiling/LOD_Tile_+019_+013.003_high.glb', 0.24845755046309043);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+017_medium.glb', 280.1692901884648, 'test_tiling/LOD_Tile_+007_+017_high.glb', 0.23257021017526971);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+017.001_medium.glb', 327.8058980251579, 'test_tiling/LOD_Tile_+007_+017.001_high.glb', 53.162134473167576);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+017.002_medium.glb', 316.59074741121276, 'test_tiling/LOD_Tile_+007_+017.002_high.glb', 40.700856013228574);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+023.001_medium.glb', 352.98550348985543, 'test_tiling/LOD_Tile_+015_+023.001_high.glb', 81.13947387838711);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+023_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+023_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.002_medium.glb', 317.8788110059135, 'test_tiling/LOD_Tile_+019_+013.002_high.glb', 42.132037785118314);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+013.001_medium.glb', 326.5178344304571, 'test_tiling/LOD_Tile_+019_+013.001_high.glb', 51.73095270127783);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+015_medium.glb', 280.70282267909454, 'test_tiling/LOD_Tile_+003_+015_high.glb', 0.8253840886527405);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+021_medium.glb', 321.8804591925399, 'test_tiling/LOD_Tile_+011_+021_high.glb', 46.57831354803649);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.006_medium.glb', 280.6672541822704, 'test_tiling/LOD_Tile_+011_+019.006_high.glb', 0.7858635366259898);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+015.001_medium.glb', 325.71932931813063, 'test_tiling/LOD_Tile_+003_+015.001_high.glb', 50.84372479869287);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.007_medium.glb', 281.3188198705861, 'test_tiling/LOD_Tile_+011_+019.007_high.glb', 1.5098254125322386);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.005_medium.glb', 280.34959470650296, 'test_tiling/LOD_Tile_+011_+019.005_high.glb', 0.43290856355097085);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.004_medium.glb', 280.19676050824154, 'test_tiling/LOD_Tile_+011_+019.004_high.glb', 0.2630927877049718);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+015.002_medium.glb', 318.67731611824, 'test_tiling/LOD_Tile_+003_+015.002_high.glb', 43.019265687703275);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+021.001_medium.glb', 322.5161879232536, 'test_tiling/LOD_Tile_+011_+021.001_high.glb', 47.28467880438506);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.003_medium.glb', 280.2338673564085, 'test_tiling/LOD_Tile_+011_+019.003_high.glb', 0.30432261900158897);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.009_medium.glb', 281.1832585364748, 'test_tiling/LOD_Tile_+011_+019.009_high.glb', 1.3592017079641625);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.008_medium.glb', 281.6327879748998, 'test_tiling/LOD_Tile_+011_+019.008_high.glb', 1.8586788617697394);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019_medium.glb', 280.06360914593927, 'test_tiling/LOD_Tile_+011_+019_high.glb', 0.11514682959132636);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.001_medium.glb', 315.0982930157669, 'test_tiling/LOD_Tile_+011_+019.001_high.glb', 39.042573351622046);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.006_medium.glb', 280.0711430369045, 'test_tiling/LOD_Tile_+019_+014.006_high.glb', 0.12351781955270336);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+010_medium.glb', 328.2347739212087, 'test_tiling/LOD_Tile_+007_+010_high.glb', 53.63866324655741);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.007_medium.glb', 280.3739900030168, 'test_tiling/LOD_Tile_+019_+014.007_high.glb', 0.4600144485663436);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.005_medium.glb', 280.0787273105556, 'test_tiling/LOD_Tile_+019_+014.005_high.glb', 0.13194479027619388);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+019.002_medium.glb', 329.2983541000266, 'test_tiling/LOD_Tile_+011_+019.002_high.glb', 54.820419000799504);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.004_medium.glb', 280.2087532669091, 'test_tiling/LOD_Tile_+019_+014.004_high.glb', 0.2764180751133965);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.010_medium.glb', 280.923512278729, 'test_tiling/LOD_Tile_+019_+014.010_high.glb', 1.070594754913246);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+026_medium.glb', 323.83448952661, 'test_tiling/LOD_Tile_+011_+026_high.glb', 48.74945836366994);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+026.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+026.001_medium.glb', 320.5621575891835, 'test_tiling/LOD_Tile_+011_+026.001_high.glb', 45.11353398875161);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.003_medium.glb', 280.4659367253654, 'test_tiling/LOD_Tile_+019_+014.003_high.glb', 0.5621774733981378);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014_medium.glb', 279.9632065294734, 'test_tiling/LOD_Tile_+019_+014_high.glb', 0.0035883668514774757);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.009_medium.glb', 280.9252051369753, 'test_tiling/LOD_Tile_+019_+014.009_high.glb', 1.0724757085202608);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.008_medium.glb', 279.96638399753095, 'test_tiling/LOD_Tile_+019_+014.008_high.glb', 0.007118886915437633);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.008_medium.glb', 280.32888910202, 'test_tiling/LOD_Tile_+012_+009.008_high.glb', 0.4099023363477125);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009_medium.glb', 279.97012407224776, 'test_tiling/LOD_Tile_+012_+009_high.glb', 0.011274525489665578);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.007_medium.glb', 280.2485757418462, 'test_tiling/LOD_Tile_+012_+009.007_high.glb', 0.32066526948793306);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.006_medium.glb', 280.41734934250417, 'test_tiling/LOD_Tile_+012_+009.006_high.glb', 0.5081914924412503);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.004_medium.glb', 280.06084145706035, 'test_tiling/LOD_Tile_+012_+009.004_high.glb', 0.11207161972588961);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.005_medium.glb', 280.38101167000866, 'test_tiling/LOD_Tile_+012_+009.005_high.glb', 0.4678163007795663);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.003_medium.glb', 279.9650001530915, 'test_tiling/LOD_Tile_+012_+009.003_high.glb', 0.005581281982719256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.009_medium.glb', 280.5024792874502, 'test_tiling/LOD_Tile_+023_+012.009_high.glb', 0.6027803201590834);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.008_medium.glb', 280.44724139004995, 'test_tiling/LOD_Tile_+023_+012.008_high.glb', 0.5414048786032095);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+002_medium.glb', 350.6132582360714, 'test_tiling/LOD_Tile_+020_+002_high.glb', 78.50364581862705);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012_medium.glb', 280.2521126063965, 'test_tiling/LOD_Tile_+023_+012_high.glb', 0.3245951189883031);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.001_medium.glb', 316.5200201967433, 'test_tiling/LOD_Tile_+019_+014.001_high.glb', 40.6222702193736);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+014.002_medium.glb', 327.87662523962734, 'test_tiling/LOD_Tile_+019_+014.002_high.glb', 53.24072026702255);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.006_medium.glb', 280.2260647577851, 'test_tiling/LOD_Tile_+023_+012.006_high.glb', 0.29565306497560645);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.003_medium.glb', 285.8900292065308, 'test_tiling/LOD_Tile_+023_+012.003_high.glb', 6.588946896915276);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.007_medium.glb', 280.0364444811237, 'test_tiling/LOD_Tile_+023_+012.007_high.glb', 0.08496386868511308);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.005_medium.glb', 280.35304088221864, 'test_tiling/LOD_Tile_+023_+012.005_high.glb', 0.43673764767953654);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.001_medium.glb', 318.69007805257905, 'test_tiling/LOD_Tile_+012_+009.001_high.glb', 43.03344561474664);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+009.002_medium.glb', 325.7065673837916, 'test_tiling/LOD_Tile_+012_+009.002_high.glb', 50.82954487164951);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.011_medium.glb', 280.5841294682233, 'test_tiling/LOD_Tile_+023_+012.011_high.glb', 0.6935027432402753);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.010_medium.glb', 280.28399141118973, 'test_tiling/LOD_Tile_+023_+012.010_high.glb', 0.3600160132029393);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.004_medium.glb', 281.2115484146089, 'test_tiling/LOD_Tile_+023_+012.004_high.glb', 1.3906349058909113);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+005.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+005.003_medium.glb', 281.1921762718795, 'test_tiling/LOD_Tile_+020_+005.003_high.glb', 1.3691103028582579);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+005_medium.glb', 279.997698516242, 'test_tiling/LOD_Tile_+020_+005_high.glb', 0.04191279659440227);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+005.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+005.004_medium.glb', 279.99457143087034, 'test_tiling/LOD_Tile_+020_+005.004_high.glb', 0.03843825729255565);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+012.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+007_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+005.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+005.001_medium.glb', 320.00356139174033, 'test_tiling/LOD_Tile_+020_+005.001_high.glb', 44.49287154714806);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+015.003_medium.glb', 280.4835673065854, 'test_tiling/LOD_Tile_+023_+015.003_high.glb', 0.5817670080870668);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+015_medium.glb', 280.0715007539744, 'test_tiling/LOD_Tile_+023_+015_high.glb', 0.12391528296370945);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+005.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+005.002_medium.glb', 324.3930840446303, 'test_tiling/LOD_Tile_+020_+005.002_high.glb', 49.37011893924809);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.008_medium.glb', 280.3062353670155, 'test_tiling/LOD_Tile_+024_+009.008_high.glb', 0.3847315196760642);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.009_medium.glb', 280.1789250374322, 'test_tiling/LOD_Tile_+024_+009.009_high.glb', 0.24327559791678102);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+015.001_medium.glb', 329.8986167787109, 'test_tiling/LOD_Tile_+023_+015.001_high.glb', 55.48737753267094);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+015.002_medium.glb', 314.4980303370826, 'test_tiling/LOD_Tile_+023_+015.002_high.glb', 38.37561481975061);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.005_medium.glb', 280.16580538602324, 'test_tiling/LOD_Tile_+024_+009.005_high.glb', 0.22869820746241704);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.006_medium.glb', 281.5549366486438, 'test_tiling/LOD_Tile_+024_+009.006_high.glb', 1.7721773881519078);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.007_medium.glb', 280.21961913283536, 'test_tiling/LOD_Tile_+024_+009.007_high.glb', 0.2884912594758818);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.003_medium.glb', 286.38378960490934, 'test_tiling/LOD_Tile_+024_+009.003_high.glb', 7.137569561780324);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.002_medium.glb', 284.16396709078515, 'test_tiling/LOD_Tile_+024_+009.002_high.glb', 4.67110010164234);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009_medium.glb', 279.96735806279173, 'test_tiling/LOD_Tile_+024_+009_high.glb', 0.008201181649632608);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.004_medium.glb', 321.6306567975683, 'test_tiling/LOD_Tile_+024_+009.004_high.glb', 46.30075533140138);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+014.003_medium.glb', 279.9786320284738, 'test_tiling/LOD_Tile_+003_+014.003_high.glb', 0.020727810185237543);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+009.001_medium.glb', 322.76598863880236, 'test_tiling/LOD_Tile_+024_+009.001_high.glb', 47.56223515499476);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+014_medium.glb', 280.01994247206784, 'test_tiling/LOD_Tile_+003_+014_high.glb', 0.06662830306752718);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+022_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+022_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+014.001_medium.glb', 320.1880174430968, 'test_tiling/LOD_Tile_+003_+014.001_high.glb', 44.69782271532192);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+018_medium.glb', 318.24803044301046, 'test_tiling/LOD_Tile_+011_+018_high.glb', 42.54228160411492);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+022.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+022.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+018.001_medium.glb', 326.148616672783, 'test_tiling/LOD_Tile_+011_+018.001_high.glb', 51.32071074830663);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+014.002_medium.glb', 324.20862799327386, 'test_tiling/LOD_Tile_+003_+014.002_high.glb', 49.16516777107423);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+027.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+027.001_medium.glb', 316.35929439044673, 'test_tiling/LOD_Tile_+011_+027.001_high.glb', 40.44368599015521);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+027_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+027_medium.glb', 328.0373510459239, 'test_tiling/LOD_Tile_+011_+027_high.glb', 53.41930449624093);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+008_medium.glb', 287.3877637074592, 'test_tiling/LOD_Tile_+012_+008_high.glb', 8.253096342391295);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+011_medium.glb', 348.7052004234642, 'test_tiling/LOD_Tile_+007_+011_high.glb', 76.3835815823968);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+011.001_medium.glb', 363.8904260742036, 'test_tiling/LOD_Tile_+007_+011.001_high.glb', 93.25605452766284);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015.003_medium.glb', 286.62754439814984, 'test_tiling/LOD_Tile_+019_+015.003_high.glb', 7.408408220936405);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015.005_medium.glb', 280.3113089034859, 'test_tiling/LOD_Tile_+019_+015.005_high.glb', 0.390368782420897);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015.004_medium.glb', 279.97858164578787, 'test_tiling/LOD_Tile_+019_+015.004_high.glb', 0.02067182942312401);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015.006_medium.glb', 280.0384950564399, 'test_tiling/LOD_Tile_+019_+015.006_high.glb', 0.08724228570313387);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+008.001_medium.glb', 302.83437473265917, 'test_tiling/LOD_Tile_+012_+008.001_high.glb', 25.41599748150234);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+008.002_medium.glb', 341.56227238313437, 'test_tiling/LOD_Tile_+012_+008.002_high.glb', 68.44699487091921);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015.007_medium.glb', 280.41007072381416, 'test_tiling/LOD_Tile_+019_+015.007_high.glb', 0.5001041383412484);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015_medium.glb', 279.97094531002796, 'test_tiling/LOD_Tile_+019_+015_high.glb', 0.01218701191211617);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+025_medium.glb', 281.74759332184226, 'test_tiling/LOD_Tile_+015_+025_high.glb', 1.9862403583724435);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015.002_medium.glb', 322.81718920363903, 'test_tiling/LOD_Tile_+019_+015.002_high.glb', 47.61912467147994);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+012_medium.glb', 280.56674912100993, 'test_tiling/LOD_Tile_+019_+012_high.glb', 0.6741912463365102);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+025.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+025.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+025.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+012.003_medium.glb', 280.0006190326015, 'test_tiling/LOD_Tile_+019_+012.003_high.glb', 0.04515781477158341);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+025.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+025.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+025.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+015.001_medium.glb', 321.5794562327317, 'test_tiling/LOD_Tile_+019_+015.001_high.glb', 46.243865814916205);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+013_medium.glb', 321.8741025770019, 'test_tiling/LOD_Tile_+003_+013_high.glb', 46.57125064188317);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+013.001_medium.glb', 322.52254285936874, 'test_tiling/LOD_Tile_+003_+013.001_high.glb', 47.291739844512975);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+012.004_medium.glb', 279.96130878163774, 'test_tiling/LOD_Tile_+019_+012.004_high.glb', 0.0014797581452010598);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+016.003_medium.glb', 280.0801111549951, 'test_tiling/LOD_Tile_+007_+016.003_high.glb', 0.13348239520891225);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+012.001_medium.glb', 322.9641806897586, 'test_tiling/LOD_Tile_+019_+012.001_high.glb', 47.78244854494617);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+016_medium.glb', 280.0806233789684, 'test_tiling/LOD_Tile_+007_+016_high.glb', 0.1340515329570665);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+012.002_medium.glb', 321.4324664260349, 'test_tiling/LOD_Tile_+019_+012.002_high.glb', 46.08054380747538);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+016.002_medium.glb', 323.5305660504423, 'test_tiling/LOD_Tile_+007_+016.002_high.glb', 48.41176561237247);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+016.001_medium.glb', 320.86608106535124, 'test_tiling/LOD_Tile_+007_+016.001_high.glb', 45.45122674004908);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+020_medium.glb', 280.10399422753557, 'test_tiling/LOD_Tile_+011_+020_high.glb', 0.16001914247613075);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013.004_medium.glb', 280.91280091970617, 'test_tiling/LOD_Tile_+015_+013.004_high.glb', 1.0586932448879087);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013.006_medium.glb', 280.4122237439251, 'test_tiling/LOD_Tile_+015_+013.006_high.glb', 0.5024963829089002);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013.007_medium.glb', 280.4117115199517, 'test_tiling/LOD_Tile_+015_+013.007_high.glb', 0.5019272451607459);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013.005_medium.glb', 280.0029769423017, 'test_tiling/LOD_Tile_+015_+013.005_high.glb', 0.047777714438496766);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013_medium.glb', 281.25470286450695, 'test_tiling/LOD_Tile_+015_+013_high.glb', 1.4385842946665564);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+003.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+003.003_medium.glb', 280.1496610940373, 'test_tiling/LOD_Tile_+016_+003.003_high.glb', 0.21076010525583722);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013.003_medium.glb', 297.4003904508283, 'test_tiling/LOD_Tile_+015_+013.003_high.glb', 19.37823716835691);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+029_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+029_medium.glb', 311.86747305267806, 'test_tiling/LOD_Tile_+011_+029_high.glb', 35.45277339263447);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+006_medium.glb', 319.53219777666817, 'test_tiling/LOD_Tile_+012_+006_high.glb', 43.96913419706789);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+020.001_medium.glb', 323.5027867168587, 'test_tiling/LOD_Tile_+011_+020.001_high.glb', 48.380899686168476);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+020.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+020.002_medium.glb', 320.89385871951197, 'test_tiling/LOD_Tile_+011_+020.002_high.glb', 45.482090800227674);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+003_medium.glb', 280.42021947617775, 'test_tiling/LOD_Tile_+016_+003_high.glb', 0.5113805298563179);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+016_medium.glb', 279.9855008679851, 'test_tiling/LOD_Tile_+011_+016_high.glb', 0.0283598540867159);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+003.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+003.002_medium.glb', 340.3315073376873, 'test_tiling/LOD_Tile_+016_+003.002_high.glb', 67.07947815375579);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013.001_medium.glb', 327.8755487295719, 'test_tiling/LOD_Tile_+015_+013.001_high.glb', 53.23952414473873);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+016.003_medium.glb', 280.79353838448424, 'test_tiling/LOD_Tile_+011_+016.003_high.glb', 0.9261793168635607);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+020_medium.glb', 321.916335023748, 'test_tiling/LOD_Tile_+007_+020_high.glb', 46.618175582712134);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+020.001_medium.glb', 322.48031041262266, 'test_tiling/LOD_Tile_+007_+020.001_high.glb', 47.24481490368401);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+013.002_medium.glb', 339.44720722896085, 'test_tiling/LOD_Tile_+015_+013.002_high.glb', 66.0969224773931);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+016.002_medium.glb', 322.42618933142654, 'test_tiling/LOD_Tile_+011_+016.002_high.glb', 47.18468036902165);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+003.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+003.001_medium.glb', 331.4271283830341, 'test_tiling/LOD_Tile_+016_+003.001_high.glb', 57.185723759696714);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+018.001_medium.glb', 328.8562544283493, 'test_tiling/LOD_Tile_+007_+018.001_high.glb', 54.32919714338026);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+011_medium.glb', 280.4087389414835, 'test_tiling/LOD_Tile_+011_+011_high.glb', 0.49862438019604743);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+016.001_medium.glb', 321.97045778436694, 'test_tiling/LOD_Tile_+011_+016.001_high.glb', 46.678311983399894);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+007_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+007_+018_medium.glb', 315.54039100802134, 'test_tiling/LOD_Tile_+007_+018_high.glb', 39.53379334301588);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+008.001_medium.glb', 328.327745091504, 'test_tiling/LOD_Tile_+004_+008.001_high.glb', 53.74196454688551);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+011.003_medium.glb', 280.0287057005691, 'test_tiling/LOD_Tile_+011_+011.003_high.glb', 0.07636522362447437);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+008_medium.glb', 316.0689003448666, 'test_tiling/LOD_Tile_+004_+008_high.glb', 40.12102593951064);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+011.004_medium.glb', 279.9697142930691, 'test_tiling/LOD_Tile_+011_+011.004_high.glb', 0.010819215291142176);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+004_medium.glb', 279.9779149149111, 'test_tiling/LOD_Tile_+016_+004_high.glb', 0.01993101733782159);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+009_medium.glb', 280.3980779651466, 'test_tiling/LOD_Tile_+015_+009_high.glb', 0.4867788509328238);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+004.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+004.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+004.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+022_medium.glb', 279.9645903739128, 'test_tiling/LOD_Tile_+008_+022_high.glb', 0.005125971784195853);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+004.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+004.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+004.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+014_medium.glb', 320.76567844888535, 'test_tiling/LOD_Tile_+015_+014_high.glb', 45.33966827730923);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+014.001_medium.glb', 323.6309166047994, 'test_tiling/LOD_Tile_+015_+014.001_high.glb', 48.52326622832481);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+009.001_medium.glb', 343.733609959192, 'test_tiling/LOD_Tile_+015_+009.001_high.glb', 70.85959217764993);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+009.002_medium.glb', 331.0665966004096, 'test_tiling/LOD_Tile_+015_+009.002_high.glb', 56.785132890113886);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+011.001_medium.glb', 331.63820832504416, 'test_tiling/LOD_Tile_+011_+011.001_high.glb', 57.420257028596765);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+011_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+011_+011.002_medium.glb', 325.59632502876906, 'test_tiling/LOD_Tile_+011_+011.002_high.glb', 50.70705336606889);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+010_medium.glb', 326.9739774361182, 'test_tiling/LOD_Tile_+000_+010_high.glb', 52.23777826312351);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+022.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+022.002_medium.glb', 323.1182946082419, 'test_tiling/LOD_Tile_+008_+022.002_high.glb', 47.95368623214985);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+010.001_medium.glb', 317.4226696796753, 'test_tiling/LOD_Tile_+000_+010.001_high.glb', 41.62521408929804);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+015_medium.glb', 280.17831036866414, 'test_tiling/LOD_Tile_+004_+015_high.glb', 0.24259263261899597);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+022.001_medium.glb', 321.27835082812874, 'test_tiling/LOD_Tile_+008_+022.001_high.glb', 45.909304254246294);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+026_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+026_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+026_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+023.001_medium.glb', 325.87452142609226, 'test_tiling/LOD_Tile_+012_+023.001_high.glb', 51.016160474205776);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+023_medium.glb', 318.5221256897013, 'test_tiling/LOD_Tile_+012_+023_high.glb', 42.846831878215774);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+021_medium.glb', 280.095333443829, 'test_tiling/LOD_Tile_+016_+021_high.glb', 0.1503960494688144);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+015.002_medium.glb', 316.33059305371114, 'test_tiling/LOD_Tile_+004_+015.002_high.glb', 40.41179561600453);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+015.001_medium.glb', 328.0660523826595, 'test_tiling/LOD_Tile_+004_+015.001_high.glb', 53.45119487039161);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+025_medium.glb', 311.3342495758552, 'test_tiling/LOD_Tile_+008_+025_high.glb', 34.8603028628313);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+021.002_medium.glb', 323.2728199853268, 'test_tiling/LOD_Tile_+016_+021.002_high.glb', 48.12538109557746);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+021.001_medium.glb', 321.12374987701503, 'test_tiling/LOD_Tile_+016_+021.001_high.glb', 45.737525419675514);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.014_medium.glb', 280.8224949934951, 'test_tiling/LOD_Tile_+019_+006.014_high.glb', 0.9583533268756121);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.015_medium.glb', 280.2423232505257, 'test_tiling/LOD_Tile_+019_+006.015_high.glb', 0.3137180569096436);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.017_medium.glb', 280.0771906386356, 'test_tiling/LOD_Tile_+019_+006.017_high.glb', 0.1302373770317311);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.003_medium.glb', 280.0218889231665, 'test_tiling/LOD_Tile_+019_+006.003_high.glb', 0.06879102651051333);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+019.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+019.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+019_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+019_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.016_medium.glb', 279.98754976387846, 'test_tiling/LOD_Tile_+019_+006.016_high.glb', 0.030636405079332914);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.012_medium.glb', 280.2107013974307, 'test_tiling/LOD_Tile_+019_+006.012_high.glb', 0.27858266458178643);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.007_medium.glb', 280.0261949633883, 'test_tiling/LOD_Tile_+019_+006.007_high.glb', 0.07357551564581663);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.006_medium.glb', 281.7080781812892, 'test_tiling/LOD_Tile_+019_+006.006_high.glb', 1.9423346466467994);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.001_medium.glb', 290.1801216287929, 'test_tiling/LOD_Tile_+019_+006.001_high.glb', 11.35571625498424);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.013_medium.glb', 279.9830405134902, 'test_tiling/LOD_Tile_+019_+006.013_high.glb', 0.025626126870171698);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.005_medium.glb', 280.48495115102486, 'test_tiling/LOD_Tile_+019_+006.005_high.glb', 0.5833046130197852);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.011_medium.glb', 279.9877042707819, 'test_tiling/LOD_Tile_+019_+006.011_high.glb', 0.030808079416481084);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.010_medium.glb', 280.0242988949755, 'test_tiling/LOD_Tile_+019_+006.010_high.glb', 0.071468772964944);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.004_medium.glb', 281.02899011108804, 'test_tiling/LOD_Tile_+019_+006.004_high.glb', 1.1877923464233315);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.009_medium.glb', 279.9913435801269, 'test_tiling/LOD_Tile_+019_+006.009_high.glb', 0.03485175646648196);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.008_medium.glb', 279.97591640170367, 'test_tiling/LOD_Tile_+019_+006.008_high.glb', 0.017710447107318106);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006_medium.glb', 279.9689467968205, 'test_tiling/LOD_Tile_+019_+006_high.glb', 0.009966441681612688);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.018_medium.glb', 279.96822800383495, 'test_tiling/LOD_Tile_+019_+006.018_high.glb', 0.009167782808792947);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+006.002_medium.glb', 354.2165238075778, 'test_tiling/LOD_Tile_+019_+006.002_high.glb', 82.50727423141191);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+007_medium.glb', 338.61236444413885, 'test_tiling/LOD_Tile_+003_+007_high.glb', 65.16931938314643);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+017_medium.glb', 280.0078976512915, 'test_tiling/LOD_Tile_+016_+017_high.glb', 0.053245168871585175);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+012.001_medium.glb', 320.6395470741521, 'test_tiling/LOD_Tile_+004_+012.001_high.glb', 45.199522305383404);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+024_medium.glb', 323.8935833789047, 'test_tiling/LOD_Tile_+012_+024_high.glb', 48.8151181995529);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+012_medium.glb', 323.7570983622185, 'test_tiling/LOD_Tile_+004_+012_high.glb', 48.663468181012746);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+024.001_medium.glb', 320.50306373688886, 'test_tiling/LOD_Tile_+012_+024.001_high.glb', 45.047874152868644);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+017.003_medium.glb', 280.1851775287526, 'test_tiling/LOD_Tile_+016_+017.003_high.glb', 0.2502228104950705);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+013_medium.glb', 324.7818301313601, 'test_tiling/LOD_Tile_+008_+013_high.glb', 49.80205903561449);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+013.001_medium.glb', 319.61481698443345, 'test_tiling/LOD_Tile_+008_+013.001_high.glb', 44.060933316807066);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.009_medium.glb', 282.33391511133743, 'test_tiling/LOD_Tile_+012_+012.009_high.glb', 2.6377090133670706);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.008_medium.glb', 280.1521718312181, 'test_tiling/LOD_Tile_+012_+012.008_high.glb', 0.21354981323449496);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012_medium.glb', 279.96433342221474, 'test_tiling/LOD_Tile_+012_+012_high.glb', 0.004840469897416834);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+007.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+007.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+007_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.010_medium.glb', 280.1631905246249, 'test_tiling/LOD_Tile_+012_+012.010_high.glb', 0.22579280590872466);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.011_medium.glb', 279.9607965576644, 'test_tiling/LOD_Tile_+012_+012.011_high.glb', 0.000910620397046806);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.005_medium.glb', 280.8655469985985, 'test_tiling/LOD_Tile_+012_+012.005_high.glb', 1.006188888101626);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.003_medium.glb', 305.6570227247572, 'test_tiling/LOD_Tile_+012_+012.003_high.glb', 28.552273028277938);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.004_medium.glb', 304.2440587722821, 'test_tiling/LOD_Tile_+012_+012.004_high.glb', 26.982313081083344);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+017.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+017.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+017.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+017.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.001_medium.glb', 324.55575798144844, 'test_tiling/LOD_Tile_+012_+012.001_high.glb', 49.55086775793486);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.007_medium.glb', 279.9646407565987, 'test_tiling/LOD_Tile_+012_+012.007_high.glb', 0.005181952546309386);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.006_medium.glb', 279.9706883583299, 'test_tiling/LOD_Tile_+012_+012.006_high.glb', 0.01190151002533715);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.012_medium.glb', 280.8832296419273, 'test_tiling/LOD_Tile_+012_+012.012_high.glb', 1.0258362695780725);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+010_medium.glb', 280.0371112120004, 'test_tiling/LOD_Tile_+016_+010_high.glb', 0.08570468077041549);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+010.004_medium.glb', 280.0222987023452, 'test_tiling/LOD_Tile_+016_+010.004_high.glb', 0.06924633670903674);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+010.003_medium.glb', 280.10553257887847, 'test_tiling/LOD_Tile_+016_+010.003_high.glb', 0.1617284217459973);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+012.002_medium.glb', 304.5002161033688, 'test_tiling/LOD_Tile_+012_+012.002_high.glb', 27.26693233784637);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+014_medium.glb', 280.1573998745919, 'test_tiling/LOD_Tile_+008_+014_high.glb', 0.21935875031647592);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+014.003_medium.glb', 280.2960866146519, 'test_tiling/LOD_Tile_+008_+014.003_high.glb', 0.37345512816099485);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+015.003_medium.glb', 280.8096306143614, 'test_tiling/LOD_Tile_+012_+015.003_high.glb', 0.9440595722826233);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+009_medium.glb', 325.7710941690494, 'test_tiling/LOD_Tile_+003_+009_high.glb', 50.90124129971371);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+009.001_medium.glb', 318.62555126732127, 'test_tiling/LOD_Tile_+003_+009.001_high.glb', 42.96174918668243);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+010.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+010.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+015_medium.glb', 279.96433342221474, 'test_tiling/LOD_Tile_+012_+015_high.glb', 0.004840469897416834);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+010.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+010.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+014.002_medium.glb', 324.427576031399, 'test_tiling/LOD_Tile_+008_+014.002_high.glb', 49.40844336899101);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.009_medium.glb', 280.2525223855752, 'test_tiling/LOD_Tile_+019_+008.009_high.glb', 0.3250504291868265);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.008_medium.glb', 280.8714417728491, 'test_tiling/LOD_Tile_+019_+008.008_high.glb', 1.0127386372689096);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.018_medium.glb', 280.2910517049075, 'test_tiling/LOD_Tile_+019_+008.018_high.glb', 0.36786078400044914);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008_medium.glb', 280.0333308311349, 'test_tiling/LOD_Tile_+019_+008_high.glb', 0.08150425758649672);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.015_medium.glb', 280.28112127751615, 'test_tiling/LOD_Tile_+019_+008.015_high.glb', 0.35682697578787176);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.014_medium.glb', 280.16242134895344, 'test_tiling/LOD_Tile_+019_+008.014_high.glb', 0.22493816627379137);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+015.001_medium.glb', 314.49244289721605, 'test_tiling/LOD_Tile_+012_+015.001_high.glb', 38.36940655323222);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+014.001_medium.glb', 319.96906940497166, 'test_tiling/LOD_Tile_+008_+014.001_high.glb', 44.454547117405134);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.016_medium.glb', 280.35395112941063, 'test_tiling/LOD_Tile_+019_+008.016_high.glb', 0.43774903344838767);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.003_medium.glb', 284.6484520366891, 'test_tiling/LOD_Tile_+019_+008.003_high.glb', 5.209416708202285);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.017_medium.glb', 280.3795757634605, 'test_tiling/LOD_Tile_+019_+008.017_high.glb', 0.4662208490593307);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.013_medium.glb', 280.14748288258346, 'test_tiling/LOD_Tile_+019_+008.013_high.glb', 0.2083398703071288);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.007_medium.glb', 280.4710102618357, 'test_tiling/LOD_Tile_+019_+008.007_high.glb', 0.5678147361429706);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.006_medium.glb', 280.961183412978, 'test_tiling/LOD_Tile_+019_+008.006_high.glb', 1.112451570745535);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+015.002_medium.glb', 329.9042025391546, 'test_tiling/LOD_Tile_+012_+015.002_high.glb', 55.493583933163926);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.012_medium.glb', 280.36768544958755, 'test_tiling/LOD_Tile_+019_+008.012_high.glb', 0.45300938920053685);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.004_medium.glb', 281.2454005412666, 'test_tiling/LOD_Tile_+019_+008.004_high.glb', 1.428248379954994);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.010_medium.glb', 280.3432901530737, 'test_tiling/LOD_Tile_+019_+008.010_high.glb', 0.4259035041851641);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.011_medium.glb', 280.9466278550209, 'test_tiling/LOD_Tile_+019_+008.011_high.glb', 1.096278728570935);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.005_medium.glb', 283.4585859762346, 'test_tiling/LOD_Tile_+019_+008.005_high.glb', 3.8873433076972224);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.001_medium.glb', 352.949447960401, 'test_tiling/LOD_Tile_+019_+008.001_high.glb', 81.09941217899326);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+013.004_medium.glb', 281.10033199432553, 'test_tiling/LOD_Tile_+024_+013.004_high.glb', 1.2670611055760943);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+013_medium.glb', 279.9747374468535, 'test_tiling/LOD_Tile_+024_+013_high.glb', 0.016400497273861434);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+013.003_medium.glb', 281.23512415276537, 'test_tiling/LOD_Tile_+024_+013.003_high.glb', 1.4168301705092372);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+016_medium.glb', 280.0081025408808, 'test_tiling/LOD_Tile_+020_+016_high.glb', 0.05347282397084688);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+008.002_medium.glb', 350.7762260718906, 'test_tiling/LOD_Tile_+019_+008.002_high.glb', 78.68472119175948);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+006_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+023_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+016.003_medium.glb', 280.1747231214279, 'test_tiling/LOD_Tile_+020_+016.003_high.glb', 0.2386068023565124);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+016.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+016.005_medium.glb', 279.98145177946145, 'test_tiling/LOD_Tile_+020_+016.005_high.glb', 0.023860866838191618);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+016.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+016.004_medium.glb', 280.09640995388446, 'test_tiling/LOD_Tile_+020_+016.004_high.glb', 0.15159217175264025);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+013.002_medium.glb', 312.8260893025331, 'test_tiling/LOD_Tile_+024_+013.002_high.glb', 36.517902559140026);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+013.001_medium.glb', 331.57055613383756, 'test_tiling/LOD_Tile_+024_+013.001_high.glb', 57.34508792725612);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+014_medium.glb', 280.0035412283838, 'test_tiling/LOD_Tile_+024_+014_high.glb', 0.048404698974168346);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011.003_medium.glb', 280.1335671847373, 'test_tiling/LOD_Tile_+020_+011.003_high.glb', 0.19287798381137095);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011.004_medium.glb', 281.1513276695729, 'test_tiling/LOD_Tile_+020_+011.004_high.glb', 1.323722966962009);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011.005_medium.glb', 280.1022006039175, 'test_tiling/LOD_Tile_+020_+011.005_high.glb', 0.15802622734488897);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+014.001_medium.glb', 335.59537027944174, 'test_tiling/LOD_Tile_+024_+014.001_high.glb', 61.81710364459409);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+014.002_medium.glb', 308.80127683635175, 'test_tiling/LOD_Tile_+024_+014.002_high.glb', 32.04588870782745);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+016.001_medium.glb', 322.48738414172334, 'test_tiling/LOD_Tile_+020_+016.001_high.glb', 47.25267460268475);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011.007_medium.glb', 279.98667982283524, 'test_tiling/LOD_Tile_+020_+011.007_high.glb', 0.02966980392017258);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+016.002_medium.glb', 321.9092629740702, 'test_tiling/LOD_Tile_+020_+016.002_high.glb', 46.6103177497368);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011.006_medium.glb', 280.0378283255631, 'test_tiling/LOD_Tile_+020_+011.006_high.glb', 0.08650147361783145);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011_medium.glb', 280.1469958499531, 'test_tiling/LOD_Tile_+020_+011_high.glb', 0.20779872294003132);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+018_medium.glb', 280.039366676906, 'test_tiling/LOD_Tile_+020_+018_high.glb', 0.08821075288769799);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+018.003_medium.glb', 280.2149553755437, 'test_tiling/LOD_Tile_+020_+018.003_high.glb', 0.2833093069295724);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+018.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+018.006_medium.glb', 282.7435196300307, 'test_tiling/LOD_Tile_+020_+018.006_high.glb', 3.0928251452484803);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011.002_medium.glb', 321.83515172253095, 'test_tiling/LOD_Tile_+020_+011.002_high.glb', 46.5279719146932);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+011.001_medium.glb', 322.5614937138397, 'test_tiling/LOD_Tile_+020_+011.001_high.glb', 47.335018571702946);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+018.004_medium.glb', 280.18681832489017, 'test_tiling/LOD_Tile_+020_+018.004_high.glb', 0.25204591731456794);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+018.005_medium.glb', 280.00461773843926, 'test_tiling/LOD_Tile_+020_+018.005_high.glb', 0.049600821257994164);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+008.003_medium.glb', 280.4347750341349, 'test_tiling/LOD_Tile_+023_+008.003_high.glb', 0.5275533720309176);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+008_medium.glb', 280.84284288090817, 'test_tiling/LOD_Tile_+023_+008_high.glb', 0.9809620906678644);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+008.004_medium.glb', 280.54886158809177, 'test_tiling/LOD_Tile_+023_+008.004_high.glb', 0.6543162097608021);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011_medium.glb', 280.0686826824096, 'test_tiling/LOD_Tile_+016_+011_high.glb', 0.12078409233615914);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.014_medium.glb', 288.4198748606626, 'test_tiling/LOD_Tile_+016_+011.014_high.glb', 9.399886512617272);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+008.002_medium.glb', 325.2771288810815, 'test_tiling/LOD_Tile_+023_+008.002_high.glb', 50.3523909797494);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+008.001_medium.glb', 319.119518234712, 'test_tiling/LOD_Tile_+023_+008.001_high.glb', 43.51060137267214);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+018.001_medium.glb', 327.7965705105745, 'test_tiling/LOD_Tile_+020_+018.001_high.glb', 53.15177056807496);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+018.002_medium.glb', 316.600076605219, 'test_tiling/LOD_Tile_+020_+018.002_high.glb', 40.71122178434659);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.003_medium.glb', 280.7237835558527, 'test_tiling/LOD_Tile_+016_+011.003_high.glb', 0.8486739517173741);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.012_medium.glb', 280.09892069106525, 'test_tiling/LOD_Tile_+016_+011.012_high.glb', 0.15438187973129797);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.006_medium.glb', 280.26530951125716, 'test_tiling/LOD_Tile_+016_+011.006_high.glb', 0.3392583466112412);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.007_medium.glb', 280.33806210969993, 'test_tiling/LOD_Tile_+016_+011.007_high.glb', 0.4200945671031831);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.013_medium.glb', 280.0931300410322, 'test_tiling/LOD_Tile_+016_+011.013_high.glb', 0.14794782413904922);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.005_medium.glb', 280.3756039283885, 'test_tiling/LOD_Tile_+016_+011.005_high.glb', 0.46180769897938045);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.011_medium.glb', 280.03101154816056, 'test_tiling/LOD_Tile_+016_+011.011_high.glb', 0.07892727650387041);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.010_medium.glb', 280.26126210215637, 'test_tiling/LOD_Tile_+016_+011.010_high.glb', 0.33476122538812075);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.004_medium.glb', 282.6339440058849, 'test_tiling/LOD_Tile_+016_+011.004_high.glb', 2.971074451753161);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.009_medium.glb', 280.08708243930107, 'test_tiling/LOD_Tile_+016_+011.009_high.glb', 0.14122826666002147);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.008_medium.glb', 280.3004430375596, 'test_tiling/LOD_Tile_+016_+011.008_high.glb', 0.3782955980584117);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+015.003_medium.glb', 279.9855008679851, 'test_tiling/LOD_Tile_+008_+015.003_high.glb', 0.0283598540867159);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.002_medium.glb', 363.62481359239587, 'test_tiling/LOD_Tile_+016_+011.002_high.glb', 92.96092954787649);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+015_medium.glb', 279.9725844267426, 'test_tiling/LOD_Tile_+008_+015_high.glb', 0.01400825270620978);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+011.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+011.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.018_medium.glb', 283.22208461034114, 'test_tiling/LOD_Tile_+019_+009.018_high.glb', 3.624564012260086);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.008_medium.glb', 280.42334488212657, 'test_tiling/LOD_Tile_+019_+009.008_high.glb', 0.5148532031327607);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.009_medium.glb', 280.6943147228685, 'test_tiling/LOD_Tile_+019_+009.009_high.glb', 0.8159308039571685);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009_medium.glb', 280.3052361104118, 'test_tiling/LOD_Tile_+019_+009_high.glb', 0.38362123456081243);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.010_medium.glb', 280.5003514586823, 'test_tiling/LOD_Tile_+019_+009.010_high.glb', 0.6004160659724885);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+008_medium.glb', 317.589443087703, 'test_tiling/LOD_Tile_+003_+008_high.glb', 41.81051787599545);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+003_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+003_+008.001_medium.glb', 326.8072023486677, 'test_tiling/LOD_Tile_+003_+008.001_high.glb', 52.0524726104007);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.004_medium.glb', 281.69910838377575, 'test_tiling/LOD_Tile_+019_+009.004_high.glb', 1.9323682049651867);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+015.002_medium.glb', 324.5624723140563, 'test_tiling/LOD_Tile_+008_+015.002_high.glb', 49.55832812749919);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+015.001_medium.glb', 319.83417480173716, 'test_tiling/LOD_Tile_+008_+015.001_high.glb', 44.30466422492236);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.011_medium.glb', 280.0092042422792, 'test_tiling/LOD_Tile_+019_+009.011_high.glb', 0.05469693663572947);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.005_medium.glb', 280.03803321515244, 'test_tiling/LOD_Tile_+019_+009.005_high.glb', 0.08672912871709314);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.007_medium.glb', 280.93453265155864, 'test_tiling/LOD_Tile_+019_+009.007_high.glb', 1.0828396136128795);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.013_medium.glb', 282.21582985154276, 'test_tiling/LOD_Tile_+019_+009.013_high.glb', 2.5065031691507755);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.012_medium.glb', 281.6413983759205, 'test_tiling/LOD_Tile_+019_+009.012_high.glb', 1.8682459740149422);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.006_medium.glb', 281.5345131872019, 'test_tiling/LOD_Tile_+019_+009.006_high.glb', 1.7494846532164854);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.016_medium.glb', 281.33521943484726, 'test_tiling/LOD_Tile_+019_+009.016_high.glb', 1.5280471506001936);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.017_medium.glb', 281.56562281632364, 'test_tiling/LOD_Tile_+019_+009.017_high.glb', 1.7840509077961884);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.003_medium.glb', 285.5617608165352, 'test_tiling/LOD_Tile_+019_+009.003_high.glb', 6.224204241364551);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.015_medium.glb', 282.48631265965435, 'test_tiling/LOD_Tile_+019_+009.015_high.glb', 2.807039622608086);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.014_medium.glb', 281.328607547034, 'test_tiling/LOD_Tile_+019_+009.014_high.glb', 1.5207006085854944);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+012_medium.glb', 279.98139971735264, 'test_tiling/LOD_Tile_+008_+012_high.glb', 0.0238030200506743);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+016_medium.glb', 280.00625685515394, 'test_tiling/LOD_Tile_+016_+016_high.glb', 0.05142206205208778);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+019_+009.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+009.001_medium.glb', 358.5124606214045, 'test_tiling/LOD_Tile_+019_+009.001_high.glb', 87.28053735788605);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+012.001_medium.glb', 332.02526323295046, 'test_tiling/LOD_Tile_+008_+012.001_high.glb', 57.85031803738156);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+012.002_medium.glb', 312.3713822034202, 'test_tiling/LOD_Tile_+008_+012.002_high.glb', 36.01267244901459);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+014.001_medium.glb', 324.1761345197127, 'test_tiling/LOD_Tile_+012_+014.001_high.glb', 49.12906391156181);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+013_medium.glb', 280.5063738690705, 'test_tiling/LOD_Tile_+012_+013_high.glb', 0.6071076330704596);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+014_medium.glb', 320.220510916658, 'test_tiling/LOD_Tile_+012_+014_high.glb', 44.73392657483434);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+013.003_medium.glb', 280.44102752545535, 'test_tiling/LOD_Tile_+012_+013.003_high.glb', 0.5345005846092071);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+007.003_medium.glb', 280.5055022486044, 'test_tiling/LOD_Tile_+019_+007.003_high.glb', 0.6061391658858954);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+016.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+016.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+016.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+016.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+006.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+006.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+006_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+015_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+007_medium.glb', 279.97530173293563, 'test_tiling/LOD_Tile_+019_+007_high.glb', 0.017027481809533004);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+020_medium.glb', 280.5218514301796, 'test_tiling/LOD_Tile_+016_+020_high.glb', 0.6243049231917369);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+007.004_medium.glb', 281.49963661259756, 'test_tiling/LOD_Tile_+019_+007.004_high.glb', 1.7107329036560939);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+020.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+020.003_medium.glb', 280.82357150355057, 'test_tiling/LOD_Tile_+016_+020.003_high.glb', 0.959549449159438);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+007.002_medium.glb', 293.6782200611699, 'test_tiling/LOD_Tile_+019_+007.002_high.glb', 15.24249229095871);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+019_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+019_+007.001_medium.glb', 350.7184270546236, 'test_tiling/LOD_Tile_+019_+007.001_high.glb', 78.62050006146283);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+013.002_medium.glb', 327.22316348289894, 'test_tiling/LOD_Tile_+012_+013.002_high.glb', 52.51465164843543);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+013.001_medium.glb', 317.1734819534717, 'test_tiling/LOD_Tile_+012_+013.001_high.glb', 41.34833883796072);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+025_medium.glb', 279.985551250671, 'test_tiling/LOD_Tile_+012_+025_high.glb', 0.028415834848829435);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+024_medium.glb', 322.87905074481256, 'test_tiling/LOD_Tile_+008_+024_high.glb', 47.687859717228335);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+024.001_medium.glb', 321.5175946915581, 'test_tiling/LOD_Tile_+008_+024.001_high.glb', 46.17513076916781);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+020.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+020.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+008_medium.glb', 280.02891059015843, 'test_tiling/LOD_Tile_+015_+008_high.glb', 0.07659287872373607);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+020.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+020.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+020.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+025.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+025.002_medium.glb', 323.4477419530877, 'test_tiling/LOD_Tile_+012_+025.002_high.glb', 48.31973883753403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+008.003_medium.glb', 280.0622756841857, 'test_tiling/LOD_Tile_+015_+008.003_high.glb', 0.11366520542072152);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+025.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+025.001_medium.glb', 320.94890348328295, 'test_tiling/LOD_Tile_+012_+025.001_high.glb', 45.54325164886211);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+013.001_medium.glb', 319.5362989273006, 'test_tiling/LOD_Tile_+004_+013.001_high.glb', 43.973691031103925);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+008.004_medium.glb', 280.16954546074004, 'test_tiling/LOD_Tile_+015_+008.004_high.glb', 0.23285384603664497);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+008.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+008.005_medium.glb', 282.3505716272967, 'test_tiling/LOD_Tile_+015_+008.005_high.glb', 2.6562162533218046);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+008.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+008.006_medium.glb', 280.5160607801466, 'test_tiling/LOD_Tile_+015_+008.006_high.glb', 0.6178708675994883);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+023_medium.glb', 279.96981673786377, 'test_tiling/LOD_Tile_+008_+023_high.glb', 0.010933042840773026);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+013_medium.glb', 324.86034818849294, 'test_tiling/LOD_Tile_+004_+013_high.glb', 49.889301321317625);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+008.002_medium.glb', 345.5054397068112, 'test_tiling/LOD_Tile_+015_+008.002_high.glb', 72.82829189722682);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+015_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+015_+008.001_medium.glb', 362.46336840505876, 'test_tiling/LOD_Tile_+015_+008.001_high.glb', 91.67043489527968);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+027_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+027_medium.glb', 364.29431719631555, 'test_tiling/LOD_Tile_+016_+027_high.glb', 93.70482244112057);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+023.001_medium.glb', 322.93788764540915, 'test_tiling/LOD_Tile_+008_+023.001_high.glb', 47.75323405122452);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+018.003_medium.glb', 280.82485290319534, 'test_tiling/LOD_Tile_+016_+018.003_high.glb', 0.9609732265425254);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+018.005_medium.glb', 281.54919638129667, 'test_tiling/LOD_Tile_+016_+018.005_high.glb', 1.7657993133217729);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+008_+023.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+008_+023.002_medium.glb', 321.4587577909615, 'test_tiling/LOD_Tile_+008_+023.002_high.glb', 46.109756435171626);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+011_medium.glb', 325.98071469259116, 'test_tiling/LOD_Tile_+000_+011_high.glb', 51.13415299253788);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+000_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+000_+011.001_medium.glb', 318.4159307437795, 'test_tiling/LOD_Tile_+000_+011.001_high.glb', 42.72883749385827);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+018.004_medium.glb', 280.12141991916627, 'test_tiling/LOD_Tile_+016_+018.004_high.glb', 0.1793810220657981);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+018.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+018.006_medium.glb', 280.708153167263, 'test_tiling/LOD_Tile_+016_+018.006_high.glb', 0.8313068532843523);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+018_medium.glb', 280.092001468868, 'test_tiling/LOD_Tile_+016_+018_high.glb', 0.14669385506770607);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+014_medium.glb', 279.9601818888964, 'test_tiling/LOD_Tile_+004_+014_high.glb', 0.0002276550992617015);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+019_medium.glb', 280.93796539189145, 'test_tiling/LOD_Tile_+020_+019_high.glb', 1.0866537695382148);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+009.004_medium.glb', 281.7241704111663, 'test_tiling/LOD_Tile_+023_+009.004_high.glb', 1.960214902065862);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+014.002_medium.glb', 318.98851821309773, 'test_tiling/LOD_Tile_+004_+014.002_high.glb', 43.36504579310075);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+022.001_medium.glb', 317.9961270900368, 'test_tiling/LOD_Tile_+012_+022.001_high.glb', 42.26238898969968);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+004_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+004_+014.001_medium.glb', 325.4081289026958, 'test_tiling/LOD_Tile_+004_+014.001_high.glb', 50.4979465593208);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+019.002_medium.glb', 324.54104791658784, 'test_tiling/LOD_Tile_+020_+019.002_high.glb', 49.53452324142311);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+012_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+012_+022_medium.glb', 326.4005183463339, 'test_tiling/LOD_Tile_+012_+022_high.glb', 51.60060149669647);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+019.001_medium.glb', 319.8555975197828, 'test_tiling/LOD_Tile_+020_+019.001_high.glb', 44.32846724497304);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+009.003_medium.glb', 283.2080160850144, 'test_tiling/LOD_Tile_+023_+009.003_high.glb', 3.608932317452584);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+009_medium.glb', 281.4264994263191, 'test_tiling/LOD_Tile_+023_+009_high.glb', 1.6294693633466852);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+018.002_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+018.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+016_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+016_+018.001_medium.glb', 364.4365928630348, 'test_tiling/LOD_Tile_+016_+018.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+009.002_medium.glb', 319.70245766656024, 'test_tiling/LOD_Tile_+023_+009.002_high.glb', 44.15831185250355);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.007_medium.glb', 280.7255788588937, 'test_tiling/LOD_Tile_+020_+010.007_high.glb', 0.8506687328740197);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.013_medium.glb', 280.2184284220252, 'test_tiling/LOD_Tile_+020_+010.013_high.glb', 0.2871682474645986);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.012_medium.glb', 280.33197588124295, 'test_tiling/LOD_Tile_+020_+010.012_high.glb', 0.41333209103986834);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.006_medium.glb', 280.7599818362506, 'test_tiling/LOD_Tile_+020_+010.006_high.glb', 0.8888942632705439);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.010_medium.glb', 280.0830064800116, 'test_tiling/LOD_Tile_+020_+010.010_high.glb', 0.13669942300503662);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.004_medium.glb', 283.182901995515, 'test_tiling/LOD_Tile_+020_+010.004_high.glb', 3.5810277735643914);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.005_medium.glb', 280.798791619201, 'test_tiling/LOD_Tile_+020_+010.005_high.glb', 0.9320162443265985);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+009.001_medium.glb', 324.69418944923325, 'test_tiling/LOD_Tile_+023_+009.001_high.glb', 49.704680499918);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+015_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.011_medium.glb', 280.3479673457483, 'test_tiling/LOD_Tile_+020_+010.011_high.glb', 0.43110038493470376);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.014_medium.glb', 280.13887248156277, 'test_tiling/LOD_Tile_+020_+010.014_high.glb', 0.19877275806192599);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.003_medium.glb', 282.7615549521608, 'test_tiling/LOD_Tile_+020_+010.003_high.glb', 3.112864392059721);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.008_medium.glb', 280.33099006002215, 'test_tiling/LOD_Tile_+020_+010.008_high.glb', 0.41223673412784684);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.009_medium.glb', 280.0473355383929, 'test_tiling/LOD_Tile_+020_+010.009_high.glb', 0.09706504342865516);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010_medium.glb', 279.99956939331184, 'test_tiling/LOD_Tile_+020_+010_high.glb', 0.04399154889421814);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.008_medium.glb', 279.98006793502196, 'test_tiling/LOD_Tile_+024_+012.008_high.glb', 0.02232326190547324);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012_medium.glb', 280.1179351167247, 'test_tiling/LOD_Tile_+024_+012_high.glb', 0.17550901935294538);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.003_medium.glb', 280.70420652353397, 'test_tiling/LOD_Tile_+024_+012.003_high.glb', 0.8269216935854589);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.006_medium.glb', 279.96059166807504, 'test_tiling/LOD_Tile_+024_+012.006_high.glb', 0.0006829652977851046);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+020_+010.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.007_medium.glb', 279.96858740032775, 'test_tiling/LOD_Tile_+024_+012.007_high.glb', 0.009567112245202817);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+010.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+020_+010.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.005_medium.glb', 280.24010641234605, 'test_tiling/LOD_Tile_+024_+012.005_high.glb', 0.3112549033766482);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.004_medium.glb', 280.57223243665896, 'test_tiling/LOD_Tile_+024_+012.004_high.glb', 0.6802838192798664);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+007.004_medium.glb', 280.0748831116213, 'test_tiling/LOD_Tile_+023_+007.004_high.glb', 0.1276734581269313);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+007.003_medium.glb', 280.256828425797, 'test_tiling/LOD_Tile_+023_+007.003_high.glb', 0.3298349183221298);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+007_medium.glb', 280.7560217571386, 'test_tiling/LOD_Tile_+023_+007_high.glb', 0.8844941753684201);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+017.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+017.004_medium.glb', 279.96033639579986, 'test_tiling/LOD_Tile_+020_+017.004_high.glb', 0.00039932943640986986);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+007.002_medium.glb', 316.9401832469788, 'test_tiling/LOD_Tile_+023_+007.002_high.glb', 41.089118052968594);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+017_medium.glb', 280.2980347451735, 'test_tiling/LOD_Tile_+020_+017_high.glb', 0.3756197176293848);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+017.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+017.003_medium.glb', 284.984561652034, 'test_tiling/LOD_Tile_+020_+017.003_high.glb', 5.582871836363281);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+023_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+023_+007.001_medium.glb', 327.45646218939186, 'test_tiling/LOD_Tile_+023_+007.001_high.glb', 52.77387243342755);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+024_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+024_+012.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+024_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+017_medium.glb', 281.7934113364017, 'test_tiling/LOD_Tile_+021_+017_high.glb', 2.0371492634384905);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+012_medium.glb', 284.7575154368616, 'test_tiling/LOD_Tile_+025_+012_high.glb', 5.330598263949451);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+012.003_medium.glb', 285.39180826102705, 'test_tiling/LOD_Tile_+025_+012.003_high.glb', 6.035368068577777);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007.003_medium.glb', 282.77765389972944, 'test_tiling/LOD_Tile_+022_+007.003_high.glb', 3.130752111580399);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+017.002_medium.glb', 319.4966292798441, 'test_tiling/LOD_Tile_+020_+017.002_high.glb', 43.92961364504114);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+017.002_medium.glb', 325.01625573059437, 'test_tiling/LOD_Tile_+021_+017.002_high.glb', 50.06253192365255);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007.005_medium.glb', 280.15514440968633, 'test_tiling/LOD_Tile_+022_+007.005_high.glb', 0.2168526781991934);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+012.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+025_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+012.002_medium.glb', 326.8636830189869, 'test_tiling/LOD_Tile_+025_+012.002_high.glb', 52.11522891075538);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+017.001_medium.glb', 319.3803897057763, 'test_tiling/LOD_Tile_+021_+017.001_high.glb', 43.80045856274359);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+020_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+020_+017.001_medium.glb', 324.9000161565266, 'test_tiling/LOD_Tile_+020_+017.001_high.glb', 49.93337684135501);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007.004_medium.glb', 280.32007381141, 'test_tiling/LOD_Tile_+022_+007.004_high.glb', 0.400107569003248);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007.001_medium.glb', 321.18471460637954, 'test_tiling/LOD_Tile_+022_+007.001_high.glb', 45.80526400785829);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007.006_medium.glb', 280.19527421900744, 'test_tiling/LOD_Tile_+022_+007.006_high.glb', 0.2614413552226226);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007.002_medium.glb', 323.211932509414, 'test_tiling/LOD_Tile_+022_+007.002_high.glb', 48.05772834456326);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007.007_medium.glb', 280.12541862500404, 'test_tiling/LOD_Tile_+022_+007.007_high.glb', 0.18382402855220883);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+007_medium.glb', 280.00390062487656, 'test_tiling/LOD_Tile_+022_+007_high.glb', 0.04880402841057821);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+010.003_medium.glb', 280.1366422080002, 'test_tiling/LOD_Tile_+021_+010.003_high.glb', 0.19629467632570025);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+010_medium.glb', 280.3161590767154, 'test_tiling/LOD_Tile_+021_+010_high.glb', 0.3957578637870265);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+026_+005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+026_+005_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+026_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+015_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+025_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+009_medium.glb', 280.0017979874516, 'test_tiling/LOD_Tile_+022_+009_high.glb', 0.046467764605040096);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+019_medium.glb', 283.0118242266884, 'test_tiling/LOD_Tile_+021_+019_high.glb', 3.390941363757082);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+019.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+019.003_medium.glb', 286.0760739919161, 'test_tiling/LOD_Tile_+021_+019.003_high.glb', 6.7956633251211125);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+009.002_medium.glb', 325.05643760202423, 'test_tiling/LOD_Tile_+022_+009.002_high.glb', 50.1071784474635);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+009.001_medium.glb', 319.3402078343464, 'test_tiling/LOD_Tile_+022_+009.001_high.glb', 43.755812038932646);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+019.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+019.004_medium.glb', 280.26610555769446, 'test_tiling/LOD_Tile_+021_+019.004_high.glb', 0.34014284265263506);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+021_medium.glb', 280.17651674504606, 'test_tiling/LOD_Tile_+021_+021_high.glb', 0.24059971748775416);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+019.002_medium.glb', 319.73582276058755, 'test_tiling/LOD_Tile_+021_+019.002_high.glb', 44.19538417920054);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+021.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+021.003_medium.glb', 297.93348461209064, 'test_tiling/LOD_Tile_+021_+021.003_high.glb', 19.970564014203994);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+010.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+010.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+010.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+010.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+019.001_medium.glb', 324.660824355206, 'test_tiling/LOD_Tile_+021_+019.001_high.glb', 49.66760817322101);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+021.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+021.004_medium.glb', 285.71126303983556, 'test_tiling/LOD_Tile_+021_+021.004_high.glb', 6.3903178228094415);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+021.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+021.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+021.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+021.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+021.002_medium.glb', 363.56311831408584, 'test_tiling/LOD_Tile_+021_+021.002_high.glb', 92.89237923864307);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+018.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+018.004_medium.glb', 280.2451933841993, 'test_tiling/LOD_Tile_+017_+018.004_high.glb', 0.31690709432471126);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+018.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+018.005_medium.glb', 280.1743889162781, 'test_tiling/LOD_Tile_+017_+018.005_high.glb', 0.2382354633011593);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+018.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+018.003_medium.glb', 280.13859033852174, 'test_tiling/LOD_Tile_+017_+018.003_high.glb', 0.1984592657940902);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+018_medium.glb', 280.9916531819888, 'test_tiling/LOD_Tile_+017_+018_high.glb', 1.1463068696463958);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+014_medium.glb', 280.3953102762677, 'test_tiling/LOD_Tile_+005_+014_high.glb', 0.48370364106738706);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+022.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+022.003_medium.glb', 280.12019058163025, 'test_tiling/LOD_Tile_+013_+022.003_high.glb', 0.17801509147022787);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+022_medium.glb', 280.0026192252318, 'test_tiling/LOD_Tile_+013_+022_high.glb', 0.04738025102749068);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+014.001_medium.glb', 317.2894141931555, 'test_tiling/LOD_Tile_+005_+014.001_high.glb', 41.47715243760936);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+008_medium.glb', 294.47323869163193, 'test_tiling/LOD_Tile_+014_+008_high.glb', 16.12584632480542);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+008.004_medium.glb', 287.78993677998193, 'test_tiling/LOD_Tile_+014_+008.004_high.glb', 8.699955311860958);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+014.002_medium.glb', 327.10723124321515, 'test_tiling/LOD_Tile_+005_+014.002_high.glb', 52.38583804878679);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+008.003_medium.glb', 280.57587174600394, 'test_tiling/LOD_Tile_+014_+008.003_high.glb', 0.6843274963298672);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+022.001_medium.glb', 319.60246482927306, 'test_tiling/LOD_Tile_+013_+022.001_high.glb', 44.047208699962226);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+022.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+022.002_medium.glb', 324.7941822865205, 'test_tiling/LOD_Tile_+013_+022.002_high.glb', 49.815783652459324);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+023_medium.glb', 280.08103483757, 'test_tiling/LOD_Tile_+009_+023_high.glb', 0.1345087091809937);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+018.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+018.002_medium.glb', 324.7544605769552, 'test_tiling/LOD_Tile_+017_+018.002_high.glb', 49.771648419609015);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+011_medium.glb', 279.98068260379, 'test_tiling/LOD_Tile_+001_+011_high.glb', 0.023006227203258345);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+018.001_medium.glb', 319.6421327973067, 'test_tiling/LOD_Tile_+017_+018.001_high.glb', 44.09128421999961);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+008.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+014_+008.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+023.001_medium.glb', 322.471392677218, 'test_tiling/LOD_Tile_+009_+023.001_high.glb', 47.23490630878992);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+000_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+000_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+000_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+008.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+014_+008.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+023.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+023.002_medium.glb', 321.92525275915267, 'test_tiling/LOD_Tile_+009_+023.002_high.glb', 46.62808417760623);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+011.002_medium.glb', 318.29405502658216, 'test_tiling/LOD_Tile_+001_+011.002_high.glb', 42.59342003030564);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+011.001_medium.glb', 326.1025920892114, 'test_tiling/LOD_Tile_+001_+011.001_high.glb', 51.26957232211591);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+025_medium.glb', 321.2199237067108, 'test_tiling/LOD_Tile_+013_+025_high.glb', 45.84438523044863);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+025.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+025.001_medium.glb', 323.17672172965985, 'test_tiling/LOD_Tile_+013_+025.001_high.glb', 48.01860525594751);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.003_medium.glb', 280.25406073691806, 'test_tiling/LOD_Tile_+018_+007.003_high.glb', 0.32675970845669305);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.004_medium.glb', 280.5021198909575, 'test_tiling/LOD_Tile_+018_+007.004_high.glb', 0.6023809907226736);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+013.001_medium.glb', 328.0180813479892, 'test_tiling/LOD_Tile_+005_+013.001_high.glb', 53.397893720757914);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.005_medium.glb', 280.27522818268847, 'test_tiling/LOD_Tile_+018_+007.005_high.glb', 0.3502790926459921);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+013_medium.glb', 316.37856576780433, 'test_tiling/LOD_Tile_+005_+013_high.glb', 40.465098631663636);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.007_medium.glb', 279.97166242359066, 'test_tiling/LOD_Tile_+018_+007.007_high.glb', 0.012983804759532125);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.006_medium.glb', 280.065837740079, 'test_tiling/LOD_Tile_+018_+007.006_high.glb', 0.11762304530214833);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.008_medium.glb', 279.9915736610592, 'test_tiling/LOD_Tile_+018_+007.008_high.glb', 0.03510740194680043);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.009_medium.glb', 279.989805228784, 'test_tiling/LOD_Tile_+018_+007.009_high.glb', 0.033142477196615415);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007_medium.glb', 280.0477721883373, 'test_tiling/LOD_Tile_+018_+007_high.glb', 0.0975502100336391);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.002_medium.glb', 330.45992692350137, 'test_tiling/LOD_Tile_+018_+007.002_high.glb', 56.111055471327006);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+007.001_medium.glb', 328.9418714059257, 'test_tiling/LOD_Tile_+018_+007.001_high.glb', 54.42432711846519);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+020_medium.glb', 280.02053194949286, 'test_tiling/LOD_Tile_+017_+020_high.glb', 0.0672832779842555);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+020.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+020.003_medium.glb', 280.1207548677124, 'test_tiling/LOD_Tile_+017_+020.003_high.glb', 0.17864207600589946);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+013_medium.glb', 279.9639236430361, 'test_tiling/LOD_Tile_+013_+013_high.glb', 0.004385159698893431);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+013.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+013.003_medium.glb', 281.20924256701744, 'test_tiling/LOD_Tile_+013_+013.003_high.glb', 1.3880728530115154);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+024.001_medium.glb', 323.4574809262726, 'test_tiling/LOD_Tile_+009_+024.001_high.glb', 48.33055991885058);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+013.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+013.004_medium.glb', 280.00169554265693, 'test_tiling/LOD_Tile_+013_+013.004_high.glb', 0.04635393705540924);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+006.004_medium.glb', 280.0288602074725, 'test_tiling/LOD_Tile_+014_+006.004_high.glb', 0.07653689796162254);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+020.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+020.001_medium.glb', 298.28410108212967, 'test_tiling/LOD_Tile_+017_+020.001_high.glb', 20.360137869802877);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+020.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+020.002_medium.glb', 346.1124939715551, 'test_tiling/LOD_Tile_+017_+020.002_high.glb', 73.50279663583116);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+024_medium.glb', 320.93916618952096, 'test_tiling/LOD_Tile_+009_+024_high.glb', 45.53243243357097);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+006.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+006.005_medium.glb', 280.08282846118806, 'test_tiling/LOD_Tile_+014_+006.005_high.glb', 0.13650162431223548);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+006.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+006.006_medium.glb', 279.985551250671, 'test_tiling/LOD_Tile_+014_+006.006_high.glb', 0.028415834848829435);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+006.003_medium.glb', 279.9638715809273, 'test_tiling/LOD_Tile_+014_+006.003_high.glb', 0.004327312911376113);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+006_medium.glb', 280.0323450099141, 'test_tiling/LOD_Tile_+014_+006_high.glb', 0.08040890067447524);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+012.003_medium.glb', 283.64458037893394, 'test_tiling/LOD_Tile_+009_+012.003_high.glb', 4.094003755140945);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+012_medium.glb', 280.77703469600556, 'test_tiling/LOD_Tile_+009_+012_high.glb', 0.9078418852205711);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+006.001_medium.glb', 324.57472034499915, 'test_tiling/LOD_Tile_+014_+006.001_high.glb', 49.57193705076899);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+016_medium.glb', 280.01384280822793, 'test_tiling/LOD_Tile_+017_+016_high.glb', 0.059850898800982086);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+016.003_medium.glb', 279.9869099037675, 'test_tiling/LOD_Tile_+017_+016.003_high.glb', 0.029925449400491043);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+006.002_medium.glb', 319.8219250913715, 'test_tiling/LOD_Tile_+014_+006.002_high.glb', 44.291053435627155);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+013.002_medium.glb', 324.79310577646504, 'test_tiling/LOD_Tile_+013_+013.002_high.glb', 49.8145875301755);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+013.001_medium.glb', 319.6035413393285, 'test_tiling/LOD_Tile_+013_+013.001_high.glb', 44.04840482224605);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+012.001_medium.glb', 324.7690161349123, 'test_tiling/LOD_Tile_+009_+012.001_high.glb', 49.78782126178361);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+001_medium.glb', 286.30050534569017, 'test_tiling/LOD_Tile_+014_+001_high.glb', 7.04503149598125);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+012.002_medium.glb', 319.62762930145834, 'test_tiling/LOD_Tile_+009_+012.002_high.glb', 44.07516922461253);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+022_medium.glb', 286.11994555537683, 'test_tiling/LOD_Tile_+005_+022_high.glb', 6.8444095067441735);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.009_medium.glb', 279.99411126900577, 'test_tiling/LOD_Tile_+018_+009.009_high.glb', 0.037926966331918714);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.008_medium.glb', 280.317049170833, 'test_tiling/LOD_Tile_+018_+009.008_high.glb', 0.3967468572510322);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009_medium.glb', 279.992240391936, 'test_tiling/LOD_Tile_+018_+009_high.glb', 0.03584821403210285);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.003_medium.glb', 283.57897708362066, 'test_tiling/LOD_Tile_+018_+009.003_high.glb', 4.021111204792914);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.014_medium.glb', 280.1097865569915, 'test_tiling/LOD_Tile_+018_+009.014_high.glb', 0.1664550640937833);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.015_medium.glb', 280.98563077160065, 'test_tiling/LOD_Tile_+018_+009.015_high.glb', 1.1396153025484248);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.005_medium.glb', 280.359639334649, 'test_tiling/LOD_Tile_+018_+009.005_high.glb', 0.44406926149100556);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.011_medium.glb', 280.1282366965688, 'test_tiling/LOD_Tile_+018_+009.011_high.glb', 0.18695521917975913);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.004_medium.glb', 280.40625339564565, 'test_tiling/LOD_Tile_+018_+009.004_high.glb', 0.4958626625984465);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+016.002_medium.glb', 323.3714793608604, 'test_tiling/LOD_Tile_+017_+016.002_high.glb', 48.23500262394818);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.010_medium.glb', 279.9651798513379, 'test_tiling/LOD_Tile_+018_+009.010_high.glb', 0.005780946700924191);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+016.001_medium.glb', 321.02511569282433, 'test_tiling/LOD_Tile_+017_+016.001_high.glb', 45.627931881685846);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.006_medium.glb', 281.9523435190801, 'test_tiling/LOD_Tile_+018_+009.006_high.glb', 2.213740577525631);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.012_medium.glb', 279.98022076250254, 'test_tiling/LOD_Tile_+018_+009.012_high.glb', 0.022493070217217626);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.002_medium.glb', 362.4419960696991, 'test_tiling/LOD_Tile_+018_+009.002_high.glb', 91.64668785599112);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.007_medium.glb', 280.02296543322194, 'test_tiling/LOD_Tile_+018_+009.007_high.glb', 0.06998714879433915);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.013_medium.glb', 280.0591502782369, 'test_tiling/LOD_Tile_+018_+009.013_high.glb', 0.11019253214427868);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+009.001_medium.glb', 362.4947333064557, 'test_tiling/LOD_Tile_+018_+009.001_high.glb', 91.70528478572076);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.005_medium.glb', 280.09466671295223, 'test_tiling/LOD_Tile_+013_+014.005_high.glb', 0.14965523738351197);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.004_medium.glb', 281.5969121436917, 'test_tiling/LOD_Tile_+013_+014.004_high.glb', 1.8188168270940963);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.003_medium.glb', 286.35493544069317, 'test_tiling/LOD_Tile_+013_+014.003_high.glb', 7.105509379317904);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.007_medium.glb', 280.0918990240733, 'test_tiling/LOD_Tile_+013_+014.007_high.glb', 0.14658002751807522);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.006_medium.glb', 281.5265947084009, 'test_tiling/LOD_Tile_+013_+014.006_high.glb', 1.7406863434376416);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.008_medium.glb', 283.86491226149843, 'test_tiling/LOD_Tile_+013_+014.008_high.glb', 4.338816957990445);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014_medium.glb', 283.77419655610873, 'test_tiling/LOD_Tile_+013_+014_high.glb', 4.238021729779624);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+011_medium.glb', 280.3065930840854, 'test_tiling/LOD_Tile_+017_+011_high.glb', 0.3851289830870703);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+011.006_medium.glb', 280.1311068302424, 'test_tiling/LOD_Tile_+017_+011.006_high.glb', 0.19014425659482675);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+011.005_medium.glb', 280.9427064026348, 'test_tiling/LOD_Tile_+017_+011.005_high.glb', 1.0919215592530984);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+011.004_medium.glb', 280.63565584109546, 'test_tiling/LOD_Tile_+017_+011.004_high.glb', 0.7507542686537857);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+011.003_medium.glb', 281.88051460321225, 'test_tiling/LOD_Tile_+017_+011.003_high.glb', 2.1339306710057704);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+008_medium.glb', 280.0307562758853, 'test_tiling/LOD_Tile_+022_+008_high.glb', 0.07864364064249517);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+013_+014.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+014.001_medium.glb', 332.0074277621411, 'test_tiling/LOD_Tile_+013_+014.001_high.glb', 57.83050084759337);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+020_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+015.001_medium.glb', 324.5508893345674, 'test_tiling/LOD_Tile_+009_+015.001_high.glb', 49.545458150289285);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+015_medium.glb', 319.8457577812261, 'test_tiling/LOD_Tile_+009_+015_high.glb', 44.317534202132265);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+011.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+011.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+008.001_medium.glb', 317.0713881581824, 'test_tiling/LOD_Tile_+002_+008.001_high.glb', 41.234901287639254);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+008_medium.glb', 327.32525727818825, 'test_tiling/LOD_Tile_+002_+008_high.glb', 52.62808919875689);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+011.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+011.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+008.003_medium.glb', 281.204219413233, 'test_tiling/LOD_Tile_+022_+008.003_high.glb', 1.382491571028796);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.005_medium.glb', 280.1553476198528, 'test_tiling/LOD_Tile_+021_+011.005_high.glb', 0.21707846727305133);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.011_medium.glb', 280.1127742502655, 'test_tiling/LOD_Tile_+021_+011.011_high.glb', 0.1697747232871158);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+008.001_medium.glb', 321.5979584344178, 'test_tiling/LOD_Tile_+022_+008.001_high.glb', 46.26442381678971);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.010_medium.glb', 280.51990665850377, 'test_tiling/LOD_Tile_+021_+011.010_high.glb', 0.6221440657741545);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.004_medium.glb', 279.9711367642344, 'test_tiling/LOD_Tile_+021_+011.004_high.glb', 0.012399738808147594);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.006_medium.glb', 280.7217279422679, 'test_tiling/LOD_Tile_+021_+011.006_high.glb', 0.846389936623142);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+008.002_medium.glb', 322.7986886813757, 'test_tiling/LOD_Tile_+022_+008.002_high.glb', 47.59856853563185);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.007_medium.glb', 280.15143456458105, 'test_tiling/LOD_Tile_+021_+011.007_high.glb', 0.21273062808223359);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.003_medium.glb', 282.6781229037297, 'test_tiling/LOD_Tile_+021_+011.003_high.glb', 3.020162116025114);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.009_medium.glb', 280.33061218987785, 'test_tiling/LOD_Tile_+021_+011.009_high.glb', 0.4118168784119953);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.008_medium.glb', 280.63932705947485, 'test_tiling/LOD_Tile_+021_+011.008_high.glb', 0.7548334001864584);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011_medium.glb', 280.043927989403, 'test_tiling/LOD_Tile_+021_+011_high.glb', 0.09327887788437651);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+018_medium.glb', 310.11527407890924, 'test_tiling/LOD_Tile_+021_+018_high.glb', 33.50588564400243);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+018.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+018.001_medium.glb', 334.28137303688425, 'test_tiling/LOD_Tile_+021_+018.001_high.glb', 60.35710670841911);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+014_medium.glb', 288.9813395123565, 'test_tiling/LOD_Tile_+025_+014_high.glb', 10.023736125610485);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+014.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+014.003_medium.glb', 283.22943880306, 'test_tiling/LOD_Tile_+025_+014.003_high.glb', 3.632735337503258);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+014.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+014.006_medium.glb', 290.1547018843324, 'test_tiling/LOD_Tile_+025_+014.006_high.glb', 11.327472094472558);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+014.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+014.005_medium.glb', 279.9831429582849, 'test_tiling/LOD_Tile_+025_+014.005_high.glb', 0.02573995441980255);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+014.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+014.004_medium.glb', 281.8377447411499, 'test_tiling/LOD_Tile_+025_+014.004_high.glb', 2.0864086020475923);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.008_medium.glb', 279.9806322211041, 'test_tiling/LOD_Tile_+021_+016.008_high.glb', 0.02295024644114481);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016_medium.glb', 279.9699712447672, 'test_tiling/LOD_Tile_+021_+016_high.glb', 0.011104717177921193);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+014.001_medium.glb', 312.2390503994752, 'test_tiling/LOD_Tile_+025_+014.001_high.glb', 35.865637111297985);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.001_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+011.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+011.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+011.002_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+021_+011.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+014.002_medium.glb', 332.1575950368954, 'test_tiling/LOD_Tile_+025_+014.002_high.glb', 57.99735337509816);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.007_medium.glb', 280.25698125327756, 'test_tiling/LOD_Tile_+021_+016.007_high.glb', 0.3300047266338742);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.006_medium.glb', 280.6759670280858, 'test_tiling/LOD_Tile_+021_+016.006_high.glb', 0.7955444764208236);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.005_medium.glb', 280.58248363381716, 'test_tiling/LOD_Tile_+021_+016.005_high.glb', 0.6916740383445666);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.004_medium.glb', 280.10891493652537, 'test_tiling/LOD_Tile_+021_+016.004_high.glb', 0.16548659690921916);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.003_medium.glb', 280.51278086729434, 'test_tiling/LOD_Tile_+021_+016.003_high.glb', 0.6142265199858972);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+013_medium.glb', 280.73951806865995, 'test_tiling/LOD_Tile_+025_+013_high.glb', 0.8661567437254304);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+006.001_medium.glb', 318.0466609239967, 'test_tiling/LOD_Tile_+022_+006.001_high.glb', 42.318537694099554);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+022_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+022_+006_medium.glb', 326.349984512374, 'test_tiling/LOD_Tile_+022_+006_high.glb', 51.544452792296596);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+013.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+013.002_medium.glb', 327.88390385831735, 'test_tiling/LOD_Tile_+025_+013.002_high.glb', 53.24880762112255);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.001_medium.glb', 331.18565424604213, 'test_tiling/LOD_Tile_+021_+016.001_high.glb', 56.91741916303897);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+025_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+025_+013.001_medium.glb', 316.51274325747613, 'test_tiling/LOD_Tile_+025_+013.001_high.glb', 40.614184731299);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+015.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+015.003_medium.glb', 280.2729727177829, 'test_tiling/LOD_Tile_+013_+015.003_high.glb', 0.3477730205287096);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+021_+016.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+021_+016.002_medium.glb', 313.2109911903285, 'test_tiling/LOD_Tile_+021_+016.002_high.glb', 36.94557132335717);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+015_medium.glb', 280.50006931564127, 'test_tiling/LOD_Tile_+013_+015_high.glb', 0.6001025737046528);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+008_medium.glb', 280.05018048072344, 'test_tiling/LOD_Tile_+018_+008_high.glb', 0.10022609046266599);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+008.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+008.005_medium.glb', 280.22461709527687, 'test_tiling/LOD_Tile_+018_+008.005_high.glb', 0.2940445510775443);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+008.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+008.004_medium.glb', 281.06030462979913, 'test_tiling/LOD_Tile_+018_+008.004_high.glb', 1.2225862561022962);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+008.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+008.003_medium.glb', 283.45592241157317, 'test_tiling/LOD_Tile_+018_+008.003_high.glb', 3.8843837914068198);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.003_medium.glb', 280.1088897451824, 'test_tiling/LOD_Tile_+017_+010.003_high.glb', 0.16545860652816238);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010_medium.glb', 279.96484564618805, 'test_tiling/LOD_Tile_+017_+010_high.glb', 0.005409607645571088);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.010_medium.glb', 280.62476646324916, 'test_tiling/LOD_Tile_+017_+010.010_high.glb', 0.7386549599356473);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.004_medium.glb', 280.22920359911683, 'test_tiling/LOD_Tile_+017_+010.004_high.glb', 0.2991406664552796);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+015.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+015.002_medium.glb', 320.6760392535511, 'test_tiling/LOD_Tile_+013_+015.002_high.glb', 45.24006917138224);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+008.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+008.001_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+008.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.005_medium.glb', 280.2540355455751, 'test_tiling/LOD_Tile_+017_+010.005_high.glb', 0.3267317180756363);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.002_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+010.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+008.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+008.002_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+008.002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+015.001_medium.glb', 323.72060786224245, 'test_tiling/LOD_Tile_+013_+015.001_high.glb', 48.62292318103932);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.011_medium.glb', 280.804582269234, 'test_tiling/LOD_Tile_+017_+010.011_high.glb', 0.9384502999188472);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.007_medium.glb', 280.5815599512423, 'test_tiling/LOD_Tile_+017_+010.007_high.glb', 0.690647724372485);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.006_medium.glb', 280.4566847848109, 'test_tiling/LOD_Tile_+017_+010.006_high.glb', 0.5518975394486894);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.008_medium.glb', 280.3679675926286, 'test_tiling/LOD_Tile_+017_+010.008_high.glb', 0.45332288146837263);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.009_medium.glb', 280.31025758477335, 'test_tiling/LOD_Tile_+017_+010.009_high.glb', 0.38920065051812797);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+010.001_medium.glb', 364.4366180543777, 'test_tiling/LOD_Tile_+017_+010.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+014_medium.glb', 285.83826435561207, 'test_tiling/LOD_Tile_+009_+014_high.glb', 6.531430395894428);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+007.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+007.003_medium.glb', 280.0942569337735, 'test_tiling/LOD_Tile_+014_+007.003_high.glb', 0.1491999271849886);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+007.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+007.006_medium.glb', 279.985858585055, 'test_tiling/LOD_Tile_+014_+007.006_high.glb', 0.028757317497721983);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+007.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+007.004_medium.glb', 280.1910723030032, 'test_tiling/LOD_Tile_+014_+007.004_high.glb', 0.2567725596623539);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+009_medium.glb', 324.5767188582066, 'test_tiling/LOD_Tile_+002_+009_high.glb', 49.57415762099949);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+009.001_medium.glb', 319.81992657816403, 'test_tiling/LOD_Tile_+002_+009.001_high.glb', 44.28883286539666);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+014.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+014.001_medium.glb', 328.49052147311676, 'test_tiling/LOD_Tile_+009_+014.001_high.glb', 53.92282719312191);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+014.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+014.002_medium.glb', 315.9061256426767, 'test_tiling/LOD_Tile_+009_+014.002_high.glb', 39.94016515929964);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+007.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+007.005_medium.glb', 279.9641789153113, 'test_tiling/LOD_Tile_+014_+007.005_high.glb', 0.0046687955602686656);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+007.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+007.001_medium.glb', 322.7407217218224, 'test_tiling/LOD_Tile_+014_+007.001_high.glb', 47.53416080279482);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+007_medium.glb', 280.00523240720725, 'test_tiling/LOD_Tile_+014_+007_high.glb', 0.05028378655577927);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+012_medium.glb', 279.9739178884962, 'test_tiling/LOD_Tile_+013_+012_high.glb', 0.015489876876814624);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+012.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+012.003_medium.glb', 280.2037821752334, 'test_tiling/LOD_Tile_+013_+012.003_high.glb', 0.2708946399181945);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+007.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+007.002_medium.glb', 321.65592371454824, 'test_tiling/LOD_Tile_+014_+007.002_high.glb', 46.32882968360133);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+017_medium.glb', 280.9682302713129, 'test_tiling/LOD_Tile_+017_+017_high.glb', 1.1202814133398142);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+012_medium.glb', 280.3671228429283, 'test_tiling/LOD_Tile_+005_+012_high.glb', 0.45238427069026904);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+002_+007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+002_+007_medium.glb', 364.4366684370636, 'test_tiling/LOD_Tile_+002_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+013.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+013.001_medium.glb', 319.17886735928187, 'test_tiling/LOD_Tile_+009_+013.001_high.glb', 43.57654484441648);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+012.002_medium.glb', 323.366456207076, 'test_tiling/LOD_Tile_+005_+012.002_high.glb', 48.22942134196546);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+012.001_medium.glb', 331.4409920187715, 'test_tiling/LOD_Tile_+013_+012.001_high.glb', 57.20112779940495);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+012.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+012.001_medium.glb', 321.03018922929465, 'test_tiling/LOD_Tile_+005_+012.001_high.glb', 45.63356914443068);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+012.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+012.002_medium.glb', 312.95565509702203, 'test_tiling/LOD_Tile_+013_+012.002_high.glb', 36.6618645530166);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+017.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+017.001_medium.glb', 319.3901538703041, 'test_tiling/LOD_Tile_+017_+017.001_high.glb', 43.8113076344412);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+017.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+017.002_medium.glb', 325.0064411833806, 'test_tiling/LOD_Tile_+017_+017.002_high.glb', 50.05162687119284);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.013_medium.glb', 280.3165117555167, 'test_tiling/LOD_Tile_+018_+006.013_high.glb', 0.3961497291218212);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+013_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+013_medium.glb', 325.2177780770887, 'test_tiling/LOD_Tile_+009_+013_high.glb', 50.28644564197966);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+025_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+025_medium.glb', 357.95781106769033, 'test_tiling/LOD_Tile_+009_+025_high.glb', 86.66426007598139);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.007_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.007_medium.glb', 282.6064216239994, 'test_tiling/LOD_Tile_+018_+006.007_high.glb', 2.9404940274359412);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.012_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.012_medium.glb', 279.9972366749546, 'test_tiling/LOD_Tile_+018_+006.012_high.glb', 0.04139963960836156);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.006_medium.glb', 280.75827722204417, 'test_tiling/LOD_Tile_+018_+006.006_high.glb', 0.8870002474857026);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+024_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+024_medium.glb', 322.96218217655115, 'test_tiling/LOD_Tile_+013_+024_high.glb', 47.780227974715665);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.004_medium.glb', 281.5154215080907, 'test_tiling/LOD_Tile_+018_+006.004_high.glb', 1.7282716764262638);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+024.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+024.001_medium.glb', 321.43446493924233, 'test_tiling/LOD_Tile_+013_+024.001_high.glb', 46.08276437770588);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+025.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+025.001_medium.glb', 335.83071788182804, 'test_tiling/LOD_Tile_+009_+025.001_high.glb', 62.07860098057884);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.010_medium.glb', 286.1355003699377, 'test_tiling/LOD_Tile_+018_+006.010_high.glb', 6.861692634034024);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.011_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.011_medium.glb', 280.09246331015544, 'test_tiling/LOD_Tile_+018_+006.011_high.glb', 0.1472070120537468);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.005_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.005_medium.glb', 280.4994042641873, 'test_tiling/LOD_Tile_+018_+006.005_high.glb', 0.5993636276447541);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.014_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.014_medium.glb', 280.1762597933479, 'test_tiling/LOD_Tile_+018_+006.014_high.glb', 0.24031421560097518);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.015_medium.glb', 280.1407416792098, 'test_tiling/LOD_Tile_+018_+006.015_high.glb', 0.20084964433633806);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.016_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.016_medium.glb', 280.2046017335908, 'test_tiling/LOD_Tile_+018_+006.016_high.glb', 0.2718052603152414);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.003_medium.glb', 283.98735226477794, 'test_tiling/LOD_Tile_+018_+006.003_high.glb', 4.474861406078753);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.017_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.017_medium.glb', 282.44715523617117, 'test_tiling/LOD_Tile_+018_+006.017_high.glb', 2.7635313742934478);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006_medium.glb', 279.96187306771986, 'test_tiling/LOD_Tile_+018_+006_high.glb', 0.0021067426808726313);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.019_medium.glb', 280.40351089810974, 'test_tiling/LOD_Tile_+018_+006.019_high.glb', 0.49281544311406644);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.018_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.018_medium.glb', 280.17108381208294, 'test_tiling/LOD_Tile_+018_+006.018_high.glb', 0.23456312530651152);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.020_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.020_medium.glb', 279.97079080312454, 'test_tiling/LOD_Tile_+018_+006.020_high.glb', 0.012015337574968001);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.009_medium.glb', 280.3503118200656, 'test_tiling/LOD_Tile_+018_+006.009_high.glb', 0.4337053563983868);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.008_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.008_medium.glb', 280.335294420821, 'test_tiling/LOD_Tile_+018_+006.008_high.glb', 0.4170193572377464);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.001_medium.glb', 334.56682118213166, 'test_tiling/LOD_Tile_+018_+006.001_high.glb', 60.67427131424955);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.002_medium.glb', 320.4572692342495, 'test_tiling/LOD_Tile_+018_+006.002_high.glb', 44.996991372158256);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.021_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.021_medium.glb', 279.9697142930691, 'test_tiling/LOD_Tile_+018_+006.021_high.glb', 0.010819215291142176);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.023_medium.glb', 280.01220201209037, 'test_tiling/LOD_Tile_+018_+006.023_high.glb', 0.05802779198148469);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+006.022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+006.022_medium.glb', 279.9797085385292, 'test_tiling/LOD_Tile_+018_+006.022_high.glb', 0.02192393246906337);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+019_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+019_medium.glb', 280.608415602251, 'test_tiling/LOD_Tile_+017_+019_high.glb', 0.7204873366044021);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+009_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+009_medium.glb', 280.84950515140724, 'test_tiling/LOD_Tile_+014_+009_high.glb', 0.9883646134446772);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+001_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+018_+001.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+018_+001.001_medium.glb', 364.43664324572063, 'test_tiling/LOD_Tile_+018_+001.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+015.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+015.001_medium.glb', 329.8274781056399, 'test_tiling/LOD_Tile_+005_+015.001_high.glb', 55.40833456259204);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+005_+015_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+005_+015_medium.glb', 314.56916733073075, 'test_tiling/LOD_Tile_+005_+015_high.glb', 38.45465592380411);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+023.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+023.001_medium.glb', 323.71876217651555, 'test_tiling/LOD_Tile_+013_+023.001_high.glb', 48.62087241912056);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+013_+023_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+013_+023_medium.glb', 320.6778832598551, 'test_tiling/LOD_Tile_+013_+023_high.glb', 45.24211806727559);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+019.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+019.001_medium.glb', 328.2017413529084, 'test_tiling/LOD_Tile_+017_+019.001_high.glb', 53.601960392890376);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+017_+019.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+017_+019.002_medium.glb', 316.1948520213535, 'test_tiling/LOD_Tile_+017_+019.002_high.glb', 40.26097224671826);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+009.003_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+009.003_medium.glb', 283.3065730157534, 'test_tiling/LOD_Tile_+014_+009.003_high.glb', 3.718440018273674);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+009.004_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+009.004_medium.glb', 280.6090823331278, 'test_tiling/LOD_Tile_+014_+009.004_high.glb', 0.7212281486897044);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+022_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+022_medium.glb', 279.96069411286976, 'test_tiling/LOD_Tile_+009_+022_high.glb', 0.0007967928474159554);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+009.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+009.001_medium.glb', 352.15394229730856, 'test_tiling/LOD_Tile_+014_+009.001_high.glb', 80.21551699777946);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+010_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+010_medium.glb', 325.6145702787571, 'test_tiling/LOD_Tile_+001_+010_high.glb', 50.7273258660556);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+014_+009.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+014_+009.002_medium.glb', 354.53807786496554, 'test_tiling/LOD_Tile_+014_+009.002_high.glb', 82.8645565173983);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+001_+010.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+001_+010.001_medium.glb', 318.7820751576136, 'test_tiling/LOD_Tile_+001_+010.001_high.glb', 43.13566462034055);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+022.001_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+022.001_medium.glb', 321.8943984023062, 'test_tiling/LOD_Tile_+009_+022.001_high.glb', 46.59380155888791);

    LODManager.AddBaseLayer('test_tiling/LOD_Tile_+009_+022.002_low.glb', 2799.5997699930704, 'test_tiling/LOD_Tile_+009_+022.002_medium.glb', 322.50224703406445, 'test_tiling/LOD_Tile_+009_+022.002_high.glb', 47.269188927508246);



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
