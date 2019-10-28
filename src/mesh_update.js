import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';



export default function LOD(scene, camera, renderer, params, mouse, loader) {
    this.m_scene = scene;
    this.m_camera = camera;
    this.m_renderer = renderer;
    this.m_params = params;
    this.m_mouse = mouse;
    this.m_loader = loader;

    this.m_InitBaseLayer = function (gltf, LOD_level_medium, LOD_level_medium_distance, high_layer) {
        var boundingSphere;

        var lod = new THREE.LOD();
        lod.name = LOD_level_medium;
        var lodposition = new THREE.Vector3();
        lod.up.set(0, 0, 1);

        var mesh = loadAndMergeMesh(gltf);

        mesh.geometry.computeBoundingSphere();
        boundingSphere = mesh.geometry.boundingSphere;

        this.m_camera.position.z = 2739;

        lod.addLevel(mesh, 3 * mesh.geometry.boundingSphere.radius);
        mesh.position.x = -boundingSphere.center.x;
        mesh.position.y = -boundingSphere.center.y;
        mesh.position.z = -boundingSphere.center.z;

        lod.position.x = lodposition.x = boundingSphere.center.x;
        lod.position.y = lodposition.y = boundingSphere.center.y;
        lod.position.z = lodposition.z = boundingSphere.center.z;
        new THREE.Vector3(lod.position.x, lod.position.y, lod.position.y);

        this.m_scene.add(lod);
    };

    this.monitorDistance = function () {

        console.log("Monitoring distance");

        var cameraposition = new THREE.Vector3();

        cameraposition.x = this.m_camera.position.x;
        cameraposition.y = this.m_camera.position.y;
        cameraposition.z = this.m_camera.position.z;

    }

    this.InitEventListener = function () {

        var context = this;

        this.m_renderer.domElement.addEventListener('mousedown', function (event) {
            //clicked(event);
            context.monitorDistance();
            camera.updateMatrixWorld();
        });

        this.m_renderer.domElement.addEventListener('wheel', function (event) {
            //console.log("scroll event")
            context.monitorDistance();
            //console.log(this);
            camera.updateMatrixWorld();
        });

    }

    this.InitEventListener();

}



function loadAndMergeMesh(gltf) {

    var geometries = [];
    var materials = [];

    gltf.scene.traverse(function (child) {

        if (child.isMesh) {
            var geometry = child.geometry;
            var material = child.material;

            geometries.push(geometry);
            materials.push(material);
        }

    });

    var geometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);
    var material = new THREE.MultiMaterial(materials);
    material.wireframe = true;
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

LOD.prototype.AddBaseLayer = function (base_layer, medium_layer, LOD_level_medium_distance, high_layer) {
    const onProgress = () => { };

    const onError = (errorMessage) => {
        console.log(errorMessage);
    };
    this.m_loader.load(base_layer, gltf => this.m_InitBaseLayer(gltf, medium_layer, LOD_level_medium_distance, high_layer), onProgress, onError);
};
