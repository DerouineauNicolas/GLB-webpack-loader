import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

function loadHidherresolution(gltf, lod, level) {
    var mesh = loadAndMergeMesh(gltf);
    mesh.geometry.computeBoundingSphere();
    mesh.position.x = -mesh.geometry.boundingSphere.center.x;
    mesh.position.y = -mesh.geometry.boundingSphere.center.y;
    mesh.position.z = -mesh.geometry.boundingSphere.center.z;
    lod.addLevel(mesh, (level));
    return mesh.id;

}

function deleteobj(object) {

    object.traverse(function (obj) {
        var material = null;
        if (obj.material[0])
            material = obj.material[0];
        else
            material = obj.material;
        if (material) {
            material.dispose();
            if (material.map) {
                material.map.dispose();
            }
            if (material.lightMap) {
                material.lightMap.dispose();
            }
            if (material.aoMap) {
                material.aoMap.dispose();
            }
            if (material.emissiveMap) {
                material.emissiveMap.dispose();
            }
            if (material.bumpMap) {
                material.bumpMap.dispose();
            }
            if (material.normalMap) {
                material.normalMap.dispose();
            }
            if (material.displacementMap) {
                material.displacementMap.dispose();
            }
            if (material.roughnessMap) {
                material.roughnessMap.dispose();
            }
            if (material.metalnessMap) {
                material.metalnessMap.dispose();
            }
            if (material.alphaMap) {
                material.alphaMap.dispose();
            }
        }
        if (obj.geometry) {
            obj.geometry.dispose();
            obj.geometry.attributes.color = {};
            obj.geometry.attributes.normal = {};
            obj.geometry.attributes.position = {};
            obj.geometry.attributes.uv = {};
            obj.geometry.attributes = {};
            obj.material = {};
        }
    })
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

        lod.addLevel(mesh, LOD_medium_level_distance + 1);

        mesh.position.x = -boundingSphere.center.x;
        mesh.position.y = -boundingSphere.center.y;
        mesh.position.z = -boundingSphere.center.z;

        lod.position.x = lod_position.x = boundingSphere.center.x;
        lod.position.y = lod_position.y = boundingSphere.center.y;
        lod.position.z = lod_position.z = boundingSphere.center.z;
        new THREE.Vector3(lod.position.x, lod.position.y, lod.position.y);

        this.m_scene.add(lod);

        this.m_lodlist.push({
            lodinstance: lod, lodposition: lod_position, lodposition: lod_position, medium_layer: LOD_level_medium, mediumdistance: LOD_medium_level_distance, high_layer: LOD_level_high, highdistance: LOD_high_level_distance
            , medium_loaded: false, high_loaded: false, high_level_instance_uuid: null, medium_level_instance_uuid: null
        })
    };


    this.monitorDistance = function () {

        var cameraposition = new THREE.Vector3();
        var loader = this.m_loader;
        var scene = this.m_scene;
        var renderer = this.m_renderer;
        var camera = this.m_camera;

        cameraposition.x = this.m_camera.position.x;
        cameraposition.y = this.m_camera.position.y;
        cameraposition.z = this.m_camera.position.z;

        var removemeshFromLod = function (lod, mesh, distance) {
            console.log("removemeshFromLod");
            if (lod.levels.length > 1) {
                var object = lod.getObjectForDistance(distance);
                //lod.remove(object);
                deleteobj(object);
                lod.remove(object);
                lod.levels.shift();
                lod.levels[0].object.visible = true;
            } else {
                console.log("ERROR: Attempt to remove mesh on lod with length" + lod.levels.length);
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
                    console.log("Adding high resolution");
                    element.high_loaded = true;

                } else if (element.high_loaded && (distance > element.highdistance)) {
                    if (element.high_level_instance_uuid) {
                        removemeshFromLod(element.lodinstance, null, element.highdistance);
                        element.high_loaded = false;
                        element.high_level_instance_uuid = null;
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
                        element.medium_level_instance_uuid = null;
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
