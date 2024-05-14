import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import '../Comp/DateNavStyle.css'
import { useEffect } from 'react';
import { useRef } from 'react';

export default function DateNavigator() {

    const knob=useRef(null)
    const pointer=useRef(null)
    const cirlcle=useRef(null)
    const text=useRef(null)

    useEffect(()=>{
        let isRotating = false;

        document.addEventListener("mousedown", (e) => {
          if (e.target.closest(".knob")) {
            isRotating = true;
          }
        });
    },[])

  return (
    <div id="center">
    <div id="slider">
      <div id="knob" ref={knob}>
        <div id="rotator">
          <div id="text" ref={text}>0</div>
        </div>
        <div id="pointer" ref={pointer}>
          <FiberManualRecordIcon size='small'></FiberManualRecordIcon>
        </div>
      </div>
    </div>
  </div>

  )
}
