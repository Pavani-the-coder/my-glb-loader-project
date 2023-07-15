import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const canvas = document.querySelector('canvas.webgl')


const fileInput = document.getElementById('file-input');
    const selectedFile = document.getElementById('selected-file');
    const errorMessage = document.getElementById('error-message');
    //const canvasContainer = document.getElementById('canvas-container');

    fileInput.addEventListener('change', handleFileUpload);

    function handleFileUpload(event) {
      const file = event.target.files[0];
      
      if (file) {
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop();
        if (fileExtension.toLowerCase() !== 'glb') {
          errorMessage.textContent = 'Please select a GLB file.';
          selectedFile.textContent = '';
          fileInput.value = '';
          return;
        }
        if (fileExtension.toLowerCase() === 'glb'){
          console.log("uploaded successfully")

        }
        
        selectedFile.textContent = `Selected File: ${fileName}`;
        errorMessage.textContent = '';
        // You can perform further operations with the GLB file here
		const reader = new FileReader();
        reader.onload = function(event) {
          const contents = event.target.result;
          displayGLBModel(contents);
        };
        reader.readAsArrayBuffer(file);
      }
    }


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 2
scene.add(camera)
const color1=new THREE.Color('skyblue')
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

var spotLight = new THREE.SpotLight( color1 )
spotLight.position.set(-40,60,-10)
scene.add(spotLight)
function displayGLBModel(contents){
gltfLoader.parse(
    contents,'',
    function(glb) 
    {
        scene.add(glb.scene)
        console.log(glb)

    }
)

const cursor ={x:0, y:0}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -( event.clientY / sizes.width - 0.5)
})


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)



window.addEventListener('dblclick',() =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})


window.addEventListener('resize', () => 
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()    

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
const animate = () =>
{

    renderer.render(scene, camera)
    controls.update()

    window.requestAnimationFrame(animate)
}

animate()

}


