const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 5000 );

//scene.background = new THREE.Color(0x757575)

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true,});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = false;
controls.enableRotate = true;
controls.enableDamping = false;

document.body.appendChild( renderer.domElement );

camera.position.z = 200;

	
/*const mtlLoader = new THREE.MTLLoader();
mtlLoader.load("3d/WALLET.mtl", function(materials){
	materials.preload();
	const objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.load("3d/WALLET.obj", function(object){
		scene.add(object);
	});
});*/

const gltfLoader = new THREE.GLTFLoader();
const url = "3d/wallet.glb";
gltfLoader.load(url, (gltf) => {
	const wallet = gltf.scene;
    	scene.add(wallet);

const lights = new THREE.HemisphereLight(0x2cf8ca, 0x080820, 1);
scene.add(lights);

const lightAmb = new THREE.AmbientLight(0x777777,0.1);
scene.add(lightAmb);

const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
};

animate();
controls.update();
