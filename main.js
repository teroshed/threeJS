import * as THREE from 'three';
import EffectsManager from './effects/EffectsManager.js';
import { initUI } from './ui/ui-controller.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const effectsManager = new EffectsManager();

camera.position.z = 10;

function animate() {
    renderer.render(scene, camera);
    effectsManager.update(camera, scene, mousePosition);
}

renderer.setAnimationLoop(animate);

const mousePosition = new THREE.Vector2();

const onStart = () => {
    effectsManager.initialize();
    effectsManager.setEffectActive("ClickSnake", true);
    
    // Initialize UI controller with renderer for gradient support
    initUI(effectsManager, scene, renderer);
}

onStart();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('keydown', (event) => {
    if(event.key === ' ') {
        effectsManager.clearEffects();
    }
});

renderer.domElement.addEventListener('mouseup', () => {
    effectsManager.updateMouseDown(false);
});

renderer.domElement.addEventListener('mousedown', (event) => {
    effectsManager.updateMouseDown(true);
});

renderer.domElement.addEventListener('mousemove', (event) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    effectsManager.updateMousePosition(mousePosition);
});

// Export for debugging
window.effectsManager = effectsManager;
window.scene = scene;
console.log('🚀 Three.js Visualizer initialized');
