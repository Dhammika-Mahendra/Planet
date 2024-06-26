import React from 'react'
import Speed from './Comp/Speed'
import DateController from './DateController'
import OptionsSelector from './Comp/OptionsSelector'
import Position from './Comp/Position'
import { useContext } from 'react'
import Contxt from './Contx'
import Circle from './Comp/Circle'
import { Box, Button, Paper, Typography } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'

export default function Controller() {
  const [help,setHelp]=useState(false)

  return (
    <div style={{height:'100%',width:'20%',backgroundColor:'#efefef',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
        <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',mb:'20px'}}>
          <DateController></DateController>
          <Speed></Speed>
          <Circle></Circle>
        </Box>
        <OptionsSelector></OptionsSelector>
        <Position></Position>
        <HelpIcon sx={{cursor:'pointer',alignSelf:'end','&:hover':{color:'blue'},mr:'20px'}} onClick={()=>setHelp(true)}></HelpIcon>

        {/* ---- help box ------ */}
        {help?<Paper sx={{position:'fixed',width:'90vw',height:'90vh',top:'5vh',left:'5vh',backgroundColor:'#efefef',zIndex:'40'}}>
            <Box sx={{height:'15px',p:'4px',display:'flex',justifyContent:'end',alignItems:'center'}}>
            <CloseIcon sx={{cursor:'pointer'}} onClick={()=>setHelp(false)}></CloseIcon>
            </Box>
        </Paper>:''}

    </div>
  )
}
