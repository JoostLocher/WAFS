console.log(THREE); // Check if Three.js is loaded

// scene
const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5)); // axes helper

// light
const light = new THREE.PointLight(0xffffff, 0.1);
// light.position.set(0.8, 1.4, 1.0);
scene.add(light);


const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 1.5, 1.0);

// render
const canvasWebgl = document.querySelector(".canvasWebgl");
// const renderer = new THREE.WebGLRenderer({ canvas: canvasWebgl });
// renderer.setSize(window.innerWidth, window.innerHeight);
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvasWebgl, 
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // background trancparent



// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);
controls.enableZoom = false;

//  fbx loader
let model;

const fbxLoader = new THREE.FBXLoader();
fbxLoader.load(
  "models/flowerRough.fbx",
  (object) => {
    object.scale.set(0.005, 0.005, 0.005);
    scene.add(object);
    model = object;
  },
  (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
  (error) => console.log(error)
);

// const stats = new Stats();
// document.body.appendChild(stats.dom);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let rotationSpeed = 0.008; // Initial rotation speed

window.addEventListener("wheel", (event) => {
  if (model) {
    rotationSpeed += event.deltaY * 0.0005; // Adjust multiplier for sensitivity
  }
});

function animate() {
    requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += rotationSpeed; // Apply rotation speed
      rotationSpeed *= 0.95; // Add friction to slow down over time
      if (Math.abs(rotationSpeed) < 0.008) rotationSpeed = 0.008; // Ensure it never stops completely
    }


    light.position.copy(camera.position).add(new THREE.Vector3(0.8, 1.4, 0));

  controls.update();
  renderer.render(scene, camera);
//   stats.update(); 
}

animate();
