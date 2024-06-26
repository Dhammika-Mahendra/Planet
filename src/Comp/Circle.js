import { Box, Typography } from '@mui/material'
import React from 'react'
import Contxt from '../Contx'
import { useContext } from 'react'
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Circle() {

  const [season,setSeason]=useState({n:'Winter',s:'Summer'})
  const {dateFeedBack}=useContext(Contxt) 

  const [angle,setAngle]=useState(0)
  const [rayPos,setRayPos]=useState(0)
  const [opacity,setOpacity]=useState(0)

  useEffect(()=>{
    let x=dateFeedBack

    //for perpendicular ray position and day/night portion
    if (x > 4 && x <= 93) {
      setRayPos(85+(((x - 4)/89)*25));
      setAngle(25-(((x - 4)/89)*25))
    } else if (x > 93 && x <= 186) {
      setRayPos(110+(((x - 94)/92)*25));
      setAngle(0-(((x - 94)/92)*25))
    } else if (x > 186 && x <= 279) {
      setRayPos(135-(((x - 186)/93)*25));
      setAngle(-25+(((x - 186)/93)*25))
    } else if ((x > 279 && x <= 365) || (x > 0 && x <= 4)) {
      if (x > 279 && x <= 365) {
        setRayPos(110-(((x - 279)/94)*25));
        setAngle(((x - 279)/94)*25)
      } else {
        setRayPos(110-(((90+x)/94)*25));
        setAngle(((90+x)/94)*25)
      }    
    }

    //season name
    if (x > 49 && x <= 138) {
      setOpacity(1-Math.abs((x-93)/49))
      setSeason({s:'Autumn',n:'Spring'})
    } else if (x > 138 && x <= 231) {
      setOpacity(1-Math.abs((x-186)/49))
      setSeason({s:'Winter',n:'Summer'})
    } else if (x > 231 && x <= 324) {
      setOpacity(1-Math.abs((x-279)/49))
      setSeason({s:'Spring',n:'Autumn'})
    } else if (x > 324 || x <= 49) {
      if (x > 324 && x <= 365) {
        setOpacity(1-Math.abs((365-x)/41))
        setSeason({s:'Summer',n:'Winter'})
      } else {
        setOpacity(Math.abs((49-x)/48))
        setSeason({s:'Summer',n:'Winter'})
      }    
    }
console.log(opacity);
  },[dateFeedBack])


  return (
            <div style={{position:'relative',width:'220px',height:'220px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

              {/* -- longitutes --- */}
              <div style={{width:'42%',height:'1px',backgroundColor:'grey'}}></div>
              <Typography sx={{mt:'24px',opacity:opacity}}>{season.n}</Typography>
              <div style={{width:'96%',height:'1px',backgroundColor:'grey',marginTop:'25px'}}></div>
              <div style={{width:'100%',height:'1px',backgroundColor:'grey',marginTop:'25px',marginBottom:'25px'}}></div>
              <div style={{width:'96%',height:'1px',backgroundColor:'grey',marginBottom:'25px'}}></div>
              <Typography sx={{mb:'24px',opacity:opacity}}>{season.s}</Typography>
              <div style={{width:'43%',height:'1px',backgroundColor:'grey'}}></div>

              {/* -- day / night earth half --- */}
              <div style={{borderRadius:'50%',width:'220px',height:'220px',position:'absolute',border:'1px solid grey',display:'flex',justifyContent:'start',alignItems:'center',overflow:'hidden',top:'0',left:'0',zIndex:'10',mixBlendMode:'difference'}}>
                <div style={{width:'50%',height:'100%',backgroundColor:'#575652',transformOrigin: 'center right',transform: `rotate(${angle}deg)`}}></div>
              </div>

            {/* ----- day / night icons */}
            <LightModeIcon sx={{color:'grey',position:'absolute',top:'100px',right:'40px',zIndex:'20'}}></LightModeIcon>
            <NightlightIcon sx={{color:'white',position:'absolute',top:'100px',left:'40px',zIndex:'20'}}></NightlightIcon>


            <div style={{width:'100%',height:'1px',backgroundColor:'yellow',position:'absolute',top:`${rayPos}px`,zIndex:'30px'}}></div>
            </div>
  )
}
