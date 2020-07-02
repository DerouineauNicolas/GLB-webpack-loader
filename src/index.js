import SceneManager from './3D.js';
import $ from "jquery";

window.addEventListener("DOMContentLoaded", (event) => {
    var manager = new SceneManager();
    manager.LoadAsset("Nicolasd.glb");
});