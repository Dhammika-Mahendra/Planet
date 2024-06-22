import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { Box } from '@mui/material';
import Contx from './../Contx'
import { useContext } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function Position() {

  const {setCam}=useContext(Contx)

  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
        <AdjustIcon sx={{cursor:'pointer','&:hover':{color:'blue'}}} onClick={()=>setCam('top')}></AdjustIcon>
        <Box style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <AdjustIcon sx={{cursor:'pointer','&:hover':{color:'blue'}}} onClick={()=>setCam('left')}></AdjustIcon>
            <CameraAltIcon sx={{cursor:'pointer','&:hover':{color:'blue'}}} onClick={()=>setCam('')}></CameraAltIcon>
            <AdjustIcon sx={{cursor:'pointer','&:hover':{color:'blue'}}} onClick={()=>setCam('right')}></AdjustIcon>
        </Box>
        <AdjustIcon sx={{cursor:'pointer','&:hover':{color:'blue'}}} onClick={()=>setCam('bottom')}></AdjustIcon>
    </Box>
  )
}
