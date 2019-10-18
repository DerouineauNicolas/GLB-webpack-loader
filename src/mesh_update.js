import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';



function loadAndMergeMesh(gltf){

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

    var geometry = BufferGeometryUtils.mergeBufferGeometries( geometries, true);
    var material = new THREE.MultiMaterial(materials);
    material.wireframe = true;
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;

}

function loadHidherresolution(gltf, lod, level){
     var mesh = loadAndMergeMesh(gltf);
     console.log("Adding higher resolution");
     mesh.geometry.computeBoundingSphere();
     lod.addLevel(mesh, level*mesh.geometry.boundingSphere.radius);
}

export default function MeshonLoad (gltf, loader, scene, camera, renderer, params, mouse, LOD_level) {

    var boundingSphere;

    var lod = new THREE.LOD();
    var raycaster = new THREE.Raycaster();


    var mesh = loadAndMergeMesh(gltf);
    
    mesh.geometry.computeBoundingSphere();
    boundingSphere = mesh.geometry.boundingSphere;

    camera.position.z = 3 * Math.abs(mesh.geometry.boundingSphere.radius);
    
    lod.addLevel(mesh, 3*mesh.geometry.boundingSphere.radius);
    scene.add(lod);

    const onProgress = () => { };


    const onError = (errorMessage) => {
        console.log(errorMessage);
    };

    loader.load(LOD_level, gltf => loadHidherresolution(gltf, lod, 1), onProgress, onError);

    function clicked(event) {

        if(params.enableRaytracing){

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObject(lod, true);

            console.log(intersects.length)

            if (intersects.length > 0) {
                /*var position = {
                    x: controls.target.x,
                    y: controls.target.y,
                    z: controls.target.z
                };
                console.log("position", position);*/

                var target = {
                    x: intersects[0].point.x,
                    y: intersects[0].point.y,
                    z: intersects[0].point.z
                }

                console.log("target", target);
                console.log("clicked");

                var geometry = new THREE.BoxBufferGeometry( boundingSphere.radius/10, boundingSphere.radius/10, boundingSphere.radius/10 );
                var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
                var mesh = new THREE.Mesh( geometry, material );
                mesh.position.set(target.x,target.y,target.z);
                console.log("Adding geometry");
                scene.add( mesh );


            } else {

                INTERSECTED = null;
            }
        }
    }

    renderer.domElement.addEventListener('mousedown', function (event) {
        // find intersections

        clicked(event);
        camera.updateMatrixWorld();

    });

};