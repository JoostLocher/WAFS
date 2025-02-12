// console.log(THREE);
//three.js bron: https://threejs.org/docs/#manual/en/introduction/Loading-3D-models
//basis fbx loader bron: https://sbcode.net/threejs/loaders-fbx/

// scene
const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5)); // axes helper

// light
const light = new THREE.PointLight(0xffffff, 0.1);
// light.position.set(0.8, 1.4, 1.0); // niet nodig want fixed to camera
scene.add(light);


const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 1.5, 1.0);

// render
const canvasWebgl = document.querySelector(".canvasWebgl");
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvasWebgl, 
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // achtergond transparant

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
    object.position.set(0, 0.2, 0);
    scene.add(object);
    model = object;    
  },
  // (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
  // (error) => console.log(error)
);

// const stats = new Stats();             // fps screen niet nodig 
// document.body.appendChild(stats.dom);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateModelScale() {
  if (!model) return;

  if (window.innerWidth < 600) {
      model.scale.set(0.004, 0.004, 0.004);
      model.position.y = 0.5;
  } else if (window.innerWidth < 1200) {
      model.scale.set(0.0045, 0.0045, 0.0045);
      model.position.y = 0.4;
  } else {
      model.scale.set(0.005, 0.005, 0.005); 
      model.position.y = 0.2;
  }
}

window.addEventListener("resize", updateModelScale);

let rotationSpeed = 0.008;

window.addEventListener("wheel", (event) => {
  if (model) {
    rotationSpeed += event.deltaY * 0.0005;
  }
});


function animate() {
    requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += rotationSpeed; 
      rotationSpeed *= 0.95; // remt rotation af
      if (Math.abs(rotationSpeed) < 0.008) rotationSpeed = 0.008; 
    }


    light.position.copy(camera.position).add(new THREE.Vector3(0.8, 1.4, 0));

  controls.update();
  renderer.render(scene, camera);
//   stats.update(); 
}

updateModelScale();
animate();
