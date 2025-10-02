import * as THREE from 'three';
import EffectsManager from './effects/EffectsManager.js';
import { initUI } from './ui/ui-controller.js';
import AudioPanelManager from './ui/components/audio/audio-panel-manager.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const effectsManager = new EffectsManager();
const audioPanelManager = new AudioPanelManager();

camera.position.z = 10;

function animate() {
    renderer.render(scene, camera);
    effectsManager.update(camera, scene, mousePosition);
}

renderer.setAnimationLoop(animate);

const mousePosition = new THREE.Vector2();

const onStart = async () => {
    // Initialize audio panel manager first
    await audioPanelManager.initialize();
    
    // Get audio analyzer before initializing effects
    const audioAnalyzer = audioPanelManager.audioController.getAudioAnalyzer();
    
    // Initialize effects manager
    effectsManager.initialize();
    
    // Set audio analyzer for all effects
    effectsManager.setAudioAnalyzer(audioAnalyzer);
    
    // Enable effects
    effectsManager.setEffectActive("ClickSnake", true);
    effectsManager.setEffectActive("RandomCubes", true); // Enable RandomCubes for beat testing
    
    // Initialize UI controller with renderer for gradient support
    initUI(effectsManager, scene, renderer);
    
    console.log('🎵 Audio-responsive effects ready! Upload an MP3 and watch the cubes dance! 🕺');
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
window.audioPanelManager = audioPanelManager;
window.scene = scene;
console.log('🚀 Three.js Visualizer initialized');
