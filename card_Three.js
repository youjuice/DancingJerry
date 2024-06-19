import * as THREE from 'three';
import './card.css';
import {danceJerry, loadDancingJerryModel} from "./counter.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight / 3), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(0, 10, 10);
camera.position.z = 5;
scene.add(light);

let mixer;
let dancingJerryModel;
const clock = new THREE.Clock();

function setRendererSize() {
    const animationSection = document.getElementById('animationSection');
    const width = animationSection.clientWidth;
    const height = animationSection.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

document.getElementById('animationSection').appendChild(renderer.domElement);
window.addEventListener('resize', () => {
    setRendererSize();
});

loadDancingJerryModel((model) => {
    dancingJerryModel = model;
    scene.add(dancingJerryModel);

    mixer = new THREE.AnimationMixer(dancingJerryModel);
    const action = mixer.clipAction(model.animations[0]);
    action.play();
});

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    danceJerry(delta * 15);

    renderer.render(scene, camera);
}

animate();
setRendererSize();
