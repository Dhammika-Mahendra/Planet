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
  const {poleCircles}=useContext(Contxt)//if pole circles on
  const {earthAxis}=useContext(Contxt)//if earth axis on
  const {sunRay}=useContext(Contxt)//if perpendicular sun ray on
  const {sunSph}=useContext(Contxt)//if sun is on

  const {trackCam}=useContext(Contxt)//track camera

  const ref = useRef();//the html element where scene is added into
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlRef = useRef(null)

  const {setCam}=useContext(Contxt)
  const {cam}=useContext(Contxt)//imediate camera position button states
  const [camLookAt,setCamLookAt]=useState({x:0,y:0,z:0})//store where camera look at, bec when cam property cahnges its settings are overridden by controls.update()
  const [cameraPosition, setCameraPosition] = useState({x:0,y:20,z:0});
  const [pos,setPos] = useState(0);
  const [dateTemp,setDateTemp]=useState(0)
  const [autoRstore,setAutoRstore]=useState(autoR)


useEffect(()=>{
//======================================================================================================= 
//=================           Basic scene setting           =============================================
//=======================================================================================================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, (window.innerWidth*0.8) / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth*0.8, window.innerHeight );
if (ref.current.children.length === 0) {
  ref.current.appendChild(renderer.domElement);
}

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 0.1
controls.target.set(camLookAt.x,camLookAt.y,camLookAt.z)
controls.update()

//=======================================================================================================
//=========================          Objects                   ==========================================
//=======================================================================================================

//Earth----------------------------------------------
const geometry = new THREE.SphereGeometry( 2,32,32 );
const material = new THREE.MeshStandardMaterial( { map:new THREE.TextureLoader().load(earthIMG) } );
const earth = new THREE.Mesh( geometry, material );
scene.add( earth );
earth.position.x=6

//Rotation axis of earth
const materialRTAX = new THREE.LineBasicMaterial({
	color: 0x0000ff
});
const pointsRTAX = [];
pointsRTAX.push( new THREE.Vector3( 0,3,0 ) );
pointsRTAX.push( new THREE.Vector3( 0,-3,0 ) );

const geometryRTAX = new THREE.BufferGeometry().setFromPoints( pointsRTAX );
const lineRTAX = new THREE.Line( geometryRTAX, materialRTAX );
if(earthAxis){earth.add( lineRTAX )}

//lightHalf circle of the earth
const curve3 = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	2.03,  2.03,         // xRadius, yRadius
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

//Equator
const curve = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	2,  2,            // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);

//capricon
const curveTropic = new THREE.EllipseCurve(
	0,  0,            
	1.87,  1.87,         
	0,  2 * Math.PI,  
	false,            
	0                
);

//poles
const curvePole = new THREE.EllipseCurve(
	0,  0,            
	0.8,  0.8,         
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
capricon.position.y-=0.76
capricon.rotateX(1.5708)

const pointsCancer = curveTropic.getPoints( 50 );
const geometryCancer = new THREE.BufferGeometry().setFromPoints( pointsCancer );
const cancer = new THREE.Line( geometryCancer, material5 );
cancer.position.y+=0.76
cancer.rotateX(1.5708)

const pointsPoleN = curvePole.getPoints( 30 );
const geometryPoleN = new THREE.BufferGeometry().setFromPoints( pointsPoleN );
const poleN = new THREE.Line( geometryPoleN, material5 );
poleN.position.y+=1.85
poleN.rotateX(1.5708)

const pointsPoleS = curvePole.getPoints( 30 );
const geometryPoleS = new THREE.BufferGeometry().setFromPoints( pointsPoleS );
const poleS = new THREE.Line( geometryPoleS, material5 );
poleS.position.y-=1.85
poleS.rotateX(1.5708)

if(tropics){earth.add(capricon);earth.add(cancer);}
if(poleCircles){earth.add(poleN);earth.add(poleS);}
if(equ){earth.add(ellipse)}else{earth.remove(ellipse)}
earth.rotateZ(0.4101524)

//Light source ================================================================
const width = 8;
const height = 8;
const intensity = 2;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 0, 0, 0 );
scene.add( rectLight )

//Sun-----------------------------------------------------------------------------------------------
const geometry2 = new THREE.SphereGeometry( 2,32,32 );
const material2 = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load(sunIMG) } );
const sun = new THREE.Mesh( geometry2, material2 );
if(sunSph){scene.add( sun )}


const light = new THREE.AmbientLight( 0x404040); // soft white light
scene.add( light );

//sunlight toward earth----------------------------------------------------------
const geometryRay = new THREE.BufferGeometry();
const verticesRay = new Float32Array([
    0, 0, 0,  // Start point
    8, 0, 0   // End point
]);
geometryRay.setAttribute('position', new THREE.BufferAttribute(verticesRay, 3))
const materialRay = new THREE.LineBasicMaterial({ color: 0xffff00 });
const line = new THREE.Line(geometryRay, materialRay);
if(sunRay){scene.add(line)}

//Earth trajectory--------------------------------------------------------------
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
let dateOffset;

function animate() {
  controls.update()
	animationId=requestAnimationFrame( animate );
	sun.rotation.y+=0.0025
  
  if(autoRstore){//if earth is set to revolve auto
      t -= 0.001*speed;
      if (t < 0) t = 1;
  }else{
      //offset by 12--------
      dateOffset=date
      if(date>352){
        dateOffset=date-352
      }else{
        dateOffset=date+13
      }
      //---------------------
      if(dateOffset>=1 && dateOffset<=184){t=185-dateOffset}
      else if(dateOffset>=185 && dateOffset<=365){t=550-dateOffset}
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

  //light ray from sun to earth
  if(sunRay){
    const positions = geometryRay.attributes.position.array
    positions[3] = vector.x
    positions[4] = vector.y
    positions[5] = vector.z
    geometryRay.attributes.position.needsUpdate = true;
  }

  //Check for imediate camera postion buttons
  if(cam!==''){
    switch(cam){
      case 'top':{
        camera.position.y=7
        camera.position.x=vector.x
        camera.position.z=vector.z
        setCamLookAt({x:vector.x,y:0,z:vector.z})
        setCam('')
      } break;
      case 'bottom':{
        camera.position.y=-7
        camera.position.x=vector.x
        camera.position.z=vector.z
        setCamLookAt({x:vector.x,y:0,z:vector.z})
        setCam('')
      } break;
      case 'left':{
        const direction = new THREE.Vector3().subVectors(vector,new THREE.Vector3(0, 0, 0)).normalize()
        const up = new THREE.Vector3(0, 1, 0); // Up vector
        const perpendicular = new THREE.Vector3().crossVectors(direction, up).normalize();
        if (perpendicular.length() === 0) {
          perpendicular.crossVectors(direction, new THREE.Vector3(1, 0, 0)).normalize();
        }
        const newVector = new THREE.Vector3().addVectors(vector, perpendicular.multiplyScalar(7));
        camera.position.copy(newVector)
        setCamLookAt({x:vector.x,y:0,z:vector.z})
        setCam('')
      } break;
      case 'right':{
        const direction = new THREE.Vector3().subVectors(vector,new THREE.Vector3(0, 0, 0)).normalize()
        const up = new THREE.Vector3(0, 1, 0); // Up vector
        const perpendicular = new THREE.Vector3().crossVectors(direction, up).normalize();
        if (perpendicular.length() === 0) {
          perpendicular.crossVectors(direction, new THREE.Vector3(1, 0, 0)).normalize();
        }
        const newVector = new THREE.Vector3().addVectors(vector, perpendicular.multiplyScalar(-7));
        camera.position.copy(newVector)
        setCamLookAt({x:vector.x,y:0,z:vector.z})
        setCam('')
      } break;
    }
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

},[autoRstore,speed,date,lightHalf,equ,tropics,cam,poleCircles,sunRay,earthAxis,trackCam,sunSph])

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
