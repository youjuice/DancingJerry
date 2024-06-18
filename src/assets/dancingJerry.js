import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

let dancingJerryModel = null;
let mixer = null;

export function loadDancingJerryModel(callback) {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
        process.env.PUBLIC_URL + '/assets/dancingJerry.glb',
        (gltf) => {
            console.log(gltf);
            dancingJerryModel = gltf.scene;
            dancingJerryModel.position.set(0, -5, -3);
            dancingJerryModel.scale.set(5, 5, 5);

            mixer = new THREE.AnimationMixer(dancingJerryModel);
            const actions = [];
            actions[0] = mixer.clipAction(gltf.animations[0]);
            console.log("Animations: ", actions[0]);
            actions[0].play();

            if (callback) callback(dancingJerryModel);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
        }
    );
}

export function danceJerry(percent) {
    if (mixer) {
        mixer.update(percent / 15); // percent에 따라 Mixer 업데이트
    }
}
