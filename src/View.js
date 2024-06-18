import React from 'react'
import { useEffect,useRef,useContext} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Contxt from './Contx';
import earthIMG from '../src/earthIMG.jpg'
import sunIMG from '../src/sunIMG.jpg'
import { useState } from 'react';

export default function View() {

  const {speed}=useContext(Contxt)//speed of the earth
  const {date,setDate}=useContext(Contxt)//date of the earth's current position
  const {dateFeedBack,setDateFeedBack}=useContext(Contxt)
  
  {/* ---- boolean options ---------------------------------- */}
  const {autoR}=useContext(Contxt)//earth revolving mode
  const {lightHalf}=useContext(Contxt)//light half of the earth
  const {equ}=useContext(Contxt)//light half of the earth
  const {tropics}=useContext(Contxt)//cancer and capricon lines

  const ref = useRef();//the html element where scene is added into
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlRef = useRef(null)

  const [cameraPosition, setCameraPosition] = useState({x:0,y:20,z:0});
  const [pos,setPos] = useState(0);
  const [dateTemp,setDateTemp]=useState(0)
  const [autoRstore,setAutoRstore]=useState(autoR)


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
	2.05,  2.05,         // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);

//capricon
const curveTropic = new THREE.EllipseCurve(
	0,  0,            
	1.9,  1.9,         
	0,  2 * Math.PI,  
	false,            
	0                
);

const points2 = curve.getPoints( 50 );
const geometry5 = new THREE.BufferGeometry().setFromPoints( points2 );
const material5 = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const ellipse = new THREE.Line( geometry5, material5 );
ellipse.rotateX(1.5708)

const pointsCapricon = curveTropic.getPoints( 50 );
const geometryCapricon = new THREE.BufferGeometry().setFromPoints( pointsCapricon );
const capricon = new THREE.Line( geometryCapricon, material5 );
capricon.position.y-=0.7
capricon.rotateX(1.5708)

const pointsCancer = curveTropic.getPoints( 50 );
const geometryCancer = new THREE.BufferGeometry().setFromPoints( pointsCancer );
const cancer = new THREE.Line( geometryCancer, material5 );
cancer.position.y+=0.7
cancer.rotateX(1.5708)

if(tropics){earth.add(capricon);earth.add(cancer)}
if(equ){earth.add(ellipse)}else{earth.remove(ellipse)}
earth.rotateZ(0.4101524)

const width = 8;
const height = 8;
const intensity = 2;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 0, 0, 0 );
scene.add( rectLight )

//lightHalf-------------------------------

const curve3 = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	2.2,  2.2,         // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);

const points4 = curve3.getPoints( 50 );
const geometry3 = new THREE.BufferGeometry().setFromPoints( points4 );
const material3 = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
const ellipse3 = new THREE.Line( geometry3, material3 );
ellipse3.rotateZ(1.5708)
if(lightHalf){
  scene.add(ellipse3)
}else{
  scene.remove(ellipse3)
}

//Sun-----------------------------------------------------------------------------------------------
const geometry2 = new THREE.SphereGeometry( 2,32,32 );
const material2 = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load(sunIMG) } );
const sun = new THREE.Mesh( geometry2, material2 );
//scene.add( sun );

const pointLight = new THREE.PointLight( 0xffffff,10,15);//sun light
/* scene.add( pointLight );
pointLight.position.x=0
pointLight.position.y=0 */

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
let direction
const center = new THREE.Vector3(0, 0, 0);
const up = new THREE.Vector3(0, 0, 1); // Up vector

function animate() {
  controls.update();
	animationId=requestAnimationFrame( animate );
	//sun.rotation.y+=0.0025
  
  if(autoRstore){//if earth is set to revolve auto
      t -= 0.001*speed;
      if (t < 0) t = 1;
  }else{
      if(date>=1 && date<=184){t=185-date}
      else if(date>=185 && date<=365){t=550-date}
      t=t/365
  }
  
  //earth rotation
  earth.rotateOnAxis(new THREE.Vector3(0,1,0),0.01745)//around axis
  let point=curve2.getPoint(t);//revolution
  
	let vector = new THREE.Vector3(point.x, point.y, point.z)
	vector.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  earth.position.copy(vector)
  rectLight.lookAt(vector.x,vector.y,vector.z)
  renderer.render( scene, camera );

  //lightHalf rotation and position
  if(lightHalf){
    ellipse3.position.copy(vector)
    direction = new THREE.Vector3().subVectors(center, ellipse3.position).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
    ellipse3.quaternion.copy(quaternion);
  }

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

},[autoRstore,speed,date,lightHalf,equ,tropics])

useEffect(() => {
  if (!autoR) {
    setDate(dateTemp);
  }
  setAutoRstore(autoR)
}, [autoR]);

  return (
    <div ref={ref}>
    </div>
  )
}
