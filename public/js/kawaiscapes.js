import * as THREE from "/build/three.module.js";
import { FlyControls } from "/jsm/controls/FlyControls.js";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";
import Stats from "/jsm/libs/stats.module.js";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, 2, 4, 4000);
camera.position.set(2000, 2000, 2);
const pLight = new THREE.PointLight(0xffffff, 3, 10000);
pLight.position.set(0, 2000, 4);
scene.add(pLight);
scene.add(new THREE.AmbientLight(0x666666));

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
scene.add(light);

const loader2 = new THREE.TextureLoader();
const texture = loader2.load("./assets/kloppenheim_03.jpg", () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(renderer, texture);
    scene.background = rt;
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableKeys = true;
controls.keys = {
    LEFT: 37, //left arrow
    UP: 38, // up arrow
    RIGHT: 39, // right arrow
    BOTTOM: 40, // down arrow
};
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({
//     color: 0xad35a3,
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
//

// const controls = new FlyControls(camera, renderer.domElement);

// controls.movementSpeed = 1000;
// controls.domElement = renderer.domElement;
// controls.rollSpeed = Math.PI / 24;
// controls.autoForward = false;
// controls.dragToLook = false;

//

const loader = new GLTFLoader();
loader.load(
    "./assets/forest_diorama/scene.gltf",
    function (gltf) {
        console.log(gltf.scene.position);
        scene.add(gltf.scene);
        console.log("added");
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

window.addEventListener(
    "resize",
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    },
    false
);

const stats = Stats();
document.body.appendChild(stats.dom);

var animate = function () {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
}

animate();
