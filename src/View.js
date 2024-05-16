import React from 'react'
import { useEffect,useRef,useContext} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Contxt from './Contx';
import earthIMG from '../src/earthIMG.jpg'
import sunIMG from '../src/sunIMG.jpg'
import { useState } from 'react';
import { set } from 'date-fns';

export default function View() {

  const {speed}=useContext(Contxt)
  const {autoR}=useContext(Contxt)
  const {date,setDate}=useContext(Contxt)
  const {dateFeedBack,setDateFeedBack}=useContext(Contxt)

  const ref = useRef();//the html element where scene is added into
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlRef = useRef(null)
  const [cameraPosition, setCameraPosition] = useState({x:0,y:20,z:0});
  const [pos,setPos] = useState(0);
  const [dateTemp,setDateTemp]=useState(0)
  const [key,setKey]=useState(true)


useEffect(()=>{
//Basic scene setting ====================================================================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, (window.innerWidth*0.8) / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth*0.8, window.innerHeight );
if (ref.current.children.length === 0) {
  ref.current.appendChild(renderer.domElement);
}

const controls = new OrbitControls( camera, renderer.domElement );
controls.update()
//========================================================================================================



//Earth------------------------------------------------------------------------------------------------
const geometry = new THREE.SphereGeometry( 2,32,32 );
const material = new THREE.MeshStandardMaterial( { map:new THREE.TextureLoader().load(earthIMG) } );
const earth = new THREE.Mesh( geometry, material );
scene.add( earth );
earth.position.x=6

//Equator
const curve = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	2.2,  2.2,         // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);

const points2 = curve.getPoints( 50 );
const geometry5 = new THREE.BufferGeometry().setFromPoints( points2 );
const material5 = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const ellipse = new THREE.Line( geometry5, material5 );
ellipse.rotateX(1.5708)
earth.add(ellipse)
earth.rotateZ(0.4101524)


//Sun-----------------------------------------------------------------------------------------------
const geometry2 = new THREE.SphereGeometry( 2,32,32 );
const material2 = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load(sunIMG) } );
const sun = new THREE.Mesh( geometry2, material2 );
scene.add( sun );

const pointLight = new THREE.PointLight( 0xffffff,10,15);//sun light
scene.add( pointLight );
pointLight.position.x=0
pointLight.position.y=0

const light = new THREE.AmbientLight( 0x404040); // soft white light
scene.add( light );

//sunlight toward earth

//Rotation axis of earth---------------------------------- ---------------------
const materialRTAX = new THREE.LineBasicMaterial({
	color: 0x0000ff
});
const pointsRTAX = [];
pointsRTAX.push( new THREE.Vector3( 0,3,0 ) );
pointsRTAX.push( new THREE.Vector3( 0,-3,0 ) );

const geometryRTAX = new THREE.BufferGeometry().setFromPoints( pointsRTAX );
const lineRTAX = new THREE.Line( geometryRTAX, materialRTAX );
earth.add( lineRTAX );

//Earth trajectory
const curve2 = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	8, 	8,             // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);
const points3 = curve2.getPoints( 365 );
const geometry6 = new THREE.BufferGeometry().setFromPoints( points3 );
const material6 = new THREE.LineBasicMaterial( { color: 0xffffff } );
const ellipse2 = new THREE.Line( geometry6, material6 );
ellipse2.rotateX(1.5708)
scene.add(ellipse2)

camera.position.z = cameraPosition.z;
camera.position.x = cameraPosition.x;
camera.position.y = cameraPosition.y;

//=======================================================================================================
//=========================           Animation                   =======================================
//=======================================================================================================
let t=pos
let animationId
function animate() {
  controls.update();
	animationId=requestAnimationFrame( animate );
	sun.rotation.y+=0.0025
  
  if(autoR){//if earth is set to revolve auto
      t -= 0.001*speed;
      if (t < 0) t = 1;
  }else{
      if(dateTemp>=1 && dateTemp<=184){t=185-dateTemp}
      else if(dateTemp>=185 && dateTemp<=365){t=550-dateTemp}
      t=t/365
  }
  
  //earth rotation
  earth.rotateOnAxis(new THREE.Vector3(0,1,0),0.01745)//around axis
  let point=curve2.getPoint(t);//revolution
  
	let vector = new THREE.Vector3(point.x, point.y, point.z)
	vector.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  earth.position.copy(vector)

  renderer.render( scene, camera );

  //keep camera positions stored , not to change the orbit controls
  setCameraPosition({x:camera.position.x,y:camera.position.y,z:camera.position.z})
  setPos(t)

  //date store to pick up the date left 
  let tmp=Math.ceil(t*365)
  if(tmp>=1 && tmp<=184){tmp=185-tmp}
  else if(tmp>=185 && tmp<=365){tmp=550-tmp}
  setDateTemp(tmp)
  setDateFeedBack(tmp)
}
animate();

sceneRef.current = scene;
cameraRef.current = camera;
rendererRef.current = renderer;
controlRef.current = controls

return () => {
  renderer.domElement.remove();
  renderer.dispose();
};

},[autoR,date,speed])


  return (
    <div ref={ref}>
    </div>
  )
}
