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



    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+018.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+018.005_medium_1.glb', 2099.7443028107828, 'test_4_levels/LOD_Tile_+022_+018.005_medium_0.glb', 1399.8888356284954, 'test_4_levels/LOD_Tile_+022_+018.005_high.glb', 0.17790126392059705);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+008.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+008.004_medium_1.glb', 2100.078138021064, 'test_4_levels/LOD_Tile_+021_+008.004_medium_0.glb', 1400.5565060490585, 'test_4_levels/LOD_Tile_+021_+008.004_high.glb', 1.5132421050465679);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+020_medium_1.glb', 2119.324671116422, 'test_4_levels/LOD_Tile_+022_+020_medium_0.glb', 1439.049572239774, 'test_4_levels/LOD_Tile_+022_+020_high.glb', 78.49937448647778);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+018.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+018.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+018.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+018.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+018.003_medium_1.glb', 2102.053244272359, 'test_4_levels/LOD_Tile_+022_+018.003_medium_0.glb', 1404.5067185516473, 'test_4_levels/LOD_Tile_+022_+018.003_high.glb', 9.413667110224218);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+008_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+008_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+008.001_medium_1.glb', 2112.945700594093, 'test_4_levels/LOD_Tile_+021_+008.001_medium_0.glb', 1426.291631195116, 'test_4_levels/LOD_Tile_+021_+008.001_high.glb', 52.983492397161676);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+018_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+018_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+008.002_medium_1.glb', 2109.9197020171114, 'test_4_levels/LOD_Tile_+021_+008.002_medium_0.glb', 1420.2396340411524, 'test_4_levels/LOD_Tile_+021_+008.002_high.glb', 40.879498089234474);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+018.002_medium_1.glb', 2117.5060250306524, 'test_4_levels/LOD_Tile_+022_+018.002_medium_0.glb', 1435.4122800682348, 'test_4_levels/LOD_Tile_+022_+018.002_high.glb', 71.22479014339919);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+011.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+011.008_medium_1.glb', 2100.1932554607556, 'test_4_levels/LOD_Tile_+022_+011.008_medium_0.glb', 1400.7867409284408, 'test_4_levels/LOD_Tile_+022_+011.008_high.glb', 1.9737118638114348);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+011.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+011.007_medium_1.glb', 2099.8333957271802, 'test_4_levels/LOD_Tile_+022_+011.007_medium_0.glb', 1400.06702146129, 'test_4_levels/LOD_Tile_+022_+011.007_high.glb', 0.5342729295099454);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+011.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+011.006_medium_1.glb', 2099.785446804911, 'test_4_levels/LOD_Tile_+022_+011.006_medium_0.glb', 1399.9711236167516, 'test_4_levels/LOD_Tile_+022_+011.006_high.glb', 0.3424772404327694);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+011.003_medium_1.glb', 2100.491399203139, 'test_4_levels/LOD_Tile_+022_+011.003_medium_0.glb', 1401.3830284132075, 'test_4_levels/LOD_Tile_+022_+011.003_high.glb', 3.166286833344666);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+026_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+026_+014_medium_1.glb', 2122.1921876893543, 'test_4_levels/LOD_Tile_+026_+014_medium_0.glb', 1444.784605385638, 'test_4_levels/LOD_Tile_+026_+014_high.glb', 89.96944077820594);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+016.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+016.004_medium_1.glb', 2100.0676598219156, 'test_4_levels/LOD_Tile_+022_+016.004_medium_0.glb', 1400.5355496507614, 'test_4_levels/LOD_Tile_+022_+016.004_high.glb', 1.4713293084521657);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+016.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+016.003_medium_1.glb', 2100.029249088498, 'test_4_levels/LOD_Tile_+022_+016.003_medium_0.glb', 1400.4587281839256, 'test_4_levels/LOD_Tile_+022_+016.003_high.glb', 1.3176863747807663);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+011.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+011.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+011.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+011.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+011.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+011.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+016.002_medium_1.glb', 2112.5662797827163, 'test_4_levels/LOD_Tile_+022_+016.002_medium_0.glb', 1425.5327895723622, 'test_4_levels/LOD_Tile_+022_+016.002_high.glb', 51.4658091516541);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+016.001_medium_1.glb', 2110.299122828488, 'test_4_levels/LOD_Tile_+022_+016.001_medium_0.glb', 1420.9984756639062, 'test_4_levels/LOD_Tile_+022_+016.001_high.glb', 42.397181334742044);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+026_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+026_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+026_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+026_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+006.001_medium_1.glb', 2112.0365342973423, 'test_4_levels/LOD_Tile_+021_+006.001_medium_0.glb', 1424.4732986016143, 'test_4_levels/LOD_Tile_+021_+006.001_high.glb', 49.34682721015805);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+015_medium_1.glb', 2099.8254231336427, 'test_4_levels/LOD_Tile_+010_+015_medium_0.glb', 1400.051076274215, 'test_4_levels/LOD_Tile_+010_+015_high.glb', 0.5023825553592693);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+006.002_medium_1.glb', 2110.828868313862, 'test_4_levels/LOD_Tile_+021_+006.002_medium_0.glb', 1422.0579666346543, 'test_4_levels/LOD_Tile_+021_+006.002_high.glb', 44.5161632762381);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+000_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+000_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+000_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+000_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+023_medium_1.glb', 2107.979830990504, 'test_4_levels/LOD_Tile_+006_+023_medium_0.glb', 1416.3598919879375, 'test_4_levels/LOD_Tile_+006_+023_high.glb', 33.12001398280466);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+009_medium_1.glb', 2111.85871887059, 'test_4_levels/LOD_Tile_+001_+009_medium_0.glb', 1424.11766774811, 'test_4_levels/LOD_Tile_+001_+009_high.glb', 48.635565503149955);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+010.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+010.003_medium_1.glb', 2099.938433830653, 'test_4_levels/LOD_Tile_+014_+010.003_medium_0.glb', 1400.2770976682355, 'test_4_levels/LOD_Tile_+014_+010.003_high.glb', 0.9544253434006458);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+015.001_medium_1.glb', 2107.898739124532, 'test_4_levels/LOD_Tile_+010_+015.001_medium_0.glb', 1416.197708255993, 'test_4_levels/LOD_Tile_+010_+015.001_high.glb', 32.79564651891562);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+015.002_medium_1.glb', 2114.966663486673, 'test_4_levels/LOD_Tile_+010_+015.002_medium_0.glb', 1430.3335569802755, 'test_4_levels/LOD_Tile_+010_+015.002_high.glb', 61.067343967480525);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+009.001_medium_1.glb', 2111.0066842071205, 'test_4_levels/LOD_Tile_+001_+009.001_medium_0.glb', 1422.413598421171, 'test_4_levels/LOD_Tile_+001_+009.001_high.glb', 45.227426849271595);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+010.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+010.004_medium_1.glb', 2099.974609065637, 'test_4_levels/LOD_Tile_+014_+010.004_medium_0.glb', 1400.3494481382038, 'test_4_levels/LOD_Tile_+014_+010.004_high.glb', 1.09912628333711);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+018.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+018.008_medium_1.glb', 2100.0866797523504, 'test_4_levels/LOD_Tile_+018_+018.008_medium_0.glb', 1400.5735895116302, 'test_4_levels/LOD_Tile_+018_+018.008_high.glb', 1.547409030189861);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+018.009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+018.009_medium_1.glb', 2099.7794601289092, 'test_4_levels/LOD_Tile_+018_+018.009_medium_0.glb', 1399.9591502647481, 'test_4_levels/LOD_Tile_+018_+018.009_high.glb', 0.31853053642600365);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+010.002_medium_1.glb', 2120.5857105580203, 'test_4_levels/LOD_Tile_+014_+010.002_medium_0.glb', 1441.5716511229703, 'test_4_levels/LOD_Tile_+014_+010.002_high.glb', 83.54353225287011);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+010.001_medium_1.glb', 2117.2868234929765, 'test_4_levels/LOD_Tile_+014_+010.001_medium_0.glb', 1434.9738769928824, 'test_4_levels/LOD_Tile_+014_+010.001_high.glb', 70.34798399269435);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+005.002_medium_1.glb', 2108.3118440269786, 'test_4_levels/LOD_Tile_+013_+005.002_medium_0.glb', 1417.023918060887, 'test_4_levels/LOD_Tile_+013_+005.002_high.glb', 34.448066128703445);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+005.001_medium_1.glb', 2114.5535590507325, 'test_4_levels/LOD_Tile_+013_+005.001_medium_0.glb', 1429.5073481083941, 'test_4_levels/LOD_Tile_+013_+005.001_high.glb', 59.414926223718105);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+018.002_medium_1.glb', 2113.517579533566, 'test_4_levels/LOD_Tile_+018_+018.002_medium_0.glb', 1427.4353890740608, 'test_4_levels/LOD_Tile_+018_+018.002_high.glb', 55.27100815505133);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+020.001_medium_1.glb', 2112.3690171057124, 'test_4_levels/LOD_Tile_+018_+020.001_medium_0.glb', 1425.1382642183544, 'test_4_levels/LOD_Tile_+018_+020.001_high.glb', 50.67675844363844);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+018.001_medium_1.glb', 2109.3478160800437, 'test_4_levels/LOD_Tile_+018_+018.001_medium_0.glb', 1419.095862167017, 'test_4_levels/LOD_Tile_+018_+018.001_high.glb', 38.59195434096377);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+012.002_medium_1.glb', 2116.239590443106, 'test_4_levels/LOD_Tile_+010_+012.002_medium_0.glb', 1432.8794108931413, 'test_4_levels/LOD_Tile_+010_+012.002_high.glb', 66.1590517932121);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+020_medium_1.glb', 2110.496378507897, 'test_4_levels/LOD_Tile_+018_+020_medium_0.glb', 1421.3929870227234, 'test_4_levels/LOD_Tile_+018_+020_high.glb', 43.186204052376645);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+007.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+007.003_medium_1.glb', 2100.870300326441, 'test_4_levels/LOD_Tile_+017_+007.003_medium_0.glb', 1402.1408306598114, 'test_4_levels/LOD_Tile_+017_+007.003_high.glb', 4.681891326552425);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+012.001_medium_1.glb', 2106.625812634605, 'test_4_levels/LOD_Tile_+010_+012.001_medium_0.glb', 1413.65185527614, 'test_4_levels/LOD_Tile_+010_+012.001_high.glb', 27.703940559209457);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+018_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+018_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+018_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+007.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+007.004_medium_1.glb', 2100.871368159478, 'test_4_levels/LOD_Tile_+017_+007.004_medium_0.glb', 1402.142966325886, 'test_4_levels/LOD_Tile_+017_+007.004_high.glb', 4.686162658701687);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+007.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+007.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+007.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+028.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+028.001_medium_1.glb', 2111.378673105821, 'test_4_levels/LOD_Tile_+014_+028.001_medium_0.glb', 1423.157576218571, 'test_4_levels/LOD_Tile_+014_+028.001_high.glb', 46.71538244407148);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+028_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+028_medium_1.glb', 2111.486729505384, 'test_4_levels/LOD_Tile_+014_+028_medium_0.glb', 1423.3736890176974, 'test_4_levels/LOD_Tile_+014_+028_high.glb', 47.14760804232467);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+007.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+007.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+007.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+007_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+007_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+012_medium_1.glb', 2110.024412633126, 'test_4_levels/LOD_Tile_+006_+012_medium_0.glb', 1420.449055273181, 'test_4_levels/LOD_Tile_+006_+012_high.glb', 41.298340553291716);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+012.001_medium_1.glb', 2112.8409904445853, 'test_4_levels/LOD_Tile_+006_+012.001_medium_0.glb', 1426.0822108961002, 'test_4_levels/LOD_Tile_+006_+012.001_high.glb', 52.56465179912984);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+024.001_medium_1.glb', 2111.211577995013, 'test_4_levels/LOD_Tile_+010_+024.001_medium_0.glb', 1422.8233859969564, 'test_4_levels/LOD_Tile_+010_+024.001_high.glb', 46.047002000842355);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+024_medium_1.glb', 2111.6538250826975, 'test_4_levels/LOD_Tile_+010_+024_medium_0.glb', 1423.7078801723248, 'test_4_levels/LOD_Tile_+010_+024_high.glb', 47.815990351579195);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+016.001_medium_1.glb', 2112.303770594456, 'test_4_levels/LOD_Tile_+018_+016.001_medium_0.glb', 1425.0077711958425, 'test_4_levels/LOD_Tile_+018_+016.001_high.glb', 50.41577239861435);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+017.002_medium_1.glb', 2111.7981560830976, 'test_4_levels/LOD_Tile_+014_+017.002_medium_0.glb', 1423.9965421731251, 'test_4_levels/LOD_Tile_+014_+017.002_high.glb', 48.39331435317985);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+017.001_medium_1.glb', 2111.067246528107, 'test_4_levels/LOD_Tile_+014_+017.001_medium_0.glb', 1422.5347230631432, 'test_4_levels/LOD_Tile_+014_+017.001_high.glb', 45.469676133216296);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+021.002_medium_1.glb', 2107.7074701211245, 'test_4_levels/LOD_Tile_+014_+021.002_medium_0.glb', 1415.8151702491791, 'test_4_levels/LOD_Tile_+014_+021.002_high.glb', 32.030570505287784);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+021_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+021_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+016.002_medium_1.glb', 2110.561625019153, 'test_4_levels/LOD_Tile_+018_+016.002_medium_0.glb', 1421.5234800452356, 'test_4_levels/LOD_Tile_+018_+016.002_high.glb', 43.44719009740074);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+017_medium_1.glb', 2104.804689400112, 'test_4_levels/LOD_Tile_+002_+017_medium_0.glb', 1410.0096088071537, 'test_4_levels/LOD_Tile_+002_+017_high.glb', 20.41944762123676);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+021.001_medium_1.glb', 2115.157932956586, 'test_4_levels/LOD_Tile_+014_+021.001_medium_0.glb', 1430.7160959201021, 'test_4_levels/LOD_Tile_+014_+021.001_high.glb', 61.83242184713376);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+016_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+016_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+016_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+019.001_medium_1.glb', 2111.694783873804, 'test_4_levels/LOD_Tile_+014_+019.001_medium_0.glb', 1423.7897977545383, 'test_4_levels/LOD_Tile_+014_+019.001_high.glb', 47.979825516006066);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+019.002_medium_1.glb', 2111.1706192039064, 'test_4_levels/LOD_Tile_+014_+019.002_medium_0.glb', 1422.741468414743, 'test_4_levels/LOD_Tile_+014_+019.002_high.glb', 45.883166836415484);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+011.002_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+011.002_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+011.002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+011.001_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+011.001_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+011.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+011_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+011_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+011_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+023.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+023.002_medium_1.glb', 2108.2915281419014, 'test_4_levels/LOD_Tile_+010_+023.002_medium_0.glb', 1416.9832862907322, 'test_4_levels/LOD_Tile_+010_+023.002_high.glb', 34.366802588394044);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+015_medium_1.glb', 2111.432815366405, 'test_4_levels/LOD_Tile_+006_+015_medium_0.glb', 1423.2658607397398, 'test_4_levels/LOD_Tile_+006_+015_high.glb', 46.9319514864093);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+023.001_medium_1.glb', 2114.5738744693035, 'test_4_levels/LOD_Tile_+010_+023.001_medium_0.glb', 1429.5479789455362, 'test_4_levels/LOD_Tile_+010_+023.001_high.glb', 59.49618789800211);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+015.001_medium_1.glb', 2111.432587711306, 'test_4_levels/LOD_Tile_+006_+015.001_medium_0.glb', 1423.2654054295413, 'test_4_levels/LOD_Tile_+006_+015.001_high.glb', 46.93104086601225);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+010.001_medium_1.glb', 2109.957130288154, 'test_4_levels/LOD_Tile_+002_+010.001_medium_0.glb', 1420.314490583238, 'test_4_levels/LOD_Tile_+002_+010.001_high.glb', 41.0292111734055);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+010_medium_1.glb', 2112.9082727895566, 'test_4_levels/LOD_Tile_+002_+010_medium_0.glb', 1426.2167755860432, 'test_4_levels/LOD_Tile_+002_+010_high.glb', 52.83378117901605);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+026_medium_1.glb', 2112.4645165538273, 'test_4_levels/LOD_Tile_+014_+026_medium_0.glb', 1425.3292631145841, 'test_4_levels/LOD_Tile_+014_+026_high.glb', 51.05875623609796);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+023_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+023_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+026.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+026.001_medium_1.glb', 2110.400886523884, 'test_4_levels/LOD_Tile_+014_+026.001_medium_0.glb', 1421.202003054697, 'test_4_levels/LOD_Tile_+014_+026.001_high.glb', 42.80423611632359);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+017.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+017.003_medium_1.glb', 2100.3434970966223, 'test_4_levels/LOD_Tile_+022_+017.003_medium_0.glb', 1401.0872242001742, 'test_4_levels/LOD_Tile_+022_+017.003_high.glb', 2.5746784072780398);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+017.009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+017.009_medium_1.glb', 2100.0806170358132, 'test_4_levels/LOD_Tile_+022_+017.009_medium_0.glb', 1400.5614640785564, 'test_4_levels/LOD_Tile_+022_+017.009_high.glb', 1.5231581640422784);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+017.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+017.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+017.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+009.001_medium_1.glb', 2111.911145320816, 'test_4_levels/LOD_Tile_+017_+009.001_medium_0.glb', 1424.2225206485616, 'test_4_levels/LOD_Tile_+017_+009.001_high.glb', 48.84527130405265);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+017.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+017.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+017.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+007.001_medium_1.glb', 2112.14412092501, 'test_4_levels/LOD_Tile_+021_+007.001_medium_0.glb', 1424.68847185695, 'test_4_levels/LOD_Tile_+021_+007.001_high.glb', 49.77717372082962);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+009.002_medium_1.glb', 2110.954243295198, 'test_4_levels/LOD_Tile_+017_+009.002_medium_0.glb', 1422.3087165973259, 'test_4_levels/LOD_Tile_+017_+009.002_high.glb', 45.01766320158138);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+007_medium_1.glb', 2110.721282152701, 'test_4_levels/LOD_Tile_+021_+007_medium_0.glb', 1421.842794312331, 'test_4_levels/LOD_Tile_+021_+007_high.glb', 44.08581863159193);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+026_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+026_+015_medium_1.glb', 2108.1658471323994, 'test_4_levels/LOD_Tile_+026_+015_medium_0.glb', 1416.731924271728, 'test_4_levels/LOD_Tile_+026_+015_high.glb', 33.86407855038588);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+026_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+026_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+026_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+026_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+009_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+009_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+009_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+009.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+009.004_medium_1.glb', 2101.009356539531, 'test_4_levels/LOD_Tile_+021_+009.004_medium_0.glb', 1402.4189430859915, 'test_4_levels/LOD_Tile_+021_+009.004_high.glb', 5.23811617891249);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+009.002_medium_1.glb', 2108.0020973386345, 'test_4_levels/LOD_Tile_+021_+009.002_medium_0.glb', 1416.4044246841988, 'test_4_levels/LOD_Tile_+021_+009.002_high.glb', 33.20907937532729);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+021_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+021_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+009.001_medium_1.glb', 2114.86330527257, 'test_4_levels/LOD_Tile_+021_+009.001_medium_0.glb', 1430.1268405520696, 'test_4_levels/LOD_Tile_+021_+009.001_high.glb', 60.65391111106886);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+010.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+010.003_medium_1.glb', 2100.8887226622396, 'test_4_levels/LOD_Tile_+018_+010.003_medium_0.glb', 1402.177675331409, 'test_4_levels/LOD_Tile_+018_+010.003_high.glb', 4.755580669747872);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+010.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+010.007_medium_1.glb', 2099.85386089429, 'test_4_levels/LOD_Tile_+018_+010.007_medium_0.glb', 1400.1079517955095, 'test_4_levels/LOD_Tile_+018_+010.007_high.glb', 0.6161335979485649);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+010.001_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+010.001_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+010.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+014.001_medium_1.glb', 2112.9874281876664, 'test_4_levels/LOD_Tile_+006_+014.001_medium_0.glb', 1426.3750863822622, 'test_4_levels/LOD_Tile_+006_+014.001_high.glb', 53.15040277145398);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+014_medium_1.glb', 2109.8779744235385, 'test_4_levels/LOD_Tile_+006_+014_medium_0.glb', 1420.1561788540062, 'test_4_levels/LOD_Tile_+006_+014_high.glb', 40.71258771494217);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+010_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+010_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+010_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+010.002_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+010.002_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+010.002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+022_medium_1.glb', 2112.270584732169, 'test_4_levels/LOD_Tile_+010_+022_medium_0.glb', 1424.941399471268, 'test_4_levels/LOD_Tile_+010_+022_high.glb', 50.28302894946533);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+022.001_medium_1.glb', 2110.5948178790354, 'test_4_levels/LOD_Tile_+010_+022.001_medium_0.glb', 1421.5898657650007, 'test_4_levels/LOD_Tile_+010_+022.001_high.glb', 43.57996153693082);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+027_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+027_medium_1.glb', 2110.8126101010253, 'test_4_levels/LOD_Tile_+014_+027_medium_0.glb', 1422.0254502089806, 'test_4_levels/LOD_Tile_+014_+027_high.glb', 44.451130424890806);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+027.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+027.001_medium_1.glb', 2112.052792510179, 'test_4_levels/LOD_Tile_+014_+027.001_medium_0.glb', 1424.5058150272878, 'test_4_levels/LOD_Tile_+014_+027.001_high.glb', 49.41186006150534);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+018_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+018_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+018.002_medium_1.glb', 2111.111778757862, 'test_4_levels/LOD_Tile_+014_+018.002_medium_0.glb', 1422.6237875226532, 'test_4_levels/LOD_Tile_+014_+018.002_high.glb', 45.64780505223616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+011.001_medium_1.glb', 2111.6284550678142, 'test_4_levels/LOD_Tile_+002_+011.001_medium_0.glb', 1423.6571401425579, 'test_4_levels/LOD_Tile_+002_+011.001_high.glb', 47.71451029204519);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+011_medium_1.glb', 2111.2369475433907, 'test_4_levels/LOD_Tile_+002_+011_medium_0.glb', 1422.8741250937107, 'test_4_levels/LOD_Tile_+002_+011_high.glb', 46.14848019435096);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+018.001_medium_1.glb', 2111.7536238533426, 'test_4_levels/LOD_Tile_+014_+018.001_medium_0.glb', 1423.9074777136152, 'test_4_levels/LOD_Tile_+014_+018.001_high.glb', 48.21518543415999);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+008.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+008.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+008.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+013_medium_1.glb', 2100.100389907498, 'test_4_levels/LOD_Tile_+006_+013_medium_0.glb', 1400.601009821926, 'test_4_levels/LOD_Tile_+006_+013_high.glb', 1.602249650781682);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+008.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+008.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+008.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+025.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+025.002_medium_1.glb', 2111.5124265412196, 'test_4_levels/LOD_Tile_+010_+025.002_medium_0.glb', 1423.4250830893686, 'test_4_levels/LOD_Tile_+010_+025.002_high.glb', 47.25039618566673);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+025.001_medium_1.glb', 2111.3529760699853, 'test_4_levels/LOD_Tile_+010_+025.001_medium_0.glb', 1423.1061821469, 'test_4_levels/LOD_Tile_+010_+025.001_high.glb', 46.61259430072942);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+013.001_medium_1.glb', 2112.50363870943, 'test_4_levels/LOD_Tile_+006_+013.001_medium_0.glb', 1425.4075074257903, 'test_4_levels/LOD_Tile_+006_+013.001_high.glb', 51.21524485851013);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+017.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+017.003_medium_1.glb', 2099.8457959324946, 'test_4_levels/LOD_Tile_+018_+017.003_medium_0.glb', 1400.0918218719191, 'test_4_levels/LOD_Tile_+018_+017.003_high.glb', 0.5838737507679395);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+008_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+008_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+025_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+025_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+013.002_medium_1.glb', 2110.3617639017743, 'test_4_levels/LOD_Tile_+006_+013.002_medium_0.glb', 1421.123757810478, 'test_4_levels/LOD_Tile_+006_+013.002_high.glb', 42.64774562788601);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+016.001_medium_1.glb', 2114.2412209196086, 'test_4_levels/LOD_Tile_+002_+016.001_medium_0.glb', 1428.882671846147, 'test_4_levels/LOD_Tile_+002_+016.001_high.glb', 58.16557369922392);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+016_medium_1.glb', 2119.434891172441, 'test_4_levels/LOD_Tile_+002_+016_medium_0.glb', 1439.270012351812, 'test_4_levels/LOD_Tile_+002_+016_high.glb', 78.94025471055373);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+017.001_medium_1.glb', 2110.931001948794, 'test_4_levels/LOD_Tile_+018_+017.001_medium_0.glb', 1422.2622339045176, 'test_4_levels/LOD_Tile_+018_+017.001_high.glb', 44.92469781596484);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+017.002_medium_1.glb', 2111.934393664815, 'test_4_levels/LOD_Tile_+018_+017.002_medium_0.glb', 1424.2690173365604, 'test_4_levels/LOD_Tile_+018_+017.002_high.glb', 48.938264680050246);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+020_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+020_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+020.001_medium_1.glb', 2110.9423627779584, 'test_4_levels/LOD_Tile_+014_+020.001_medium_0.glb', 1422.2849555628468, 'test_4_levels/LOD_Tile_+014_+020.001_high.glb', 44.970141132623205);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+006.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+006.005_medium_1.glb', 2099.8774936395225, 'test_4_levels/LOD_Tile_+017_+006.005_medium_0.glb', 1400.1552172859747, 'test_4_levels/LOD_Tile_+017_+006.005_high.glb', 0.7106645788788808);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+020.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+020.002_medium_1.glb', 2111.923039833246, 'test_4_levels/LOD_Tile_+014_+020.002_medium_0.glb', 1424.2463096734216, 'test_4_levels/LOD_Tile_+014_+020.002_high.glb', 48.89284935377295);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+006.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+006.004_medium_1.glb', 2100.3261542565197, 'test_4_levels/LOD_Tile_+017_+006.004_medium_0.glb', 1401.0525385199687, 'test_4_levels/LOD_Tile_+017_+006.004_high.glb', 2.5053070468669496);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+006.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+006.003_medium_1.glb', 2100.850034357543, 'test_4_levels/LOD_Tile_+017_+006.003_medium_0.glb', 1402.1002987220159, 'test_4_levels/LOD_Tile_+017_+006.003_high.glb', 4.600827450961221);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+017_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+017_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+017_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+006_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+006_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+021.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+021.003_medium_1.glb', 2100.5944299297835, 'test_4_levels/LOD_Tile_+018_+021.003_medium_0.glb', 1401.5890898664966, 'test_4_levels/LOD_Tile_+018_+021.003_high.glb', 3.578409739922882);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+029_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+029_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+029_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+029_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+021.001_medium_1.glb', 2118.054314143477, 'test_4_levels/LOD_Tile_+018_+021.001_medium_0.glb', 1436.5088582938831, 'test_4_levels/LOD_Tile_+018_+021.001_high.glb', 73.41794659469566);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+021.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+021.006_medium_1.glb', 2100.496139840677, 'test_4_levels/LOD_Tile_+018_+021.006_medium_0.glb', 1401.3925096882842, 'test_4_levels/LOD_Tile_+018_+021.006_high.glb', 3.1852493834979234);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+006.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+006.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+006.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+006.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+006.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+006.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+021.002_medium_1.glb', 2119.712043062045, 'test_4_levels/LOD_Tile_+018_+021.002_medium_0.glb', 1439.8243161310188, 'test_4_levels/LOD_Tile_+018_+021.002_high.glb', 80.04886226896745);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+021.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+021.005_medium_1.glb', 2101.0007434327736, 'test_4_levels/LOD_Tile_+018_+021.005_medium_0.glb', 1402.4017168724763, 'test_4_levels/LOD_Tile_+018_+021.005_high.glb', 5.203663751882418);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+021.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+021.004_medium_1.glb', 2100.620767478839, 'test_4_levels/LOD_Tile_+018_+021.004_medium_0.glb', 1401.6417649646073, 'test_4_levels/LOD_Tile_+018_+021.004_high.glb', 3.68375993614434);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+013_medium_1.glb', 2102.2031990068194, 'test_4_levels/LOD_Tile_+010_+013_medium_0.glb', 1404.806628020569, 'test_4_levels/LOD_Tile_+010_+013_high.glb', 10.013486048067497);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+021_medium_1.glb', 2119.712043062045, 'test_4_levels/LOD_Tile_+018_+021_medium_0.glb', 1439.8243161310188, 'test_4_levels/LOD_Tile_+018_+021_high.glb', 80.04886226896745);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+003_medium_1.glb', 2113.478478837255, 'test_4_levels/LOD_Tile_+013_+003_medium_0.glb', 1427.357187681439, 'test_4_levels/LOD_Tile_+013_+003_high.glb', 55.11460536980773);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+013.002_medium_1.glb', 2111.627373239586, 'test_4_levels/LOD_Tile_+010_+013.002_medium_0.glb', 1423.654976486102, 'test_4_levels/LOD_Tile_+010_+013.002_high.glb', 47.71018297913381);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+013.001_medium_1.glb', 2111.2380293716183, 'test_4_levels/LOD_Tile_+010_+013.001_medium_0.glb', 1422.8762887501664, 'test_4_levels/LOD_Tile_+010_+013.001_high.glb', 46.15280750726234);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+022.001_medium_1.glb', 2106.583500975081, 'test_4_levels/LOD_Tile_+006_+022.001_medium_0.glb', 1413.567231957091, 'test_4_levels/LOD_Tile_+006_+022.001_high.glb', 27.534693921111614);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+022_medium_1.glb', 2116.281901636124, 'test_4_levels/LOD_Tile_+006_+022_medium_0.glb', 1432.9640332791776, 'test_4_levels/LOD_Tile_+006_+022_high.glb', 66.32829656528453);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+001.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+001.004_medium_1.glb', 2099.86824701714, 'test_4_levels/LOD_Tile_+017_+001.004_medium_0.glb', 1400.1367240412105, 'test_4_levels/LOD_Tile_+017_+001.004_high.glb', 0.6736780893504694);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+001.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+001.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+001.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+001.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+014.001_medium_1.glb', 2116.218064440554, 'test_4_levels/LOD_Tile_+010_+014.001_medium_0.glb', 1432.836358888038, 'test_4_levels/LOD_Tile_+010_+014.001_high.glb', 66.07294778300526);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+014.002_medium_1.glb', 2106.6473381706505, 'test_4_levels/LOD_Tile_+010_+014.002_medium_0.glb', 1413.6949063482307, 'test_4_levels/LOD_Tile_+010_+014.002_high.glb', 27.79004270339088);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+001.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+001.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+001.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+001.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+016.002_medium_1.glb', 2112.6275544589002, 'test_4_levels/LOD_Tile_+014_+016.002_medium_0.glb', 1425.6553389247304, 'test_4_levels/LOD_Tile_+014_+016.002_high.glb', 51.71090785639038);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+016.001_medium_1.glb', 2110.237848152304, 'test_4_levels/LOD_Tile_+014_+016.001_medium_0.glb', 1420.875926311538, 'test_4_levels/LOD_Tile_+014_+016.001_high.glb', 42.152082630005765);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+001.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+001.003_medium_1.glb', 2099.7804281295876, 'test_4_levels/LOD_Tile_+017_+001.003_medium_0.glb', 1399.9610862661045, 'test_4_levels/LOD_Tile_+017_+001.003_high.glb', 0.3224025391388564);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+004.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+004.002_medium_1.glb', 2114.766111939895, 'test_4_levels/LOD_Tile_+013_+004.002_medium_0.glb', 1429.9324538867193, 'test_4_levels/LOD_Tile_+013_+004.002_high.glb', 60.2651377803682);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+019.009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+019.009_medium_1.glb', 2100.5525955062562, 'test_4_levels/LOD_Tile_+018_+019.009_medium_0.glb', 1401.5054210194417, 'test_4_levels/LOD_Tile_+018_+019.009_high.glb', 3.4110720458131083);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+004.001_medium_1.glb', 2108.09929067131, 'test_4_levels/LOD_Tile_+013_+004.001_medium_0.glb', 1416.5988113495491, 'test_4_levels/LOD_Tile_+013_+004.001_high.glb', 33.59785270602795);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+004_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+004_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+011.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+011.008_medium_1.glb', 2099.741740291397, 'test_4_levels/LOD_Tile_+014_+011.008_medium_0.glb', 1399.883710589724, 'test_4_levels/LOD_Tile_+014_+011.008_high.glb', 0.1676511863776091);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+008_medium_1.glb', 2115.2703026738704, 'test_4_levels/LOD_Tile_+001_+008_medium_0.glb', 1430.9408353546703, 'test_4_levels/LOD_Tile_+001_+008_high.glb', 62.28190071627034);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+008.001_medium_1.glb', 2107.5950999373345, 'test_4_levels/LOD_Tile_+001_+008.001_medium_0.glb', 1415.590429881598, 'test_4_levels/LOD_Tile_+001_+008.001_high.glb', 31.581089770125804);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+011.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+011.006_medium_1.glb', 2099.7448294964533, 'test_4_levels/LOD_Tile_+014_+011.006_medium_0.glb', 1399.8898889998359, 'test_4_levels/LOD_Tile_+014_+011.006_high.glb', 0.18000800660146965);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+011.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+011.007_medium_1.glb', 2099.7395621732444, 'test_4_levels/LOD_Tile_+014_+011.007_medium_0.glb', 1399.8793543534189, 'test_4_levels/LOD_Tile_+014_+011.007_high.glb', 0.15893871376733956);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+011.003_medium_1.glb', 2099.7470645283806, 'test_4_levels/LOD_Tile_+014_+011.003_medium_0.glb', 1399.8943590636907, 'test_4_levels/LOD_Tile_+014_+011.003_high.glb', 0.1889481343110009);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+019.002_medium_1.glb', 2112.9141451715027, 'test_4_levels/LOD_Tile_+018_+019.002_medium_0.glb', 1426.2285203499346, 'test_4_levels/LOD_Tile_+018_+019.002_high.glb', 52.857270706798886);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+019.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+019.006_medium_1.glb', 2099.779353298955, 'test_4_levels/LOD_Tile_+019_+019.006_medium_0.glb', 1399.9589366048394, 'test_4_levels/LOD_Tile_+019_+019.006_high.glb', 0.3181032166085371);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+019.001_medium_1.glb', 2109.951250442107, 'test_4_levels/LOD_Tile_+018_+019.001_medium_0.glb', 1420.3027308911433, 'test_4_levels/LOD_Tile_+018_+019.001_high.glb', 41.0056917892162);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+011.001_medium_1.glb', 2113.209462818412, 'test_4_levels/LOD_Tile_+014_+011.001_medium_0.glb', 1426.8191556437532, 'test_4_levels/LOD_Tile_+014_+011.001_high.glb', 54.038541294435994);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+019.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+019.003_medium_1.glb', 2102.9634499452595, 'test_4_levels/LOD_Tile_+019_+019.003_medium_0.glb', 1406.327129897449, 'test_4_levels/LOD_Tile_+019_+019.003_high.glb', 13.05448980182748);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+011.002_medium_1.glb', 2109.6559397927927, 'test_4_levels/LOD_Tile_+014_+011.002_medium_0.glb', 1419.7121095925152, 'test_4_levels/LOD_Tile_+014_+011.002_high.glb', 39.82444919196015);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+019_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+019_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+019_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+008_medium_1.glb', 2115.249944336715, 'test_4_levels/LOD_Tile_+000_+008_medium_0.glb', 1430.9001186803598, 'test_4_levels/LOD_Tile_+000_+008_high.glb', 62.20046736764918);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+019.002_medium_1.glb', 2105.4387041864925, 'test_4_levels/LOD_Tile_+019_+019.002_medium_0.glb', 1411.2776383799142, 'test_4_levels/LOD_Tile_+019_+019.002_high.glb', 22.95550676675808);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+019.001_medium_1.glb', 2117.4266988912186, 'test_4_levels/LOD_Tile_+019_+019.001_medium_0.glb', 1435.2536277893669, 'test_4_levels/LOD_Tile_+019_+019.001_high.glb', 70.90748558566347);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+008.001_medium_1.glb', 2107.615458740996, 'test_4_levels/LOD_Tile_+000_+008.001_medium_0.glb', 1415.6311474889214, 'test_4_levels/LOD_Tile_+000_+008.001_high.glb', 31.66252498477236);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+011.003_medium_1.glb', 2099.782642168729, 'test_4_levels/LOD_Tile_+015_+011.003_medium_0.glb', 1399.9655143443879, 'test_4_levels/LOD_Tile_+015_+011.003_high.glb', 0.3312586957052174);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+011_medium_1.glb', 2099.9809871404673, 'test_4_levels/LOD_Tile_+015_+011_medium_0.glb', 1400.362204287864, 'test_4_levels/LOD_Tile_+015_+011_high.glb', 1.124638582657651);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+011.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+011.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+011.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+011.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+011.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+011.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+018_medium_1.glb', 2112.1298696224953, 'test_4_levels/LOD_Tile_+003_+018_medium_0.glb', 1424.6599692519198, 'test_4_levels/LOD_Tile_+003_+018_high.glb', 49.72016851076941);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+022.001_medium_1.glb', 2112.099631147333, 'test_4_levels/LOD_Tile_+007_+022.001_medium_0.glb', 1424.599492301596, 'test_4_levels/LOD_Tile_+007_+022.001_high.glb', 49.59921461012151);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+022.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+022.002_medium_1.glb', 2110.7657714638713, 'test_4_levels/LOD_Tile_+007_+022.002_medium_0.glb', 1421.9317729346726, 'test_4_levels/LOD_Tile_+007_+022.002_high.glb', 44.26377587627464);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+022_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+007_+022_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+007_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+001.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+001.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+001.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+001.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+001.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+001.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+001.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+001.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+006.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+006.003_medium_1.glb', 2100.9660773458345, 'test_4_levels/LOD_Tile_+016_+006.003_medium_0.glb', 1402.3323846985988, 'test_4_levels/LOD_Tile_+016_+006.003_high.glb', 5.064999404127197);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+014_medium_1.glb', 2109.848732405942, 'test_4_levels/LOD_Tile_+011_+014_medium_0.glb', 1420.0976948188136, 'test_4_levels/LOD_Tile_+011_+014_high.glb', 40.59561964455675);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+014.001_medium_1.glb', 2113.0166702052625, 'test_4_levels/LOD_Tile_+011_+014.001_medium_0.glb', 1426.4335704174548, 'test_4_levels/LOD_Tile_+011_+014.001_high.glb', 53.2673708418394);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+006.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+006.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+006.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+006_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+006_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+006_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+029_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+029_medium_1.glb', 2119.2441488547047, 'test_4_levels/LOD_Tile_+015_+029_medium_0.glb', 1438.8885277163386, 'test_4_levels/LOD_Tile_+015_+029_high.glb', 78.17728543960676);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+006.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+006.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+006.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+016.001_medium_1.glb', 2113.761360824367, 'test_4_levels/LOD_Tile_+015_+016.001_medium_0.glb', 1427.9229516556632, 'test_4_levels/LOD_Tile_+015_+016.001_high.glb', 56.246133318256156);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+016_medium_1.glb', 2109.1040277916472, 'test_4_levels/LOD_Tile_+015_+016_medium_0.glb', 1418.608285590224, 'test_4_levels/LOD_Tile_+015_+016_high.glb', 37.61680118737788);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+016.001_medium_1.glb', 2110.0172088420545, 'test_4_levels/LOD_Tile_+003_+016.001_medium_0.glb', 1420.4346476910384, 'test_4_levels/LOD_Tile_+003_+016.001_high.glb', 41.269525389006475);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+013_medium_1.glb', 2111.588791764844, 'test_4_levels/LOD_Tile_+011_+013_medium_0.glb', 1423.5778135366174, 'test_4_levels/LOD_Tile_+011_+013_high.glb', 47.55585708016462);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+013.001_medium_1.glb', 2111.2766108463607, 'test_4_levels/LOD_Tile_+011_+013.001_medium_0.glb', 1422.953451699651, 'test_4_levels/LOD_Tile_+011_+013.001_high.glb', 46.30713340623152);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+016_medium_1.glb', 2112.8481937691504, 'test_4_levels/LOD_Tile_+003_+016_medium_0.glb', 1426.09661754523, 'test_4_levels/LOD_Tile_+003_+016_high.glb', 52.593465097389675);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+020_medium_1.glb', 2112.564542979572, 'test_4_levels/LOD_Tile_+015_+020_medium_0.glb', 1425.529315966073, 'test_4_levels/LOD_Tile_+015_+020_high.glb', 51.45886193907581);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+020.001_medium_1.glb', 2110.3008456364423, 'test_4_levels/LOD_Tile_+015_+020.001_medium_0.glb', 1421.0019212798143, 'test_4_levels/LOD_Tile_+015_+020.001_high.glb', 42.40407256655823);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+013_medium_1.glb', 2100.030288464648, 'test_4_levels/LOD_Tile_+007_+013_medium_0.glb', 1400.4608069362255, 'test_4_levels/LOD_Tile_+007_+013_high.glb', 1.321843879380398);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+025.001_medium_1.glb', 2111.315932666682, 'test_4_levels/LOD_Tile_+011_+025.001_medium_0.glb', 1423.0320953402934, 'test_4_levels/LOD_Tile_+011_+025.001_high.glb', 46.46442068751651);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+025_medium_1.glb', 2111.5494704110292, 'test_4_levels/LOD_Tile_+011_+025_medium_0.glb', 1423.4991708289876, 'test_4_levels/LOD_Tile_+011_+025_high.glb', 47.39857166490504);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+017.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+017.005_medium_1.glb', 2100.1143701698234, 'test_4_levels/LOD_Tile_+019_+017.005_medium_0.glb', 1400.6289703465764, 'test_4_levels/LOD_Tile_+019_+017.005_high.glb', 1.658170700082294);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+017.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+017.007_medium_1.glb', 2099.7637925131125, 'test_4_levels/LOD_Tile_+019_+017.007_medium_0.glb', 1399.9278150331552, 'test_4_levels/LOD_Tile_+019_+017.007_high.glb', 0.2558600732399033);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+017.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+017.003_medium_1.glb', 2099.9547205003773, 'test_4_levels/LOD_Tile_+019_+017.003_medium_0.glb', 1400.309671007684, 'test_4_levels/LOD_Tile_+019_+017.003_high.glb', 1.019572022297568);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+017.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+017.008_medium_1.glb', 2099.7475912140508, 'test_4_levels/LOD_Tile_+019_+017.008_medium_0.glb', 1399.8954124350312, 'test_4_levels/LOD_Tile_+019_+017.008_high.glb', 0.19105487699187354);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+013.002_medium_1.glb', 2111.1179576344803, 'test_4_levels/LOD_Tile_+007_+013.002_medium_0.glb', 1422.63614527589, 'test_4_levels/LOD_Tile_+007_+013.002_high.glb', 45.67252055870927);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+013.001_medium_1.glb', 2111.7474449767246, 'test_4_levels/LOD_Tile_+007_+013.001_medium_0.glb', 1423.8951199603787, 'test_4_levels/LOD_Tile_+007_+013.001_high.glb', 48.19046992768687);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+027_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+027_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+027_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+027_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+027.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+027.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+027.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+027.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+017.002_medium_1.glb', 2109.9807630333867, 'test_4_levels/LOD_Tile_+019_+017.002_medium_0.glb', 1420.3617560737032, 'test_4_levels/LOD_Tile_+019_+017.002_high.glb', 41.123742154335815);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+017.001_medium_1.glb', 2112.884639577818, 'test_4_levels/LOD_Tile_+019_+017.001_medium_0.glb', 1426.1695091625654, 'test_4_levels/LOD_Tile_+019_+017.001_high.glb', 52.73924833206033);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+011.001_medium_1.glb', 2111.896616447022, 'test_4_levels/LOD_Tile_+003_+011.001_medium_0.glb', 1424.1934629009738, 'test_4_levels/LOD_Tile_+003_+011.001_high.glb', 48.78715580887719);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+011_medium_1.glb', 2110.9687861641823, 'test_4_levels/LOD_Tile_+003_+011_medium_0.glb', 1422.3378023352946, 'test_4_levels/LOD_Tile_+003_+011_high.glb', 45.075834677518955);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+010.012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+010.012_medium_1.glb', 2100.13438702433, 'test_4_levels/LOD_Tile_+019_+010.012_medium_0.glb', 1400.669004055589, 'test_4_levels/LOD_Tile_+019_+010.012_high.glb', 1.7382381181078765);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+008.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+008.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+008.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+008_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+008_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+008_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+010.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+010.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+010.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+010.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+010.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+010.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+014.001_medium_1.glb', 2112.3886920110635, 'test_4_levels/LOD_Tile_+007_+014.001_medium_0.glb', 1425.1776140290567, 'test_4_levels/LOD_Tile_+007_+014.001_high.glb', 50.75545806504305);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+014_medium_1.glb', 2110.476710600141, 'test_4_levels/LOD_Tile_+007_+014_medium_0.glb', 1421.3536512072117, 'test_4_levels/LOD_Tile_+007_+014_high.glb', 43.10753242135309);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+022.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+022.002_medium_1.glb', 2108.3474781145956, 'test_4_levels/LOD_Tile_+011_+022.002_medium_0.glb', 1417.095186236121, 'test_4_levels/LOD_Tile_+011_+022.002_high.glb', 34.59060247917152);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+022.001_medium_1.glb', 2114.517924496609, 'test_4_levels/LOD_Tile_+011_+022.001_medium_0.glb', 1429.4360790001474, 'test_4_levels/LOD_Tile_+011_+022.001_high.glb', 59.27238800722463);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+019_medium_1.glb', 2100.825490525407, 'test_4_levels/LOD_Tile_+023_+019_medium_0.glb', 1402.0512110577438, 'test_4_levels/LOD_Tile_+023_+019_high.glb', 4.502652122417315);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+009.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+009.004_medium_1.glb', 2100.1347854207534, 'test_4_levels/LOD_Tile_+020_+009.004_medium_0.glb', 1400.6698008484366, 'test_4_levels/LOD_Tile_+020_+009.004_high.glb', 1.7398317038027085);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+022_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+022_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+009.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+009.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+009.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+009.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+009.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+009.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+018.002_medium_1.glb', 2112.5125793036464, 'test_4_levels/LOD_Tile_+015_+018.002_medium_0.glb', 1425.425388614222, 'test_4_levels/LOD_Tile_+015_+018.002_high.glb', 51.25100723537366);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+010_medium_1.glb', 2110.338558476359, 'test_4_levels/LOD_Tile_+023_+010_medium_0.glb', 1421.077346959648, 'test_4_levels/LOD_Tile_+023_+010_high.glb', 42.55492392622556);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+018.001_medium_1.glb', 2110.3528093123678, 'test_4_levels/LOD_Tile_+015_+018.001_medium_0.glb', 1421.1058486316654, 'test_4_levels/LOD_Tile_+015_+018.001_high.glb', 42.61192727026037);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+007.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+007.005_medium_1.glb', 2099.7940454499717, 'test_4_levels/LOD_Tile_+020_+007.005_medium_0.glb', 1399.9883209068728, 'test_4_levels/LOD_Tile_+020_+007.005_high.glb', 0.37687182067532415);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+007.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+007.003_medium_1.glb', 2100.1440105838433, 'test_4_levels/LOD_Tile_+020_+007.003_medium_0.glb', 1400.6882511746164, 'test_4_levels/LOD_Tile_+020_+007.003_high.glb', 1.7767323561625457);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+010.001_medium_1.glb', 2112.526844601352, 'test_4_levels/LOD_Tile_+023_+010.001_medium_0.glb', 1425.453919209633, 'test_4_levels/LOD_Tile_+023_+010.001_high.glb', 51.30806842619599);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+017.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+017.003_medium_1.glb', 2101.170928215143, 'test_4_levels/LOD_Tile_+023_+017.003_medium_0.glb', 1402.7420864372157, 'test_4_levels/LOD_Tile_+023_+017.003_high.glb', 5.884402881360808);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+018_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+018_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+018_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+007.002_medium_1.glb', 2112.447033761819, 'test_4_levels/LOD_Tile_+020_+007.002_medium_0.glb', 1425.294297530568, 'test_4_levels/LOD_Tile_+020_+007.002_high.glb', 50.98882506806574);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+007.001_medium_1.glb', 2110.4183688493854, 'test_4_levels/LOD_Tile_+020_+007.001_medium_0.glb', 1421.2369677057004, 'test_4_levels/LOD_Tile_+020_+007.001_high.glb', 42.874165418330406);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+017.002_medium_1.glb', 2114.109745901228, 'test_4_levels/LOD_Tile_+023_+017.002_medium_0.glb', 1428.6197218093855, 'test_4_levels/LOD_Tile_+023_+017.002_high.glb', 57.63967362570076);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+017.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+017.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+017.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+026_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+026_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+026_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+010.001_medium_1.glb', 2110.508828629391, 'test_4_levels/LOD_Tile_+003_+010.001_medium_0.glb', 1421.4178872657117, 'test_4_levels/LOD_Tile_+003_+010.001_high.glb', 43.236004538352844);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+010_medium_1.glb', 2112.3565739818137, 'test_4_levels/LOD_Tile_+003_+010_medium_0.glb', 1425.113377970557, 'test_4_levels/LOD_Tile_+003_+010_high.glb', 50.626985948043306);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+026.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+026.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+026.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+026.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+011.003_medium_1.glb', 2100.732325941579, 'test_4_levels/LOD_Tile_+019_+011.003_medium_0.glb', 1401.864881890087, 'test_4_levels/LOD_Tile_+019_+011.003_high.glb', 4.129993787103736);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+009.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+009.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+009.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+009_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+009_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+009_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+019.001_medium_1.glb', 2113.010819282609, 'test_4_levels/LOD_Tile_+015_+019.001_medium_0.glb', 1426.4218685721478, 'test_4_levels/LOD_Tile_+015_+019.001_high.glb', 53.24396715122514);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+011.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+011.005_medium_1.glb', 2100.3504279814783, 'test_4_levels/LOD_Tile_+019_+011.005_medium_0.glb', 1401.1010859698863, 'test_4_levels/LOD_Tile_+019_+011.005_high.glb', 2.602401946702065);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+011.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+011.006_medium_1.glb', 2100.0104428179725, 'test_4_levels/LOD_Tile_+019_+011.006_medium_0.glb', 1400.4211156428742, 'test_4_levels/LOD_Tile_+019_+011.006_high.glb', 1.242461292678004);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+019_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+019_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+019_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+019.002_medium_1.glb', 2109.854569333405, 'test_4_levels/LOD_Tile_+015_+019.002_medium_0.glb', 1420.1093686737397, 'test_4_levels/LOD_Tile_+015_+019.002_high.glb', 40.618967354408895);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+011.002_medium_1.glb', 2111.436488170906, 'test_4_levels/LOD_Tile_+019_+011.002_medium_0.glb', 1423.2732063487417, 'test_4_levels/LOD_Tile_+019_+011.002_high.glb', 46.94664270441329);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+011.001_medium_1.glb', 2111.4289144402983, 'test_4_levels/LOD_Tile_+019_+011.001_medium_0.glb', 1423.2580588875267, 'test_4_levels/LOD_Tile_+019_+011.001_high.glb', 46.91634778198286);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+023.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+023.002_medium_1.glb', 2109.807474584264, 'test_4_levels/LOD_Tile_+011_+023.002_medium_0.glb', 1420.0151791754581, 'test_4_levels/LOD_Tile_+011_+023.002_high.glb', 40.43058835784605);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+023.001_medium_1.glb', 2113.0579280269403, 'test_4_levels/LOD_Tile_+011_+023.001_medium_0.glb', 1426.5160860608103, 'test_4_levels/LOD_Tile_+011_+023.001_high.glb', 53.432402128550095);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+023_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+023_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+015.001_medium_1.glb', 2109.8078445238007, 'test_4_levels/LOD_Tile_+007_+015.001_medium_0.glb', 1420.0159190545307, 'test_4_levels/LOD_Tile_+007_+015.001_high.glb', 40.43206811599125);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+015.002_medium_1.glb', 2113.057558087404, 'test_4_levels/LOD_Tile_+007_+015.002_medium_0.glb', 1426.5153461817376, 'test_4_levels/LOD_Tile_+007_+015.002_high.glb', 53.4309223704049);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+007_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+007_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+021.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+021.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+021.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+021_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+021_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+021_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+021.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+021.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+021.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+017.001_medium_1.glb', 2113.1443730532897, 'test_4_levels/LOD_Tile_+003_+017.001_medium_0.glb', 1426.688976113509, 'test_4_levels/LOD_Tile_+003_+017.001_high.glb', 53.77818223394757);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+012_medium_1.glb', 2111.789500057756, 'test_4_levels/LOD_Tile_+007_+012_medium_0.glb', 1423.9792301224415, 'test_4_levels/LOD_Tile_+007_+012_high.glb', 48.35869025181263);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+017_medium_1.glb', 2109.721029557915, 'test_4_levels/LOD_Tile_+003_+017_medium_0.glb', 1419.8422891227594, 'test_4_levels/LOD_Tile_+003_+017_high.glb', 40.08480825244858);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+012.001_medium_1.glb', 2111.0759025534485, 'test_4_levels/LOD_Tile_+007_+012.001_medium_0.glb', 1422.5520351138268, 'test_4_levels/LOD_Tile_+007_+012.001_high.glb', 45.50430023458352);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+024.001_medium_1.glb', 2111.287345157496, 'test_4_levels/LOD_Tile_+011_+024.001_medium_0.glb', 1422.9749203219214, 'test_4_levels/LOD_Tile_+011_+024.001_high.glb', 46.3500706507726);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+016.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+016.004_medium_1.glb', 2100.3020662010886, 'test_4_levels/LOD_Tile_+019_+016.004_medium_0.glb', 1401.0043624091065, 'test_4_levels/LOD_Tile_+019_+016.004_high.glb', 2.40895482514254);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+024.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+024.002_medium_1.glb', 2111.578057453709, 'test_4_levels/LOD_Tile_+011_+024.002_medium_0.glb', 1423.556344914347, 'test_4_levels/LOD_Tile_+011_+024.002_high.glb', 47.51291983562355);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+024_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+024_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+024_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+017_medium_1.glb', 2099.776021977103, 'test_4_levels/LOD_Tile_+015_+017_medium_0.glb', 1399.9522739611352, 'test_4_levels/LOD_Tile_+015_+017_high.glb', 0.3047779292001124);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+016.002_medium_1.glb', 2112.6957908093596, 'test_4_levels/LOD_Tile_+019_+016.002_medium_0.glb', 1425.791811625649, 'test_4_levels/LOD_Tile_+019_+016.002_high.glb', 51.983853258227334);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+016.001_medium_1.glb', 2110.1696122683516, 'test_4_levels/LOD_Tile_+019_+016.001_medium_0.glb', 1420.7394545436323, 'test_4_levels/LOD_Tile_+019_+016.001_high.glb', 41.879139094194215);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+024_medium_1.glb', 2112.293534512104, 'test_4_levels/LOD_Tile_+007_+024_medium_0.glb', 1424.9872990311374, 'test_4_levels/LOD_Tile_+007_+024_high.glb', 50.374828069204504);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+012.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+012.005_medium_1.glb', 2099.7172818299236, 'test_4_levels/LOD_Tile_+011_+012.005_medium_0.glb', 1399.8347936667765, 'test_4_levels/LOD_Tile_+011_+012.005_high.glb', 0.06981734048259478);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+012.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+012.004_medium_1.glb', 2104.703011075379, 'test_4_levels/LOD_Tile_+011_+012.004_medium_0.glb', 1409.8062521576871, 'test_4_levels/LOD_Tile_+011_+012.004_high.glb', 20.01273432230412);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+012.001_medium_1.glb', 2117.1134641348885, 'test_4_levels/LOD_Tile_+011_+012.001_medium_0.glb', 1434.6271582767067, 'test_4_levels/LOD_Tile_+011_+012.001_high.glb', 69.65454656034322);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+017.001_medium_1.glb', 2112.457611793327, 'test_4_levels/LOD_Tile_+015_+017.001_medium_0.glb', 1425.3154535935835, 'test_4_levels/LOD_Tile_+015_+017.001_high.glb', 51.03113719409655);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+017.002_medium_1.glb', 2110.407776822687, 'test_4_levels/LOD_Tile_+015_+017.002_medium_0.glb', 1421.215783652304, 'test_4_levels/LOD_Tile_+015_+017.002_high.glb', 42.83179731153748);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+012.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+012.003_medium_1.glb', 2104.4534427732942, 'test_4_levels/LOD_Tile_+011_+012.003_medium_0.glb', 1409.3071155535179, 'test_4_levels/LOD_Tile_+011_+012.003_high.glb', 19.014461113965346);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+012.002_medium_1.glb', 2105.7519389428226, 'test_4_levels/LOD_Tile_+011_+012.002_medium_0.glb', 1411.9041078925743, 'test_4_levels/LOD_Tile_+011_+012.002_high.glb', 24.208445792078333);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+028_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+028_medium_1.glb', 2118.144937200705, 'test_4_levels/LOD_Tile_+015_+028_medium_0.glb', 1436.69010440834, 'test_4_levels/LOD_Tile_+015_+028_high.glb', 73.78043882360943);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+028.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+028.001_medium_1.glb', 2122.671222068355, 'test_4_levels/LOD_Tile_+015_+028.001_medium_0.glb', 1445.7426741436398, 'test_4_levels/LOD_Tile_+015_+028.001_high.glb', 91.885578294209);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+007.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+007.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+007.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+007.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+007.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+007.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+009_medium_1.glb', 2111.5346359755754, 'test_4_levels/LOD_Tile_+000_+009_medium_0.glb', 1423.4695019580802, 'test_4_levels/LOD_Tile_+000_+009_high.glb', 47.3392339230901);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+009.001_medium_1.glb', 2111.3307671021357, 'test_4_levels/LOD_Tile_+000_+009.001_medium_0.glb', 1423.0617642112009, 'test_4_levels/LOD_Tile_+000_+009.001_high.glb', 46.52375842933145);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+007_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+007_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+007_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+010.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+010.005_medium_1.glb', 2099.8365703028985, 'test_4_levels/LOD_Tile_+015_+010.005_medium_0.glb', 1400.0733706127264, 'test_4_levels/LOD_Tile_+015_+010.005_high.glb', 0.5469712323826985);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+018.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+018.007_medium_1.glb', 2099.8022172417213, 'test_4_levels/LOD_Tile_+019_+018.007_medium_0.glb', 1400.0046644903719, 'test_4_levels/LOD_Tile_+019_+018.007_high.glb', 0.4095589876734162);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+000_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+000_medium_1.glb', 2121.5854290030343, 'test_4_levels/LOD_Tile_+016_+000_medium_0.glb', 1443.5710880129982, 'test_4_levels/LOD_Tile_+016_+000_high.glb', 87.54240603292614);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+010.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+010.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+010.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+010.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+010.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+010.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+018.001_medium_1.glb', 2112.5307879795364, 'test_4_levels/LOD_Tile_+019_+018.001_medium_0.glb', 1425.4618059660022, 'test_4_levels/LOD_Tile_+019_+018.001_high.glb', 51.32384193893418);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+018.002_medium_1.glb', 2110.334614631668, 'test_4_levels/LOD_Tile_+019_+018.002_medium_0.glb', 1421.0694592702662, 'test_4_levels/LOD_Tile_+019_+018.002_high.glb', 42.53914854746197);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+015_medium_1.glb', 2110.025836410509, 'test_4_levels/LOD_Tile_+011_+015_medium_0.glb', 1420.4519028279472, 'test_4_levels/LOD_Tile_+011_+015_high.glb', 41.30403566282406);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+010_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+010_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+015.001_medium_1.glb', 2112.8395666672022, 'test_4_levels/LOD_Tile_+011_+015.001_medium_0.glb', 1426.0793633413339, 'test_4_levels/LOD_Tile_+011_+015.001_high.glb', 52.55895668959749);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+023.001_medium_1.glb', 2108.5519165922897, 'test_4_levels/LOD_Tile_+007_+023.001_medium_0.glb', 1417.5040631915092, 'test_4_levels/LOD_Tile_+007_+023.001_high.glb', 35.40835638994819);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+023_medium_1.glb', 2114.313486485421, 'test_4_levels/LOD_Tile_+007_+023_medium_0.glb', 1429.0272029777718, 'test_4_levels/LOD_Tile_+007_+023_high.glb', 58.45463596247337);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+006.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+006.004_medium_1.glb', 2099.7371134814084, 'test_4_levels/LOD_Tile_+020_+006.004_medium_0.glb', 1399.8744569697467, 'test_4_levels/LOD_Tile_+020_+006.004_high.glb', 0.14914394642287504);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+006.001_medium_1.glb', 2111.530379105123, 'test_4_levels/LOD_Tile_+020_+006.001_medium_0.glb', 1423.4609882171756, 'test_4_levels/LOD_Tile_+020_+006.001_high.glb', 47.322206441280564);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+006.002_medium_1.glb', 2111.335023972588, 'test_4_levels/LOD_Tile_+020_+006.002_medium_0.glb', 1423.0702779521057, 'test_4_levels/LOD_Tile_+020_+006.002_high.glb', 46.540785911140986);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+018_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+018_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+016.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+016.003_medium_1.glb', 2103.83503169134, 'test_4_levels/LOD_Tile_+023_+016.003_medium_0.glb', 1408.07029338961, 'test_4_levels/LOD_Tile_+023_+016.003_high.glb', 16.54081678614981);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+016.001_medium_1.glb', 2119.9911454147014, 'test_4_levels/LOD_Tile_+023_+016.001_medium_0.glb', 1440.3825208363323, 'test_4_levels/LOD_Tile_+023_+016.001_high.glb', 81.16527167959443);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+016.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+016.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+016.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+004_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+004_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+018.001_medium_1.glb', 2105.901394981994, 'test_4_levels/LOD_Tile_+023_+018.001_medium_0.glb', 1412.2030199709177, 'test_4_levels/LOD_Tile_+023_+018.001_high.glb', 24.806269948764967);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+018.002_medium_1.glb', 2116.9640076292108, 'test_4_levels/LOD_Tile_+023_+018.002_medium_0.glb', 1434.3282452653507, 'test_4_levels/LOD_Tile_+023_+018.002_high.glb', 69.05672053763118);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+018_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+018_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+008.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+008.003_medium_1.glb', 2100.241944728604, 'test_4_levels/LOD_Tile_+020_+008.003_medium_0.glb', 1400.8841194641375, 'test_4_levels/LOD_Tile_+020_+008.003_high.glb', 2.168468935204417);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+008.001_medium_1.glb', 2113.9583389324966, 'test_4_levels/LOD_Tile_+020_+008.001_medium_0.glb', 1428.316907871923, 'test_4_levels/LOD_Tile_+020_+008.001_high.glb', 57.0340457507755);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+008.002_medium_1.glb', 2108.907063678708, 'test_4_levels/LOD_Tile_+020_+008.002_medium_0.glb', 1418.2143573643455, 'test_4_levels/LOD_Tile_+020_+008.002_high.glb', 36.828944735620645);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+008_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+008_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+010.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+010.004_medium_1.glb', 2100.8720156702934, 'test_4_levels/LOD_Tile_+024_+010.004_medium_0.glb', 1402.1442613475162, 'test_4_levels/LOD_Tile_+024_+010.004_high.glb', 4.68875270196214);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+012.001_medium_1.glb', 2111.452846216102, 'test_4_levels/LOD_Tile_+020_+012.001_medium_0.glb', 1423.3059224391336, 'test_4_levels/LOD_Tile_+020_+012.001_high.glb', 47.012074885196995);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+010.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+010.003_medium_1.glb', 2100.3405049248872, 'test_4_levels/LOD_Tile_+024_+010.003_medium_0.glb', 1401.0812398567043, 'test_4_levels/LOD_Tile_+024_+010.003_high.glb', 2.5627097203381664);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+012_medium_1.glb', 2111.4125563951025, 'test_4_levels/LOD_Tile_+020_+012_medium_0.glb', 1423.2253427971348, 'test_4_levels/LOD_Tile_+020_+012_high.glb', 46.850915601199155);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015.003_medium_1.glb', 2099.801092961415, 'test_4_levels/LOD_Tile_+020_+015.003_medium_0.glb', 1400.0024159297602, 'test_4_levels/LOD_Tile_+020_+015.003_high.glb', 0.4050618664502957);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015.008_medium_1.glb', 2099.8129091007786, 'test_4_levels/LOD_Tile_+020_+015.008_medium_0.glb', 1400.0260482084866, 'test_4_levels/LOD_Tile_+020_+015.008_high.glb', 0.45232642390275174);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+010.001_medium_1.glb', 2112.325395962861, 'test_4_levels/LOD_Tile_+024_+010.001_medium_0.glb', 1425.0510219326513, 'test_4_levels/LOD_Tile_+024_+010.001_high.glb', 50.50227387223218);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+010.002_medium_1.glb', 2110.540006648344, 'test_4_levels/LOD_Tile_+024_+010.002_medium_0.glb', 1421.4802433036173, 'test_4_levels/LOD_Tile_+024_+010.002_high.glb', 43.36071661416396);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015.014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015.014_medium_1.glb', 2099.9278842560325, 'test_4_levels/LOD_Tile_+020_+015.014_medium_0.glb', 1400.2559985189948, 'test_4_levels/LOD_Tile_+020_+015.014_high.glb', 0.9122270449194645);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015.012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015.012_medium_1.glb', 2099.775580662095, 'test_4_levels/LOD_Tile_+020_+015.012_medium_0.glb', 1399.9513913311193, 'test_4_levels/LOD_Tile_+020_+015.012_high.glb', 0.3030126691681323);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015.011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015.011_medium_1.glb', 2100.239681239789, 'test_4_levels/LOD_Tile_+020_+015.011_medium_0.glb', 1400.8795924865078, 'test_4_levels/LOD_Tile_+020_+015.011_high.glb', 2.1594149799452547);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+014_medium_1.glb', 2103.0738552043, 'test_4_levels/LOD_Tile_+000_+014_medium_0.glb', 1406.5479404155296, 'test_4_levels/LOD_Tile_+000_+014_high.glb', 13.49611083798872);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+005.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+005.003_medium_1.glb', 2100.15468844771, 'test_4_levels/LOD_Tile_+019_+005.003_medium_0.glb', 1400.70960690235, 'test_4_levels/LOD_Tile_+019_+005.003_high.glb', 1.8194438116297678);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+005.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+005.007_medium_1.glb', 2099.888932841754, 'test_4_levels/LOD_Tile_+019_+005.007_medium_0.glb', 1400.1780956904377, 'test_4_levels/LOD_Tile_+019_+005.007_high.glb', 0.756421387805079);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015.002_medium_1.glb', 2110.924282391315, 'test_4_levels/LOD_Tile_+020_+015.002_medium_0.glb', 1422.2487947895595, 'test_4_levels/LOD_Tile_+020_+015.002_high.glb', 44.897819586048726);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+005.002_medium_1.glb', 2116.8115188322513, 'test_4_levels/LOD_Tile_+019_+005.002_medium_0.glb', 1434.0232676714324, 'test_4_levels/LOD_Tile_+019_+005.002_high.glb', 68.44676534979455);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015.001_medium_1.glb', 2111.94112021989, 'test_4_levels/LOD_Tile_+020_+015.001_medium_0.glb', 1424.2824704467089, 'test_4_levels/LOD_Tile_+020_+015.001_high.glb', 48.96517090034742);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+005.001_medium_1.glb', 2106.053883778953, 'test_4_levels/LOD_Tile_+019_+005.001_medium_0.glb', 1412.507997564836, 'test_4_levels/LOD_Tile_+019_+005.001_high.glb', 25.4162251366016);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+019_medium_1.glb', 2112.2870426097243, 'test_4_levels/LOD_Tile_+008_+019_medium_0.glb', 1424.974315226378, 'test_4_levels/LOD_Tile_+008_+019_high.glb', 50.34886045968545);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+008_medium_1.glb', 2115.7602141149496, 'test_4_levels/LOD_Tile_+011_+008_medium_0.glb', 1431.9206582368292, 'test_4_levels/LOD_Tile_+011_+008_high.glb', 64.24154648058804);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+019.001_medium_1.glb', 2110.578360467987, 'test_4_levels/LOD_Tile_+008_+019.001_medium_0.glb', 1421.5569509429033, 'test_4_levels/LOD_Tile_+008_+019.001_high.glb', 43.5141318927361);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+027_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+027_medium_1.glb', 2110.118018531962, 'test_4_levels/LOD_Tile_+012_+027_medium_0.glb', 1420.6362670708538, 'test_4_levels/LOD_Tile_+012_+027_high.glb', 41.67276414863728);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+018_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+018_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+027.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+027.001_medium_1.glb', 2112.7473840792427, 'test_4_levels/LOD_Tile_+012_+027.001_medium_0.glb', 1425.8949981654146, 'test_4_levels/LOD_Tile_+012_+027.001_high.glb', 52.19022633775887);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+025_medium_1.glb', 2106.8567164840947, 'test_4_levels/LOD_Tile_+016_+025_medium_0.glb', 1414.1136629751193, 'test_4_levels/LOD_Tile_+016_+025_high.glb', 28.62755595716822);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+011.001_medium_1.glb', 2113.2573268365254, 'test_4_levels/LOD_Tile_+004_+011.001_medium_0.glb', 1426.91488367998, 'test_4_levels/LOD_Tile_+004_+011.001_high.glb', 54.229997366889684);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+011_medium_1.glb', 2109.6080762411857, 'test_4_levels/LOD_Tile_+004_+011_medium_0.glb', 1419.616382489301, 'test_4_levels/LOD_Tile_+004_+011_high.glb', 39.632994985531866);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+013_medium_1.glb', 2116.6975830531474, 'test_4_levels/LOD_Tile_+000_+013_medium_0.glb', 1433.795396113224, 'test_4_levels/LOD_Tile_+000_+013_high.glb', 67.99102223337746);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+021.002_medium_1.glb', 2112.601558392494, 'test_4_levels/LOD_Tile_+008_+021.002_medium_0.glb', 1425.6033467919174, 'test_4_levels/LOD_Tile_+008_+021.002_high.glb', 51.60692359076449);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+021.001_medium_1.glb', 2110.263844218711, 'test_4_levels/LOD_Tile_+008_+021.001_medium_0.glb', 1420.927918444351, 'test_4_levels/LOD_Tile_+008_+021.001_high.glb', 42.256066895631655);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+021_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+008_+021_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+008_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+016_medium_1.glb', 2109.239062253486, 'test_4_levels/LOD_Tile_+004_+016_medium_0.glb', 1418.878354513901, 'test_4_levels/LOD_Tile_+004_+016_high.glb', 38.15693903473192);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+016.001_medium_1.glb', 2113.6263403577186, 'test_4_levels/LOD_Tile_+004_+016.001_medium_0.glb', 1427.6529107223673, 'test_4_levels/LOD_Tile_+004_+016.001_high.glb', 55.70605145166422);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+029.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+029.001_medium_1.glb', 2111.3583576872497, 'test_4_levels/LOD_Tile_+012_+029.001_medium_0.glb', 1423.1169453814289, 'test_4_levels/LOD_Tile_+012_+029.001_high.glb', 46.63412076978748);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+029_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+029_medium_1.glb', 2111.507044923955, 'test_4_levels/LOD_Tile_+012_+029_medium_0.glb', 1423.4143198548395, 'test_4_levels/LOD_Tile_+012_+029_high.glb', 47.22886971660867);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+020.001_medium_1.glb', 2111.5434622757352, 'test_4_levels/LOD_Tile_+012_+020.001_medium_0.glb', 1423.4871545584, 'test_4_levels/LOD_Tile_+012_+020.001_high.glb', 47.3745391237297);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+017.001_medium_1.glb', 2111.379684025083, 'test_4_levels/LOD_Tile_+008_+017.001_medium_0.glb', 1423.159598057096, 'test_4_levels/LOD_Tile_+008_+017.001_high.glb', 46.71942612112148);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+017_medium_1.glb', 2111.4857185861215, 'test_4_levels/LOD_Tile_+008_+017_medium_0.glb', 1423.3716671791726, 'test_4_levels/LOD_Tile_+008_+017_high.glb', 47.14356436527466);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+020_medium_1.glb', 2111.321940335469, 'test_4_levels/LOD_Tile_+012_+020_medium_0.glb', 1423.0441106778685, 'test_4_levels/LOD_Tile_+012_+020_high.glb', 46.488451362666446);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+013.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+013.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+013.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+013_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+013_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+013_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+016.001_medium_1.glb', 2108.9305686012003, 'test_4_levels/LOD_Tile_+012_+016.001_medium_0.glb', 1418.2613672093303, 'test_4_levels/LOD_Tile_+012_+016.001_high.glb', 36.92296442559033);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+016_medium_1.glb', 2113.934834476511, 'test_4_levels/LOD_Tile_+012_+016_medium_0.glb', 1428.2698989599508, 'test_4_levels/LOD_Tile_+012_+016_high.glb', 56.94002792683122);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+003.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+003.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+003.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+003.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+003_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+003_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+003.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+003.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+003.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+003.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+014.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+014.003_medium_1.glb', 2099.9151565632596, 'test_4_levels/LOD_Tile_+016_+014.003_medium_0.glb', 1400.2305431334491, 'test_4_levels/LOD_Tile_+016_+014.003_high.glb', 0.8613162738280137);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+018.001_medium_1.glb', 2113.848745394507, 'test_4_levels/LOD_Tile_+004_+018.001_medium_0.glb', 1428.0977207959436, 'test_4_levels/LOD_Tile_+004_+018.001_high.glb', 56.59567159881684);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+014.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+014.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+014.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+004.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+004.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+004.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+004_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+004_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+018_medium_1.glb', 2109.016657683204, 'test_4_levels/LOD_Tile_+004_+018_medium_0.glb', 1418.4335453733374, 'test_4_levels/LOD_Tile_+004_+018_high.glb', 37.26732075360471);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+014.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+014.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+014.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+014_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+014_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+014_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+011.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+011.004_medium_1.glb', 2099.9222609884782, 'test_4_levels/LOD_Tile_+024_+011.004_medium_0.glb', 1400.2447519838863, 'test_4_levels/LOD_Tile_+024_+011.004_high.glb', 0.8897339747022468);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+011.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+011.005_medium_1.glb', 2100.2192655223525, 'test_4_levels/LOD_Tile_+024_+011.005_medium_0.glb', 1400.838761051635, 'test_4_levels/LOD_Tile_+024_+011.005_high.glb', 2.0777521101994365);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+011.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+011.006_medium_1.glb', 2099.9107004945954, 'test_4_levels/LOD_Tile_+024_+011.006_medium_0.glb', 1400.2216309961207, 'test_4_levels/LOD_Tile_+024_+011.006_high.glb', 0.8434919991710647);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+011.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+011.007_medium_1.glb', 2100.321769563327, 'test_4_levels/LOD_Tile_+024_+011.007_medium_0.glb', 1401.0437691335835, 'test_4_levels/LOD_Tile_+024_+011.007_high.glb', 2.4877682740967795);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+011.001_medium_1.glb', 2114.4311949013854, 'test_4_levels/LOD_Tile_+024_+011.001_medium_0.glb', 1429.2626198097007, 'test_4_levels/LOD_Tile_+024_+011.001_high.glb', 58.92546962633085);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014.006_medium_1.glb', 2099.8400868277718, 'test_4_levels/LOD_Tile_+020_+014.006_medium_0.glb', 1400.0804036624734, 'test_4_levels/LOD_Tile_+020_+014.006_high.glb', 0.5610373318764256);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+011.002_medium_1.glb', 2108.434207709819, 'test_4_levels/LOD_Tile_+024_+011.002_medium_0.glb', 1417.268645426568, 'test_4_levels/LOD_Tile_+024_+011.002_high.glb', 34.9375208600653);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014.007_medium_1.glb', 2099.729027060321, 'test_4_levels/LOD_Tile_+020_+014.007_medium_0.glb', 1399.858284127572, 'test_4_levels/LOD_Tile_+020_+014.007_high.glb', 0.11679826207367558);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+004_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+004_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014.005_medium_1.glb', 2099.82817085605, 'test_4_levels/LOD_Tile_+020_+014.005_medium_0.glb', 1400.0565717190289, 'test_4_levels/LOD_Tile_+020_+014.005_high.glb', 0.5133734449875597);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014.010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014.010_medium_1.glb', 2099.910785865258, 'test_4_levels/LOD_Tile_+020_+014.010_medium_0.glb', 1400.2218017374453, 'test_4_levels/LOD_Tile_+020_+014.010_high.glb', 0.8438334818199573);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014.004_medium_1.glb', 2099.746851334978, 'test_4_levels/LOD_Tile_+020_+014.004_medium_0.glb', 1399.893932676886, 'test_4_levels/LOD_Tile_+020_+014.004_high.glb', 0.18809536070147143);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014.001_medium_1.glb', 2112.4109868160817, 'test_4_levels/LOD_Tile_+020_+014.001_medium_0.glb', 1425.2222036390929, 'test_4_levels/LOD_Tile_+020_+014.001_high.glb', 50.84463728511532);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014.002_medium_1.glb', 2110.4544162616294, 'test_4_levels/LOD_Tile_+020_+014.002_medium_0.glb', 1421.3090625301884, 'test_4_levels/LOD_Tile_+020_+014.002_high.glb', 43.01835506730624);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+013.002_medium_1.glb', 2111.314878828835, 'test_4_levels/LOD_Tile_+020_+013.002_medium_0.glb', 1423.0299876646, 'test_4_levels/LOD_Tile_+020_+013.002_high.glb', 46.46020533612936);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+013.001_medium_1.glb', 2111.5505237823695, 'test_4_levels/LOD_Tile_+020_+013.001_medium_0.glb', 1423.5012775716687, 'test_4_levels/LOD_Tile_+020_+013.001_high.glb', 47.40278515026678);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+019_medium_1.glb', 2114.3001891883937, 'test_4_levels/LOD_Tile_+004_+019_medium_0.glb', 1429.0006083837172, 'test_4_levels/LOD_Tile_+004_+019_high.glb', 58.40144677436389);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+015_medium_1.glb', 2099.769344871702, 'test_4_levels/LOD_Tile_+016_+015_medium_0.glb', 1399.938919750333, 'test_4_levels/LOD_Tile_+016_+015_high.glb', 0.2780695075957457);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+015.003_medium_1.glb', 2099.8108802646584, 'test_4_levels/LOD_Tile_+016_+015.003_medium_0.glb', 1400.021990536246, 'test_4_levels/LOD_Tile_+016_+015.003_high.glb', 0.44421107942169324);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+015.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+015.007_medium_1.glb', 2100.0574946485285, 'test_4_levels/LOD_Tile_+016_+015.007_medium_0.glb', 1400.5152193039871, 'test_4_levels/LOD_Tile_+016_+015.007_high.glb', 1.4306686149037027);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+015.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+015.005_medium_1.glb', 2099.734963353637, 'test_4_levels/LOD_Tile_+016_+015.005_medium_0.glb', 1399.8701567142036, 'test_4_levels/LOD_Tile_+016_+015.005_high.glb', 0.14054343533683256);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+005_medium_1.glb', 2100.0287368645245, 'test_4_levels/LOD_Tile_+015_+005_medium_0.glb', 1400.4577037359788, 'test_4_levels/LOD_Tile_+015_+005_high.glb', 1.315637478887411);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+015.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+015.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+015.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+015.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+015.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+015.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+010.002_medium_1.glb', 2109.6734221182946, 'test_4_levels/LOD_Tile_+012_+010.002_medium_0.glb', 1419.7470742435187, 'test_4_levels/LOD_Tile_+012_+010.002_high.glb', 39.894378493966975);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+010.001_medium_1.glb', 2113.1919804929103, 'test_4_levels/LOD_Tile_+012_+010.001_medium_0.glb', 1426.7841909927497, 'test_4_levels/LOD_Tile_+012_+010.001_high.glb', 53.968611992429175);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+005.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+005.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+005.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+005.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+005.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+005.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+028_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+028_medium_1.glb', 2111.7272289240063, 'test_4_levels/LOD_Tile_+012_+028_medium_0.glb', 1423.854687854942, 'test_4_levels/LOD_Tile_+012_+028_high.glb', 48.109605716813874);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+028.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+028.001_medium_1.glb', 2111.1381736871986, 'test_4_levels/LOD_Tile_+012_+028.001_medium_0.glb', 1422.6765773813263, 'test_4_levels/LOD_Tile_+012_+028.001_high.glb', 45.753384769582276);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+016.001_medium_1.glb', 2112.2448732346365, 'test_4_levels/LOD_Tile_+008_+016.001_medium_0.glb', 1424.8899764762032, 'test_4_levels/LOD_Tile_+008_+016.001_high.glb', 50.18018295933575);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+016_medium_1.glb', 2110.620529376568, 'test_4_levels/LOD_Tile_+008_+016_medium_0.glb', 1421.6412887600654, 'test_4_levels/LOD_Tile_+008_+016_high.glb', 43.68280752706039);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+012.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+012.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+012.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+012.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+012.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+012.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+002.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+002.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+002.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+002.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+012_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+012_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+012_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+020_medium_1.glb', 2112.582652289609, 'test_4_levels/LOD_Tile_+008_+020_medium_0.glb', 1425.5655345861478, 'test_4_levels/LOD_Tile_+008_+020_high.glb', 51.531299179225314);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+017.001_medium_1.glb', 2110.5269234777315, 'test_4_levels/LOD_Tile_+012_+017.001_medium_0.glb', 1421.4540769623925, 'test_4_levels/LOD_Tile_+012_+017.001_high.glb', 43.308383931714836);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+017.002_medium_1.glb', 2112.3384795999796, 'test_4_levels/LOD_Tile_+012_+017.002_medium_0.glb', 1425.0771892068885, 'test_4_levels/LOD_Tile_+012_+017.002_high.glb', 50.55460842070672);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+012_medium_1.glb', 2108.5793933498544, 'test_4_levels/LOD_Tile_+000_+012_medium_0.glb', 1417.559016706638, 'test_4_levels/LOD_Tile_+000_+012_high.glb', 35.518263420205685);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+020.001_medium_1.glb', 2110.282750788102, 'test_4_levels/LOD_Tile_+008_+020.001_medium_0.glb', 1420.9657315831332, 'test_4_levels/LOD_Tile_+008_+020.001_high.glb', 42.331693173196236);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+012.001_medium_1.glb', 2114.2860097278567, 'test_4_levels/LOD_Tile_+000_+012.001_medium_0.glb', 1428.972249462643, 'test_4_levels/LOD_Tile_+000_+012.001_high.glb', 58.344728932215865);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+024_medium_1.glb', 2111.2581600536746, 'test_4_levels/LOD_Tile_+016_+024_medium_0.glb', 1422.9165501142784, 'test_4_levels/LOD_Tile_+016_+024_high.glb', 46.23333023548644);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+003.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+003.002_medium_1.glb', 2109.9851906451636, 'test_4_levels/LOD_Tile_+019_+003.002_medium_0.glb', 1420.3706112972568, 'test_4_levels/LOD_Tile_+019_+003.002_high.glb', 41.141452601443135);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+003.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+003.001_medium_1.glb', 2112.880211966041, 'test_4_levels/LOD_Tile_+019_+003.001_medium_0.glb', 1426.1606539390116, 'test_4_levels/LOD_Tile_+019_+003.001_high.glb', 52.72153788495301);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+021_medium_1.glb', 2099.8694855915023, 'test_4_levels/LOD_Tile_+012_+021_medium_0.glb', 1400.139201189934, 'test_4_levels/LOD_Tile_+012_+021_high.glb', 0.6786323867975171);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+003_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+003_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+019_medium_1.glb', 2100.2395529505425, 'test_4_levels/LOD_Tile_+012_+019_medium_0.glb', 1400.8793359080148, 'test_4_levels/LOD_Tile_+012_+019_high.glb', 2.158901822959214);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+004.001_medium_1.glb', 2116.797752229835, 'test_4_levels/LOD_Tile_+019_+004.001_medium_0.glb', 1433.9957344665995, 'test_4_levels/LOD_Tile_+019_+004.001_high.glb', 68.39169894012888);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+017_medium_1.glb', 2112.0547858918167, 'test_4_levels/LOD_Tile_+004_+017_medium_0.glb', 1424.509801790563, 'test_4_levels/LOD_Tile_+004_+017_high.glb', 49.41983358805571);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+004.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+004.003_medium_1.glb', 2099.965725385196, 'test_4_levels/LOD_Tile_+019_+004.003_medium_0.glb', 1400.3316807773217, 'test_4_levels/LOD_Tile_+019_+004.003_high.glb', 1.0635915615728428);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+019.001_medium_1.glb', 2110.548164444903, 'test_4_levels/LOD_Tile_+012_+019.001_medium_0.glb', 1421.4965588967352, 'test_4_levels/LOD_Tile_+012_+019.001_high.glb', 43.39334780039995);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+019.002_medium_1.glb', 2112.3172381663016, 'test_4_levels/LOD_Tile_+012_+019.002_medium_0.glb', 1425.0347063395334, 'test_4_levels/LOD_Tile_+012_+019.002_high.glb', 50.469642685996206);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+017.001_medium_1.glb', 2110.8106171858944, 'test_4_levels/LOD_Tile_+004_+017.001_medium_0.glb', 1422.021464378718, 'test_4_levels/LOD_Tile_+004_+017.001_high.glb', 44.44315876436584);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+021.001_medium_1.glb', 2110.478291123658, 'test_4_levels/LOD_Tile_+012_+021.001_medium_0.glb', 1421.3568122542458, 'test_4_levels/LOD_Tile_+012_+021.001_high.glb', 43.11385451542112);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+021.002_medium_1.glb', 2112.3871119540527, 'test_4_levels/LOD_Tile_+012_+021.002_medium_0.glb', 1425.1744539150354, 'test_4_levels/LOD_Tile_+012_+021.002_high.glb', 50.74913783700043);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+023_medium_1.glb', 2101.514131339458, 'test_4_levels/LOD_Tile_+016_+023_medium_0.glb', 1403.4284926858452, 'test_4_levels/LOD_Tile_+016_+023_high.glb', 7.257215378620175);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+004.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+004.002_medium_1.glb', 2106.0676503813697, 'test_4_levels/LOD_Tile_+019_+004.002_medium_0.glb', 1412.5355307696689, 'test_4_levels/LOD_Tile_+019_+004.002_high.glb', 25.47129154626728);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+004_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+004_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+010.001_medium_1.glb', 2110.7145765904124, 'test_4_levels/LOD_Tile_+004_+010.001_medium_0.glb', 1421.829383187754, 'test_4_levels/LOD_Tile_+004_+010.001_high.glb', 44.05899638243793);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+010_medium_1.glb', 2112.1508260207925, 'test_4_levels/LOD_Tile_+004_+010_medium_0.glb', 1424.7018820485143, 'test_4_levels/LOD_Tile_+004_+010_high.glb', 49.80399410395821);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+026_medium_1.glb', 2111.8818249301526, 'test_4_levels/LOD_Tile_+012_+026_medium_0.glb', 1424.163879867235, 'test_4_levels/LOD_Tile_+012_+026_high.glb', 48.727989741399405);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+009.002_medium_1.glb', 2112.8195213558083, 'test_4_levels/LOD_Tile_+011_+009.002_medium_0.glb', 1426.0392727185463, 'test_4_levels/LOD_Tile_+011_+009.002_high.glb', 52.47877544402227);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+009.001_medium_1.glb', 2110.045881255396, 'test_4_levels/LOD_Tile_+011_+009.001_medium_0.glb', 1420.491992517722, 'test_4_levels/LOD_Tile_+011_+009.001_high.glb', 41.384215042373874);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+026.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+026.001_medium_1.glb', 2110.983578147558, 'test_4_levels/LOD_Tile_+012_+026.001_medium_0.glb', 1422.3673863020463, 'test_4_levels/LOD_Tile_+012_+026.001_high.glb', 45.13500261102215);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+018_medium_1.glb', 2110.793191307661, 'test_4_levels/LOD_Tile_+008_+018_medium_0.glb', 1421.9866126222516, 'test_4_levels/LOD_Tile_+008_+018_high.glb', 44.37345525143288);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+018.001_medium_1.glb', 2112.0722113035436, 'test_4_levels/LOD_Tile_+008_+018.001_medium_0.glb', 1424.5446526140167, 'test_4_levels/LOD_Tile_+008_+018.001_high.glb', 49.48953523496327);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+010.001_medium_1.glb', 2110.0601180962144, 'test_4_levels/LOD_Tile_+005_+010.001_medium_0.glb', 1420.5204661993585, 'test_4_levels/LOD_Tile_+005_+010.001_high.glb', 41.44116240564657);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+010_medium_1.glb', 2112.80528451499, 'test_4_levels/LOD_Tile_+005_+010_medium_0.glb', 1426.01079903691, 'test_4_levels/LOD_Tile_+005_+010_high.glb', 52.42182808074958);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+018_medium_1.glb', 2111.7236414901677, 'test_4_levels/LOD_Tile_+009_+018_medium_0.glb', 1423.8475129872645, 'test_4_levels/LOD_Tile_+009_+018_high.glb', 48.09525598145877);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+026.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+026.001_medium_1.glb', 2111.4888367145713, 'test_4_levels/LOD_Tile_+013_+026.001_medium_0.glb', 1423.377903436072, 'test_4_levels/LOD_Tile_+013_+026.001_high.glb', 47.15603687907356);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+026_medium_1.glb', 2111.37656636314, 'test_4_levels/LOD_Tile_+013_+026_medium_0.glb', 1423.1533627332092, 'test_4_levels/LOD_Tile_+013_+026_high.glb', 46.70695547334799);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+018.001_medium_1.glb', 2111.1417611210372, 'test_4_levels/LOD_Tile_+009_+018.001_medium_0.glb', 1422.6837522490039, 'test_4_levels/LOD_Tile_+009_+018.001_high.glb', 45.76773450493738);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.003_medium_1.glb', 2101.4567575893802, 'test_4_levels/LOD_Tile_+018_+004.003_medium_0.glb', 1403.3137451856903, 'test_4_levels/LOD_Tile_+018_+004.003_high.glb', 7.027720378310342);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.007_medium_1.glb', 2100.0172332844168, 'test_4_levels/LOD_Tile_+018_+004.007_medium_0.glb', 1400.434696575763, 'test_4_levels/LOD_Tile_+018_+004.007_high.glb', 1.2696231584554905);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+019.001_medium_1.glb', 2110.779054299202, 'test_4_levels/LOD_Tile_+013_+019.001_medium_0.glb', 1421.9583386053334, 'test_4_levels/LOD_Tile_+013_+019.001_high.glb', 44.316907217596594);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.006_medium_1.glb', 2099.8308756598726, 'test_4_levels/LOD_Tile_+018_+004.006_medium_0.glb', 1400.0619813266746, 'test_4_levels/LOD_Tile_+018_+004.006_high.glb', 0.5241926602787018);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.002_medium_1.glb', 2113.5701272754427, 'test_4_levels/LOD_Tile_+018_+004.002_medium_0.glb', 1427.5404845578146, 'test_4_levels/LOD_Tile_+018_+004.002_high.glb', 55.48119912255901);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+019.002_medium_1.glb', 2112.086348312003, 'test_4_levels/LOD_Tile_+013_+019.002_medium_0.glb', 1424.572926630935, 'test_4_levels/LOD_Tile_+013_+019.002_high.glb', 49.546083268799556);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.005_medium_1.glb', 2099.78474891141, 'test_4_levels/LOD_Tile_+018_+004.005_medium_0.glb', 1399.9697278297494, 'test_4_levels/LOD_Tile_+018_+004.005_high.glb', 0.3396856664287079);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.004_medium_1.glb', 2100.737208863554, 'test_4_levels/LOD_Tile_+018_+004.004_medium_0.glb', 1401.8746477340378, 'test_4_levels/LOD_Tile_+018_+004.004_high.glb', 4.149525475005147);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.001_medium_1.glb', 2117.610899390396, 'test_4_levels/LOD_Tile_+018_+004.001_medium_0.glb', 1435.6220287877218, 'test_4_levels/LOD_Tile_+018_+004.001_high.glb', 71.64428758237317);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.008_medium_1.glb', 2099.7964941418077, 'test_4_levels/LOD_Tile_+018_+004.008_medium_0.glb', 1399.993218290545, 'test_4_levels/LOD_Tile_+018_+004.008_high.glb', 0.3866665880197887);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004.009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004.009_medium_1.glb', 2099.871763542014, 'test_4_levels/LOD_Tile_+018_+004.009_medium_0.glb', 1400.1437570909573, 'test_4_levels/LOD_Tile_+018_+004.009_high.glb', 0.6877441888441965);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+015_medium_1.glb', 2109.791842889457, 'test_4_levels/LOD_Tile_+001_+015_medium_0.glb', 1419.9839157858432, 'test_4_levels/LOD_Tile_+001_+015_high.glb', 40.368061578616036);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+017_medium_1.glb', 2112.0162044170743, 'test_4_levels/LOD_Tile_+005_+017_medium_0.glb', 1424.4326388410784, 'test_4_levels/LOD_Tile_+005_+017_high.glb', 49.265507689086526);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+004_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+004_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+004_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+017.001_medium_1.glb', 2110.84919819413, 'test_4_levels/LOD_Tile_+005_+017.001_medium_0.glb', 1422.09862639519, 'test_4_levels/LOD_Tile_+005_+017.001_high.glb', 44.597482797309624);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+021_medium_1.glb', 2109.4255906193544, 'test_4_levels/LOD_Tile_+013_+021_medium_0.glb', 1419.2514112456383, 'test_4_levels/LOD_Tile_+013_+021_high.glb', 38.90305249820649);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+020.001_medium_1.glb', 2110.3443384900474, 'test_4_levels/LOD_Tile_+009_+020.001_medium_0.glb', 1421.0889069870243, 'test_4_levels/LOD_Tile_+009_+020.001_high.glb', 42.57804398097845);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+020_medium_1.glb', 2112.5210645876637, 'test_4_levels/LOD_Tile_+009_+020_medium_0.glb', 1425.4423591822567, 'test_4_levels/LOD_Tile_+009_+020_high.glb', 51.2849483714431);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+021.001_medium_1.glb', 2113.43981199185, 'test_4_levels/LOD_Tile_+013_+021.001_medium_0.glb', 1427.27985399063, 'test_4_levels/LOD_Tile_+013_+021.001_high.glb', 54.95993798818965);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+003.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+003.003_medium_1.glb', 2100.1849269228724, 'test_4_levels/LOD_Tile_+018_+003.003_medium_0.glb', 1400.770083852674, 'test_4_levels/LOD_Tile_+018_+003.003_high.glb', 1.9403977122776712);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+001_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+001_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+002.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+002.003_medium_1.glb', 2101.3323436111273, 'test_4_levels/LOD_Tile_+014_+002.003_medium_0.glb', 1403.0649172291846, 'test_4_levels/LOD_Tile_+014_+002.003_high.glb', 6.530064465298858);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+012.001_medium_1.glb', 2112.01110783519, 'test_4_levels/LOD_Tile_+001_+012.001_medium_0.glb', 1424.4224456773102, 'test_4_levels/LOD_Tile_+001_+012.001_high.glb', 49.24512136155018);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+012.002_medium_1.glb', 2110.8542952425205, 'test_4_levels/LOD_Tile_+001_+012.002_medium_0.glb', 1422.1088204919708, 'test_4_levels/LOD_Tile_+001_+012.002_high.glb', 44.61787099087137);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+002_medium_1.glb', 2111.696961991957, 'test_4_levels/LOD_Tile_+014_+002_medium_0.glb', 1423.7941539908434, 'test_4_levels/LOD_Tile_+014_+002_high.glb', 47.988537988616336);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+003.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+003.002_medium_1.glb', 2117.883488381381, 'test_4_levels/LOD_Tile_+018_+003.002_medium_0.glb', 1436.1672067696913, 'test_4_levels/LOD_Tile_+018_+003.002_high.glb', 72.73464354631248);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+003.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+003.001_medium_1.glb', 2114.4199478997707, 'test_4_levels/LOD_Tile_+018_+003.001_medium_0.glb', 1429.2401258064706, 'test_4_levels/LOD_Tile_+018_+003.001_high.glb', 58.880481619871006);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+002.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+002.002_medium_1.glb', 2109.9379391498887, 'test_4_levels/LOD_Tile_+014_+002.002_medium_0.glb', 1420.2761083067076, 'test_4_levels/LOD_Tile_+014_+002.002_high.glb', 40.95244662034462);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+002.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+002.001_medium_1.glb', 2111.696961991957, 'test_4_levels/LOD_Tile_+014_+002.001_medium_0.glb', 1423.7941539908434, 'test_4_levels/LOD_Tile_+014_+002.001_high.glb', 47.988537988616336);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+003_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+003_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+003_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+017.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+017.003_medium_1.glb', 2099.8712793084214, 'test_4_levels/LOD_Tile_+013_+017.003_medium_0.glb', 1400.1427886237727, 'test_4_levels/LOD_Tile_+013_+017.003_high.glb', 0.6858072544750683);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+012.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+012.006_medium_1.glb', 2100.592237349934, 'test_4_levels/LOD_Tile_+017_+012.006_medium_0.glb', 1401.5847047067978, 'test_4_levels/LOD_Tile_+017_+012.006_high.glb', 3.569639420525095);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+021_medium_1.glb', 2111.5906428620447, 'test_4_levels/LOD_Tile_+005_+021_medium_0.glb', 1423.5815157310185, 'test_4_levels/LOD_Tile_+005_+021_high.glb', 47.56326146896684);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+017.001_medium_1.glb', 2109.3032409317043, 'test_4_levels/LOD_Tile_+013_+017.001_medium_0.glb', 1419.0067118703387, 'test_4_levels/LOD_Tile_+013_+017.001_high.glb', 38.41365374760676);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+017.002_medium_1.glb', 2113.5621616795, 'test_4_levels/LOD_Tile_+013_+017.002_medium_0.glb', 1427.52455336593, 'test_4_levels/LOD_Tile_+013_+017.002_high.glb', 55.44933673878939);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+012.002_medium_1.glb', 2110.874133891601, 'test_4_levels/LOD_Tile_+017_+012.002_medium_0.glb', 1422.1484977901316, 'test_4_levels/LOD_Tile_+017_+012.002_high.glb', 44.69722558719271);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+012.001_medium_1.glb', 2111.991254724413, 'test_4_levels/LOD_Tile_+017_+012.001_medium_0.glb', 1424.3827394557559, 'test_4_levels/LOD_Tile_+017_+012.001_high.glb', 49.165708918441325);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+016.001_medium_1.glb', 2111.6923207202713, 'test_4_levels/LOD_Tile_+009_+016.001_medium_0.glb', 1423.7848714474721, 'test_4_levels/LOD_Tile_+009_+016.001_high.glb', 47.96997290187409);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+016_medium_1.glb', 2111.173081890933, 'test_4_levels/LOD_Tile_+009_+016_medium_0.glb', 1422.7463937887962, 'test_4_levels/LOD_Tile_+009_+016_high.glb', 45.89301758452206);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+028_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+028_medium_1.glb', 2112.869178624335, 'test_4_levels/LOD_Tile_+013_+028_medium_0.glb', 1426.1385872555993, 'test_4_levels/LOD_Tile_+013_+028_high.glb', 52.67740451812811);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+028.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+028.001_medium_1.glb', 2109.9962239868696, 'test_4_levels/LOD_Tile_+013_+028.001_medium_0.glb', 1420.3926779806693, 'test_4_levels/LOD_Tile_+013_+028.001_high.glb', 41.18558596826804);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+009_medium_1.glb', 2116.9722078778477, 'test_4_levels/LOD_Tile_+006_+009_medium_0.glb', 1434.3446457626246, 'test_4_levels/LOD_Tile_+006_+009_high.glb', 69.0895215321789);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+012_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+012_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+010.001_medium_1.glb', 2112.5958777446585, 'test_4_levels/LOD_Tile_+013_+010.001_medium_0.glb', 1425.5919854962465, 'test_4_levels/LOD_Tile_+013_+010.001_high.glb', 51.584200999422606);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+005.001_medium_1.glb', 2111.4509671285205, 'test_4_levels/LOD_Tile_+014_+005.001_medium_0.glb', 1423.3021642639706, 'test_4_levels/LOD_Tile_+014_+005.001_high.glb', 47.004558534870554);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+010.002_medium_1.glb', 2110.2695248665464, 'test_4_levels/LOD_Tile_+013_+010.002_medium_0.glb', 1420.939279740022, 'test_4_levels/LOD_Tile_+013_+010.002_high.glb', 42.27878948697354);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+019.001_medium_1.glb', 2110.584368136774, 'test_4_levels/LOD_Tile_+005_+019.001_medium_0.glb', 1421.5689662804782, 'test_4_levels/LOD_Tile_+005_+019.001_high.glb', 43.53816256788604);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+005_medium_1.glb', 2111.4144359491906, 'test_4_levels/LOD_Tile_+014_+005_medium_0.glb', 1423.2291019053107, 'test_4_levels/LOD_Tile_+014_+005_high.glb', 46.858433817551);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+019_medium_1.glb', 2112.2810344744303, 'test_4_levels/LOD_Tile_+005_+019_medium_0.glb', 1424.9622989557902, 'test_4_levels/LOD_Tile_+005_+019_high.glb', 50.3248279185101);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+015.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+015.004_medium_1.glb', 2099.8324561833892, 'test_4_levels/LOD_Tile_+017_+015.004_medium_0.glb', 1400.0651423737086, 'test_4_levels/LOD_Tile_+017_+015.004_high.glb', 0.5305147543467235);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+015.003_medium_1.glb', 2099.7365578723443, 'test_4_levels/LOD_Tile_+017_+015.003_medium_0.glb', 1399.8733457516187, 'test_4_levels/LOD_Tile_+017_+015.003_high.glb', 0.14692151016696778);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+011.001_medium_1.glb', 2113.0483040009203, 'test_4_levels/LOD_Tile_+009_+011.001_medium_0.glb', 1426.4968380087703, 'test_4_levels/LOD_Tile_+009_+011.001_high.glb', 53.39390602447002);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+011_medium_1.glb', 2109.817098610284, 'test_4_levels/LOD_Tile_+009_+011_medium_0.glb', 1420.0344272274983, 'test_4_levels/LOD_Tile_+009_+011_high.glb', 40.46908446192612);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+013.003_medium_1.glb', 2100.1413626937956, 'test_4_levels/LOD_Tile_+021_+013.003_medium_0.glb', 1400.6829553945206, 'test_4_levels/LOD_Tile_+021_+013.003_high.glb', 1.7661407959706652);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+015.001_medium_1.glb', 2112.3311619813585, 'test_4_levels/LOD_Tile_+017_+015.001_medium_0.glb', 1425.0625539696466, 'test_4_levels/LOD_Tile_+017_+015.001_high.glb', 50.525337946222955);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+026_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+026_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+026_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+026_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+013.002_medium_1.glb', 2111.9061695640767, 'test_4_levels/LOD_Tile_+021_+013.002_medium_0.glb', 1424.2125691350832, 'test_4_levels/LOD_Tile_+021_+013.002_high.glb', 48.82536827709589);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+013.001_medium_1.glb', 2110.959233513634, 'test_4_levels/LOD_Tile_+021_+013.001_medium_0.glb', 1422.318697034198, 'test_4_levels/LOD_Tile_+021_+013.001_high.glb', 45.03762407532566);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+015.002_medium_1.glb', 2110.5342266346556, 'test_4_levels/LOD_Tile_+017_+015.002_medium_0.glb', 1421.4686832762407, 'test_4_levels/LOD_Tile_+017_+015.002_high.glb', 43.337596559411075);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+015_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+015_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+014.001_medium_1.glb', 2110.1377932696723, 'test_4_levels/LOD_Tile_+021_+014.001_medium_0.glb', 1420.6758165462743, 'test_4_levels/LOD_Tile_+021_+014.001_high.glb', 41.75186309947829);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+014.002_medium_1.glb', 2112.727609808039, 'test_4_levels/LOD_Tile_+021_+014.002_medium_0.glb', 1425.8554496230067, 'test_4_levels/LOD_Tile_+021_+014.002_high.glb', 52.11112925294326);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+011_medium_1.glb', 2117.1713501089394, 'test_4_levels/LOD_Tile_+025_+011_medium_0.glb', 1434.7429302248083, 'test_4_levels/LOD_Tile_+025_+011_high.glb', 69.8860904565464);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+011.001_medium_1.glb', 2114.5671833687115, 'test_4_levels/LOD_Tile_+025_+011.001_medium_0.glb', 1429.534596744353, 'test_4_levels/LOD_Tile_+025_+011.001_high.glb', 59.46942349563563);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+004_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+004_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+004.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+004.002_medium_1.glb', 2109.688285477142, 'test_4_levels/LOD_Tile_+014_+004.002_medium_0.glb', 1419.7768009612137, 'test_4_levels/LOD_Tile_+014_+004.002_high.glb', 39.95383192935695);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+004.001_medium_1.glb', 2113.177117600569, 'test_4_levels/LOD_Tile_+014_+004.001_medium_0.glb', 1426.7544652080676, 'test_4_levels/LOD_Tile_+014_+004.001_high.glb', 53.9091604230646);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+004_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+004_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+014.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+014.003_medium_1.glb', 2099.8515829437783, 'test_4_levels/LOD_Tile_+017_+014.003_medium_0.glb', 1400.103395894486, 'test_4_levels/LOD_Tile_+017_+014.003_high.glb', 0.6070217959018854);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+011.002_medium_1.glb', 2109.584315206707, 'test_4_levels/LOD_Tile_+013_+011.002_medium_0.glb', 1419.5688604203428, 'test_4_levels/LOD_Tile_+013_+011.002_high.glb', 39.53795084761552);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+011.001_medium_1.glb', 2113.281087404498, 'test_4_levels/LOD_Tile_+013_+011.001_medium_0.glb', 1426.9624048159255, 'test_4_levels/LOD_Tile_+013_+011.001_high.glb', 54.32503963878064);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+018.001_medium_1.glb', 2111.6902139775902, 'test_4_levels/LOD_Tile_+005_+018.001_medium_0.glb', 1423.7806579621106, 'test_4_levels/LOD_Tile_+005_+018.001_high.glb', 47.96154593115059);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+018_medium_1.glb', 2111.1751891001204, 'test_4_levels/LOD_Tile_+005_+018_medium_0.glb', 1422.7506082071707, 'test_4_levels/LOD_Tile_+005_+018_high.glb', 45.901446421270954);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+014.002_medium_1.glb', 2113.744561464163, 'test_4_levels/LOD_Tile_+017_+014.002_medium_0.glb', 1427.8893529352554, 'test_4_levels/LOD_Tile_+017_+014.002_high.glb', 56.17893587744047);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+014.001_medium_1.glb', 2109.1208271518512, 'test_4_levels/LOD_Tile_+017_+014.001_medium_0.glb', 1418.641884310632, 'test_4_levels/LOD_Tile_+017_+014.001_high.glb', 37.683998628193564);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+020_medium_1.glb', 2111.348847488779, 'test_4_levels/LOD_Tile_+005_+020_medium_0.glb', 1423.0979249844881, 'test_4_levels/LOD_Tile_+005_+020_high.glb', 46.59607997590592);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+020.001_medium_1.glb', 2113.5358810442194, 'test_4_levels/LOD_Tile_+005_+020.001_medium_0.glb', 1427.4719920953687, 'test_4_levels/LOD_Tile_+005_+020.001_high.glb', 55.34421419766719);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+016.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+016.003_medium_1.glb', 2099.803157252018, 'test_4_levels/LOD_Tile_+013_+016.003_medium_0.glb', 1400.0065445109663, 'test_4_levels/LOD_Tile_+013_+016.003_high.glb', 0.4133190288620418);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+014_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+014_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+014_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+029.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+029.001_medium_1.glb', 2112.1110633519693, 'test_4_levels/LOD_Tile_+013_+029.001_medium_0.glb', 1424.6223567108684, 'test_4_levels/LOD_Tile_+013_+029.001_high.glb', 49.64494342866665);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+003.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+003.001_medium_1.glb', 2116.4063300760736, 'test_4_levels/LOD_Tile_+014_+003.001_medium_0.glb', 1433.212890159077, 'test_4_levels/LOD_Tile_+014_+003.001_high.glb', 66.82601032508353);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+003.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+003.002_medium_1.glb', 2115.0361808635716, 'test_4_levels/LOD_Tile_+014_+003.002_medium_0.glb', 1430.4725917340734, 'test_4_levels/LOD_Tile_+014_+003.002_high.glb', 61.34541347507627);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+003_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+003_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+029_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+029_medium_1.glb', 2110.7543397257414, 'test_4_levels/LOD_Tile_+013_+029_medium_0.glb', 1421.9089094584126, 'test_4_levels/LOD_Tile_+013_+029_high.glb', 44.2180489237549);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+013.003_medium_1.glb', 2100.399843133209, 'test_4_levels/LOD_Tile_+017_+013.003_medium_0.glb', 1401.1999162733468, 'test_4_levels/LOD_Tile_+017_+013.003_high.glb', 2.8000625536233357);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+016.002_medium_1.glb', 2112.0978514256044, 'test_4_levels/LOD_Tile_+013_+016.002_medium_0.glb', 1424.5959328581382, 'test_4_levels/LOD_Tile_+013_+016.002_high.glb', 49.59209572320607);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+016.001_medium_1.glb', 2110.7675511856005, 'test_4_levels/LOD_Tile_+013_+016.001_medium_0.glb', 1421.9353323781302, 'test_4_levels/LOD_Tile_+013_+016.001_high.glb', 44.27089476319008);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+017.002_medium_1.glb', 2113.6836002802465, 'test_4_levels/LOD_Tile_+009_+017.002_medium_0.glb', 1427.767430567423, 'test_4_levels/LOD_Tile_+009_+017.002_high.glb', 55.93509114177554);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+017_medium_1.glb', 2100.724951409183, 'test_4_levels/LOD_Tile_+009_+017_medium_0.glb', 1401.8501328252955, 'test_4_levels/LOD_Tile_+009_+017_high.glb', 4.100495657520711);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+017.001_medium_1.glb', 2109.181802330958, 'test_4_levels/LOD_Tile_+009_+017.001_medium_0.glb', 1418.7638346688454, 'test_4_levels/LOD_Tile_+009_+017.001_high.glb', 37.92789934462061);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+013.002_medium_1.glb', 2113.1915676347894, 'test_4_levels/LOD_Tile_+017_+013.002_medium_0.glb', 1426.7833652765087, 'test_4_levels/LOD_Tile_+017_+013.002_high.glb', 53.96696055994682);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+013.001_medium_1.glb', 2109.6738209812247, 'test_4_levels/LOD_Tile_+017_+013.001_medium_0.glb', 1419.7478719693788, 'test_4_levels/LOD_Tile_+017_+013.001_high.glb', 39.89597394568721);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+020.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+020.004_medium_1.glb', 2099.868375306387, 'test_4_levels/LOD_Tile_+013_+020.004_medium_0.glb', 1400.1369806197035, 'test_4_levels/LOD_Tile_+013_+020.004_high.glb', 0.6741912463365102);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+016_medium_1.glb', 2111.7682306336974, 'test_4_levels/LOD_Tile_+005_+016_medium_0.glb', 1423.9366912743242, 'test_4_levels/LOD_Tile_+005_+016_high.glb', 48.27361255557789);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+016.001_medium_1.glb', 2111.0971719775075, 'test_4_levels/LOD_Tile_+005_+016.001_medium_0.glb', 1422.5945739619442, 'test_4_levels/LOD_Tile_+005_+016.001_high.glb', 45.58937793081826);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+013_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+013_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+013_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+020.001_medium_1.glb', 2114.02204783882, 'test_4_levels/LOD_Tile_+013_+020.001_medium_0.glb', 1428.4443256845695, 'test_4_levels/LOD_Tile_+013_+020.001_high.glb', 57.28888137606872);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+002_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+002_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+002.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+002.001_medium_1.glb', 2116.3809246067076, 'test_4_levels/LOD_Tile_+018_+002.001_medium_0.glb', 1433.1620792203446, 'test_4_levels/LOD_Tile_+018_+002.001_high.glb', 66.72438844761884);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+020.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+020.002_medium_1.glb', 2108.843354772385, 'test_4_levels/LOD_Tile_+013_+020.002_medium_0.glb', 1418.0869395516988, 'test_4_levels/LOD_Tile_+013_+020.002_high.glb', 36.57410911032742);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+002.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+002.002_medium_1.glb', 2115.1936883358544, 'test_4_levels/LOD_Tile_+018_+002.002_medium_0.glb', 1430.7876066786387, 'test_4_levels/LOD_Tile_+018_+002.002_high.glb', 61.97544336420682);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+019.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+019.003_medium_1.glb', 2101.944832394956, 'test_4_levels/LOD_Tile_+009_+019.003_medium_0.glb', 1404.289894796842, 'test_4_levels/LOD_Tile_+009_+019.003_high.glb', 8.98001960061335);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+021_medium_1.glb', 2110.3683985550974, 'test_4_levels/LOD_Tile_+009_+021_medium_0.glb', 1421.1370271171245, 'test_4_levels/LOD_Tile_+009_+021_high.glb', 42.67428424117863);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+013_medium_1.glb', 2111.394831952805, 'test_4_levels/LOD_Tile_+001_+013_medium_0.glb', 1423.189893912539, 'test_4_levels/LOD_Tile_+001_+013_high.glb', 46.780017832007765);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+013.001_medium_1.glb', 2111.4705706584, 'test_4_levels/LOD_Tile_+001_+013.001_medium_0.glb', 1423.3413713237294, 'test_4_levels/LOD_Tile_+001_+013.001_high.glb', 47.08297265438838);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+021.001_medium_1.glb', 2112.4970045226137, 'test_4_levels/LOD_Tile_+009_+021.001_medium_0.glb', 1425.3942390521565, 'test_4_levels/LOD_Tile_+009_+021.001_high.glb', 51.18870811124292);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+020_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+020_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+019.002_medium_1.glb', 2111.389080396004, 'test_4_levels/LOD_Tile_+009_+019.002_medium_0.glb', 1423.1783907989375, 'test_4_levels/LOD_Tile_+009_+019.002_high.glb', 46.757011604804504);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+019.001_medium_1.glb', 2111.476322681707, 'test_4_levels/LOD_Tile_+009_+019.001_medium_0.glb', 1423.3528753703438, 'test_4_levels/LOD_Tile_+009_+019.001_high.glb', 47.105980747617046);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+011.003_medium_1.glb', 2100.439534893066, 'test_4_levels/LOD_Tile_+005_+011.003_medium_0.glb', 1401.279299793062, 'test_4_levels/LOD_Tile_+005_+011.003_high.glb', 2.958829593053527);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+009_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+009_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+027_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+027_medium_1.glb', 2113.439954276287, 'test_4_levels/LOD_Tile_+013_+027_medium_0.glb', 1427.2801385595042, 'test_4_levels/LOD_Tile_+013_+027_high.glb', 54.96050712593781);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+027.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+027.001_medium_1.glb', 2109.4254483349173, 'test_4_levels/LOD_Tile_+013_+027.001_medium_0.glb', 1419.2511266767644, 'test_4_levels/LOD_Tile_+013_+027.001_high.glb', 38.90248336045834);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+014_medium_1.glb', 2114.948241150874, 'test_4_levels/LOD_Tile_+001_+014_medium_0.glb', 1430.2967123086778, 'test_4_levels/LOD_Tile_+001_+014_high.glb', 60.99365462428508);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+011.001_medium_1.glb', 2110.416575132466, 'test_4_levels/LOD_Tile_+005_+011.001_medium_0.glb', 1421.2333802718615, 'test_4_levels/LOD_Tile_+005_+011.001_high.glb', 42.86699055065285);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+011.002_medium_1.glb', 2112.4488274787386, 'test_4_levels/LOD_Tile_+005_+011.002_medium_0.glb', 1425.2978849644069, 'test_4_levels/LOD_Tile_+005_+011.002_high.glb', 50.99599993574329);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.011_medium_1.glb', 2099.7305641987477, 'test_4_levels/LOD_Tile_+018_+005.011_medium_0.glb', 1399.8613584044247, 'test_4_levels/LOD_Tile_+018_+005.011_high.glb', 0.12294681577914532);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+026_medium_1.glb', 2105.4181177277314, 'test_4_levels/LOD_Tile_+009_+026_medium_0.glb', 1411.2364654623925, 'test_4_levels/LOD_Tile_+009_+026_high.glb', 22.873160931714477);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.004_medium_1.glb', 2100.2200627817065, 'test_4_levels/LOD_Tile_+018_+005.004_medium_0.glb', 1400.8403555703424, 'test_4_levels/LOD_Tile_+018_+005.004_high.glb', 2.080941147614504);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+014.001_medium_1.glb', 2107.9171614603306, 'test_4_levels/LOD_Tile_+001_+014.001_medium_0.glb', 1416.2345529275908, 'test_4_levels/LOD_Tile_+001_+014.001_high.glb', 32.869335862111065);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.012_medium_1.glb', 2099.7994984427078, 'test_4_levels/LOD_Tile_+018_+005.012_medium_0.glb', 1399.9992268923452, 'test_4_levels/LOD_Tile_+018_+005.012_high.glb', 0.3986837916201605);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.005_medium_1.glb', 2099.9754203201815, 'test_4_levels/LOD_Tile_+018_+005.005_medium_0.glb', 1400.3510706472923, 'test_4_levels/LOD_Tile_+018_+005.005_high.glb', 1.1023713015142913);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+005_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+005_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.016_medium_1.glb', 2099.760930963156, 'test_4_levels/LOD_Tile_+018_+005.016_medium_0.glb', 1399.9220919332417, 'test_4_levels/LOD_Tile_+018_+005.016_high.glb', 0.24441387341308954);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.003_medium_1.glb', 2100.2556973358296, 'test_4_levels/LOD_Tile_+018_+005.003_medium_0.glb', 1400.911624678589, 'test_4_levels/LOD_Tile_+018_+005.003_high.glb', 2.223479364107982);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.008_medium_1.glb', 2099.9791505049634, 'test_4_levels/LOD_Tile_+018_+005.008_medium_0.glb', 1400.3585310168567, 'test_4_levels/LOD_Tile_+018_+005.008_high.glb', 1.1172920406429516);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+015.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+015.008_medium_1.glb', 2099.879124079219, 'test_4_levels/LOD_Tile_+021_+015.008_medium_0.glb', 1400.1584781653678, 'test_4_levels/LOD_Tile_+021_+015.008_high.glb', 0.7171863376651074);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.002_medium_1.glb', 2108.121627928406, 'test_4_levels/LOD_Tile_+018_+005.002_medium_0.glb', 1416.6434858637413, 'test_4_levels/LOD_Tile_+018_+005.002_high.glb', 33.68720173441196);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+015.011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+015.011_medium_1.glb', 2099.778755237813, 'test_4_levels/LOD_Tile_+021_+015.011_medium_0.glb', 1399.9577404825557, 'test_4_levels/LOD_Tile_+021_+015.011_high.glb', 0.31571097204088544);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+018_medium_1.glb', 2113.2633914190874, 'test_4_levels/LOD_Tile_+013_+018_medium_0.glb', 1426.9270128451046, 'test_4_levels/LOD_Tile_+013_+018_high.glb', 54.25425569713887);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+015.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+015.007_medium_1.glb', 2099.753827004444, 'test_4_levels/LOD_Tile_+021_+015.007_medium_0.glb', 1399.9078840158172, 'test_4_levels/LOD_Tile_+021_+015.007_high.glb', 0.21599803856426011);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+018.001_medium_1.glb', 2109.602011192117, 'test_4_levels/LOD_Tile_+013_+018.001_medium_0.glb', 1419.6042523911638, 'test_4_levels/LOD_Tile_+013_+018.001_high.glb', 39.60873478925727);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005.001_medium_1.glb', 2116.382754244616, 'test_4_levels/LOD_Tile_+018_+005.001_medium_0.glb', 1433.1657384961613, 'test_4_levels/LOD_Tile_+018_+005.001_high.glb', 66.73170699925248);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+015.003_medium_1.glb', 2101.8486355198465, 'test_4_levels/LOD_Tile_+021_+015.003_medium_0.glb', 1404.0975010466227, 'test_4_levels/LOD_Tile_+021_+015.003_high.glb', 8.595232100175172);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+005_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+005_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+005_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+010_medium_1.glb', 2115.004020382244, 'test_4_levels/LOD_Tile_+025_+010_medium_0.glb', 1430.4082707714176, 'test_4_levels/LOD_Tile_+025_+010_high.glb', 61.21677154976477);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+015.002_medium_1.glb', 2111.035015137814, 'test_4_levels/LOD_Tile_+021_+015.002_medium_0.glb', 1422.4702602825569, 'test_4_levels/LOD_Tile_+021_+015.002_high.glb', 45.34075057204342);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+015.001_medium_1.glb', 2111.8303879398973, 'test_4_levels/LOD_Tile_+021_+015.001_medium_0.glb', 1424.0610058867242, 'test_4_levels/LOD_Tile_+021_+015.001_high.glb', 48.52224178037813);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+012.001_medium_1.glb', 2111.534194660567, 'test_4_levels/LOD_Tile_+021_+012.001_medium_0.glb', 1423.4686193280643, 'test_4_levels/LOD_Tile_+021_+012.001_high.glb', 47.33746866305812);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+012.002_medium_1.glb', 2111.3312084171434, 'test_4_levels/LOD_Tile_+021_+012.002_medium_0.glb', 1423.062646841217, 'test_4_levels/LOD_Tile_+021_+012.002_high.glb', 46.52552368936343);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+011_medium_1.glb', 2103.2817103745083, 'test_4_levels/LOD_Tile_+010_+011_medium_0.glb', 1406.9636507559464, 'test_4_levels/LOD_Tile_+010_+011_high.glb', 14.327531518822703);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+011.001_medium_1.glb', 2104.64560933492, 'test_4_levels/LOD_Tile_+010_+011.001_medium_0.glb', 1409.6914486767703, 'test_4_levels/LOD_Tile_+010_+011.001_high.glb', 19.783127360470058);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+004.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+004.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+004.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+004.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+018.001_medium_1.glb', 2110.8728024824754, 'test_4_levels/LOD_Tile_+006_+018.001_medium_0.glb', 1422.1458349718803, 'test_4_levels/LOD_Tile_+006_+018.001_high.glb', 44.691899950690306);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+018_medium_1.glb', 2111.9926001287295, 'test_4_levels/LOD_Tile_+006_+018_medium_0.glb', 1424.385430264388, 'test_4_levels/LOD_Tile_+006_+018_high.glb', 49.171090535705844);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+004_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+004_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+004_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+004.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+004.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+004.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+014.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+014.004_medium_1.glb', 2099.8482017057468, 'test_4_levels/LOD_Tile_+014_+014.004_medium_0.glb', 1400.0966334184227, 'test_4_levels/LOD_Tile_+014_+014.004_high.glb', 0.5934968437752559);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+003.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+003.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+003.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+003.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+003.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+003.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+003.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+003.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+020.001_medium_1.glb', 2110.2157530120044, 'test_4_levels/LOD_Tile_+006_+020.001_medium_0.glb', 1420.8317360309384, 'test_4_levels/LOD_Tile_+006_+020.001_high.glb', 42.06370206880632);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+014.001_medium_1.glb', 2110.0411690747455, 'test_4_levels/LOD_Tile_+014_+014.001_medium_0.glb', 1420.4825681564203, 'test_4_levels/LOD_Tile_+014_+014.001_high.glb', 41.365366319770246);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+014.002_medium_1.glb', 2112.8242335364594, 'test_4_levels/LOD_Tile_+014_+014.002_medium_0.glb', 1426.0486970798481, 'test_4_levels/LOD_Tile_+014_+014.002_high.glb', 52.4976241666259);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+003_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+003_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+003_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+020_medium_1.glb', 2112.6496495992, 'test_4_levels/LOD_Tile_+006_+020_medium_0.glb', 1425.69952920533, 'test_4_levels/LOD_Tile_+006_+020_high.glb', 51.79928841758982);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+016_medium_1.glb', 2100.007737547643, 'test_4_levels/LOD_Tile_+010_+016_medium_0.glb', 1400.415705102216, 'test_4_levels/LOD_Tile_+010_+016_high.glb', 1.2316402113614582);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+013.003_medium_1.glb', 2099.8780277892943, 'test_4_levels/LOD_Tile_+014_+013.003_medium_0.glb', 1400.1562855855184, 'test_4_levels/LOD_Tile_+014_+013.003_high.glb', 0.712801177966214);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+016.002_medium_1.glb', 2113.5490925040785, 'test_4_levels/LOD_Tile_+010_+016.002_medium_0.glb', 1427.4984150150863, 'test_4_levels/LOD_Tile_+010_+016.002_high.glb', 55.39706003710237);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+016.001_medium_1.glb', 2109.3163105736326, 'test_4_levels/LOD_Tile_+010_+016.001_medium_0.glb', 1419.0328511541948, 'test_4_levels/LOD_Tile_+010_+016.001_high.glb', 38.46593231531918);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+006.002_medium_1.glb', 2111.2176994913507, 'test_4_levels/LOD_Tile_+013_+006.002_medium_0.glb', 1422.8356289896305, 'test_4_levels/LOD_Tile_+013_+006.002_high.glb', 46.07148798619082);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+013.002_medium_1.glb', 2109.2828825945494, 'test_4_levels/LOD_Tile_+014_+013.002_medium_0.glb', 1418.965995196028, 'test_4_levels/LOD_Tile_+014_+013.002_high.glb', 38.332220398985605);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+006.001_medium_1.glb', 2111.647703119854, 'test_4_levels/LOD_Tile_+013_+006.001_medium_0.glb', 1423.6956362466378, 'test_4_levels/LOD_Tile_+013_+006.001_high.glb', 47.79150250020533);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+013.001_medium_1.glb', 2113.5825200166555, 'test_4_levels/LOD_Tile_+014_+013.001_medium_0.glb', 1427.5652700402404, 'test_4_levels/LOD_Tile_+014_+013.001_high.glb', 55.530770087410545);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+012.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+012.004_medium_1.glb', 2100.898481508595, 'test_4_levels/LOD_Tile_+018_+012.004_medium_0.glb', 1402.19719302412, 'test_4_levels/LOD_Tile_+018_+012.004_high.glb', 4.794616055169639);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+016.002_medium_1.glb', 2109.411781098354, 'test_4_levels/LOD_Tile_+006_+016.002_medium_0.glb', 1419.223792203637, 'test_4_levels/LOD_Tile_+006_+016.002_high.glb', 38.84781441420366);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+016.001_medium_1.glb', 2113.453621512851, 'test_4_levels/LOD_Tile_+006_+016.001_medium_0.glb', 1427.3074730326314, 'test_4_levels/LOD_Tile_+006_+016.001_high.glb', 55.01517607219248);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+006_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+006_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+012_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+012_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+012_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+012.002_medium_1.glb', 2110.692303244686, 'test_4_levels/LOD_Tile_+018_+012.002_medium_0.glb', 1421.7848364963022, 'test_4_levels/LOD_Tile_+018_+012.002_high.glb', 43.96990299953425);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+012.001_medium_1.glb', 2112.173092368923, 'test_4_levels/LOD_Tile_+018_+012.001_medium_0.glb', 1424.7464147447756, 'test_4_levels/LOD_Tile_+018_+012.001_high.glb', 49.893059496480845);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+025_medium_1.glb', 2111.3105935014955, 'test_4_levels/LOD_Tile_+014_+025_medium_0.glb', 1423.0214170099202, 'test_4_levels/LOD_Tile_+014_+025_high.glb', 46.4430640267702);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+025.001_medium_1.glb', 2111.5548091097094, 'test_4_levels/LOD_Tile_+014_+025.001_medium_0.glb', 1423.5098482263481, 'test_4_levels/LOD_Tile_+014_+025.001_high.glb', 47.41992645962595);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+013.001_medium_1.glb', 2111.505137379486, 'test_4_levels/LOD_Tile_+002_+013.001_medium_0.glb', 1423.4105047659016, 'test_4_levels/LOD_Tile_+002_+013.001_high.glb', 47.2212395387326);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+013_medium_1.glb', 2111.3602652317186, 'test_4_levels/LOD_Tile_+002_+013_medium_0.glb', 1423.120760470367, 'test_4_levels/LOD_Tile_+002_+013_high.glb', 46.64175094766355);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+027_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+027_medium_1.glb', 2113.241324735675, 'test_4_levels/LOD_Tile_+010_+027_medium_0.glb', 1426.8828794782796, 'test_4_levels/LOD_Tile_+010_+027_high.glb', 54.16598896348907);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+020.001_medium_1.glb', 2111.0695529355057, 'test_4_levels/LOD_Tile_+010_+020.001_medium_0.glb', 1422.5393358779415, 'test_4_levels/LOD_Tile_+010_+020.001_high.glb', 45.478901762812605);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+020.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+020.002_medium_1.glb', 2111.7958496756987, 'test_4_levels/LOD_Tile_+010_+020.002_medium_0.glb', 1423.9919293583268, 'test_4_levels/LOD_Tile_+010_+020.002_high.glb', 48.38408872358354);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+020_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+020_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+015.010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+015.010_medium_1.glb', 2100.1352127405708, 'test_4_levels/LOD_Tile_+018_+015.010_medium_0.glb', 1400.6706554880714, 'test_4_levels/LOD_Tile_+018_+015.010_high.glb', 1.741540983072575);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+011.001_medium_1.glb', 2112.485842891661, 'test_4_levels/LOD_Tile_+006_+011.001_medium_0.glb', 1425.3719157902513, 'test_4_levels/LOD_Tile_+006_+011.001_high.glb', 51.14406158743197);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+006_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+006_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+015.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+015.005_medium_1.glb', 2099.784193768852, 'test_4_levels/LOD_Tile_+018_+015.005_medium_0.glb', 1399.9686175446343, 'test_4_levels/LOD_Tile_+018_+015.005_high.glb', 0.3374650961982044);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+008.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+008.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+008.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+008.001_medium_1.glb', 2120.7911165698865, 'test_4_levels/LOD_Tile_+013_+008.001_medium_0.glb', 1441.9824631467022, 'test_4_levels/LOD_Tile_+013_+008.001_high.glb', 84.36515630033423);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+011.002_medium_1.glb', 2110.379559719544, 'test_4_levels/LOD_Tile_+006_+011.002_medium_0.glb', 1421.1593494460174, 'test_4_levels/LOD_Tile_+006_+011.002_high.glb', 42.71892889896417);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+015.003_medium_1.glb', 2100.0306014904095, 'test_4_levels/LOD_Tile_+018_+015.003_medium_0.glb', 1400.4614329877484, 'test_4_levels/LOD_Tile_+018_+015.003_high.glb', 1.3230959824263375);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+015.009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+015.009_medium_1.glb', 2099.74183965725, 'test_4_levels/LOD_Tile_+018_+015.009_medium_0.glb', 1399.8839093214294, 'test_4_levels/LOD_Tile_+018_+015.009_high.glb', 0.1680486497886152);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+015_medium_1.glb', 2099.951773579758, 'test_4_levels/LOD_Tile_+018_+015_medium_0.glb', 1400.303777166446, 'test_4_levels/LOD_Tile_+018_+015_high.glb', 1.007784339821862);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+008_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+008_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+018.002_medium_1.glb', 2109.904938490623, 'test_4_levels/LOD_Tile_+010_+018.002_medium_0.glb', 1420.2101069881755, 'test_4_levels/LOD_Tile_+010_+018.002_high.glb', 40.82044398328091);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+018.001_medium_1.glb', 2112.9604641205815, 'test_4_levels/LOD_Tile_+010_+018.001_medium_0.glb', 1426.3211582480928, 'test_4_levels/LOD_Tile_+010_+018.001_high.glb', 53.04254650311524);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+015.002_medium_1.glb', 2112.1616676283884, 'test_4_levels/LOD_Tile_+018_+015.002_medium_0.glb', 1424.7235652637062, 'test_4_levels/LOD_Tile_+018_+015.002_high.glb', 49.847360534342165);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+014.001_medium_1.glb', 2110.813521187929, 'test_4_levels/LOD_Tile_+002_+014.001_medium_0.glb', 1422.0272723827875, 'test_4_levels/LOD_Tile_+002_+014.001_high.glb', 44.4547747725044);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+014_medium_1.glb', 2112.0518814232755, 'test_4_levels/LOD_Tile_+002_+014_medium_0.glb', 1424.5039928534811, 'test_4_levels/LOD_Tile_+002_+014_high.glb', 49.40821571389174);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+015.001_medium_1.glb', 2110.7037284517273, 'test_4_levels/LOD_Tile_+018_+015.001_medium_0.glb', 1421.8076869103843, 'test_4_levels/LOD_Tile_+018_+015.001_high.glb', 44.01560382769833);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+018_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+018_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+009.002_medium_1.glb', 2114.47908690988, 'test_4_levels/LOD_Tile_+025_+009.002_medium_0.glb', 1429.3584038266895, 'test_4_levels/LOD_Tile_+025_+009.002_high.glb', 59.11703766030876);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+009.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+009.003_medium_1.glb', 2105.9044132780846, 'test_4_levels/LOD_Tile_+025_+009.003_medium_0.glb', 1412.209056563099, 'test_4_levels/LOD_Tile_+025_+009.003_high.glb', 24.818343133127453);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+022_medium_1.glb', 2109.9140073740855, 'test_4_levels/LOD_Tile_+014_+022_medium_0.glb', 1420.2282447551004, 'test_4_levels/LOD_Tile_+014_+022_high.glb', 40.85671951713048);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+009.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+009.004_medium_1.glb', 2101.699065186619, 'test_4_levels/LOD_Tile_+025_+009.004_medium_0.glb', 1403.7983603801674, 'test_4_levels/LOD_Tile_+025_+009.004_high.glb', 7.996950767264613);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+009.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+009.005_medium_1.glb', 2101.41447485325, 'test_4_levels/LOD_Tile_+025_+009.005_medium_0.glb', 1403.229179713429, 'test_4_levels/LOD_Tile_+025_+009.005_high.glb', 6.8585894337875315);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+009.001_medium_1.glb', 2108.9055904516517, 'test_4_levels/LOD_Tile_+025_+009.001_medium_0.glb', 1418.2114109102329, 'test_4_levels/LOD_Tile_+025_+009.001_high.glb', 36.823051827395496);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+022.001_medium_1.glb', 2112.9513952371194, 'test_4_levels/LOD_Tile_+014_+022.001_medium_0.glb', 1426.303020481168, 'test_4_levels/LOD_Tile_+014_+022.001_high.glb', 53.00627096926567);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+015.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+015.005_medium_1.glb', 2099.921235607519, 'test_4_levels/LOD_Tile_+022_+015.005_medium_0.glb', 1400.2427012219675, 'test_4_levels/LOD_Tile_+022_+015.005_high.glb', 0.8856324508647286);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+009_medium_1.glb', 2114.47908690988, 'test_4_levels/LOD_Tile_+025_+009_medium_0.glb', 1429.3584038266895, 'test_4_levels/LOD_Tile_+025_+009_high.glb', 59.11703766030876);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+015.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+015.004_medium_1.glb', 2100.36610259487, 'test_4_levels/LOD_Tile_+022_+015.004_medium_0.glb', 1401.1324351966698, 'test_4_levels/LOD_Tile_+022_+015.004_high.glb', 2.6651004002692225);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+005.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+005.004_medium_1.glb', 2100.1019984213963, 'test_4_levels/LOD_Tile_+021_+005.004_medium_0.glb', 1400.6042268497222, 'test_4_levels/LOD_Tile_+021_+005.004_high.glb', 1.6086837063739308);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+005.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+005.005_medium_1.glb', 2099.844542896436, 'test_4_levels/LOD_Tile_+021_+005.005_medium_0.glb', 1400.0893157998019, 'test_4_levels/LOD_Tile_+021_+005.005_high.glb', 0.5788616065333746);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+015.001_medium_1.glb', 2112.5448680742206, 'test_4_levels/LOD_Tile_+022_+015.001_medium_0.glb', 1425.489966155371, 'test_4_levels/LOD_Tile_+022_+015.001_high.glb', 51.3801623176712);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+015.002_medium_1.glb', 2110.320534536984, 'test_4_levels/LOD_Tile_+022_+015.002_medium_0.glb', 1421.0412990808977, 'test_4_levels/LOD_Tile_+022_+015.002_high.glb', 42.48282816872494);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+005.002_medium_1.glb', 2110.7751962916795, 'test_4_levels/LOD_Tile_+021_+005.002_medium_0.glb', 1421.9506225902887, 'test_4_levels/LOD_Tile_+021_+005.002_high.glb', 44.30147518750729);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+005.001_medium_1.glb', 2112.0902067860316, 'test_4_levels/LOD_Tile_+021_+005.001_medium_0.glb', 1424.5806435789923, 'test_4_levels/LOD_Tile_+021_+005.001_high.glb', 49.56151716491426);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+012.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+012.004_medium_1.glb', 2099.9364954967646, 'test_4_levels/LOD_Tile_+022_+012.004_medium_0.glb', 1400.2732210004592, 'test_4_levels/LOD_Tile_+022_+012.004_high.glb', 0.9466720078479215);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+010.002_medium_1.glb', 2113.2282555602533, 'test_4_levels/LOD_Tile_+006_+010.002_medium_0.glb', 1426.8567411274362, 'test_4_levels/LOD_Tile_+006_+010.002_high.glb', 54.11371226180204);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+026.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+026.001_medium_1.glb', 2113.5161203016996, 'test_4_levels/LOD_Tile_+010_+026.001_medium_0.glb', 1427.4324706103293, 'test_4_levels/LOD_Tile_+010_+026.001_high.glb', 55.26517122758829);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+012.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+012.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+010.001_medium_1.glb', 2109.637147517458, 'test_4_levels/LOD_Tile_+006_+010.001_medium_0.glb', 1419.6745250418448, 'test_4_levels/LOD_Tile_+006_+010.001_high.glb', 39.74928009061951);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+012.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+012.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+006_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+006_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+026_medium_1.glb', 2109.349282309505, 'test_4_levels/LOD_Tile_+010_+026_medium_0.glb', 1419.098794625939, 'test_4_levels/LOD_Tile_+010_+026_high.glb', 38.59781925880785);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+014.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+014.003_medium_1.glb', 2099.999936161936, 'test_4_levels/LOD_Tile_+018_+014.003_medium_0.glb', 1400.4001023308022, 'test_4_levels/LOD_Tile_+018_+014.003_high.glb', 1.200434668533971);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+014_medium_1.glb', 2099.9973162622696, 'test_4_levels/LOD_Tile_+018_+014_medium_0.glb', 1400.3948625314683, 'test_4_levels/LOD_Tile_+018_+014_high.glb', 1.1899550698663177);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+009.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+009.003_medium_1.glb', 2100.2263984044585, 'test_4_levels/LOD_Tile_+013_+009.003_medium_0.glb', 1400.8530268158468, 'test_4_levels/LOD_Tile_+013_+009.003_high.glb', 2.1062836386233004);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+009.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+009.005_medium_1.glb', 2100.294122064438, 'test_4_levels/LOD_Tile_+013_+009.005_medium_0.glb', 1400.988474135806, 'test_4_levels/LOD_Tile_+013_+009.005_high.glb', 2.3771782785414945);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+009.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+009.004_medium_1.glb', 2100.885611997892, 'test_4_levels/LOD_Tile_+013_+009.004_medium_0.glb', 1402.1714540027128, 'test_4_levels/LOD_Tile_+013_+009.004_high.glb', 4.743138012355438);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+009.001_medium_1.glb', 2110.4034345815726, 'test_4_levels/LOD_Tile_+013_+009.001_medium_0.glb', 1421.2070991700748, 'test_4_levels/LOD_Tile_+013_+009.001_high.glb', 42.81442834707905);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+009.002_medium_1.glb', 2112.461968029632, 'test_4_levels/LOD_Tile_+013_+009.002_medium_0.glb', 1425.3241660661938, 'test_4_levels/LOD_Tile_+013_+009.002_high.glb', 51.04856213931709);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+023.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+023.002_medium_1.glb', 2110.753044237605, 'test_4_levels/LOD_Tile_+014_+023.002_medium_0.glb', 1421.9063184821396, 'test_4_levels/LOD_Tile_+014_+023.002_high.glb', 44.21286697120859);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+023.001_medium_1.glb', 2112.112358840106, 'test_4_levels/LOD_Tile_+014_+023.001_medium_0.glb', 1424.6249476871417, 'test_4_levels/LOD_Tile_+014_+023.001_high.glb', 49.65012538121296);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+014.001_medium_1.glb', 2112.040520594111, 'test_4_levels/LOD_Tile_+018_+014.001_medium_0.glb', 1424.481271195152, 'test_4_levels/LOD_Tile_+018_+014.001_high.glb', 49.362772397233385);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+023_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+023_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+014.002_medium_1.glb', 2110.824875019498, 'test_4_levels/LOD_Tile_+018_+014.002_medium_0.glb', 1422.049980045926, 'test_4_levels/LOD_Tile_+018_+014.002_high.glb', 44.50019009878171);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+015_medium_1.glb', 2112.326221679102, 'test_4_levels/LOD_Tile_+002_+015_medium_0.glb', 1425.0526733651336, 'test_4_levels/LOD_Tile_+002_+015_high.glb', 50.50557673719688);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+015.001_medium_1.glb', 2110.5391809321027, 'test_4_levels/LOD_Tile_+002_+015.001_medium_0.glb', 1421.4785918711348, 'test_4_levels/LOD_Tile_+002_+015.001_high.glb', 43.357413749199274);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+019.001_medium_1.glb', 2111.257903941688, 'test_4_levels/LOD_Tile_+010_+019.001_medium_0.glb', 1422.916037890305, 'test_4_levels/LOD_Tile_+010_+019.001_high.glb', 46.232305787539765);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+013.003_medium_1.glb', 2099.9161105687476, 'test_4_levels/LOD_Tile_+018_+013.003_medium_0.glb', 1400.2324511444247, 'test_4_levels/LOD_Tile_+018_+013.003_high.glb', 0.8651322957787528);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+019.002_medium_1.glb', 2111.6074991360233, 'test_4_levels/LOD_Tile_+010_+019.002_medium_0.glb', 1423.615228278976, 'test_4_levels/LOD_Tile_+010_+019.002_high.glb', 47.630686564881785);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+013.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+013.005_medium_1.glb', 2099.8827399699453, 'test_4_levels/LOD_Tile_+018_+013.005_medium_0.glb', 1400.16570994682, 'test_4_levels/LOD_Tile_+018_+013.005_high.glb', 0.7316499005698406);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+013.002_medium_1.glb', 2109.0575381012436, 'test_4_levels/LOD_Tile_+018_+013.002_medium_0.glb', 1418.515306209417, 'test_4_levels/LOD_Tile_+018_+013.002_high.glb', 37.43084242576374);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+017.001_medium_1.glb', 2111.8711330710953, 'test_4_levels/LOD_Tile_+006_+017.001_medium_0.glb', 1424.1424961491202, 'test_4_levels/LOD_Tile_+006_+017.001_high.glb', 48.685222305170065);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+021.002_medium_1.glb', 2111.715070835488, 'test_4_levels/LOD_Tile_+010_+021.002_medium_0.glb', 1423.8303716779053, 'test_4_levels/LOD_Tile_+010_+021.002_high.glb', 48.060973362740434);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+013.001_medium_1.glb', 2113.8078575123654, 'test_4_levels/LOD_Tile_+018_+013.001_medium_0.glb', 1428.0159450316607, 'test_4_levels/LOD_Tile_+018_+013.001_high.glb', 56.43212007025135);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+017_medium_1.glb', 2110.994269540109, 'test_4_levels/LOD_Tile_+006_+017_medium_0.glb', 1422.3887690871481, 'test_4_levels/LOD_Tile_+006_+017_high.glb', 45.177768181226085);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+021.001_medium_1.glb', 2111.1503317757165, 'test_4_levels/LOD_Tile_+010_+021.001_medium_0.glb', 1422.700893558363, 'test_4_levels/LOD_Tile_+010_+021.001_high.glb', 45.80201712365571);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+024_medium_1.glb', 2100.107764439894, 'test_4_levels/LOD_Tile_+014_+024_medium_0.glb', 1400.6157588867175, 'test_4_levels/LOD_Tile_+014_+024_high.glb', 1.6317477803647062);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+024.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+024.003_medium_1.glb', 2099.7684767033825, 'test_4_levels/LOD_Tile_+014_+024.003_medium_0.glb', 1399.9371834136948, 'test_4_levels/LOD_Tile_+014_+024.003_high.glb', 0.2745968343193029);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+024.001_medium_1.glb', 2113.332182912104, 'test_4_levels/LOD_Tile_+014_+024.001_medium_0.glb', 1427.0645958311384, 'test_4_levels/LOD_Tile_+014_+024.001_high.glb', 54.529421669206336);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+012.001_medium_1.glb', 2112.5833921686817, 'test_4_levels/LOD_Tile_+002_+012.001_medium_0.glb', 1425.567014344293, 'test_4_levels/LOD_Tile_+002_+012.001_high.glb', 51.53425869551572);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+021_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+021_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+012_medium_1.glb', 2110.2820104425227, 'test_4_levels/LOD_Tile_+002_+012_medium_0.glb', 1420.9642508919753, 'test_4_levels/LOD_Tile_+002_+012_high.glb', 42.328731790880425);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+013_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+013_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+013_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+024.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+024.002_medium_1.glb', 2109.5332196991003, 'test_4_levels/LOD_Tile_+014_+024.002_medium_0.glb', 1419.46666940513, 'test_4_levels/LOD_Tile_+014_+024.002_high.glb', 39.333568817189814);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+017.001_medium_1.glb', 2111.682753608026, 'test_4_levels/LOD_Tile_+010_+017.001_medium_0.glb', 1423.765737222982, 'test_4_levels/LOD_Tile_+010_+017.001_high.glb', 47.93170445289327);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+010_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+010_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+021.001_medium_1.glb', 2109.027648106326, 'test_4_levels/LOD_Tile_+006_+021.001_medium_0.glb', 1418.4555262195813, 'test_4_levels/LOD_Tile_+006_+021.001_high.glb', 37.31128244609247);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+021.002_medium_1.glb', 2113.837754504879, 'test_4_levels/LOD_Tile_+006_+021.002_medium_0.glb', 1428.075739016687, 'test_4_levels/LOD_Tile_+006_+021.002_high.glb', 56.55170804030369);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+010_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+010_+017.002_medium_1.glb', 2111.1826490031785, 'test_4_levels/LOD_Tile_+010_+017.002_medium_0.glb', 1422.7655280132867, 'test_4_levels/LOD_Tile_+010_+017.002_high.glb', 45.93128603350288);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+002.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+002.002_medium_1.glb', 2115.9801844550925, 'test_4_levels/LOD_Tile_+017_+002.002_medium_0.glb', 1432.3605989171144, 'test_4_levels/LOD_Tile_+017_+002.002_high.glb', 65.12142784115832);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+002.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+002.001_medium_1.glb', 2115.94745436951, 'test_4_levels/LOD_Tile_+017_+002.001_medium_0.glb', 1432.2951387459495, 'test_4_levels/LOD_Tile_+017_+002.001_high.glb', 64.99050749882879);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+021_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+006_+021_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+006_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+012.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+012.008_medium_1.glb', 2100.3042158623534, 'test_4_levels/LOD_Tile_+014_+012.008_medium_0.glb', 1401.0086617316367, 'test_4_levels/LOD_Tile_+014_+012.008_high.glb', 2.417553470203179);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+012.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+012.007_medium_1.glb', 2099.907796492561, 'test_4_levels/LOD_Tile_+014_+012.007_medium_0.glb', 1400.2158229920515, 'test_4_levels/LOD_Tile_+014_+012.007_high.glb', 0.8318759910325065);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+012.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+012.003_medium_1.glb', 2100.177054161694, 'test_4_levels/LOD_Tile_+014_+012.003_medium_0.glb', 1400.7543383303168, 'test_4_levels/LOD_Tile_+014_+012.003_high.glb', 1.9089066675634052);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+007.001_medium_1.glb', 2109.287509871044, 'test_4_levels/LOD_Tile_+013_+007.001_medium_0.glb', 1418.975249749018, 'test_4_levels/LOD_Tile_+013_+007.001_high.glb', 38.35072950496574);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+007.002_medium_1.glb', 2113.577893206667, 'test_4_levels/LOD_Tile_+013_+007.002_medium_0.glb', 1427.5560164202632, 'test_4_levels/LOD_Tile_+013_+007.002_high.glb', 55.51226284745581);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+005.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+005.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+005.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+012.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+012.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+012.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+012.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+009_medium_1.glb', 2114.130403268954, 'test_4_levels/LOD_Tile_+005_+009_medium_0.glb', 1428.661036544838, 'test_4_levels/LOD_Tile_+005_+009_high.glb', 57.722303096605735);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+005.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+005.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+005.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+005_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+005_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+005_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+009.001_medium_1.glb', 2108.7349998087566, 'test_4_levels/LOD_Tile_+005_+009.001_medium_0.glb', 1417.870229624443, 'test_4_levels/LOD_Tile_+005_+009.001_high.glb', 36.140689255815815);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+015.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+015.004_medium_1.glb', 2099.968672305815, 'test_4_levels/LOD_Tile_+014_+015.004_medium_0.glb', 1400.3375746185595, 'test_4_levels/LOD_Tile_+014_+015.004_high.glb', 1.0753792440485492);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+015.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+015.005_medium_1.glb', 2100.322410076547, 'test_4_levels/LOD_Tile_+014_+015.005_medium_0.glb', 1401.0450501600233, 'test_4_levels/LOD_Tile_+014_+015.005_high.glb', 2.4903303269761756);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+019_medium_1.glb', 2112.105866937726, 'test_4_levels/LOD_Tile_+006_+019_medium_0.glb', 1424.611963882382, 'test_4_levels/LOD_Tile_+006_+019_high.glb', 49.624157771693895);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+006_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+006_+019.001_medium_1.glb', 2110.759536139985, 'test_4_levels/LOD_Tile_+006_+019.001_medium_0.glb', 1421.919302286899, 'test_4_levels/LOD_Tile_+006_+019.001_high.glb', 44.238834580727655);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+013.002_medium_1.glb', 2111.169722112194, 'test_4_levels/LOD_Tile_+022_+013.002_medium_0.glb', 1422.7396742313172, 'test_4_levels/LOD_Tile_+022_+013.002_high.glb', 45.87957846956401);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+003_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+003_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+013.001_medium_1.glb', 2111.695680499011, 'test_4_levels/LOD_Tile_+022_+013.001_medium_0.glb', 1423.7915910049512, 'test_4_levels/LOD_Tile_+022_+013.001_high.glb', 47.98341201683214);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+014.001_medium_1.glb', 2113.032259447992, 'test_4_levels/LOD_Tile_+022_+014.001_medium_0.glb', 1426.464748902914, 'test_4_levels/LOD_Tile_+022_+014.001_high.glb', 53.32972781275767);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+015.001_medium_1.glb', 2111.3895786247867, 'test_4_levels/LOD_Tile_+014_+015.001_medium_0.glb', 1423.179387256503, 'test_4_levels/LOD_Tile_+014_+015.001_high.glb', 46.75900451993575);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+015.002_medium_1.glb', 2111.4758239864177, 'test_4_levels/LOD_Tile_+014_+015.002_medium_0.glb', 1423.3518779797653, 'test_4_levels/LOD_Tile_+014_+015.002_high.glb', 47.1039859664604);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+014.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+014.004_medium_1.glb', 2100.5453842510833, 'test_4_levels/LOD_Tile_+022_+014.004_medium_0.glb', 1401.4909985090958, 'test_4_levels/LOD_Tile_+022_+014.004_high.glb', 3.382227025121409);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+014.002_medium_1.glb', 2109.8331431632123, 'test_4_levels/LOD_Tile_+022_+014.002_medium_0.glb', 1420.0665163333545, 'test_4_levels/LOD_Tile_+022_+014.002_high.glb', 40.53326267363848);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+004_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+004_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+004_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+008_medium_1.glb', 2114.014431189628, 'test_4_levels/LOD_Tile_+025_+008_medium_0.glb', 1428.4290923861859, 'test_4_levels/LOD_Tile_+025_+008_high.glb', 57.258414779301134);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+008.001_medium_1.glb', 2111.968910469722, 'test_4_levels/LOD_Tile_+024_+008.001_medium_0.glb', 1424.3380509463734, 'test_4_levels/LOD_Tile_+024_+008.001_high.glb', 49.07633189967626);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+008.002_medium_1.glb', 2110.896492607989, 'test_4_levels/LOD_Tile_+024_+008.002_medium_0.glb', 1422.1932152229078, 'test_4_levels/LOD_Tile_+024_+008.002_high.glb', 44.78666045274529);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+008_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+008_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+004.001_medium_1.glb', 2113.3356425232028, 'test_4_levels/LOD_Tile_+020_+004.001_medium_0.glb', 1427.0715150533356, 'test_4_levels/LOD_Tile_+020_+004.001_high.glb', 54.5432601136008);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+004_medium_1.glb', 2109.529760554508, 'test_4_levels/LOD_Tile_+020_+004_medium_0.glb', 1419.4597511159457, 'test_4_levels/LOD_Tile_+020_+004_high.glb', 39.31973223882075);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+014.001_medium_1.glb', 2111.8864801970285, 'test_4_levels/LOD_Tile_+023_+014.001_medium_0.glb', 1424.173190400987, 'test_4_levels/LOD_Tile_+023_+014.001_high.glb', 48.74661080890376);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+014.002_medium_1.glb', 2110.978922414176, 'test_4_levels/LOD_Tile_+023_+014.002_medium_0.glb', 1422.3580748352813, 'test_4_levels/LOD_Tile_+023_+014.002_high.glb', 45.11637967749238);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+003_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+003_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+003_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+013.003_medium_1.glb', 2100.5137080033473, 'test_4_levels/LOD_Tile_+023_+013.003_medium_0.glb', 1401.4276460136248, 'test_4_levels/LOD_Tile_+023_+013.003_high.glb', 3.2555220341790414);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+013.002_medium_1.glb', 2110.9767872146076, 'test_4_levels/LOD_Tile_+023_+013.002_medium_0.glb', 1422.3538044361449, 'test_4_levels/LOD_Tile_+023_+013.002_high.glb', 45.10783887921926);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+013.001_medium_1.glb', 2111.8886158631035, 'test_4_levels/LOD_Tile_+023_+013.001_medium_0.glb', 1424.1774617331364, 'test_4_levels/LOD_Tile_+023_+013.001_high.glb', 48.75515347320229);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+019.001_medium_1.glb', 2110.8235156199917, 'test_4_levels/LOD_Tile_+007_+019.001_medium_0.glb', 1422.0472612469127, 'test_4_levels/LOD_Tile_+007_+019.001_high.glb', 44.49475250075508);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+019_medium_1.glb', 2112.0418874577194, 'test_4_levels/LOD_Tile_+007_+019_medium_0.glb', 1424.4840049223685, 'test_4_levels/LOD_Tile_+007_+019_high.glb', 49.36823985166647);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+015.001_medium_1.glb', 2112.5978282077117, 'test_4_levels/LOD_Tile_+015_+015.001_medium_0.glb', 1425.595886422353, 'test_4_levels/LOD_Tile_+015_+015.001_high.glb', 51.59200285163583);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+015.002_medium_1.glb', 2110.2675604083024, 'test_4_levels/LOD_Tile_+015_+015.002_medium_0.glb', 1420.9353508235342, 'test_4_levels/LOD_Tile_+015_+015.002_high.glb', 42.2709316539982);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+005.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+005.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+005.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+005.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+005.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+005.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+005_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+005_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+005_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+010_medium_1.glb', 2100.39718124797, 'test_4_levels/LOD_Tile_+011_+010_medium_0.glb', 1401.19459250287, 'test_4_levels/LOD_Tile_+011_+010_high.glb', 2.7894150126693416);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+010.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+010.005_medium_1.glb', 2100.0071394865013, 'test_4_levels/LOD_Tile_+011_+010.005_medium_0.glb', 1400.4145089799322, 'test_4_levels/LOD_Tile_+011_+010.005_high.glb', 1.2292479667938065);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+009_medium_1.glb', 2110.4927980716534, 'test_4_levels/LOD_Tile_+004_+009_medium_0.glb', 1421.3858261502364, 'test_4_levels/LOD_Tile_+004_+009_high.glb', 43.1718823074026);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+010.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+010.003_medium_1.glb', 2100.791265753476, 'test_4_levels/LOD_Tile_+011_+010.003_medium_0.glb', 1401.9827615138822, 'test_4_levels/LOD_Tile_+011_+010.003_high.glb', 4.365753034694072);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+010.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+010.004_medium_1.glb', 2100.94184653946, 'test_4_levels/LOD_Tile_+011_+010.004_medium_0.glb', 1402.28392308585, 'test_4_levels/LOD_Tile_+011_+010.004_high.glb', 4.968076178629229);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+009.001_medium_1.glb', 2112.372604539551, 'test_4_levels/LOD_Tile_+004_+009.001_medium_0.glb', 1425.145439086032, 'test_4_levels/LOD_Tile_+004_+009.001_high.glb', 50.691108178993545);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+015_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+015_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+015_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+007_medium_1.glb', 2106.550685518836, 'test_4_levels/LOD_Tile_+012_+007_medium_0.glb', 1413.5016010446018, 'test_4_levels/LOD_Tile_+012_+007_high.glb', 27.4034320961332);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+028_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+028_medium_1.glb', 2107.882054058384, 'test_4_levels/LOD_Tile_+011_+028_medium_0.glb', 1416.164338123697, 'test_4_levels/LOD_Tile_+011_+028_high.glb', 32.72890625432386);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+028.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+028.001_medium_1.glb', 2114.9833490193273, 'test_4_levels/LOD_Tile_+011_+028.001_medium_0.glb', 1430.366928045584, 'test_4_levels/LOD_Tile_+011_+028.001_high.glb', 61.13408609809768);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+010.002_medium_1.glb', 2121.462075393717, 'test_4_levels/LOD_Tile_+011_+010.002_medium_0.glb', 1443.3243807943638, 'test_4_levels/LOD_Tile_+011_+010.002_high.glb', 87.04899159565745);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+010.001_medium_1.glb', 2121.3680566367602, 'test_4_levels/LOD_Tile_+011_+010.001_medium_0.glb', 1443.1363432804499, 'test_4_levels/LOD_Tile_+011_+010.001_high.glb', 86.67291656782955);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+012.002_medium_1.glb', 2112.2223936931036, 'test_4_levels/LOD_Tile_+015_+012.002_medium_0.glb', 1424.845017393137, 'test_4_levels/LOD_Tile_+015_+012.002_high.glb', 50.090264793203595);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+012.001_medium_1.glb', 2110.6429949229105, 'test_4_levels/LOD_Tile_+015_+012.001_medium_0.glb', 1421.6862198527504, 'test_4_levels/LOD_Tile_+015_+012.001_high.glb', 43.772669712430435);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+017.001_medium_1.glb', 2110.8620112575654, 'test_4_levels/LOD_Tile_+011_+017.001_medium_0.glb', 1422.1242525220603, 'test_4_levels/LOD_Tile_+011_+017.001_high.glb', 44.64873505104997);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+017.002_medium_1.glb', 2112.0033913536395, 'test_4_levels/LOD_Tile_+011_+017.002_medium_0.glb', 1424.4070127142083, 'test_4_levels/LOD_Tile_+011_+017.002_high.glb', 49.21425543534618);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+021.002_medium_1.glb', 2111.953620257563, 'test_4_levels/LOD_Tile_+007_+021.002_medium_0.glb', 1424.307470522056, 'test_4_levels/LOD_Tile_+007_+021.002_high.glb', 49.01517105104182);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+012_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+012_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+012_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+021.001_medium_1.glb', 2110.911782820148, 'test_4_levels/LOD_Tile_+007_+021.001_medium_0.glb', 1422.223795647225, 'test_4_levels/LOD_Tile_+007_+021.001_high.glb', 44.847821301379724);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+002_medium_1.glb', 2100.209570587367, 'test_4_levels/LOD_Tile_+016_+002_medium_0.glb', 1400.819371181664, 'test_4_levels/LOD_Tile_+016_+002_high.glb', 2.038972370257988);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+002.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+002.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+002.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+002.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+021_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+007_+021_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+007_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+002.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+002.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+002.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+002.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+012.001_medium_1.glb', 2112.560072915717, 'test_4_levels/LOD_Tile_+003_+012.001_medium_0.glb', 1425.5203758383636, 'test_4_levels/LOD_Tile_+003_+012.001_high.glb', 51.44098168365675);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+024_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+024_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+024_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+013.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+013.004_medium_1.glb', 2099.8148740255288, 'test_4_levels/LOD_Tile_+019_+013.004_medium_0.glb', 1400.029978057987, 'test_4_levels/LOD_Tile_+019_+013.004_high.glb', 0.46018612290349176);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+024.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+024.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+024.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+013.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+013.007_medium_1.glb', 2099.775310088411, 'test_4_levels/LOD_Tile_+019_+013.007_medium_0.glb', 1399.9508501837522, 'test_4_levels/LOD_Tile_+019_+013.007_high.glb', 0.30193037443393733);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+012_medium_1.glb', 2110.305330161994, 'test_4_levels/LOD_Tile_+003_+012_medium_0.glb', 1421.0108903309176, 'test_4_levels/LOD_Tile_+003_+012_high.glb', 42.4220106687648);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+024.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+024.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+024.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+024.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+013.003_medium_1.glb', 2099.7619418824183, 'test_4_levels/LOD_Tile_+019_+013.003_medium_0.glb', 1399.9241137717668, 'test_4_levels/LOD_Tile_+019_+013.003_high.glb', 0.24845755046309043);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+017.001_medium_1.glb', 2112.990361113095, 'test_4_levels/LOD_Tile_+007_+017.001_medium_0.glb', 1426.380952233119, 'test_4_levels/LOD_Tile_+007_+017.001_high.glb', 53.162134473167576);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+007_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+007_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+017.002_medium_1.glb', 2109.87504149811, 'test_4_levels/LOD_Tile_+007_+017.002_medium_0.glb', 1420.1503130031494, 'test_4_levels/LOD_Tile_+007_+017.002_high.glb', 40.700856013228574);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+013.002_medium_1.glb', 2110.2328369410825, 'test_4_levels/LOD_Tile_+019_+013.002_medium_0.glb', 1420.8659038890944, 'test_4_levels/LOD_Tile_+019_+013.002_high.glb', 42.132037785118314);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+013.001_medium_1.glb', 2112.6325656701224, 'test_4_levels/LOD_Tile_+019_+013.001_medium_0.glb', 1425.665361347174, 'test_4_levels/LOD_Tile_+019_+013.001_high.glb', 51.73095270127783);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+021.001_medium_1.glb', 2111.520997195899, 'test_4_levels/LOD_Tile_+011_+021.001_medium_0.glb', 1423.4422243987276, 'test_4_levels/LOD_Tile_+011_+021.001_high.glb', 47.28467880438506);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+021_medium_1.glb', 2111.344405881812, 'test_4_levels/LOD_Tile_+011_+021_medium_0.glb', 1423.0890417705534, 'test_4_levels/LOD_Tile_+011_+021_high.glb', 46.57831354803649);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+015_medium_1.glb', 2099.9061735169657, 'test_4_levels/LOD_Tile_+003_+015_medium_0.glb', 1400.2125770408616, 'test_4_levels/LOD_Tile_+003_+015_high.glb', 0.8253840886527405);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+023.001_medium_1.glb', 2119.9846959643996, 'test_4_levels/LOD_Tile_+015_+023.001_medium_0.glb', 1440.3696219357287, 'test_4_levels/LOD_Tile_+015_+023.001_high.glb', 81.13947387838711);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+023_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+023_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+023_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+019.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+019.007_medium_1.glb', 2100.0772838479356, 'test_4_levels/LOD_Tile_+011_+019.007_medium_0.glb', 1400.5547977028014, 'test_4_levels/LOD_Tile_+011_+019.007_high.glb', 1.5098254125322386);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+019.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+019.004_medium_1.glb', 2099.765600691729, 'test_4_levels/LOD_Tile_+011_+019.004_medium_0.glb', 1399.9314313903876, 'test_4_levels/LOD_Tile_+011_+019.004_high.glb', 0.2630927877049718);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+015.002_medium_1.glb', 2110.4546439167284, 'test_4_levels/LOD_Tile_+003_+015.002_medium_0.glb', 1421.309517840387, 'test_4_levels/LOD_Tile_+003_+015.002_high.glb', 43.019265687703275);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+015.001_medium_1.glb', 2112.410758694476, 'test_4_levels/LOD_Tile_+003_+015.001_medium_0.glb', 1425.2217473958817, 'test_4_levels/LOD_Tile_+003_+015.001_high.glb', 50.84372479869287);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+014.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+014.005_medium_1.glb', 2099.732813692372, 'test_4_levels/LOD_Tile_+019_+014.005_medium_0.glb', 1399.8658573916732, 'test_4_levels/LOD_Tile_+019_+014.005_high.glb', 0.13194479027619388);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+019.001_medium_1.glb', 2109.4604708327083, 'test_4_levels/LOD_Tile_+011_+019.001_medium_0.glb', 1419.3211716723463, 'test_4_levels/LOD_Tile_+011_+019.001_high.glb', 39.042573351622046);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+010_medium_1.glb', 2113.1094933064423, 'test_4_levels/LOD_Tile_+007_+010_medium_0.glb', 1426.6192166198139, 'test_4_levels/LOD_Tile_+007_+010_high.glb', 53.63866324655741);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+014.010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+014.010_medium_1.glb', 2099.9674761835313, 'test_4_levels/LOD_Tile_+019_+014.010_medium_0.glb', 1400.3351823739918, 'test_4_levels/LOD_Tile_+019_+014.010_high.glb', 1.070594754913246);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+019.002_medium_1.glb', 2113.404932245003, 'test_4_levels/LOD_Tile_+011_+019.002_medium_0.glb', 1427.210094496935, 'test_4_levels/LOD_Tile_+011_+019.002_high.glb', 54.820419000799504);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+026_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+026_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+026_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+014.009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+014.009_medium_1.glb', 2099.967946421933, 'test_4_levels/LOD_Tile_+019_+014.009_medium_0.glb', 1400.3361228507954, 'test_4_levels/LOD_Tile_+019_+014.009_high.glb', 1.0724757085202608);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+009.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+009.008_medium_1.glb', 2099.8023030788895, 'test_4_levels/LOD_Tile_+012_+009.008_medium_0.glb', 1400.004836164709, 'test_4_levels/LOD_Tile_+012_+009.008_high.glb', 0.4099023363477125);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+002_medium_1.glb', 2119.3257389494597, 'test_4_levels/LOD_Tile_+020_+002_medium_0.glb', 1439.0517079058486, 'test_4_levels/LOD_Tile_+020_+002_high.glb', 78.50364581862705);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+014.002_medium_1.glb', 2113.0100075615583, 'test_4_levels/LOD_Tile_+019_+014.002_medium_0.glb', 1426.4202451300464, 'test_4_levels/LOD_Tile_+019_+014.002_high.glb', 53.24072026702255);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+014.001_medium_1.glb', 2109.855395049646, 'test_4_levels/LOD_Tile_+019_+014.001_medium_0.glb', 1420.111020106222, 'test_4_levels/LOD_Tile_+019_+014.001_high.glb', 40.6222702193736);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+009.001_medium_1.glb', 2110.4581888984894, 'test_4_levels/LOD_Tile_+012_+009.001_medium_0.glb', 1421.3166078039085, 'test_4_levels/LOD_Tile_+012_+009.001_high.glb', 43.03344561474664);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+009.002_medium_1.glb', 2112.407213712715, 'test_4_levels/LOD_Tile_+012_+009.002_medium_0.glb', 1425.21465743236, 'test_4_levels/LOD_Tile_+012_+009.002_high.glb', 50.82954487164951);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+012.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+012.003_medium_1.glb', 2101.3470642190314, 'test_4_levels/LOD_Tile_+023_+012.003_medium_0.glb', 1403.0943584449928, 'test_4_levels/LOD_Tile_+023_+012.003_high.glb', 6.588946896915276);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+012.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+012.004_medium_1.glb', 2100.0474862212754, 'test_4_levels/LOD_Tile_+023_+012.004_medium_0.glb', 1400.4952024494805, 'test_4_levels/LOD_Tile_+023_+012.004_high.glb', 1.3906349058909113);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+012.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+012.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+005.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+005.003_medium_1.glb', 2100.042105070517, 'test_4_levels/LOD_Tile_+020_+005.003_medium_0.glb', 1400.4844401479643, 'test_4_levels/LOD_Tile_+020_+005.003_high.glb', 1.3691103028582579);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+005.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+005.002_medium_1.glb', 2112.042357229615, 'test_4_levels/LOD_Tile_+020_+005.002_medium_0.glb', 1424.4849444661593, 'test_4_levels/LOD_Tile_+020_+005.002_high.glb', 49.37011893924809);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+005.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+005.001_medium_1.glb', 2110.82304538159, 'test_4_levels/LOD_Tile_+020_+005.001_medium_0.glb', 1422.046320770109, 'test_4_levels/LOD_Tile_+020_+005.001_high.glb', 44.49287154714806);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+012.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+012.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+015.003_medium_1.glb', 2099.8452692468245, 'test_4_levels/LOD_Tile_+023_+015.003_medium_0.glb', 1400.0907685005786, 'test_4_levels/LOD_Tile_+023_+015.003_high.glb', 0.5817670080870668);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+009.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+009.006_medium_1.glb', 2100.1428718418406, 'test_4_levels/LOD_Tile_+024_+009.006_medium_0.glb', 1400.685973690611, 'test_4_levels/LOD_Tile_+024_+009.006_high.glb', 1.7721773881519078);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+015.002_medium_1.glb', 2109.2937311997403, 'test_4_levels/LOD_Tile_+023_+015.002_medium_0.glb', 1418.9876924064106, 'test_4_levels/LOD_Tile_+023_+015.002_high.glb', 38.37561481975061);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+009.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+009.003_medium_1.glb', 2101.484219885248, 'test_4_levels/LOD_Tile_+024_+009.003_medium_0.glb', 1403.3686697774253, 'test_4_levels/LOD_Tile_+024_+009.003_high.glb', 7.137569561780324);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+015.001_medium_1.glb', 2113.5716718779704, 'test_4_levels/LOD_Tile_+023_+015.001_medium_0.glb', 1427.5435737628707, 'test_4_levels/LOD_Tile_+023_+015.001_high.glb', 55.48737753267094);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+009.002_medium_1.glb', 2100.8676025202135, 'test_4_levels/LOD_Tile_+024_+009.002_medium_0.glb', 1402.1354350473564, 'test_4_levels/LOD_Tile_+024_+009.002_high.glb', 4.67110010164234);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+009.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+009.004_medium_1.glb', 2111.2750163276532, 'test_4_levels/LOD_Tile_+024_+009.004_medium_0.glb', 1422.950262662236, 'test_4_levels/LOD_Tile_+024_+009.004_high.glb', 46.30075533140138);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+009.001_medium_1.glb', 2111.5903862835517, 'test_4_levels/LOD_Tile_+024_+009.001_medium_0.glb', 1423.5810025740325, 'test_4_levels/LOD_Tile_+024_+009.001_high.glb', 47.56223515499476);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+018_medium_1.glb', 2110.3353978958316, 'test_4_levels/LOD_Tile_+011_+018_medium_0.glb', 1421.0710257985927, 'test_4_levels/LOD_Tile_+011_+018_high.glb', 42.54228160411492);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+018.001_medium_1.glb', 2112.5300051818795, 'test_4_levels/LOD_Tile_+011_+018.001_medium_0.glb', 1425.4602403706886, 'test_4_levels/LOD_Tile_+011_+018.001_high.glb', 51.32071074830663);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+014.001_medium_1.glb', 2110.874283173633, 'test_4_levels/LOD_Tile_+003_+014.001_medium_0.glb', 1422.148796354196, 'test_4_levels/LOD_Tile_+003_+014.001_high.glb', 44.69782271532192);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+014.002_medium_1.glb', 2111.9911194375713, 'test_4_levels/LOD_Tile_+003_+014.002_medium_0.glb', 1424.3824688820723, 'test_4_levels/LOD_Tile_+003_+014.002_high.glb', 49.16516777107423);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+022_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+022_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+022_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+022.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+022.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+022.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+003_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+003_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+008_medium_1.glb', 2101.7631015804004, 'test_4_levels/LOD_Tile_+012_+008_medium_0.glb', 1403.926433167731, 'test_4_levels/LOD_Tile_+012_+008_high.glb', 8.253096342391295);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+027.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+027.001_medium_1.glb', 2109.8107489923414, 'test_4_levels/LOD_Tile_+011_+027.001_medium_0.glb', 1420.0217279916128, 'test_4_levels/LOD_Tile_+011_+027.001_high.glb', 40.44368599015521);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+027_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+027_medium_1.glb', 2113.054653618863, 'test_4_levels/LOD_Tile_+011_+027_medium_0.glb', 1426.5095372446556, 'test_4_levels/LOD_Tile_+011_+027_high.glb', 53.41930449624093);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+015.003_medium_1.glb', 2101.5519295500367, 'test_4_levels/LOD_Tile_+019_+015.003_medium_0.glb', 1403.5040891070034, 'test_4_levels/LOD_Tile_+019_+015.003_high.glb', 7.408408220936405);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+011.001_medium_1.glb', 2123.0138411267185, 'test_4_levels/LOD_Tile_+007_+011.001_medium_0.glb', 1446.4279122603666, 'test_4_levels/LOD_Tile_+007_+011.001_high.glb', 93.25605452766284);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+011_medium_1.glb', 2118.795722890402, 'test_4_levels/LOD_Tile_+007_+011_medium_0.glb', 1437.9916757877336, 'test_4_levels/LOD_Tile_+007_+011_high.glb', 76.3835815823968);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+008.002_medium_1.glb', 2116.8115762125326, 'test_4_levels/LOD_Tile_+012_+008.002_medium_0.glb', 1434.0233824319948, 'test_4_levels/LOD_Tile_+012_+008.002_high.glb', 68.44699487091921);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+008.001_medium_1.glb', 2106.0538268651785, 'test_4_levels/LOD_Tile_+012_+008.001_medium_0.glb', 1412.5078837372864, 'test_4_levels/LOD_Tile_+012_+008.001_high.glb', 25.41599748150234);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+025.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+025.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+025.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+025.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+025.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+025.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+025.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+025_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+025_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+025_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+015.002_medium_1.glb', 2111.604608662673, 'test_4_levels/LOD_Tile_+019_+015.002_medium_0.glb', 1423.609447332275, 'test_4_levels/LOD_Tile_+019_+015.002_high.glb', 47.61912467147994);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+015.001_medium_1.glb', 2111.260793948532, 'test_4_levels/LOD_Tile_+019_+015.001_medium_0.glb', 1422.9218179039933, 'test_4_levels/LOD_Tile_+019_+015.001_high.glb', 46.243865814916205);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+013.001_medium_1.glb', 2111.522762455931, 'test_4_levels/LOD_Tile_+003_+013.001_medium_0.glb', 1423.4457549187916, 'test_4_levels/LOD_Tile_+003_+013.001_high.glb', 47.291739844512975);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+013_medium_1.glb', 2111.342640155274, 'test_4_levels/LOD_Tile_+003_+013_medium_0.glb', 1423.0855103174767, 'test_4_levels/LOD_Tile_+003_+013_high.glb', 46.57125064188317);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+016.002_medium_1.glb', 2111.802768897896, 'test_4_levels/LOD_Tile_+007_+016.002_medium_0.glb', 1424.0057678027215, 'test_4_levels/LOD_Tile_+007_+016.002_high.glb', 48.41176561237247);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+012.001_medium_1.glb', 2111.645439631039, 'test_4_levels/LOD_Tile_+019_+012.001_medium_0.glb', 1423.6911092690082, 'test_4_levels/LOD_Tile_+019_+012.001_high.glb', 47.78244854494617);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+016.001_medium_1.glb', 2111.062634179815, 'test_4_levels/LOD_Tile_+007_+016.001_medium_0.glb', 1422.5254983665598, 'test_4_levels/LOD_Tile_+007_+016.001_high.glb', 45.45122674004908);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+007_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+007_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+012.002_medium_1.glb', 2111.2199634466715, 'test_4_levels/LOD_Tile_+019_+012.002_medium_0.glb', 1422.8401569002729, 'test_4_levels/LOD_Tile_+019_+012.002_high.glb', 46.08054380747538);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+013.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+013.004_medium_1.glb', 2099.9645008060247, 'test_4_levels/LOD_Tile_+015_+013.004_medium_0.glb', 1400.329231618979, 'test_4_levels/LOD_Tile_+015_+013.004_high.glb', 1.0586932448879087);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+013_medium_1.glb', 2100.0594735684695, 'test_4_levels/LOD_Tile_+015_+013_medium_0.glb', 1400.5191771438685, 'test_4_levels/LOD_Tile_+015_+013_high.glb', 1.4385842946665564);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+020.001_medium_1.glb', 2111.795052416345, 'test_4_levels/LOD_Tile_+011_+020.001_medium_0.glb', 1423.9903348396194, 'test_4_levels/LOD_Tile_+011_+020.001_high.glb', 48.380899686168476);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+029_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+029_medium_1.glb', 2108.5630208429616, 'test_4_levels/LOD_Tile_+011_+029_medium_0.glb', 1417.5262716928523, 'test_4_levels/LOD_Tile_+011_+029_high.glb', 35.45277339263447);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+013.003_medium_1.glb', 2104.544386786892, 'test_4_levels/LOD_Tile_+015_+013.003_medium_0.glb', 1409.4890035807136, 'test_4_levels/LOD_Tile_+015_+013.003_high.glb', 19.37823716835691);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+020.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+020.002_medium_1.glb', 2111.0703501948597, 'test_4_levels/LOD_Tile_+011_+020.002_medium_0.glb', 1422.540930396649, 'test_4_levels/LOD_Tile_+011_+020.002_high.glb', 45.482090800227674);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+006_medium_1.glb', 2110.69211104407, 'test_4_levels/LOD_Tile_+012_+006_medium_0.glb', 1421.7844520950691, 'test_4_levels/LOD_Tile_+012_+006_high.glb', 43.96913419706789);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+013.001_medium_1.glb', 2113.0097085309876, 'test_4_levels/LOD_Tile_+015_+013.001_medium_0.glb', 1426.4196470689046, 'test_4_levels/LOD_Tile_+015_+013.001_high.glb', 53.23952414473873);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+013.002_medium_1.glb', 2116.224058114151, 'test_4_levels/LOD_Tile_+015_+013.002_medium_0.glb', 1432.8483462352317, 'test_4_levels/LOD_Tile_+015_+013.002_high.glb', 66.0969224773931);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+003.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+003.001_medium_1.glb', 2113.9962584347268, 'test_4_levels/LOD_Tile_+016_+003.001_medium_0.glb', 1428.3927468763836, 'test_4_levels/LOD_Tile_+016_+003.001_high.glb', 57.185723759696714);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+003.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+003.002_medium_1.glb', 2116.4696970332416, 'test_4_levels/LOD_Tile_+016_+003.002_medium_0.glb', 1433.339624073413, 'test_4_levels/LOD_Tile_+016_+003.002_high.glb', 67.07947815375579);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+020_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+020_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+020_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+003_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+003_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+003_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+020.001_medium_1.glb', 2111.511031220724, 'test_4_levels/LOD_Tile_+007_+020.001_medium_0.glb', 1423.4222924483772, 'test_4_levels/LOD_Tile_+007_+020.001_high.glb', 47.24481490368401);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+020_medium_1.glb', 2111.354371390481, 'test_4_levels/LOD_Tile_+007_+020_medium_0.glb', 1423.1089727878912, 'test_4_levels/LOD_Tile_+007_+020_high.glb', 46.618175582712134);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+016.002_medium_1.glb', 2111.4959975870584, 'test_4_levels/LOD_Tile_+011_+016.002_medium_0.glb', 1423.3922251810461, 'test_4_levels/LOD_Tile_+011_+016.002_high.glb', 47.18468036902165);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+018_medium_1.glb', 2109.583275830557, 'test_4_levels/LOD_Tile_+007_+018_medium_0.glb', 1419.5667816680432, 'test_4_levels/LOD_Tile_+007_+018_high.glb', 39.53379334301588);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+011_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+011_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+016.001_medium_1.glb', 2111.3694054906528, 'test_4_levels/LOD_Tile_+011_+016.001_medium_0.glb', 1423.1390409882351, 'test_4_levels/LOD_Tile_+011_+016.001_high.glb', 46.678311983399894);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+008_medium_1.glb', 2109.7300839796803, 'test_4_levels/LOD_Tile_+004_+008_medium_0.glb', 1419.8603979662905, 'test_4_levels/LOD_Tile_+004_+008_high.glb', 40.12102593951064);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+007_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+007_+018.001_medium_1.glb', 2113.282126780648, 'test_4_levels/LOD_Tile_+007_+018.001_medium_0.glb', 1426.9644835682252, 'test_4_levels/LOD_Tile_+007_+018.001_high.glb', 54.32919714338026);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+008.001_medium_1.glb', 2113.135318631524, 'test_4_levels/LOD_Tile_+004_+008.001_medium_0.glb', 1426.6708672699779, 'test_4_levels/LOD_Tile_+004_+008.001_high.glb', 53.74196454688551);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+014.001_medium_1.glb', 2111.830644051884, 'test_4_levels/LOD_Tile_+015_+014.001_medium_0.glb', 1424.0615181106975, 'test_4_levels/LOD_Tile_+015_+014.001_high.glb', 48.52326622832481);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+014_medium_1.glb', 2111.03474456413, 'test_4_levels/LOD_Tile_+015_+014_medium_0.glb', 1422.4697191351897, 'test_4_levels/LOD_Tile_+015_+014_high.glb', 45.33966827730923);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+004.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+004.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+004.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+004.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+004_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+004_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+004_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+004.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+004.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+004.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+004.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+009_medium_1.glb', 2099.821522207536, 'test_4_levels/LOD_Tile_+015_+009_medium_0.glb', 1400.0432744220016, 'test_4_levels/LOD_Tile_+015_+009_high.glb', 0.4867788509328238);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+011.002_medium_1.glb', 2112.37659083632, 'test_4_levels/LOD_Tile_+011_+011.002_medium_0.glb', 1425.1534116795697, 'test_4_levels/LOD_Tile_+011_+011.002_high.glb', 50.70705336606889);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+011.001_medium_1.glb', 2114.054891751952, 'test_4_levels/LOD_Tile_+011_+011.001_medium_0.glb', 1428.5100135108335, 'test_4_levels/LOD_Tile_+011_+011.001_high.glb', 57.420257028596765);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+009.001_medium_1.glb', 2117.4147255392154, 'test_4_levels/LOD_Tile_+015_+009.001_medium_0.glb', 1435.2296810853602, 'test_4_levels/LOD_Tile_+015_+009.001_high.glb', 70.85959217764993);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+009.002_medium_1.glb', 2113.8961107173313, 'test_4_levels/LOD_Tile_+015_+009.002_medium_0.glb', 1428.192451441592, 'test_4_levels/LOD_Tile_+015_+009.002_high.glb', 56.785132890113886);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+011_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+011_+011_medium_1.glb', 2114.054891751952, 'test_4_levels/LOD_Tile_+011_+011_medium_0.glb', 1428.5100135108335, 'test_4_levels/LOD_Tile_+011_+011_high.glb', 57.420257028596765);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+022.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+022.002_medium_1.glb', 2111.68824905284, 'test_4_levels/LOD_Tile_+008_+022.002_medium_0.glb', 1423.77672811261, 'test_4_levels/LOD_Tile_+008_+022.002_high.glb', 47.95368623214985);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+022.001_medium_1.glb', 2111.1771535583644, 'test_4_levels/LOD_Tile_+008_+022.001_medium_0.glb', 1422.7545371236583, 'test_4_levels/LOD_Tile_+008_+022.001_high.glb', 45.909304254246294);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+010.001_medium_1.glb', 2110.106131017127, 'test_4_levels/LOD_Tile_+000_+010.001_medium_0.glb', 1420.6124920411842, 'test_4_levels/LOD_Tile_+000_+010.001_high.glb', 41.62521408929804);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+010_medium_1.glb', 2112.7592720605835, 'test_4_levels/LOD_Tile_+000_+010_medium_0.glb', 1425.9187741280969, 'test_4_levels/LOD_Tile_+000_+010_high.glb', 52.23777826312351);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+026_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+026_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+026_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+026_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+022_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+008_+022_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+008_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+023.001_medium_1.glb', 2112.4538676133543, 'test_4_levels/LOD_Tile_+012_+023.001_medium_0.glb', 1425.307965233638, 'test_4_levels/LOD_Tile_+012_+023.001_high.glb', 51.016160474205776);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+023_medium_1.glb', 2110.411535464357, 'test_4_levels/LOD_Tile_+012_+023_medium_0.glb', 1421.223300935643, 'test_4_levels/LOD_Tile_+012_+023_high.glb', 42.846831878215774);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+015.001_medium_1.glb', 2113.0626262124006, 'test_4_levels/LOD_Tile_+004_+015.001_medium_0.glb', 1426.525482431731, 'test_4_levels/LOD_Tile_+004_+015.001_high.glb', 53.45119487039161);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+004_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+004_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+015.002_medium_1.glb', 2109.802776398804, 'test_4_levels/LOD_Tile_+004_+015.002_medium_0.glb', 1420.0057828045374, 'test_4_levels/LOD_Tile_+004_+015.002_high.glb', 40.41179561600453);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+021_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+021_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+021_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+019.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+019.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+019.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+021.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+021.001_medium_1.glb', 2111.1342088497217, 'test_4_levels/LOD_Tile_+016_+021.001_medium_0.glb', 1422.668647706373, 'test_4_levels/LOD_Tile_+016_+021.001_high.glb', 45.737525419675514);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+025_medium_1.glb', 2103.1771275812343, 'test_4_levels/LOD_Tile_+008_+025_medium_0.glb', 1406.7544851693983, 'test_4_levels/LOD_Tile_+008_+025_high.glb', 13.909200345726095);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+021.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+021.002_medium_1.glb', 2111.731172768697, 'test_4_levels/LOD_Tile_+016_+021.002_medium_0.glb', 1423.8625755443238, 'test_4_levels/LOD_Tile_+016_+021.002_high.glb', 48.12538109557746);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+025.001_medium_1.glb', 2104.937602657573, 'test_4_levels/LOD_Tile_+008_+025.001_medium_0.glb', 1410.275435322075, 'test_4_levels/LOD_Tile_+008_+025.001_high.glb', 20.951100651079795);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+019_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+019_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+019_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006.014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006.014_medium_1.glb', 2099.939415826522, 'test_4_levels/LOD_Tile_+019_+006.014_medium_0.glb', 1400.279061659973, 'test_4_levels/LOD_Tile_+019_+006.014_high.glb', 0.9583533268756121);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006.015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006.015_medium_1.glb', 2099.7782570090303, 'test_4_levels/LOD_Tile_+019_+006.015_medium_0.glb', 1399.95674402499, 'test_4_levels/LOD_Tile_+019_+006.015_high.glb', 0.3137180569096436);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006.006_medium_1.glb', 2100.1854111564644, 'test_4_levels/LOD_Tile_+019_+006.006_medium_0.glb', 1400.7710523198587, 'test_4_levels/LOD_Tile_+019_+006.006_high.glb', 1.9423346466467994);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006.005_medium_1.glb', 2099.8456536480576, 'test_4_levels/LOD_Tile_+019_+006.005_medium_0.glb', 1400.091537303045, 'test_4_levels/LOD_Tile_+019_+006.005_high.glb', 0.5833046130197852);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006.004_medium_1.glb', 2099.9967755814087, 'test_4_levels/LOD_Tile_+019_+006.004_medium_0.glb', 1400.393781169747, 'test_4_levels/LOD_Tile_+019_+006.004_high.glb', 1.1877923464233315);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+007_medium_1.glb', 2115.9921573405895, 'test_4_levels/LOD_Tile_+003_+007_medium_0.glb', 1432.3845446881085, 'test_4_levels/LOD_Tile_+003_+007_high.glb', 65.16931938314643);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006.001_medium_1.glb', 2102.538756558549, 'test_4_levels/LOD_Tile_+019_+006.001_medium_0.glb', 1405.4777431240273, 'test_4_levels/LOD_Tile_+019_+006.001_high.glb', 11.35571625498424);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006.002_medium_1.glb', 2120.3266460526556, 'test_4_levels/LOD_Tile_+019_+006.002_medium_0.glb', 1441.0535221122411, 'test_4_levels/LOD_Tile_+019_+006.002_high.glb', 82.50727423141191);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+012.001_medium_1.glb', 2110.9997080711487, 'test_4_levels/LOD_Tile_+004_+012.001_medium_0.glb', 1422.3996461492268, 'test_4_levels/LOD_Tile_+004_+012.001_high.glb', 45.199522305383404);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+012_medium_1.glb', 2111.8656945400558, 'test_4_levels/LOD_Tile_+004_+012_medium_0.glb', 1424.1316190870416, 'test_4_levels/LOD_Tile_+004_+012_high.glb', 48.663468181012746);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+024_medium_1.glb', 2111.903607044691, 'test_4_levels/LOD_Tile_+012_+024_medium_0.glb', 1424.2074440963115, 'test_4_levels/LOD_Tile_+012_+024_high.glb', 48.8151181995529);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+024.001_medium_1.glb', 2110.9617960330197, 'test_4_levels/LOD_Tile_+012_+024.001_medium_0.glb', 1422.3238220729695, 'test_4_levels/LOD_Tile_+012_+024.001_high.glb', 45.047874152868644);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+013_medium_1.glb', 2112.150342253706, 'test_4_levels/LOD_Tile_+008_+013_medium_0.glb', 1424.7009145143425, 'test_4_levels/LOD_Tile_+008_+013_high.glb', 49.80205903561449);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+013.001_medium_1.glb', 2110.7150608240045, 'test_4_levels/LOD_Tile_+008_+013.001_medium_0.glb', 1421.8303516549388, 'test_4_levels/LOD_Tile_+008_+013.001_high.glb', 44.060933316807066);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+007_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+007_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+007_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+007.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+007.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+007.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+017.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+017.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+017.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+012.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+012.004_medium_1.glb', 2106.4454057650737, 'test_4_levels/LOD_Tile_+012_+012.004_medium_0.glb', 1413.2910415370768, 'test_4_levels/LOD_Tile_+012_+012.004_high.glb', 26.982313081083344);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+012.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+012.003_medium_1.glb', 2106.837895751872, 'test_4_levels/LOD_Tile_+012_+012.003_medium_0.glb', 1414.076021510674, 'test_4_levels/LOD_Tile_+012_+012.003_high.glb', 28.552273028277938);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+012.001_medium_1.glb', 2112.0875444342864, 'test_4_levels/LOD_Tile_+012_+012.001_medium_0.glb', 1424.5753188755027, 'test_4_levels/LOD_Tile_+012_+012.001_high.glb', 49.55086775793486);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+012.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+012.005_medium_1.glb', 2099.951374716828, 'test_4_levels/LOD_Tile_+012_+012.005_medium_0.glb', 1400.302979440586, 'test_4_levels/LOD_Tile_+012_+012.005_high.glb', 1.006188888101626);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+012.002_medium_1.glb', 2106.5165605792645, 'test_4_levels/LOD_Tile_+012_+012.002_medium_0.glb', 1413.4333511654584, 'test_4_levels/LOD_Tile_+012_+012.002_high.glb', 27.26693233784637);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+012.010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+012.010_medium_1.glb', 2099.7562756962798, 'test_4_levels/LOD_Tile_+012_+012.010_medium_0.glb', 1399.9127813994896, 'test_4_levels/LOD_Tile_+012_+012.010_high.glb', 0.22579280590872466);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+017.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+017.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+017.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+017_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+017_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+017_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+010.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+010.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+010.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+009_medium_1.glb', 2112.4251378197314, 'test_4_levels/LOD_Tile_+003_+009_medium_0.glb', 1425.250505646392, 'test_4_levels/LOD_Tile_+003_+009_high.glb', 50.90124129971371);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+009.001_medium_1.glb', 2110.4402647914735, 'test_4_levels/LOD_Tile_+003_+009.001_medium_0.glb', 1421.2807595898764, 'test_4_levels/LOD_Tile_+003_+009.001_high.glb', 42.96174918668243);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+014_medium_1.glb', 2099.754667182382, 'test_4_levels/LOD_Tile_+008_+014_medium_0.glb', 1399.9095643716935, 'test_4_levels/LOD_Tile_+008_+014_high.glb', 0.21935875031647592);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+010.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+010.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+010.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+014.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+014.003_medium_1.glb', 2099.793191276843, 'test_4_levels/LOD_Tile_+008_+014.003_medium_0.glb', 1399.9866125606156, 'test_4_levels/LOD_Tile_+008_+014.003_high.glb', 0.37345512816099485);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+010_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+010_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+010_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+014.001_medium_1.glb', 2110.8134642741543, 'test_4_levels/LOD_Tile_+008_+014.001_medium_0.glb', 1422.0271585552377, 'test_4_levels/LOD_Tile_+008_+014.001_high.glb', 44.454547117405134);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+015.003_medium_1.glb', 2099.9358423878734, 'test_4_levels/LOD_Tile_+012_+015.003_medium_0.glb', 1400.2719147826765, 'test_4_levels/LOD_Tile_+012_+015.003_high.glb', 0.9440595722826233);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008.008_medium_1.glb', 2099.95301215412, 'test_4_levels/LOD_Tile_+019_+008.008_medium_0.glb', 1400.3062543151696, 'test_4_levels/LOD_Tile_+019_+008.008_high.glb', 1.0127386372689096);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008.003_medium_1.glb', 2101.002181671853, 'test_4_levels/LOD_Tile_+019_+008.003_medium_0.glb', 1402.4045933506363, 'test_4_levels/LOD_Tile_+019_+008.003_high.glb', 5.209416708202285);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+014.002_medium_1.glb', 2112.0519383370506, 'test_4_levels/LOD_Tile_+008_+014.002_medium_0.glb', 1424.5041066810306, 'test_4_levels/LOD_Tile_+008_+014.002_high.glb', 49.40844336899101);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+015.001_medium_1.glb', 2109.292179133111, 'test_4_levels/LOD_Tile_+012_+015.001_medium_0.glb', 1418.9845882731513, 'test_4_levels/LOD_Tile_+012_+015.001_high.glb', 38.36940655323222);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008.006_medium_1.glb', 2099.977940387489, 'test_4_levels/LOD_Tile_+019_+008.006_medium_0.glb', 1400.356110781908, 'test_4_levels/LOD_Tile_+019_+008.006_high.glb', 1.112451570745535);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+015.002_medium_1.glb', 2113.573223478094, 'test_4_levels/LOD_Tile_+012_+015.002_medium_0.glb', 1427.546676963117, 'test_4_levels/LOD_Tile_+012_+015.002_high.glb', 55.493583933163926);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008.011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008.011_medium_1.glb', 2099.9738971769457, 'test_4_levels/LOD_Tile_+019_+008.011_medium_0.glb', 1400.3480243608205, 'test_4_levels/LOD_Tile_+019_+008.011_high.glb', 1.096278728570935);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008.001_medium_1.glb', 2119.974680539551, 'test_4_levels/LOD_Tile_+019_+008.001_medium_0.glb', 1440.3495910860318, 'test_4_levels/LOD_Tile_+019_+008.001_high.glb', 81.09941217899326);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008.002_medium_1.glb', 2119.3710077927426, 'test_4_levels/LOD_Tile_+019_+008.002_medium_0.glb', 1439.1422455924148, 'test_4_levels/LOD_Tile_+019_+008.002_high.glb', 78.68472119175948);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008.005_medium_1.glb', 2100.671663321727, 'test_4_levels/LOD_Tile_+019_+008.005_medium_0.glb', 1401.7435566503839, 'test_4_levels/LOD_Tile_+019_+008.005_high.glb', 3.8873433076972224);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+013.003_medium_1.glb', 2100.05403503743, 'test_4_levels/LOD_Tile_+024_+013.003_medium_0.glb', 1400.50830008179, 'test_4_levels/LOD_Tile_+024_+013.003_high.glb', 1.4168301705092372);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+013.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+013.004_medium_1.glb', 2100.016592771197, 'test_4_levels/LOD_Tile_+024_+013.004_medium_0.glb', 1400.4334155493232, 'test_4_levels/LOD_Tile_+024_+013.004_high.glb', 1.2670611055760943);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+008_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+008_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+013.002_medium_1.glb', 2108.829303134588, 'test_4_levels/LOD_Tile_+024_+013.002_medium_0.glb', 1418.0588362761052, 'test_4_levels/LOD_Tile_+024_+013.002_high.glb', 36.517902559140026);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+016.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+016.003_medium_1.glb', 2099.759479195392, 'test_4_levels/LOD_Tile_+020_+016.003_medium_0.glb', 1399.9191883977135, 'test_4_levels/LOD_Tile_+020_+016.003_high.glb', 0.2386068023565124);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+013.001_medium_1.glb', 2114.036099476617, 'test_4_levels/LOD_Tile_+024_+013.001_medium_0.glb', 1428.4724289601631, 'test_4_levels/LOD_Tile_+024_+013.001_high.glb', 57.34508792725612);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+016.001_medium_1.glb', 2111.512996145474, 'test_4_levels/LOD_Tile_+020_+016.001_medium_0.glb', 1423.4262222978775, 'test_4_levels/LOD_Tile_+020_+016.001_high.glb', 47.25267460268475);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+014.001_medium_1.glb', 2115.1541034059514, 'test_4_levels/LOD_Tile_+024_+014.001_medium_0.glb', 1430.7084368188323, 'test_4_levels/LOD_Tile_+024_+014.001_high.glb', 61.81710364459409);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+014.002_medium_1.glb', 2107.7112996717597, 'test_4_levels/LOD_Tile_+024_+014.002_medium_0.glb', 1415.822829350449, 'test_4_levels/LOD_Tile_+024_+014.002_high.glb', 32.04588870782745);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+011.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+011.004_medium_1.glb', 2100.030758236543, 'test_4_levels/LOD_Tile_+020_+011.004_medium_0.glb', 1400.4617464800162, 'test_4_levels/LOD_Tile_+020_+011.004_high.glb', 1.323722966962009);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+011.002_medium_1.glb', 2111.331820473476, 'test_4_levels/LOD_Tile_+020_+011.002_medium_0.glb', 1423.0638709538819, 'test_4_levels/LOD_Tile_+020_+011.002_high.glb', 46.5279719146932);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+016.002_medium_1.glb', 2111.352406932237, 'test_4_levels/LOD_Tile_+020_+016.002_medium_0.glb', 1423.1050438714035, 'test_4_levels/LOD_Tile_+020_+016.002_high.glb', 46.6103177497368);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+011.001_medium_1.glb', 2111.5335821377284, 'test_4_levels/LOD_Tile_+020_+011.001_medium_0.glb', 1423.4673942823867, 'test_4_levels/LOD_Tile_+020_+011.001_high.glb', 47.335018571702946);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+018.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+018.003_medium_1.glb', 2099.770654821535, 'test_4_levels/LOD_Tile_+020_+018.003_medium_0.glb', 1399.9415396499999, 'test_4_levels/LOD_Tile_+020_+018.003_high.glb', 0.2833093069295724);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+018.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+018.006_medium_1.glb', 2100.4730337811147, 'test_4_levels/LOD_Tile_+020_+018.006_medium_0.glb', 1401.3462975691593, 'test_4_levels/LOD_Tile_+020_+018.006_high.glb', 3.0928251452484803);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+008.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+008.003_medium_1.glb', 2099.8317158378104, 'test_4_levels/LOD_Tile_+023_+008.003_medium_0.glb', 1400.0636616825507, 'test_4_levels/LOD_Tile_+023_+008.003_high.glb', 0.5275533720309176);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+008.001_medium_1.glb', 2110.577477837971, 'test_4_levels/LOD_Tile_+023_+008.001_medium_0.glb', 1421.5551856828713, 'test_4_levels/LOD_Tile_+023_+008.001_high.glb', 43.51060137267214);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+018.001_medium_1.glb', 2112.9877701368214, 'test_4_levels/LOD_Tile_+020_+018.001_medium_0.glb', 1426.3757702805726, 'test_4_levels/LOD_Tile_+020_+018.001_high.glb', 53.15177056807496);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+008.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+008.004_medium_1.glb', 2099.863406547243, 'test_4_levels/LOD_Tile_+023_+008.004_medium_0.glb', 1400.1270431014157, 'test_4_levels/LOD_Tile_+023_+008.004_high.glb', 0.6543162097608021);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+018.002_medium_1.glb', 2109.8776329408893, 'test_4_levels/LOD_Tile_+020_+018.002_medium_0.glb', 1420.1554958887084, 'test_4_levels/LOD_Tile_+020_+018.002_high.glb', 40.71122178434659);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+008.002_medium_1.glb', 2112.28792523974, 'test_4_levels/LOD_Tile_+023_+008.002_medium_0.glb', 1424.97608048641, 'test_4_levels/LOD_Tile_+023_+008.002_high.glb', 50.3523909797494);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+018_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+018_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+018_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+008_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+008_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+011.003_medium_1.glb', 2099.911995982732, 'test_4_levels/LOD_Tile_+016_+011.003_medium_0.glb', 1400.224221972394, 'test_4_levels/LOD_Tile_+016_+011.003_high.glb', 0.8486739517173741);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+011.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+011.004_medium_1.glb', 2100.442596107741, 'test_4_levels/LOD_Tile_+016_+011.004_medium_0.glb', 1401.2854222224119, 'test_4_levels/LOD_Tile_+016_+011.004_high.glb', 2.971074451753161);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+011.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+011.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+011.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+008_medium_1.glb', 2110.152456963802, 'test_4_levels/LOD_Tile_+003_+008_medium_0.glb', 1420.705143934533, 'test_4_levels/LOD_Tile_+003_+008_high.glb', 41.81051787599545);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+015.001_medium_1.glb', 2110.7759935510335, 'test_4_levels/LOD_Tile_+008_+015.001_medium_0.glb', 1421.9522171089964, 'test_4_levels/LOD_Tile_+008_+015.001_high.glb', 44.30466422492236);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+015.002_medium_1.glb', 2112.0894095266776, 'test_4_levels/LOD_Tile_+008_+015.002_medium_0.glb', 1424.579049060285, 'test_4_levels/LOD_Tile_+008_+015.002_high.glb', 49.55832812749919);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+011.002_medium_1.glb', 2122.940059881772, 'test_4_levels/LOD_Tile_+016_+011.002_medium_0.glb', 1446.2803497704733, 'test_4_levels/LOD_Tile_+016_+011.002_high.glb', 92.96092954787649);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+003_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+003_+008.001_medium_1.glb', 2112.712945647403, 'test_4_levels/LOD_Tile_+003_+008.001_medium_0.glb', 1425.8261213017356, 'test_4_levels/LOD_Tile_+003_+008.001_high.glb', 52.0524726104007);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+011_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+011_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+011_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.018_medium_1.glb', 2100.6059684978677, 'test_4_levels/LOD_Tile_+019_+009.018_medium_0.glb', 1401.6121670026653, 'test_4_levels/LOD_Tile_+019_+009.018_high.glb', 3.624564012260086);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.007_medium_1.glb', 2099.970537398206, 'test_4_levels/LOD_Tile_+019_+009.007_medium_0.glb', 1400.3413048033417, 'test_4_levels/LOD_Tile_+019_+009.007_high.glb', 1.0828396136128795);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.004_medium_1.glb', 2100.182919546044, 'test_4_levels/LOD_Tile_+019_+009.004_medium_0.glb', 1400.7660690990178, 'test_4_levels/LOD_Tile_+019_+009.004_high.glb', 1.9323682049651867);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.013_medium_1.glb', 2100.3264532870903, 'test_4_levels/LOD_Tile_+019_+009.013_medium_0.glb', 1401.0531365811105, 'test_4_levels/LOD_Tile_+019_+009.013_high.glb', 2.5065031691507755);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+008_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+008_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.012_medium_1.glb', 2100.1668889883067, 'test_4_levels/LOD_Tile_+019_+009.012_medium_0.glb', 1400.7340079835426, 'test_4_levels/LOD_Tile_+019_+009.012_high.glb', 1.8682459740149422);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.006_medium_1.glb', 2100.137198658107, 'test_4_levels/LOD_Tile_+019_+009.006_medium_0.glb', 1400.6746273231433, 'test_4_levels/LOD_Tile_+019_+009.006_high.glb', 1.7494846532164854);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.016_medium_1.glb', 2100.0818392824526, 'test_4_levels/LOD_Tile_+019_+009.016_medium_0.glb', 1400.5639085718353, 'test_4_levels/LOD_Tile_+019_+009.016_high.glb', 1.5280471506001936);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.017_medium_1.glb', 2100.1458402217518, 'test_4_levels/LOD_Tile_+019_+009.017_medium_0.glb', 1400.6919104504332, 'test_4_levels/LOD_Tile_+019_+009.017_high.glb', 1.7840509077961884);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.015_medium_1.glb', 2100.401587400455, 'test_4_levels/LOD_Tile_+019_+009.015_medium_0.glb', 1401.2034048078392, 'test_4_levels/LOD_Tile_+019_+009.015_high.glb', 2.807039622608086);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.003_medium_1.glb', 2101.255878555144, 'test_4_levels/LOD_Tile_+019_+009.003_medium_0.glb', 1402.9119871172174, 'test_4_levels/LOD_Tile_+019_+009.003_high.glb', 6.224204241364551);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.014_medium_1.glb', 2100.080002646949, 'test_4_levels/LOD_Tile_+019_+009.014_medium_0.glb', 1400.560235300828, 'test_4_levels/LOD_Tile_+019_+009.014_high.glb', 1.5207006085854944);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+009.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+009.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009.001_medium_1.glb', 2121.5199618342745, 'test_4_levels/LOD_Tile_+019_+009.001_medium_0.glb', 1443.4401536754783, 'test_4_levels/LOD_Tile_+019_+009.001_high.glb', 87.28053735788605);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+012.002_medium_1.glb', 2108.7029956070564, 'test_4_levels/LOD_Tile_+008_+012.002_medium_0.glb', 1417.8062212210425, 'test_4_levels/LOD_Tile_+008_+012.002_high.glb', 36.01267244901459);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+012.001_medium_1.glb', 2114.162407004148, 'test_4_levels/LOD_Tile_+008_+012.001_medium_0.glb', 1428.7250440152259, 'test_4_levels/LOD_Tile_+008_+012.001_high.glb', 57.85031803738156);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+014.001_medium_1.glb', 2111.982093472693, 'test_4_levels/LOD_Tile_+012_+014.001_medium_0.glb', 1424.364416952316, 'test_4_levels/LOD_Tile_+012_+014.001_high.glb', 49.12906391156181);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+014_medium_1.glb', 2110.8833091385113, 'test_4_levels/LOD_Tile_+012_+014_medium_0.glb', 1422.1668482839523, 'test_4_levels/LOD_Tile_+012_+014_high.glb', 44.73392657483434);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+008_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+008_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+013.003_medium_1.glb', 2099.833452640955, 'test_4_levels/LOD_Tile_+012_+013.003_medium_0.glb', 1400.0671352888398, 'test_4_levels/LOD_Tile_+012_+013.003_high.glb', 0.5345005846092071);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+016.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+016.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+016.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+006.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+006.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+006.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+006_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+006_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+006_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+016.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+016.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+016.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+007.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+007.004_medium_1.glb', 2100.1275107207166, 'test_4_levels/LOD_Tile_+019_+007.004_medium_0.glb', 1400.6552514483633, 'test_4_levels/LOD_Tile_+019_+007.004_high.glb', 1.7107329036560939);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+007.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+007.003_medium_1.glb', 2099.8513622862743, 'test_4_levels/LOD_Tile_+019_+007.003_medium_0.glb', 1400.1029545794781, 'test_4_levels/LOD_Tile_+019_+007.003_high.glb', 0.6061391658858954);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+013.001_medium_1.glb', 2110.036912204293, 'test_4_levels/LOD_Tile_+012_+013.001_medium_0.glb', 1420.4740544155156, 'test_4_levels/LOD_Tile_+012_+013.001_high.glb', 41.34833883796072);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+016_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+016_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+016_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+013.002_medium_1.glb', 2112.8284904069114, 'test_4_levels/LOD_Tile_+012_+013.002_medium_0.glb', 1426.057210820753, 'test_4_levels/LOD_Tile_+012_+013.002_high.glb', 52.51465164843543);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+007.001_medium_1.glb', 2119.3549525101685, 'test_4_levels/LOD_Tile_+019_+007.001_medium_0.glb', 1439.1101350272666, 'test_4_levels/LOD_Tile_+019_+007.001_high.glb', 78.62050006146283);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+007.002_medium_1.glb', 2103.5104505675426, 'test_4_levels/LOD_Tile_+019_+007.002_medium_0.glb', 1407.4211311420145, 'test_4_levels/LOD_Tile_+019_+007.002_high.glb', 15.24249229095871);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+020.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+020.003_medium_1.glb', 2099.9397148570924, 'test_4_levels/LOD_Tile_+016_+020.003_medium_0.glb', 1400.279659721115, 'test_4_levels/LOD_Tile_+016_+020.003_high.glb', 0.959549449159438);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+019_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+019_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+019_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+019_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+020.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+020.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+020.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+024_medium_1.glb', 2111.62179242411, 'test_4_levels/LOD_Tile_+008_+024_medium_0.glb', 1423.6438148551495, 'test_4_levels/LOD_Tile_+008_+024_high.glb', 47.687859717228335);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+024.001_medium_1.glb', 2111.243610187095, 'test_4_levels/LOD_Tile_+008_+024.001_medium_0.glb', 1422.8874503811192, 'test_4_levels/LOD_Tile_+008_+024.001_high.glb', 46.17513076916781);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+020.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+020.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+020.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+020.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+020_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+020_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+020_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+025_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+012_+025_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+012_+025_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+025.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+025.002_medium_1.glb', 2111.779762204186, 'test_4_levels/LOD_Tile_+012_+025.002_medium_0.glb', 1423.959754415302, 'test_4_levels/LOD_Tile_+012_+025.002_high.glb', 48.31973883753403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+013.001_medium_1.glb', 2110.6932502525788, 'test_4_levels/LOD_Tile_+004_+013.001_medium_0.glb', 1421.7867305120872, 'test_4_levels/LOD_Tile_+004_+013.001_high.glb', 43.973691031103925);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+025.001_medium_1.glb', 2111.085640407018, 'test_4_levels/LOD_Tile_+012_+025.001_medium_0.glb', 1422.5715108209663, 'test_4_levels/LOD_Tile_+012_+025.001_high.glb', 45.54325164886211);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+013_medium_1.glb', 2112.1721528251323, 'test_4_levels/LOD_Tile_+004_+013_medium_0.glb', 1424.744535657194, 'test_4_levels/LOD_Tile_+004_+013_high.glb', 49.889301321317625);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+008.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+008.005_medium_1.glb', 2100.363881558133, 'test_4_levels/LOD_Tile_+015_+008.005_medium_0.glb', 1401.1279931231961, 'test_4_levels/LOD_Tile_+015_+008.005_high.glb', 2.6562162533218046);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+008_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+015_+008_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+015_+008_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+008.002_medium_1.glb', 2117.9069004691096, 'test_4_levels/LOD_Tile_+015_+008.002_medium_0.glb', 1436.2140309451486, 'test_4_levels/LOD_Tile_+015_+008.002_high.glb', 72.82829189722682);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+015_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+015_+008.001_medium_1.glb', 2122.6174362186225, 'test_4_levels/LOD_Tile_+015_+008.001_medium_0.glb', 1445.6351024441751, 'test_4_levels/LOD_Tile_+015_+008.001_high.glb', 91.67043489527968);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+027.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+027.001_medium_1.glb', 2116.4512821615444, 'test_4_levels/LOD_Tile_+016_+027.001_medium_0.glb', 1433.3027943300185, 'test_4_levels/LOD_Tile_+016_+027.001_high.glb', 67.0058186669668);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+027_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+027_medium_1.glb', 2106.3745784383414, 'test_4_levels/LOD_Tile_+016_+027_medium_0.glb', 1413.1493868836121, 'test_4_levels/LOD_Tile_+016_+027_high.glb', 26.69900377415377);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+023_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+008_+023_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+008_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+023.001_medium_1.glb', 2111.638136007609, 'test_4_levels/LOD_Tile_+008_+023.001_medium_0.glb', 1423.6765020221474, 'test_4_levels/LOD_Tile_+008_+023.001_high.glb', 47.75323405122452);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+008_+023.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+008_+023.002_medium_1.glb', 2111.2272666035956, 'test_4_levels/LOD_Tile_+008_+023.002_medium_0.glb', 1422.854763214121, 'test_4_levels/LOD_Tile_+008_+023.002_high.glb', 46.109756435171626);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+018.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+018.003_medium_1.glb', 2099.940070801438, 'test_4_levels/LOD_Tile_+016_+018.003_medium_0.glb', 1400.2803716098065, 'test_4_levels/LOD_Tile_+016_+018.003_high.glb', 0.9609732265425254);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+011.001_medium_1.glb', 2110.3820368682673, 'test_4_levels/LOD_Tile_+000_+011.001_medium_0.glb', 1421.1643037434644, 'test_4_levels/LOD_Tile_+000_+011.001_high.glb', 42.72883749385827);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+000_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+000_+011_medium_1.glb', 2112.483365742937, 'test_4_levels/LOD_Tile_+000_+011_medium_0.glb', 1425.3669614928042, 'test_4_levels/LOD_Tile_+000_+011_high.glb', 51.13415299253788);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+018.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+018.005_medium_1.glb', 2100.141277323133, 'test_4_levels/LOD_Tile_+016_+018.005_medium_0.glb', 1400.682784653196, 'test_4_levels/LOD_Tile_+016_+018.005_high.glb', 1.7657993133217729);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+014.002_medium_1.glb', 2110.5410889430777, 'test_4_levels/LOD_Tile_+004_+014.002_medium_0.glb', 1421.4824078930856, 'test_4_levels/LOD_Tile_+004_+014.002_high.glb', 43.36504579310075);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+022.001_medium_1.glb', 2110.265424742228, 'test_4_levels/LOD_Tile_+012_+022.001_medium_0.glb', 1420.931079491385, 'test_4_levels/LOD_Tile_+012_+022.001_high.glb', 42.26238898969968);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+014.001_medium_1.glb', 2112.324314134633, 'test_4_levels/LOD_Tile_+004_+014.001_medium_0.glb', 1425.0488582761957, 'test_4_levels/LOD_Tile_+004_+014.001_high.glb', 50.4979465593208);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+012_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+012_+022_medium_1.glb', 2112.599977868977, 'test_4_levels/LOD_Tile_+012_+022_medium_0.glb', 1425.6001857448834, 'test_4_levels/LOD_Tile_+012_+022_high.glb', 51.60060149669647);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+018.002_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+018.002_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+018.002_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+004_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+004_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+004_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+004_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+018.001_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+018.001_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+018.001_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+019_medium_1.glb', 2099.9714909371874, 'test_4_levels/LOD_Tile_+020_+019_medium_0.glb', 1400.3432118813043, 'test_4_levels/LOD_Tile_+020_+019_high.glb', 1.0866537695382148);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+009.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+009.004_medium_1.glb', 2100.1898812203194, 'test_4_levels/LOD_Tile_+023_+009.004_medium_0.glb', 1400.779992447568, 'test_4_levels/LOD_Tile_+023_+009.004_high.glb', 1.960214902065862);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+009.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+009.003_medium_1.glb', 2100.602060574166, 'test_4_levels/LOD_Tile_+023_+009.003_medium_0.glb', 1401.6043511552614, 'test_4_levels/LOD_Tile_+023_+009.003_high.glb', 3.608932317452584);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+019.001_medium_1.glb', 2110.781944306046, 'test_4_levels/LOD_Tile_+020_+019.001_medium_0.glb', 1421.9641186190217, 'test_4_levels/LOD_Tile_+020_+019.001_high.glb', 44.32846724497304);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+019.002_medium_1.glb', 2112.0834583051587, 'test_4_levels/LOD_Tile_+020_+019.002_medium_0.glb', 1424.5671466172466, 'test_4_levels/LOD_Tile_+020_+019.002_high.glb', 49.53452324142311);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+009_medium_1.glb', 2100.1071948356393, 'test_4_levels/LOD_Tile_+023_+009_medium_0.glb', 1400.6146196782086, 'test_4_levels/LOD_Tile_+023_+009_high.glb', 1.6294693633466852);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+009.002_medium_1.glb', 2110.7394054579286, 'test_4_levels/LOD_Tile_+023_+009.002_medium_0.glb', 1421.879040922787, 'test_4_levels/LOD_Tile_+023_+009.002_high.glb', 44.15831185250355);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+010.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+010.004_medium_1.glb', 2100.5950844381937, 'test_4_levels/LOD_Tile_+020_+010.004_medium_0.glb', 1401.5903988833174, 'test_4_levels/LOD_Tile_+020_+010.004_high.glb', 3.5810277735643914);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+010.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+010.003_medium_1.glb', 2100.478043592818, 'test_4_levels/LOD_Tile_+020_+010.003_medium_0.glb', 1401.356317192565, 'test_4_levels/LOD_Tile_+020_+010.003_high.glb', 3.112864392059721);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+009.001_medium_1.glb', 2112.125997619782, 'test_4_levels/LOD_Tile_+023_+009.001_medium_0.glb', 1424.6522252464943, 'test_4_levels/LOD_Tile_+023_+009.001_high.glb', 49.704680499918);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+012.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+012.004_medium_1.glb', 2099.8698984496227, 'test_4_levels/LOD_Tile_+024_+012.004_medium_0.glb', 1400.140026906175, 'test_4_levels/LOD_Tile_+024_+012.004_high.glb', 0.6802838192798664);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+010.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+010.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+010.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+010.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+010.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+010.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+016_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+016_+018_medium_1.glb', 2123.165554123616, 'test_4_levels/LOD_Tile_+016_+018_medium_0.glb', 1446.7313382541618, 'test_4_levels/LOD_Tile_+016_+018_high.glb', 93.86290651525299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+007.002_medium_1.glb', 2109.972107008045, 'test_4_levels/LOD_Tile_+023_+007.002_medium_0.glb', 1420.3444440230194, 'test_4_levels/LOD_Tile_+023_+007.002_high.glb', 41.089118052968594);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+012.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+012.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+012.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+012.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+012.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+023_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+023_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+023_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+023_+007.001_medium_1.glb', 2112.8932956031595, 'test_4_levels/LOD_Tile_+023_+007.001_medium_0.glb', 1426.186821213249, 'test_4_levels/LOD_Tile_+023_+007.001_high.glb', 52.77387243342755);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+017.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+017.003_medium_1.glb', 2101.0955454538935, 'test_4_levels/LOD_Tile_+020_+017.003_medium_0.glb', 1402.5913209147168, 'test_4_levels/LOD_Tile_+020_+017.003_high.glb', 5.582871836363281);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+024_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+024_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+024_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+024_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+017_medium_1.glb', 2100.2091148106624, 'test_4_levels/LOD_Tile_+021_+017_medium_0.glb', 1400.8184596282545, 'test_4_levels/LOD_Tile_+021_+017_high.glb', 2.0371492634384905);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+012_medium_1.glb', 2101.03247706079, 'test_4_levels/LOD_Tile_+025_+012_medium_0.glb', 1402.46518412851, 'test_4_levels/LOD_Tile_+025_+012_high.glb', 5.330598263949451);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+012.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+012.003_medium_1.glb', 2101.2086695119474, 'test_4_levels/LOD_Tile_+025_+012.003_medium_0.glb', 1402.817569030824, 'test_4_levels/LOD_Tile_+025_+012.003_high.glb', 6.035368068577777);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+017.001_medium_1.glb', 2110.649942135489, 'test_4_levels/LOD_Tile_+021_+017.001_medium_0.glb', 1421.700114277907, 'test_4_levels/LOD_Tile_+021_+017.001_high.glb', 43.80045856274359);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+017_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+020_+017_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+020_+017_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+017.002_medium_1.glb', 2112.215460475716, 'test_4_levels/LOD_Tile_+021_+017.002_medium_0.glb', 1424.8311509583614, 'test_4_levels/LOD_Tile_+021_+017.002_high.glb', 50.06253192365255);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+017.001_medium_1.glb', 2112.1831717051414, 'test_4_levels/LOD_Tile_+020_+017.001_medium_0.glb', 1424.7665734172126, 'test_4_levels/LOD_Tile_+020_+017.001_high.glb', 49.93337684135501);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+020_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+020_+017.002_medium_1.glb', 2110.682230906063, 'test_4_levels/LOD_Tile_+020_+017.002_medium_0.glb', 1421.7646918190558, 'test_4_levels/LOD_Tile_+020_+017.002_high.glb', 43.92961364504114);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+012.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+012.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+012.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+012.002_medium_1.glb', 2112.7286347224917, 'test_4_levels/LOD_Tile_+025_+012.002_medium_0.glb', 1425.8574994519129, 'test_4_levels/LOD_Tile_+025_+012.002_high.glb', 52.11522891075538);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+007.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+007.003_medium_1.glb', 2100.4825155226977, 'test_4_levels/LOD_Tile_+022_+007.003_medium_0.glb', 1401.3652610523254, 'test_4_levels/LOD_Tile_+022_+007.003_high.glb', 3.130752111580399);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+007.001_medium_1.glb', 2111.1511434967674, 'test_4_levels/LOD_Tile_+022_+007.001_medium_0.glb', 1422.7025170004642, 'test_4_levels/LOD_Tile_+022_+007.001_high.glb', 45.80526400785829);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+007.002_medium_1.glb', 2111.7142595809437, 'test_4_levels/LOD_Tile_+022_+007.002_medium_0.glb', 1423.8287491688168, 'test_4_levels/LOD_Tile_+022_+007.002_high.glb', 48.05772834456326);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+026_+005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+026_+005_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+026_+005_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+026_+005_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+015_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+015_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+015_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+010.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+010.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+010.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+010.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+010.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+010.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+009.001_medium_1.glb', 2110.638780504536, 'test_4_levels/LOD_Tile_+022_+009.001_medium_0.glb', 1421.6777910160015, 'test_4_levels/LOD_Tile_+022_+009.001_high.glb', 43.755812038932646);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+009.002_medium_1.glb', 2112.226622106669, 'test_4_levels/LOD_Tile_+022_+009.002_medium_0.glb', 1424.853474220267, 'test_4_levels/LOD_Tile_+022_+009.002_high.glb', 50.1071784474635);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+021_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+021_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+021_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+021_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+019_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+019_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+019_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+018_medium_1.glb', 2099.9864042122144, 'test_4_levels/LOD_Tile_+017_+018_medium_0.glb', 1400.3730384313583, 'test_4_levels/LOD_Tile_+017_+018_high.glb', 1.1463068696463958);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+010_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+010_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+010_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+014.002_medium_1.glb', 2112.7962870069996, 'test_4_levels/LOD_Tile_+005_+014.002_medium_0.glb', 1425.9928040209286, 'test_4_levels/LOD_Tile_+005_+014.002_high.glb', 52.38583804878679);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+014.001_medium_1.glb', 2110.0691156042053, 'test_4_levels/LOD_Tile_+005_+014.001_medium_0.glb', 1420.5384612153398, 'test_4_levels/LOD_Tile_+005_+014.001_high.glb', 41.47715243760936);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+005_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+005_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+022.001_medium_1.glb', 2110.711629669793, 'test_4_levels/LOD_Tile_+013_+022.001_medium_0.glb', 1421.8234893465162, 'test_4_levels/LOD_Tile_+013_+022.001_high.glb', 44.047208699962226);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+008_medium_1.glb', 2103.731289076004, 'test_4_levels/LOD_Tile_+014_+008_medium_0.glb', 1407.862808158938, 'test_4_levels/LOD_Tile_+014_+008_high.glb', 16.12584632480542);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+008.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+008.004_medium_1.glb', 2101.874816322768, 'test_4_levels/LOD_Tile_+014_+008.004_medium_0.glb', 1404.1498626524656, 'test_4_levels/LOD_Tile_+014_+008.004_high.glb', 8.699955311860958);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+018.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+018.002_medium_1.glb', 2112.1427395997052, 'test_4_levels/LOD_Tile_+017_+018.002_medium_0.glb', 1424.6857092063397, 'test_4_levels/LOD_Tile_+017_+018.002_high.glb', 49.771648419609015);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+022.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+022.002_medium_1.glb', 2112.1537734079175, 'test_4_levels/LOD_Tile_+013_+022.002_medium_0.glb', 1424.7077768227648, 'test_4_levels/LOD_Tile_+013_+022.002_high.glb', 49.815783652459324);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+018.001_medium_1.glb', 2110.7226485498027, 'test_4_levels/LOD_Tile_+017_+018.001_medium_0.glb', 1421.845527106535, 'test_4_levels/LOD_Tile_+017_+018.001_high.glb', 44.09128421999961);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+022_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+022_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+022_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+008.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+008.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+008.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+008.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+008.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+008.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+023.001_medium_1.glb', 2111.508554072, 'test_4_levels/LOD_Tile_+009_+023.001_medium_0.glb', 1423.4173381509302, 'test_4_levels/LOD_Tile_+009_+023.001_high.glb', 47.23490630878992);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+011.001_medium_1.glb', 2112.517220575332, 'test_4_levels/LOD_Tile_+001_+011.001_medium_0.glb', 1425.4346711575931, 'test_4_levels/LOD_Tile_+001_+011.001_high.glb', 51.26957232211591);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+023.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+023.002_medium_1.glb', 2111.3568485392043, 'test_4_levels/LOD_Tile_+009_+023.002_medium_0.glb', 1423.1139270853382, 'test_4_levels/LOD_Tile_+009_+023.002_high.glb', 46.62808417760623);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+023_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+009_+023_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+009_+023_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+001_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+001_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+011.002_medium_1.glb', 2110.348182502379, 'test_4_levels/LOD_Tile_+001_+011.002_medium_0.glb', 1421.096595011688, 'test_4_levels/LOD_Tile_+001_+011.002_high.glb', 42.59342003030564);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+000_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+000_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+000_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+000_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+025_medium_1.glb', 2111.160923802415, 'test_4_levels/LOD_Tile_+013_+025_medium_0.glb', 1422.7220776117595, 'test_4_levels/LOD_Tile_+013_+025_high.glb', 45.84438523044863);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+007.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+007.003_medium_1.glb', 2099.7815174219168, 'test_4_levels/LOD_Tile_+018_+007.003_medium_0.glb', 1399.9632648507636, 'test_4_levels/LOD_Tile_+018_+007.003_high.glb', 0.32675970845669305);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+007.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+007.005_medium_1.glb', 2099.7873972679645, 'test_4_levels/LOD_Tile_+018_+007.005_medium_0.glb', 1399.9750245428581, 'test_4_levels/LOD_Tile_+018_+007.005_high.glb', 0.3502790926459921);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+013.001_medium_1.glb', 2113.049300924992, 'test_4_levels/LOD_Tile_+005_+013.001_medium_0.glb', 1426.4988318569142, 'test_4_levels/LOD_Tile_+005_+013.001_high.glb', 53.397893720757914);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+025.001_medium_1.glb', 2111.7044788087896, 'test_4_levels/LOD_Tile_+013_+025.001_medium_0.glb', 1423.809187624509, 'test_4_levels/LOD_Tile_+013_+025.001_high.glb', 48.01860525594751);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+013_medium_1.glb', 2109.8161021527185, 'test_4_levels/LOD_Tile_+005_+013_medium_0.glb', 1420.032434312367, 'test_4_levels/LOD_Tile_+005_+013_high.glb', 40.465098631663636);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+007.002_medium_1.glb', 2113.7275913626345, 'test_4_levels/LOD_Tile_+018_+007.002_medium_0.glb', 1427.8554127321986, 'test_4_levels/LOD_Tile_+018_+007.002_high.glb', 56.111055471327006);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+007.001_medium_1.glb', 2113.3059092744193, 'test_4_levels/LOD_Tile_+018_+007.001_medium_0.glb', 1427.0120485557677, 'test_4_levels/LOD_Tile_+018_+007.001_high.glb', 54.42432711846519);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+020.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+020.002_medium_1.glb', 2118.075526653761, 'test_4_levels/LOD_Tile_+017_+020.002_medium_0.glb', 1436.5512833144508, 'test_4_levels/LOD_Tile_+017_+020.002_high.glb', 73.50279663583116);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+020_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+020_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+020_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+020.001_medium_1.glb', 2104.7898619622533, 'test_4_levels/LOD_Tile_+017_+020.001_medium_0.glb', 1409.9799539314365, 'test_4_levels/LOD_Tile_+017_+020.001_high.glb', 20.360137869802877);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+024_medium_1.glb', 2111.0829356031954, 'test_4_levels/LOD_Tile_+009_+024_medium_0.glb', 1422.5661012133207, 'test_4_levels/LOD_Tile_+009_+024_high.glb', 45.53243243357097);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+013.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+013.003_medium_1.glb', 2100.0468457080556, 'test_4_levels/LOD_Tile_+013_+013.003_medium_0.glb', 1400.493921423041, 'test_4_levels/LOD_Tile_+013_+013.003_high.glb', 1.3880728530115154);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+024.001_medium_1.glb', 2111.782467474515, 'test_4_levels/LOD_Tile_+009_+024.001_medium_0.glb', 1423.9651649559605, 'test_4_levels/LOD_Tile_+009_+024.001_high.glb', 48.33055991885058);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+007_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+007_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+007_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+012.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+012.003_medium_1.glb', 2100.723328433588, 'test_4_levels/LOD_Tile_+009_+012.003_medium_0.glb', 1401.8468868741056, 'test_4_levels/LOD_Tile_+009_+012.003_high.glb', 4.094003755140945);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+006.001_medium_1.glb', 2112.092811757495, 'test_4_levels/LOD_Tile_+014_+006.001_medium_0.glb', 1424.5858535219197, 'test_4_levels/LOD_Tile_+014_+006.001_high.glb', 49.57193705076899);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+006.002_medium_1.glb', 2110.7725908537095, 'test_4_levels/LOD_Tile_+014_+006.002_medium_0.glb', 1421.9454117143487, 'test_4_levels/LOD_Tile_+014_+006.002_high.glb', 44.291053435627155);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+006_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+006_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+006_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+013.001_medium_1.glb', 2110.7119287003643, 'test_4_levels/LOD_Tile_+013_+013.001_medium_0.glb', 1421.8240874076582, 'test_4_levels/LOD_Tile_+013_+013.001_high.glb', 44.04840482224605);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+012.001_medium_1.glb', 2112.1467828102486, 'test_4_levels/LOD_Tile_+009_+012.001_medium_0.glb', 1424.6937956274269, 'test_4_levels/LOD_Tile_+009_+012.001_high.glb', 49.78782126178361);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+013.002_medium_1.glb', 2112.153474377347, 'test_4_levels/LOD_Tile_+013_+013.002_medium_0.glb', 1424.707178761623, 'test_4_levels/LOD_Tile_+013_+013.002_high.glb', 49.8145875301755);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+012.002_medium_1.glb', 2110.718619800956, 'test_4_levels/LOD_Tile_+009_+012.002_medium_0.glb', 1421.8374696088415, 'test_4_levels/LOD_Tile_+009_+012.002_high.glb', 44.07516922461253);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+001_medium_1.glb', 2101.461085368798, 'test_4_levels/LOD_Tile_+014_+001_medium_0.glb', 1403.3224007445258, 'test_4_levels/LOD_Tile_+014_+001_high.glb', 7.04503149598125);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+022_medium_1.glb', 2101.259252329074, 'test_4_levels/LOD_Tile_+005_+022_medium_0.glb', 1402.9187346650776, 'test_4_levels/LOD_Tile_+005_+022_high.glb', 6.23769933708472);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+022.001_medium_1.glb', 2099.8515045707113, 'test_4_levels/LOD_Tile_+005_+022.001_medium_0.glb', 1400.1032391483523, 'test_4_levels/LOD_Tile_+005_+022.001_high.glb', 0.6067083036340497);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+009.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+009.008_medium_1.glb', 2099.7990142091157, 'test_4_levels/LOD_Tile_+018_+009.008_medium_0.glb', 1399.9982584251607, 'test_4_levels/LOD_Tile_+018_+009.008_high.glb', 0.3967468572510322);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+009.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+009.003_medium_1.glb', 2100.705105296001, 'test_4_levels/LOD_Tile_+018_+009.003_medium_0.glb', 1401.8104405989316, 'test_4_levels/LOD_Tile_+018_+009.003_high.glb', 4.021111204792914);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+016.002_medium_1.glb', 2111.7585781507896, 'test_4_levels/LOD_Tile_+017_+016.002_medium_0.glb', 1423.9173863085093, 'test_4_levels/LOD_Tile_+017_+016.002_high.glb', 48.23500262394818);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+009_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+009_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+016_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+016_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+016_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+016.001_medium_1.glb', 2111.106810465224, 'test_4_levels/LOD_Tile_+017_+016.001_medium_0.glb', 1422.6138509373782, 'test_4_levels/LOD_Tile_+017_+016.001_high.glb', 45.627931881685846);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+009.015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+009.015_medium_1.glb', 2099.98473132044, 'test_4_levels/LOD_Tile_+018_+009.015_medium_0.glb', 1400.3696926478094, 'test_4_levels/LOD_Tile_+018_+009.015_high.glb', 1.1396153025484248);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+009.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+009.006_medium_1.glb', 2100.253262639184, 'test_4_levels/LOD_Tile_+018_+009.006_medium_0.glb', 1400.906755285298, 'test_4_levels/LOD_Tile_+018_+009.006_high.glb', 2.213740577525631);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+009.001_medium_1.glb', 2122.626148691233, 'test_4_levels/LOD_Tile_+018_+009.001_medium_0.glb', 1445.6525273893956, 'test_4_levels/LOD_Tile_+018_+009.001_high.glb', 91.70528478572076);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014.003_medium_1.glb', 2101.4762048396324, 'test_4_levels/LOD_Tile_+013_+014.003_medium_0.glb', 1403.3526396861942, 'test_4_levels/LOD_Tile_+013_+014.003_high.glb', 7.105509379317904);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014.005_medium_1.glb', 2099.7372413041485, 'test_4_levels/LOD_Tile_+013_+014.005_medium_0.glb', 1399.8747126152268, 'test_4_levels/LOD_Tile_+013_+014.005_high.glb', 0.14965523738351197);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014.004_medium_1.glb', 2100.154531701576, 'test_4_levels/LOD_Tile_+013_+014.004_medium_0.glb', 1400.7092934100822, 'test_4_levels/LOD_Tile_+013_+014.004_high.glb', 1.8188168270940963);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+009.002_medium_1.glb', 2122.6114994588006, 'test_4_levels/LOD_Tile_+018_+009.002_medium_0.glb', 1445.6232289245308, 'test_4_levels/LOD_Tile_+018_+009.002_high.glb', 91.64668785599112);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014.006_medium_1.glb', 2100.134999080662, 'test_4_levels/LOD_Tile_+013_+014.006_medium_0.glb', 1400.670228168254, 'test_4_levels/LOD_Tile_+013_+014.006_high.glb', 1.7406863434376416);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014.008_medium_1.glb', 2100.7845317343003, 'test_4_levels/LOD_Tile_+013_+014.008_medium_0.glb', 1401.9692934755303, 'test_4_levels/LOD_Tile_+013_+014.008_high.glb', 4.338816957990445);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014_medium_1.glb', 2100.7593329272477, 'test_4_levels/LOD_Tile_+013_+014_medium_0.glb', 1401.918895861425, 'test_4_levels/LOD_Tile_+013_+014_high.glb', 4.238021729779624);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+011.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+011.005_medium_1.glb', 2099.972807884616, 'test_4_levels/LOD_Tile_+017_+011.005_medium_0.glb', 1400.3458457761617, 'test_4_levels/LOD_Tile_+017_+011.005_high.glb', 1.0919215592530984);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+009_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+009_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+009_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+011.003_medium_1.glb', 2100.233310162554, 'test_4_levels/LOD_Tile_+017_+011.003_medium_0.glb', 1400.866850332038, 'test_4_levels/LOD_Tile_+017_+011.003_high.glb', 2.1339306710057704);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+014.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+014.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+014.001_medium_1.glb', 2114.157452706701, 'test_4_levels/LOD_Tile_+013_+014.001_medium_0.glb', 1428.7151354203318, 'test_4_levels/LOD_Tile_+013_+014.001_high.glb', 57.83050084759337);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+015.001_medium_1.glb', 2112.086192032375, 'test_4_levels/LOD_Tile_+009_+015.001_medium_0.glb', 1424.57261407168, 'test_4_levels/LOD_Tile_+009_+015.001_high.glb', 49.545458150289285);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+015_medium_1.glb', 2110.7792110453356, 'test_4_levels/LOD_Tile_+009_+015_medium_0.glb', 1421.9586520976013, 'test_4_levels/LOD_Tile_+009_+015_high.glb', 44.317534202132265);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+011.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+011.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+011.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+008_medium_1.glb', 2112.856849794492, 'test_4_levels/LOD_Tile_+002_+008_medium_0.glb', 1426.1139295959135, 'test_4_levels/LOD_Tile_+002_+008_high.glb', 52.62808919875689);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+011.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+011.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+011.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+020_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+020_medium_1.glb', 2099.8022172417213, 'test_4_levels/LOD_Tile_+021_+020_medium_0.glb', 1400.0046644903719, 'test_4_levels/LOD_Tile_+021_+020_high.glb', 0.4095589876734162);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+011_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+011_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+011_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+020.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+020.003_medium_1.glb', 2099.8311891521403, 'test_4_levels/LOD_Tile_+021_+020.003_medium_0.glb', 1400.0626083112102, 'test_4_levels/LOD_Tile_+021_+020.003_high.glb', 0.5254466293500449);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+008.001_medium_1.glb', 2110.0085528167124, 'test_4_levels/LOD_Tile_+002_+008.001_medium_0.glb', 1420.4173356403548, 'test_4_levels/LOD_Tile_+002_+008.001_high.glb', 41.234901287639254);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+020.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+020.002_medium_1.glb', 2106.149156038475, 'test_4_levels/LOD_Tile_+021_+020.002_medium_0.glb', 1412.6985420838798, 'test_4_levels/LOD_Tile_+021_+020.002_high.glb', 25.797314174689475);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+008.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+008.003_medium_1.glb', 2100.04545038756, 'test_4_levels/LOD_Tile_+022_+008.003_medium_0.glb', 1400.4911307820496, 'test_4_levels/LOD_Tile_+022_+008.003_high.glb', 1.382491571028796);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+020.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+020.001_medium_1.glb', 2116.716247505742, 'test_4_levels/LOD_Tile_+021_+020.001_medium_0.glb', 1433.8327250184138, 'test_4_levels/LOD_Tile_+021_+020.001_high.glb', 68.06568004375747);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+008.001_medium_1.glb', 2111.2659334490004, 'test_4_levels/LOD_Tile_+022_+008.001_medium_0.glb', 1422.93209690493, 'test_4_levels/LOD_Tile_+022_+008.001_high.glb', 46.26442381678971);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+008.002_medium_1.glb', 2111.5994696287107, 'test_4_levels/LOD_Tile_+022_+008.002_medium_0.glb', 1423.599169264351, 'test_4_levels/LOD_Tile_+022_+008.002_high.glb', 47.59856853563185);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+011.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+011.003_medium_1.glb', 2100.454868023809, 'test_4_levels/LOD_Tile_+021_+011.003_medium_0.glb', 1401.3099660545477, 'test_4_levels/LOD_Tile_+021_+011.003_high.glb', 3.020162116025114);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+008_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+022_+008_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+022_+008_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+018_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+018_medium_1.glb', 2108.0762989058035, 'test_4_levels/LOD_Tile_+021_+018_medium_0.glb', 1416.5528278185363, 'test_4_levels/LOD_Tile_+021_+018_high.glb', 33.50588564400243);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+014.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+014.003_medium_1.glb', 2100.6080113291787, 'test_4_levels/LOD_Tile_+025_+014.003_medium_0.glb', 1401.6162526652868, 'test_4_levels/LOD_Tile_+025_+014.003_high.glb', 3.632735337503258);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+018.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+018.001_medium_1.glb', 2114.7891041719076, 'test_4_levels/LOD_Tile_+021_+018.001_medium_0.glb', 1429.9784383507447, 'test_4_levels/LOD_Tile_+021_+018.001_high.glb', 60.35710670841911);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+011.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+011.002_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+011.002_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+011.002_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+011.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+011.001_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+011.001_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+011.001_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+014.001_medium_1.glb', 2108.666236772627, 'test_4_levels/LOD_Tile_+025_+014.001_medium_0.glb', 1417.7327035521841, 'test_4_levels/LOD_Tile_+025_+014.001_high.glb', 35.865637111297985);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+014_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+014_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+014_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+014.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+014.004_medium_1.glb', 2100.221429645315, 'test_4_levels/LOD_Tile_+025_+014.004_medium_0.glb', 1400.843089297559, 'test_4_levels/LOD_Tile_+025_+014.004_high.glb', 2.0864086020475923);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+014.002_medium_1.glb', 2114.1991658385773, 'test_4_levels/LOD_Tile_+025_+014.002_medium_0.glb', 1428.7985616840842, 'test_4_levels/LOD_Tile_+025_+014.002_high.glb', 57.99735337509816);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+011_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+011_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+011_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+011_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+006_medium_1.glb', 2112.585940692877, 'test_4_levels/LOD_Tile_+022_+006_medium_0.glb', 1425.5721113926834, 'test_4_levels/LOD_Tile_+022_+006_high.glb', 51.544452792296596);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+022_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+022_+006.001_medium_1.glb', 2110.279461918328, 'test_4_levels/LOD_Tile_+022_+006.001_medium_0.glb', 1420.959153843585, 'test_4_levels/LOD_Tile_+022_+006.001_high.glb', 42.318537694099554);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+016.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+016.001_medium_1.glb', 2113.9291822855625, 'test_4_levels/LOD_Tile_+021_+016.001_medium_0.glb', 1428.2585945780547, 'test_4_levels/LOD_Tile_+021_+016.001_high.glb', 56.91741916303897);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+013_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+025_+013_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+025_+013_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+016.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+016.002_medium_1.glb', 2108.936220325642, 'test_4_levels/LOD_Tile_+021_+016.002_medium_0.glb', 1418.2726706582139, 'test_4_levels/LOD_Tile_+021_+016.002_high.glb', 36.94557132335717);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+021_+016_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+021_+016_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+021_+016_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+021_+016_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+013.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+013.002_medium_1.glb', 2113.0120294000835, 'test_4_levels/LOD_Tile_+025_+013.002_medium_0.glb', 1426.4242888070964, 'test_4_levels/LOD_Tile_+025_+013.002_high.glb', 53.24880762112255);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+025_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+025_+013.001_medium_1.glb', 2109.8533736776276, 'test_4_levels/LOD_Tile_+025_+013.001_medium_0.glb', 1420.1069773621846, 'test_4_levels/LOD_Tile_+025_+013.001_high.glb', 40.614184731299);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+015.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+015.003_medium_1.glb', 2099.786770749935, 'test_4_levels/LOD_Tile_+013_+015.003_medium_0.glb', 1399.9737715067995, 'test_4_levels/LOD_Tile_+013_+015.003_high.glb', 0.3477730205287096);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+015_medium_1.glb', 2099.849853138229, 'test_4_levels/LOD_Tile_+013_+015_medium_0.glb', 1400.0999362833875, 'test_4_levels/LOD_Tile_+013_+015_high.glb', 0.6001025737046528);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+008.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+008.004_medium_1.glb', 2100.0054740588284, 'test_4_levels/LOD_Tile_+018_+008.004_medium_0.glb', 1400.4111781245863, 'test_4_levels/LOD_Tile_+018_+008.004_high.glb', 1.2225862561022962);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+008.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+008.003_medium_1.glb', 2100.6709234426544, 'test_4_levels/LOD_Tile_+018_+008.003_medium_0.glb', 1401.7420768922386, 'test_4_levels/LOD_Tile_+018_+008.003_high.glb', 3.8843837914068198);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+008.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+008.001_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+008.001_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+008.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+015.001_medium_1.glb', 2111.8555582900626, 'test_4_levels/LOD_Tile_+013_+015.001_medium_0.glb', 1424.1113465870549, 'test_4_levels/LOD_Tile_+013_+015.001_high.glb', 48.62292318103932);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+010.010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+010.010_medium_1.glb', 2099.8844912347868, 'test_4_levels/LOD_Tile_+017_+010.010_medium_0.glb', 1400.169212476503, 'test_4_levels/LOD_Tile_+017_+010.010_high.glb', 0.7386549599356473);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+015.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+015.002_medium_1.glb', 2111.0098447876485, 'test_4_levels/LOD_Tile_+013_+015.002_medium_0.glb', 1422.4199195822264, 'test_4_levels/LOD_Tile_+013_+015.002_high.glb', 45.24006917138224);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+008.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+008.002_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+008.002_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+008.002_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+008_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+008_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+008_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+010.001_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+010.001_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+010.001_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+010.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+010.002_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+010.002_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+010.002_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+010.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+010.004_medium_1.glb', 2099.7746126614165, 'test_4_levels/LOD_Tile_+017_+010.004_medium_0.glb', 1399.9494553297627, 'test_4_levels/LOD_Tile_+017_+010.004_high.glb', 0.2991406664552796);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+010.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+010.005_medium_1.glb', 2099.781510424322, 'test_4_levels/LOD_Tile_+017_+010.005_medium_0.glb', 1399.963250855573, 'test_4_levels/LOD_Tile_+017_+010.005_high.glb', 0.3267317180756363);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+010.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+010.006_medium_1.glb', 2099.8378018796648, 'test_4_levels/LOD_Tile_+017_+010.006_medium_0.glb', 1400.0758337662596, 'test_4_levels/LOD_Tile_+017_+010.006_high.glb', 0.5518975394486894);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+010_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+010_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+010_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+009.001_medium_1.glb', 2110.772035711152, 'test_4_levels/LOD_Tile_+002_+009.001_medium_0.glb', 1421.9443014292335, 'test_4_levels/LOD_Tile_+002_+009.001_high.glb', 44.28883286539666);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+014_medium_1.glb', 2101.3326850937765, 'test_4_levels/LOD_Tile_+009_+014_medium_0.glb', 1403.0656001944824, 'test_4_levels/LOD_Tile_+009_+014_high.glb', 6.531430395894428);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+009_medium_1.glb', 2112.093366900053, 'test_4_levels/LOD_Tile_+002_+009_medium_0.glb', 1424.5869638070349, 'test_4_levels/LOD_Tile_+002_+009_high.glb', 49.57415762099949);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+007.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+007.004_medium_1.glb', 2099.7640206347182, 'test_4_levels/LOD_Tile_+014_+007.004_medium_0.glb', 1399.9282712763663, 'test_4_levels/LOD_Tile_+014_+007.004_high.glb', 0.2567725596623539);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+014.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+014.001_medium_1.glb', 2113.1805342930834, 'test_4_levels/LOD_Tile_+009_+014.001_medium_0.glb', 1426.7612985930962, 'test_4_levels/LOD_Tile_+009_+014.001_high.glb', 53.92282719312191);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+014.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+014.002_medium_1.glb', 2109.6848687846277, 'test_4_levels/LOD_Tile_+009_+014.002_medium_0.glb', 1419.769967576185, 'test_4_levels/LOD_Tile_+009_+014.002_high.glb', 39.94016515929964);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+012.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+012.003_medium_1.glb', 2099.7675511547823, 'test_4_levels/LOD_Tile_+013_+012.003_medium_0.glb', 1399.9353323164942, 'test_4_levels/LOD_Tile_+013_+012.003_high.glb', 0.2708946399181945);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+007.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+007.001_medium_1.glb', 2111.5833676955017, 'test_4_levels/LOD_Tile_+014_+007.001_medium_0.glb', 1423.5669653979326, 'test_4_levels/LOD_Tile_+014_+007.001_high.glb', 47.53416080279482);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+007.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+007.002_medium_1.glb', 2111.282034915703, 'test_4_levels/LOD_Tile_+014_+007.002_medium_0.glb', 1422.9642998383358, 'test_4_levels/LOD_Tile_+014_+007.002_high.glb', 46.32882968360133);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+013.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+013.001_medium_1.glb', 2110.593963705907, 'test_4_levels/LOD_Tile_+009_+013.001_medium_0.glb', 1421.5881574187433, 'test_4_levels/LOD_Tile_+009_+013.001_high.glb', 43.57654484441648);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+013_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+013_medium_1.glb', 2112.2714389052976, 'test_4_levels/LOD_Tile_+009_+013_medium_0.glb', 1424.943107817525, 'test_4_levels/LOD_Tile_+009_+013_high.glb', 50.28644564197966);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+012.002_medium_1.glb', 2108.865293633057, 'test_4_levels/LOD_Tile_+013_+012.002_medium_0.glb', 1418.1308172730435, 'test_4_levels/LOD_Tile_+013_+012.002_high.glb', 36.6618645530166);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+012.001_medium_1.glb', 2114.000109444654, 'test_4_levels/LOD_Tile_+013_+012.001_medium_0.glb', 1428.4004488962375, 'test_4_levels/LOD_Tile_+013_+012.001_high.glb', 57.20112779940495);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+017.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+017.001_medium_1.glb', 2110.652654403413, 'test_4_levels/LOD_Tile_+017_+017.001_medium_0.glb', 1421.7055388137558, 'test_4_levels/LOD_Tile_+017_+017.001_high.glb', 43.8113076344412);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+002_+007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+002_+007_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+002_+007_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+002_+007_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+013_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+013_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+017_medium_1.glb', 2123.1655611212113, 'test_4_levels/LOD_Tile_+017_+017_medium_0.glb', 1446.7313522493523, 'test_4_levels/LOD_Tile_+017_+017_high.glb', 93.86293450563403);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+017.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+017.002_medium_1.glb', 2112.212734212601, 'test_4_levels/LOD_Tile_+017_+017.002_medium_0.glb', 1424.8256984321315, 'test_4_levels/LOD_Tile_+017_+017.002_high.glb', 50.05162687119284);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+012.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+012.002_medium_1.glb', 2111.7571828302944, 'test_4_levels/LOD_Tile_+005_+012.002_medium_0.glb', 1423.914595667518, 'test_4_levels/LOD_Tile_+005_+012.002_high.glb', 48.22942134196546);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+012.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+012.001_medium_1.glb', 2111.1082197809105, 'test_4_levels/LOD_Tile_+005_+012.001_medium_0.glb', 1422.6166695687505, 'test_4_levels/LOD_Tile_+005_+012.001_high.glb', 45.63356914443068);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+024_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+024_medium_1.glb', 2111.6448844884817, 'test_4_levels/LOD_Tile_+013_+024_medium_0.glb', 1423.689998983893, 'test_4_levels/LOD_Tile_+013_+024_high.glb', 47.780227974715665);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+024.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+024.001_medium_1.glb', 2111.2205185892294, 'test_4_levels/LOD_Tile_+013_+024.001_medium_0.glb', 1422.8412671853882, 'test_4_levels/LOD_Tile_+013_+024.001_high.glb', 46.08276437770588);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+025.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+025.001_medium_1.glb', 2115.2194777399477, 'test_4_levels/LOD_Tile_+009_+025.001_medium_0.glb', 1430.8391854868246, 'test_4_levels/LOD_Tile_+009_+025.001_high.glb', 62.07860098057884);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+025_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+025_medium_1.glb', 2121.365892513798, 'test_4_levels/LOD_Tile_+009_+025_medium_0.glb', 1443.132015034526, 'test_4_levels/LOD_Tile_+009_+025_high.glb', 86.66426007598139);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.006_medium_1.glb', 2099.921577556674, 'test_4_levels/LOD_Tile_+018_+006.006_medium_0.glb', 1400.243385120278, 'test_4_levels/LOD_Tile_+018_+006.006_high.glb', 0.8870002474857026);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.004_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.004_medium_1.glb', 2100.131895413909, 'test_4_levels/LOD_Tile_+018_+006.004_medium_0.glb', 1400.6640208347483, 'test_4_levels/LOD_Tile_+018_+006.004_high.glb', 1.7282716764262638);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.007_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.007_medium_1.glb', 2100.434951001662, 'test_4_levels/LOD_Tile_+018_+006.007_medium_0.glb', 1401.270132010253, 'test_4_levels/LOD_Tile_+018_+006.007_high.glb', 2.9404940274359412);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+012_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+012_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+005_+012_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+005_+012_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.005_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.005_medium_1.glb', 2099.849668401714, 'test_4_levels/LOD_Tile_+018_+006.005_medium_0.glb', 1400.0995668103576, 'test_4_levels/LOD_Tile_+018_+006.005_high.glb', 0.5993636276447541);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.010_medium_1.glb', 2101.4152506533114, 'test_4_levels/LOD_Tile_+018_+006.010_medium_0.glb', 1403.2307313135523, 'test_4_levels/LOD_Tile_+018_+006.010_high.glb', 6.861692634034024);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.014_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.014_medium_1.glb', 2099.759906048703, 'test_4_levels/LOD_Tile_+018_+006.014_medium_0.glb', 1399.9200421043356, 'test_4_levels/LOD_Tile_+018_+006.014_high.glb', 0.24031421560097518);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.017_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.017_medium_1.glb', 2100.3907103383763, 'test_4_levels/LOD_Tile_+018_+006.017_medium_0.glb', 1401.181650683682, 'test_4_levels/LOD_Tile_+018_+006.017_high.glb', 2.7635313742934478);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.003_medium_1.glb', 2100.8185428463225, 'test_4_levels/LOD_Tile_+018_+006.003_medium_0.glb', 1402.0373156995745, 'test_4_levels/LOD_Tile_+018_+006.003_high.glb', 4.474861406078753);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.008_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.008_medium_1.glb', 2099.804082334112, 'test_4_levels/LOD_Tile_+018_+006.008_medium_0.glb', 1400.008394675154, 'test_4_levels/LOD_Tile_+018_+006.008_high.glb', 0.4170193572377464);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.009_medium_1.glb', 2099.808253833902, 'test_4_levels/LOD_Tile_+018_+006.009_medium_0.glb', 1400.0167376747345, 'test_4_levels/LOD_Tile_+018_+006.009_high.glb', 0.4337053563983868);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.001_medium_1.glb', 2114.8683953233653, 'test_4_levels/LOD_Tile_+018_+006.001_medium_0.glb', 1430.1370206536599, 'test_4_levels/LOD_Tile_+018_+006.001_high.glb', 60.67427131424955);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006.002_medium_1.glb', 2110.9490753378423, 'test_4_levels/LOD_Tile_+018_+006.002_medium_0.glb', 1422.2983806826144, 'test_4_levels/LOD_Tile_+018_+006.002_high.glb', 44.996991372158256);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+015_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+015_medium_1.glb', 2109.313491475754, 'test_4_levels/LOD_Tile_+005_+015_medium_0.glb', 1419.0272129584373, 'test_4_levels/LOD_Tile_+005_+015_high.glb', 38.45465592380411);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+023.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+023.001_medium_1.glb', 2111.855045599583, 'test_4_levels/LOD_Tile_+013_+023.001_medium_0.glb', 1424.1103212060955, 'test_4_levels/LOD_Tile_+013_+023.001_high.glb', 48.62087241912056);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+005_+015.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+005_+015.001_medium_1.glb', 2113.5519111354506, 'test_4_levels/LOD_Tile_+005_+015.001_medium_0.glb', 1427.5040522778313, 'test_4_levels/LOD_Tile_+005_+015.001_high.glb', 55.40833456259204);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+013_+023_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+013_+023_medium_1.glb', 2111.0103570116216, 'test_4_levels/LOD_Tile_+013_+023_medium_0.glb', 1422.420944030173, 'test_4_levels/LOD_Tile_+013_+023_high.glb', 45.24211806727559);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+019_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+019_medium_1.glb', 2099.879949328954, 'test_4_levels/LOD_Tile_+017_+019_medium_0.glb', 1400.1601286648374, 'test_4_levels/LOD_Tile_+017_+019_high.glb', 0.7204873366044021);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+019.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+019.001_medium_1.glb', 2113.1003175930255, 'test_4_levels/LOD_Tile_+017_+019.001_medium_0.glb', 1426.6008651929803, 'test_4_levels/LOD_Tile_+017_+019.001_high.glb', 53.601960392890376);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+006_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+006_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+006_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+006_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+001_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+001_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+009.003_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+009.003_medium_1.glb', 2100.6294374993713, 'test_4_levels/LOD_Tile_+014_+009.003_medium_0.glb', 1401.659105005672, 'test_4_levels/LOD_Tile_+014_+009.003_high.glb', 3.718440018273674);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+017_+019.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+017_+019.002_medium_1.glb', 2109.7650705564824, 'test_4_levels/LOD_Tile_+017_+019.002_medium_0.glb', 1419.9303711198943, 'test_4_levels/LOD_Tile_+017_+019.002_high.glb', 40.26097224671826);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+018_+001.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+018_+001.001_medium_1.glb', 2123.1655681188067, 'test_4_levels/LOD_Tile_+018_+001.001_medium_0.glb', 1446.7313662445426, 'test_4_levels/LOD_Tile_+018_+001.001_high.glb', 93.86296249601509);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+009.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+009.001_medium_1.glb', 2119.7537067442477, 'test_4_levels/LOD_Tile_+014_+009.001_medium_0.glb', 1439.907643495425, 'test_4_levels/LOD_Tile_+014_+009.001_high.glb', 80.21551699777946);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+009_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+009_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+014_+009_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+014_+009_high.glb', 93.86299048639616);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+014_+009.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+014_+009.002_medium_1.glb', 2120.415966624152, 'test_4_levels/LOD_Tile_+014_+009.002_medium_0.glb', 1441.2321632552344, 'test_4_levels/LOD_Tile_+014_+009.002_high.glb', 82.8645565173983);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+010_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+010_medium_1.glb', 2112.3816589613166, 'test_4_levels/LOD_Tile_+001_+010_medium_0.glb', 1425.163547929563, 'test_4_levels/LOD_Tile_+001_+010_high.glb', 50.7273258660556);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+001_+010.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+001_+010.001_medium_1.glb', 2110.483743649888, 'test_4_levels/LOD_Tile_+001_+010.001_medium_0.glb', 1421.3677173067053, 'test_4_levels/LOD_Tile_+001_+010.001_high.glb', 43.13566462034055);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+022.001_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+022.001_medium_1.glb', 2111.3482778845246, 'test_4_levels/LOD_Tile_+009_+022.001_medium_0.glb', 1423.0967857759792, 'test_4_levels/LOD_Tile_+009_+022.001_high.glb', 46.59380155888791);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+022.002_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+022.002_medium_1.glb', 2111.51712472668, 'test_4_levels/LOD_Tile_+009_+022.002_medium_0.glb', 1423.4344794602894, 'test_4_levels/LOD_Tile_+009_+022.002_high.glb', 47.269188927508246);

    LODManager.AddBaseLayer('test_4_levels/LOD_Tile_+009_+022_low.glb', 2799.5997699930704, 3, 'test_4_levels/LOD_Tile_+009_+022_medium_1.glb', 2123.1655751164017, 'test_4_levels/LOD_Tile_+009_+022_medium_0.glb', 1446.7313802397332, 'test_4_levels/LOD_Tile_+009_+022_high.glb', 93.86299048639616);



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
