import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { Raycaster } from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


window.addEventListener('resize', () => {
    renderer.setSize(window.clientWidth, container.clientHeight);
  });
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const ambientlight = new THREE.AmbientLight(0xffffff)
const pointLight = new THREE.PointLight( 0xffffff, 15 );



const loader = new OBJLoader();

const cube = new THREE.Mesh( geometry, material );

scene.add( cube );
scene.add(ambientlight)
scene.add( pointLight );

const controls = new OrbitControls( camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;

let loadedObject; // Declare the variable in the outer scope

loadedObject = loader.load(
  'title.obj', // Path to the OBJ file
  (object) => {
    // This function is called when the OBJ file is loaded

    loadedObject = object; // Assign the loaded object to the outer variable
    scene.add(object);
    object.position.y = 4;
    object.position.x = -10;
    object.scale.setScalar(0.3);

    console.log('OBJ loaded successfully:', object);
  }
);

// You can now use `loadedObject` later, but ensure it's loaded


camera.position.z = 8;
function animate() {
 
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    
	renderer.render( scene, camera );
}





//webgj CHECK BEFORE RENDER ( RENDER HAPPENS HERE )

if ( WebGL.isWebGL2Available() ) {

	// Initiate function or other initializations here
    renderer.setAnimationLoop( animate ); //HERE

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}