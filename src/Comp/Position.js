import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { Box } from '@mui/material';
import Contx from './../Contx'
import { useContext } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CircleIcon from '@mui/icons-material/Circle';

export default function Position() {

  const {cam,setCam}=useContext(Contx)

  const handleCam=(dir)=>{
    if(cam==dir){
      setCam('')
    }else{
      setCam(dir)
    }
  }

  return (
    <Box sx={{width:'60%',display:'flex',justifyContent:'space-around',alignItems:'center',mt:'15px',border:'1px solid lightGrey',borderRadius:'8px',p:'5px','&:hover':{backgroundColor:'#e3e3e3'}}}>
      <Brightness7Icon sx={{cursor:'pointer',color:cam=='sun'?'blue':'black'}} onClick={()=>handleCam('sun')}/>
      <AdjustIcon sx={{cursor:'pointer',color:cam=='upMid'?'blue':'black'}} onClick={()=>handleCam('upMid')}></AdjustIcon>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
          <CircleIcon sx={{cursor:'pointer',color:cam=='top'?'blue':'black',height:'10px',width:'10px'}} onClick={()=>handleCam('top')}></CircleIcon>
          <Box style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <CircleIcon sx={{cursor:'pointer',color:cam=='left'?'blue':'black',height:'10px',width:'10px'}} onClick={()=>handleCam('left')}></CircleIcon>
              <PublicIcon></PublicIcon>
              <CircleIcon sx={{cursor:'pointer',color:cam=='right'?'blue':'black',height:'10px',width:'10px'}} onClick={()=>handleCam('right')}></CircleIcon>
          </Box>
          <CircleIcon sx={{cursor:'pointer',color:cam=='bottom'?'blue':'black',height:'10px',width:'10px'}} onClick={()=>handleCam('bottom')}></CircleIcon>
      </Box>
    </Box>
  )
}
