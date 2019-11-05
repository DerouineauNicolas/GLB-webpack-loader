import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

function loadHidherresolution(gltf, lod, level, instance) {
    var mesh = loadAndMergeMesh(gltf);
    mesh.geometry.computeBoundingSphere();
    mesh.position.x = -mesh.geometry.boundingSphere.center.x;
    mesh.position.y = -mesh.geometry.boundingSphere.center.y;
    mesh.position.z = -mesh.geometry.boundingSphere.center.z;
    lod.addLevel(mesh, (level));
    console.log(lod);
    //mesh.geometry.dispose();
    return mesh.id;
    //mesh.material.dispose();

}


export default function LOD(scene, camera, renderer, params, mouse, loader) {
    this.m_scene = scene;
    this.m_camera = camera;
    this.m_renderer = renderer;
    this.m_params = params;
    this.m_mouse = mouse;
    this.m_loader = loader;
    this.m_lodlist = [];
    this.m_raycaster = new THREE.Raycaster();

    this.m_InitBaseLayer = function (gltf, LOD_low_level_distance, LOD_level_medium, LOD_medium_level_distance, LOD_level_high, LOD_high_level_distance) {
        var boundingSphere;

        var lod = new THREE.LOD();
        var lod_position = new THREE.Vector3();
        lod.up.set(0, 0, 1);

        var mesh = loadAndMergeMesh(gltf);

        mesh.geometry.computeBoundingSphere();
        boundingSphere = mesh.geometry.boundingSphere;

        camera.position.z = LOD_low_level_distance;

        lod.addLevel(mesh, LOD_low_level_distance + 1);
        console.log(lod);

        mesh.position.x = -boundingSphere.center.x;
        mesh.position.y = -boundingSphere.center.y;
        mesh.position.z = -boundingSphere.center.z;

        lod.position.x = lod_position.x = boundingSphere.center.x;
        lod.position.y = lod_position.y = boundingSphere.center.y;
        lod.position.z = lod_position.z = boundingSphere.center.z;
        new THREE.Vector3(lod.position.x, lod.position.y, lod.position.y);

        this.m_scene.add(lod);

        mesh.geometry.dispose();

        this.m_lodlist.push({
            lodinstance: lod, lodposition: lod_position, lodposition: lod_position, medium_layer: LOD_level_medium, mediumdistance: LOD_medium_level_distance, high_layer: LOD_level_high, highdistance: LOD_high_level_distance
            , medium_loaded: false, high_loaded: false, high_level_instance_uuid: null, medium_level_instance_uuid: null
        })
    };

    this.monitorDistance = function () {

        //console.log("Monitoring distance");

        var cameraposition = new THREE.Vector3();
        var loader = this.m_loader;
        var scene = this.m_scene;
        var renderer = this.m_renderer;
        var camera = this.m_camera;

        cameraposition.x = this.m_camera.position.x;
        cameraposition.y = this.m_camera.position.y;
        cameraposition.z = this.m_camera.position.z;

        var removemeshFromLod = function (lod, mesh, distance) {
            //console.log("removemeshFromLod");
            //console.log(lod.levels.length);
            if (lod.levels.length > 1) {
                var object = lod.getObjectForDistance(distance);
                //console.log(object);


                //console.log(object.material[0])

                lod.remove(object);
                object.geometry.dispose();
                object.material[0].map.dispose();
                object = null;
                //scene.remove(object);
                lod.levels.shift();
                lod.levels[0].object.visible = true;
                //console.log(lod);
            }

        };

        this.m_lodlist.forEach(function (element) {
            //console.log(element);
            if (1) {
                var distance = cameraposition.distanceTo(element.lodposition);
                //console.log(distance);
                if (!element.high_loaded && distance < element.highdistance) {
                    //console.log(renderer.info);
                    loader.load(element.high_layer, gltf => { element.high_level_instance_uuid = loadHidherresolution(gltf, element.lodinstance, element.highdistance); }, null, null);
                    //console.log("Adding high resolution");
                    element.high_loaded = true;

                } else if (element.high_loaded && (distance > element.highdistance)) {
                    if (element.high_level_instance_uuid) {
                        removemeshFromLod(element.lodinstance, null, element.highdistance);
                        element.high_loaded = false;
                        element.lodinstance.update(camera);
                    }
                }
                if (!element.medium_loaded && distance < element.mediumdistance) {
                    loader.load(element.medium_layer, gltf => { element.medium_level_instance_uuid = loadHidherresolution(gltf, element.lodinstance, element.mediumdistance); }, null, null);
                    console.log("Adding medium resolution");
                    element.medium_loaded = true;
                } else if (element.medium_loaded && (distance > element.mediumdistance)) {
                    //console.log(element.medium_level_instance_uuid);
                    if (element.medium_level_instance_uuid) {
                        removemeshFromLod(element.lodinstance, null, element.mediumdistance);
                        element.medium_loaded = false;
                        element.lodinstance.update(camera);
                    }
                }

            }
        });



        if (this.m_params.enableRaytracing) {

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            var raycaster = this.m_raycaster;
            raycaster.setFromCamera(mouse, camera);
            this.m_lodlist.forEach(function (element) {
                var intersects = raycaster.intersectObject(element.lodinstance, true);

                //console.log(intersects.length)

                if (intersects.length > 0) {

                    var target = {
                        x: intersects[0].point.x,
                        y: intersects[0].point.y,
                        z: intersects[0].point.z
                    }

                    var geometry = new THREE.BoxBufferGeometry(element.highdistance / 10, element.highdistance / 10, element.highdistance / 10);
                    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.position.set(target.x, target.y, target.z);
                    //console.log("Adding geometry");
                    scene.add(mesh);
                }
            });


        }


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
            material.dispose();
            geometry.dispose();
            child.geometry.dispose();
            child.material.dispose();
            geometry = null;
            material = null;
        }

    });

    gltf = null;

    var geometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);
    var mesh = new THREE.Mesh(geometry, materials);

    geometry.dispose();
    //console.log(material)
    //material.dispose();

    return mesh;
}

LOD.prototype.AddBaseLayer = function (base_layer, LOD_low_level_distance, medium_layer, LOD_medium_level_distance, high_layer, LOD_high_level_distance) {
    const onProgress = () => { };

    const onError = (errorMessage) => {
        console.log("Eror while loading tile " + base_layer);
        console.log(errorMessage);
    };
    this.m_loader.load(base_layer, gltf => this.m_InitBaseLayer(gltf, LOD_low_level_distance, medium_layer, LOD_medium_level_distance, high_layer, LOD_high_level_distance), onProgress, onError);
};
