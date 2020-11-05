
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
      cell.name = "1";
      scene.add(cell);
    });

    loader.load("img/procariot/scene.gltf", (gltf) => {
      const cell = gltf.scene;
      cell.scale.set(3,3,3);
      cell.position.y = -0;
      cell.position.x = 0;
      cell.position.z = -0;
      cell.visible = false;
      cell.name = "3";
      scene.add(cell);
    });

    loader.load("img/animal/scene.gltf", (gltf) => {
      const cell = gltf.scene;
      cell.scale.set(5,5,5);
      cell.position.y =4;
      cell.position.x = 2;
      cell.position.z = -4;
      cell.visible = false;
      cell.name = "2";
      scene.add(cell);
      button.innerText = "⏭ Nächstes 3D-Modell 🔁";
      container.appendChild(button);
    });



  var i = 1;
   button.addEventListener("click", () => {
    const heading = document.getElementById("heading");
    const models = scene.children.filter(child => child.name != "light")
    .sort((a,b) => parseInt(a.name) - parseInt(b.name) );

    if( i%3 == 0){
      models[0].visible = true;
      heading.innerText = "Pflanzenzelle:";
      models[1].visible = false;
      models[2].visible = false;
      table.style.opacity = 1;
    }
    if(i%3 == 1){
      models[1].visible = true;
      heading.innerText = "Tierzelle:";
      models[0].visible = false;
      table.style.opacity = 0;
    }

    if(i%3 == 2){
      models[2].visible = true;
      models[0].visible = false;
      models[1].visible = false;
      heading.innerText = "Prokaryotische Zelle/ Bakterienzelle:";
    }

    i++;
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



function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}


function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

const table = document.createElement("table");
table.id = "plant";

generateTableHead(table, [ "Zahl", "Zellorganell"])      
generateTable(table, [{Zahl:1,
  Zellorganell:"Nucleolus",
},  {
  Zahl:2,
  Zellorganell: "Karyoplasma/ Zellkern (Nucleus)",
},  {
  Zahl:3,
  Zellorganell: "raues Endoplasmatisches Retikulum",
},  {
  Zahl:4,
  Zellorganell: "glattes Endoplasmatisches Retikulum",
},  {
  Zahl:5,
  Zellorganell: "Vakuole",
},  {
  Zahl:6,
  Zellorganell:"Goldi-Apparat",
} ,  {
  Zahl:7,
  Zellorganell:"Chloroplast",
},  {
  Zahl:8,
  Zellorganell:"Mitochondrien",
},  {
  Zahl:9,
  Zellorganell: "Vesikel",
},  {
  Zahl:10,
  Zellorganell: "weiteres Vesikel",
},  {
  Zahl: 11,
  Zellorganell: "Zellplasma",
},  {
  Zahl:12,
  Zellorganell: "Zellmembran/ Zellwand",
},  {
  Zahl : 13,
  Zellorganell: "Ribosome",
}]);

document.body.appendChild(table);