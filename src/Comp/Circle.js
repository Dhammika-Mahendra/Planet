import { Box, Typography } from '@mui/material'
import React from 'react'
import Contxt from '../Contx'
import { useContext } from 'react'
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';

export default function Circle() {

  const [season,setSeason]=useState({n:'Winter',s:'Summer'})
  const {dateFeedBack}=useContext(Contxt) 

  const [rayPos,setRayPos]=useState(0)

  const getRayPos=(dt)=>{
    let x=dt

    if (x > 4 && x <= 93) {
        return 85+(((x - 4)/89)*25);
      } else if (x > 93 && x <= 186) {
        return 110+(((x - 94)/92)*25);
      } else if (x > 186 && x <= 279) {
        return 135-(((x - 186)/93)*25);
      } else if ((x > 279 && x <= 365) || (x > 0 && x <= 4)) {
        if (x > 279 && x <= 365) {
          return 110-(((x - 279)/94)*25);
        } else {
          return 110-(((90+x)/94)*25);
        }    
       }
  }

  const getAngle=(dt)=>{
    let x=dt

    if (x > 4 && x <= 93) {
        return 25-(((x - 4)/89)*25);
      } else if (x > 93 && x <= 186) {
        return 0-(((x - 94)/92)*25);
      } else if (x > 186 && x <= 279) {
        return -25+(((x - 186)/93)*25);
      } else if ((x > 279 && x <= 365) || (x > 0 && x <= 4)) {
        if (x > 279 && x <= 365) {
          return (((x - 279)/94)*25);
        } else {
          return (((90+x)/94)*25);
        }    
       }
    }
  return (
            <div style={{position:'relative',width:'220px',height:'220px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

              {/* -- longitutes --- */}
              <div style={{width:'42%',height:'1px',backgroundColor:'grey'}}></div>
              <Typography sx={{color:'grey',mt:'24px'}}>{season.n}</Typography>
              <div style={{width:'96%',height:'1px',backgroundColor:'grey',marginTop:'25px'}}></div>
              <div style={{width:'100%',height:'1px',backgroundColor:'grey',marginTop:'25px',marginBottom:'25px'}}></div>
              <div style={{width:'96%',height:'1px',backgroundColor:'grey',marginBottom:'25px'}}></div>
              <Typography sx={{color:'grey',mb:'24px'}}>{season.s}</Typography>
              <div style={{width:'43%',height:'1px',backgroundColor:'grey'}}></div>

              <div style={{borderRadius:'50%',width:'220px',height:'220px',position:'absolute',border:'1px solid grey',display:'flex',justifyContent:'start',alignItems:'center',overflow:'hidden',top:'0',left:'0',zIndex:'10',mixBlendMode:'difference'}}>
                <div style={{width:'50%',height:'100%',backgroundColor:'#575652',transformOrigin: 'center right',transform: `rotate(${getAngle(dateFeedBack)}deg)`}}></div>
              </div>

            {/* ----- day / night icons */}
            <LightModeIcon sx={{color:'grey',position:'absolute',top:'100px',right:'40px',zIndex:'20'}}></LightModeIcon>
            <NightlightIcon sx={{color:'white',position:'absolute',top:'100px',left:'40px',zIndex:'20'}}></NightlightIcon>


            <div style={{width:'100%',height:'1px',backgroundColor:'yellow',position:'absolute',top:`${getRayPos(dateFeedBack)}px`,zIndex:'30px'}}></div>
            </div>
  )
}
