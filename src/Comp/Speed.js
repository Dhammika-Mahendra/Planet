import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import Contxt from '../Contx'
import { useContext } from 'react'

export default function Speed() {

  const {speed,setSpeed}=useContext(Contxt)

  return (
    <Box sx={{ width: 200 ,mt:'10px'}}>
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