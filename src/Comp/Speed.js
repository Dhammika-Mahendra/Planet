import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import Contxt from '../Contx'
import { useContext } from 'react'
import SpeedIcon from '@mui/icons-material/Speed';

export default function Speed() {

  const {speed,setSpeed}=useContext(Contxt)

  return (
    <Box sx={{ width: '220px' ,display:'flex',alignItems:'center',p:'10px',mb:'10px',pt:'5px'}}>
      <SpeedIcon sx={{mr:'5px',height:'20px',width:'20px'}}></SpeedIcon>
      <Slider
        aria-label="Temperature"
        step={0.2}
        marks
        min={0.1}
        max={2}
        value={speed}
        size='small'
        onChange={(e)=>setSpeed(e.target.value)}
      />
    </Box>
  );
}