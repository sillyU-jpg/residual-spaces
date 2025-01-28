import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
camera.position.z = 8;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  // add a resizing function so that the rendering resolution changes to match the resolution.
  //instead of stretching or misforming
});
const ambientlight = new THREE.AmbientLight(0xffffff)
let threeDScan; // initialize object for my 3d scan

scene.add(ambientlight)




const controls = new OrbitControls( camera, renderer.domElement);
controls.enableZoom = true;


const modelFileList = [
  {name: 'hallway', file: 'models/hallway.glb', loc:'0,0,0'} ,
   {name: 'station', file:'models/station.glb', loc:'-0.846, -0.0088, -0.3.3671'},
    {name:'grafiti', file: 'models/graffiti.glb', loc:'-1.933, 2.098, 2.203'},
    {name:'obscure-graff', file:'models/obscure-graffiti.glb', loc:'0,0,0'},
    {name:'sky-world', file: 'models/sky-world.glb', loc:'0,0,0'},
    {name:'arts', file: 'models/arts.glb', loc:'0,0,0'},
    {name: 'pathway', file: 'models/pathway.glb', loc:'-1.89, 0.622, 0.536'},
    {name: 'bike', file: 'models/bike.glb', loc:'-1.89, 0.622, 0.536' }
]
function getRandomFile() {
  const randomIndex = Math.floor(Math.random() * modelFileList.length); 
  // Random index
  return modelFileList[randomIndex].file; // Access the 'file' property of the selected object
}




renderer.setPixelRatio(window.devicePixelRatio/ 2); 





const randomFile = getRandomFile();
let loader = new GLTFLoader();

//draco compression loader
const dLoader = new DRACOLoader()
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
dLoader.setDecoderConfig({type: 'js'})
loader.setDRACOLoader(dLoader)

    loader.load(randomFile, function(gltf) {
      
        console.log(gltf);
        const root = gltf.scene;
        root.scale.set(1,1,1);
        
        threeDScan = root;
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        
    }
    )
    let currentFile = randomFile

    const modelGallery = document.getElementById('scenelist')

modelFileList.forEach((element) => {
let sceneTitle = document.createElement('button')
sceneTitle.innerText = element.name;
sceneTitle.style.cursor = 'pointer';



let isLoading = false;

sceneTitle.addEventListener('click', () => {
  if (isLoading || element.file === currentFile) {
    
    return;
  }

  isLoading = true;

  loader.load(element.file, function (gltf) {
    needsUpdate = true;
    
    clearScene(scene);
    scene.add(ambientlight);

    const root = gltf.scene;
    root.scale.set(1, 1, 1);

    scene.add(gltf.scene);
    currentFile = element.file;
    isLoading = false; // Reset the flag after loading is complete
  });
});


sceneTitle.className = 'titleItem';

    // Append the image to the gallery
    modelGallery.appendChild(sceneTitle);
})







function clearScene(scene) {
  while (scene.children.length > 0) {
    const object = scene.children[0];
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
      } else {
        object.material.dispose();
      }
    }
    if (object.texture) object.texture.dispose();
    scene.remove(object);
  }
}


let needsUpdate = true;

controls.addEventListener('change', () => {
  needsUpdate = true;
});

function animate() {
  
  if (needsUpdate) {
    renderer.render(scene, camera);
    needsUpdate = false;
  }
  requestAnimationFrame(animate);
}





//webgj CHECK BEFORE RENDER ( RENDER HAPPENS HERE )

if ( WebGL.isWebGL2Available() ) {

	// Initiate function or other initializations here
    renderer.setAnimationLoop( animate ); //HERE

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

const sidebar = document.getElementById('sidebararrow') 

function sidebarCollapse() {
sidebar.style.maxHeight = '500px'
}
