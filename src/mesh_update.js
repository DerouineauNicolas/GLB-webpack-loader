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
     mesh.geometry.computeBoundingSphere();
     mesh.position.x=-mesh.geometry.boundingSphere.center.x;
     mesh.position.y=-mesh.geometry.boundingSphere.center.y;
     mesh.position.z=-mesh.geometry.boundingSphere.center.z;
     lod.addLevel(mesh, (level/4)*mesh.geometry.boundingSphere.radius);

}

export default function MeshonLoad (gltf, loader, scene, camera, renderer, params, mouse, LOD_level_medium, LOD_level_medium_distance, LOD_level_high) {

    var boundingSphere;

    var lod = new THREE.LOD();
    var lodposition = new THREE.Vector3();
    var cameraposition = new THREE.Vector3();
    var higher_level_loaded = false;
    var medium_level_loaded = false;
    
    var raycaster = new THREE.Raycaster();
    lod.up.set(0,0,1);


    var mesh = loadAndMergeMesh(gltf);
    
    mesh.geometry.computeBoundingSphere();
    boundingSphere = mesh.geometry.boundingSphere;

    camera.position.z = 2*2123.5369085736793;
    
    lod.addLevel(mesh, 3*mesh.geometry.boundingSphere.radius);
    mesh.position.x=-boundingSphere.center.x;
    mesh.position.y=-boundingSphere.center.y;
    mesh.position.z=-boundingSphere.center.z;

    lod.position.x=lodposition.x=boundingSphere.center.x;
    lod.position.y=lodposition.y=boundingSphere.center.y;
    lod.position.z=lodposition.z=boundingSphere.center.z;
    new THREE.Vector3( lod.position.x, lod.position.y, lod.position.y);

    scene.add(lod);
    //For debug only, display tile bounding box
    /*var geometry = new THREE.SphereGeometry( boundingSphere.radius);
    var material = new THREE.MeshPhongMaterial({
        transparent: true,
        wireframe:true,
    });
    var mesh = new THREE.Mesh( geometry, material);
    mesh.position.x = boundingSphere.center.x;
    mesh.position.y = boundingSphere.center.y;
    mesh.position.z = boundingSphere.center.z;
    scene.add(mesh);*/

    const onProgress = () => { };


    const onError = (errorMessage) => {
        console.log(errorMessage);
    };

    

    function clicked(event) {


        if(!higher_level_loaded || !medium_level_loaded){
       
            cameraposition.x=camera.position.x;
            cameraposition.y=camera.position.y;
            cameraposition.z=camera.position.z;

            if(cameraposition.distanceTo(lodposition)<boundingSphere.radius){
                loader.load(LOD_level_high, gltf => loadHidherresolution(gltf, lod, 1), onProgress, onError);
                console.log("Adding high resolution");
                higher_level_loaded=true;
            }
            if(cameraposition.distanceTo(lodposition)<LOD_level_medium_distance){
                loader.load(LOD_level_medium, gltf => loadHidherresolution(gltf, lod, 1), onProgress, onError);
                console.log("Adding medium resolution");
                medium_level_loaded=true;
            }

        }

        if(params.enableRaytracing){

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObject(lod, true);

            console.log(intersects.length)

            if (intersects.length > 0) {

                var target = {
                    x: intersects[0].point.x,
                    y: intersects[0].point.y,
                    z: intersects[0].point.z
                }

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

    function scroll(event) {

        if(!higher_level_loaded || !medium_level_loaded){
       
            cameraposition.x=camera.position.x;
            cameraposition.y=camera.position.y;
            cameraposition.z=camera.position.z;

            if(!higher_level_loaded && cameraposition.distanceTo(lodposition)<boundingSphere.radius){
                loader.load(LOD_level_high, gltf => loadHidherresolution(gltf, lod, 1), onProgress, onError);
                console.log("Adding high resolution");
                higher_level_loaded=true;
            }
            if(!medium_level_loaded && cameraposition.distanceTo(lodposition)<LOD_level_medium_distance){
                loader.load(LOD_level_medium, gltf => loadHidherresolution(gltf, lod, 1), onProgress, onError);
                console.log("Adding medium resolution");
                medium_level_loaded=true;
            }

        }
    }

    renderer.domElement.addEventListener('mousedown', function (event) {
        clicked(event);
        camera.updateMatrixWorld();
    });

    renderer.domElement.addEventListener( 'wheel', function (event) {
        //console.log("scroll event")
        scroll(event);
        camera.updateMatrixWorld();
    });


};