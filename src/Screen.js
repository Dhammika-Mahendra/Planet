import React from 'react'
import { useState } from 'react';
import { useEffect,useRef,useContext} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Contxt from './Contx';
import earthIMG from '../src/earthIMG.jpg'
import sunIMG from '../src/sunIMG.jpg'

export default function Screen() {

  const {speed,setSpeed}=useContext(Contxt)

  const ref = useRef();

useEffect(()=>{

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, (window.innerWidth*0.8) / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth*0.8, window.innerHeight );
if (ref.current.children.length === 0) {
  ref.current.appendChild(renderer.domElement);
}

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

//light (for sun)-------------------------------------------------------------------
const pointLight = new THREE.PointLight( 0xffffff,10,15 );
scene.add( pointLight );
pointLight.position.x=0
pointLight.position.y=0

//Earth------------------------------------------------------------------
const geometry = new THREE.SphereGeometry( 2,32,32 );
const material = new THREE.MeshStandardMaterial( { map:new THREE.TextureLoader().load(earthIMG) } );
const earth = new THREE.Mesh( geometry, material );
scene.add( earth );
earth.position.x=6

//Equator----------------------------------------------------------------
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
earth.rotateZ(-0.4101524)

//Sun
const geometry2 = new THREE.SphereGeometry( 2,32,32 );
const material2 = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load(sunIMG) } );
const sun = new THREE.Mesh( geometry2, material2 );
scene.add( sun );

//Rotation axis of earth-------------------------------------------------------
const material3 = new THREE.LineBasicMaterial({
	color: 0x0000ff
});
const points = [];
points.push( new THREE.Vector3( 0,3,0 ) );
points.push( new THREE.Vector3( 0,-3,0 ) );

const geometry3 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry3, material3 );
earth.add( line );

//Earth trajectory
const curve2 = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	8, 	6,             // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);
const points3 = curve2.getPoints( 50 );
const geometry6 = new THREE.BufferGeometry().setFromPoints( points3 );
const material6 = new THREE.LineBasicMaterial( { color: 0xffffff } );
const ellipse2 = new THREE.Line( geometry6, material6 );
ellipse2.rotateX(1.5708)
scene.add(ellipse2)

camera.position.z = 15;

let t=0
let animationId
function animate() {
    controls.update();
    earth.rotateOnAxis(new THREE.Vector3(0,1,0),0.01745)
	  animationId=requestAnimationFrame( animate );
	  sun.rotation.y+=0.0025

    t += 0.001;
    if (t > 1) t = 0;
  
    let point = curve2.getPoint(t);
	  let vector = new THREE.Vector3(point.x, point.y, point.z)
	  vector.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    earth.position.copy(vector)

	  renderer.render( scene, camera );
}
animate();

  return () => {
    cancelAnimationFrame(animationId); // Cancel the animation
  };

  },[])

  return (
    <div ref={ref}>
    </div>
  )
}
