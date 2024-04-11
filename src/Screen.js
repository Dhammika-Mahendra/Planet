import React from 'react'
import { useState } from 'react';
import { useEffect,useRef,useContext} from 'react';
import * as THREE from 'three';
import Contxt from './Contx';

export default function Screen() {

  const {speed,setSpeed}=useContext(Contxt)

  const ref = useRef();

  useEffect(()=>{
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, (window.innerWidth*0.8)/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth*0.8, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube)
    camera.position.z = 5;

    let animationFrameId;
    const animate = function () {
      animationFrameId = requestAnimationFrame(animate);
  
      cube.rotation.x += (speed/1000);
      cube.rotation.y += 0.01;
  
      renderer.render(scene, camera);
    };
  
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (ref.current.children.length !== 0) {
        ref.current.removeChild(renderer.domElement);
      }
    };

  },[speed])

  return (
    <div ref={ref}>
    </div>
  )
}
