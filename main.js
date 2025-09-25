import * as THREE from 'three';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry(1, 3, 2);
const material = new THREE.MeshBasicMaterial({color: 0xCE3CD6});
const cube = new THREE.Mesh( geometry, material );

cube.rotation.x += 0.5;
cube.rotation.y += 0.2;

// scene.add(cube);

camera.position.z = 5;

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


const cubePosition = {
    x: 0.1,
    y: 0
}

var lastPosition = {
    x: 0,
    y: 0
}

const cubeArray = [
    {
        dimensions: {a: 1, b: 3, c: 2},
        position: {x: 0, y: 0, z: 0},
        color: {r: 100, g: 0, b: 0}
    }
];

const mouse = new THREE.Vector2();

var mouseDown = false;


const createCube = (dimensions , position, color) => {
    const geometry = new THREE.BoxGeometry(dimensions.a, dimensions.b, dimensions.c);

    let r, g, b;
    r = color & 0xFF;
    g = (color >> 8) & 0xFF;
    b = (color >> 16) & 0xFF;
    const material = new THREE.MeshBasicMaterial({color: new THREE.Color(r, g, b)});
    const cube = new THREE.Mesh( geometry, material );
    cubeArray.push(cube);
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;
    scene.add(cube);
}


const createRandomCube = () => {
    createCube(
    {a: Math.random() , b: Math.random(), c: Math.random()/2 }, 
    {x: -0.5 +Math.random() , y: Math.random() , z: -4 + Math.random()*10}, 
    {r: 100, g: 0, b: 0});
}

const onStart = () => {
    cube.position.x = cubePosition.x;
    cube.position.y = cubePosition.y;
    console.log("Started");
    lastPosition.x = cube.position.x;
    lastPosition.y = cube.position.y;


    // createCube({a: 1, b: 3, c: 2}, {x: 0, y: 0, z: -0.1});
    //create random cube     
    
    setInterval(() => {
        if(cubeArray.length > 10){
            for(let i = 10; i < cubeArray.length; i++){
                
            }

        }
    }, 1000/30);

    setInterval(() => {
        if(mouseDown){
            // createRandomCube();
            
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            // Create a plane at z=0 to intersect with
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const intersectionPoint = new THREE.Vector3();
            
            // Find intersection point
            raycaster.ray.intersectPlane(plane, intersectionPoint);

            createCube(
                {a: 0.5, b: 0.5, c: 0.5}, 
                {x: intersectionPoint.x, y: intersectionPoint.y, z: intersectionPoint.z - 0.1 + Math.random()*0.2}, 
                Math.random() * 0xFFFFFF
            );
        }
    }, 1000/30);
}

onStart();







window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    if(event.key === ' ') {  // Space key is ' ' not 'space'
        console.log("SPACE")
        
        cubeArray.forEach(cube => {
            scene.remove(cube);
        });
        cubeArray.length = 0;
    }
});

renderer.domElement.addEventListener('mouseup', () => {
    mouseDown = false;

});

renderer.domElement.addEventListener('mousedown', (event) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    

    // Create a raycaster
    
    
    // console.log('Mouse position:', event.clientX, event.clientY);
    // console.log('3D world position:', intersectionPoint.x, intersectionPoint.y, intersectionPoint.z);
    
    // Create cube at the intersection point
    
    mouseDown = true;
});

renderer.domElement.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


});

console.log(THREE);