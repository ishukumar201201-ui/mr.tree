// 1. Texture Loader setup karo
const textureLoader = new THREE.TextureLoader();

// 2. High-quality Earth ki photo load karo (Yeh external link direct kaam karega)
const earthTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');

// 3. Geometry aur Material ko combine karke realistic Earth banao
const geometry = new THREE.SphereGeometry(5, 64, 64); // Smooth round sphere
const material = new THREE.MeshStandardMaterial({
    map: earthTexture,    // Solid color ki jagah ab texture lagega
    roughness: 0.4,       // Paani pe halki shine ke liye
    metalness: 0.1
});

const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

// 4. Earth ko gol ghumane ke liye (Animation Loop mein add karo)
function animate() {
    requestAnimationFrame(animate);
    
    // Yaha se earth ghumegi
    earthMesh.rotation.y += 0.002; 
    
    renderer.render(scene, camera);
}
animate();