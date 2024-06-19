import * as THREE from 'three';
import { danceJerry, loadDancingJerryModel } from './counter.js';
import './style.css';

let scene, camera, renderer, character, light;
let clock, delta, totalElapsed = 0;

function setup() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 13);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Map 생성
    const landGeometry = new THREE.BoxGeometry(70, 70, 10);
    const landMaterial = new THREE.MeshBasicMaterial({ color: '#40E0D0', side: THREE.DoubleSide });
    const plane = new THREE.Mesh(landGeometry, landMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Jerry 모델 추가
    loadDancingJerryModel((dancingJerryModel) => {
        character = dancingJerryModel;
        scene.add(dancingJerryModel);
    });

    clock = new THREE.Clock();
    animate();
    window.addEventListener('resize', windowResize);
}

const bgm = new Audio();
bgm.src = "/assets/DNA.mp3";

const animations = [
    {
        start: 0,
        end: 60,
        action: function (percent) {
            if (character) {
                danceJerry(percent);
                camera.lookAt(character.position);
            }
        },
    },
    {
        start: 60,
        end: 70,
        action: function (percent) {
            if (character) {
                character.rotation.y = Math.PI * 2 * percent;
                camera.lookAt(character.position);
            }
        }
    },
    {
        start: 70,
        end: 100,
        action: function (percent) {
            if (character) {
                const jerryPosition = character.position.x;
                const targetX = 0;
                const moveAmount = 0.05;

                character.position.x = jerryPosition + (targetX - jerryPosition) * moveAmount;
                character.position.y = percent * 0.5;
                character.position.z = percent * 5;
                camera.lookAt(character.position);
            }
        }
    },
    {
        start: 0,
        end: 100,
        bgmStarted: false,
        action: function (percent) {
            if (!this.bgmStarted && percent >= 0 && percent < 0.7) {
                bgm.currentTime = 0;
                bgm.play();
                this.bgmStarted = true;
            } else if (percent >= 0.7) {
                bgm.pause();
                this.bgmStarted = false;
            }
        }
    }
];

function animate() {
    requestAnimationFrame(animate);

    delta = clock.getDelta();
    totalElapsed += delta;

    for (let i = 0; i < animations.length; i++) {
        const { start, end, action } = animations[i];
        const duration = end - start;
        if (totalElapsed >= start && totalElapsed < end) {
            const progress = (totalElapsed - start) / duration;
            action.call(animations[i], progress);
        }
    }

    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    updateSectionHeights();
}

function updateSectionHeights() {
    const sections = document.querySelectorAll('main section');
    const numSections = sections.length;
    const sectionHeight = window.innerHeight;

    sections.forEach(section => {
        section.style.height = sectionHeight + 'px';
    });

    // main 요소의 총 높이를 섹션 개수 * 화면 높이로 설정
    const main = document.querySelector('main');
    main.style.height = sectionHeight * numSections + 'px';
}

setup();
