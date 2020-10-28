
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

let button = document.createElement("button");
const clock = new THREE.Clock();


function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 600 / 400, 1, 5000);
  const container = document.getElementById('container');
  const renderer = new THREE.WebGLRenderer( {antialias: true});
  const light1 = new THREE.PointLight(0x404040, 3);
  light1.name = "light";
  light1.position.set(0, 70, 70);
  const light2 = new THREE.PointLight(0x404040, 5);
  light2.name = "light";
  light2.position.set(70,70,0)
  scene.background = new THREE.Color(0xD1D1D1);
  camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 30;
  camera.position.y = 30;
  camera.position.z = 30;

  scene.add(light2);
  scene.add(light1);


  let loader = new THREE.GLTFLoader();
    loader.load("img/plant/scene.gltf", (gltf) => {
      const cell = gltf.scene;
        cell.scale.set(10, 10, 10);
        cell.position.y += 5;
      scene.add(cell);
    });
  let loader2 = new THREE.GLTFLoader();
    loader2.load("img/animal/scene.gltf", (gltf) => {
      const cell = gltf.scene;
      cell.scale.set(5,5,5);
      cell.position.y =4;
      cell.position.x = 2;
      cell.position.z = -4;
      cell.visible = false;
      scene.add(cell);
      button.innerText = "⏭";
      container.appendChild(button);
    });


  var bool = false;
   button.addEventListener("click", () => {
    const heading = document.getElementById("heading");
    var models = scene.children.filter(child => child.name != "light");
    if(bool){
      models[0].visible = true;
      heading.innerText = "Pflanzenzelle:";
      models[1].visible = false;
    }
    if(!bool){
      models[1].visible = true;
      heading.innerText = "Tierzelle:";
      models[0].visible = false;
    }
    bool = !bool;
   });

 

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.screenSpacePanning = false;
  controls.minDistance = 7;
  controls.maxDistance = 22;
  controls.maxPolarAngle = Math.PI / 2.7;
 
  renderer.setSize(600, 400);
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  update(renderer, scene, camera, controls);
  
}

main();

function update(renderer, scene, camera, controls) {
  controls.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();
  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls);
  });
}