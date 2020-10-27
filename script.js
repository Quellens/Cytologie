
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */


const clock = new THREE.Clock();

function main() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
  const camera = new THREE.PerspectiveCamera(75, 600 / 400, 1, 5000);
  camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 80;
  camera.position.y = 20;
  camera.position.z = 20;
  const floor = generateFloor(1000, 1000);
  const directionalLight = new THREE.DirectionalLight(0x404f4f, 0);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  const hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);
  //scene.add(directionalLight);
  floor.position.y = -10;

  let loader = new THREE.GLTFLoader();
  loader.load("img/scene.gltf", (gltf) => {
    const cell = gltf.scene.children[0];
    cell.scale.set(10, 10, 10);
    const textureLoader = new THREE.TextureLoader();
    
    console.log(cell);
    cell.children[0].children[0].traverse((child) => {
       
        if(child.name.includes("001")){
            let mat = new THREE.MeshStandardMaterial({color: "rgb(255,255,255)"});
            child.material = mat;
            mat.map = textureLoader.load("img\ textures\ Material.001_specularGlossiness.png")
            console.log(child);
        }
      
    })


    camera.lookAt(new THREE.Vector3(cell.position.x, cell.position.y, cell.position.z));
    scene.add(cell);
  });
    scene.add(floor);

  const renderer = new THREE.WebGLRenderer( {antialias: true});
    // eslint-disable-next-line no-unused-vars
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  const container = document.getElementById('container');
  renderer.setSize(600, 400);
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  update(renderer, scene, camera);
  
}

main();

function update(renderer, scene, camera) {
   
  // camera.position.copy(playerObjectHolder.position).add(new THREE.Vector3(7, 3, 7));
  renderer.render(scene, camera);
  const delta = clock.getDelta();
  requestAnimationFrame(() => {
    update(renderer, scene, camera);
  });
}


function generateFloor(w, d) {
  const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/brick_diffuse.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(40, 40);
  const geo = new THREE.PlaneGeometry(w, d, 1, 1);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xEB6534,
    map: texture,

  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.material.side = THREE.DoubleSide;
  mesh.rotation.x = THREE.Math.degToRad(-90);
  return mesh;
}
