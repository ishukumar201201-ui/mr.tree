// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const container = document.getElementById('canvas-container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create the Earth (Sphere)
// Hum ek green color ka globe bana rahe hain jaisa map me hota hai
const geometry = new THREE.SphereGeometry(3, 64, 64);

// Textures load karna advance hai, isliye abhi basic wireframe + solid material use kiya hai
const material = new THREE.MeshStandardMaterial({ 
    color: 0x2d6a4f, // Forest Green
    wireframe: false,
    roughness: 0.5
});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

camera.position.z = 7;

// Variables for Mouse interaction
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Mouse Events for Rotation
renderer.domElement.addEventListener('mousedown', function(e) { isDragging = true; });
renderer.domElement.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };
        earth.rotation.y += deltaMove.x * 0.01;
        earth.rotation.x += deltaMove.y * 0.01;
    }
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
});
document.addEventListener('mouseup', function(e) { isDragging = false; });

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    // Auto-rotate slightly
    if (!isDragging) {
        earth.rotation.y += 0.002;
    }
    renderer.render(scene, camera);
}
animate();