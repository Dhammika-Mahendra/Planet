import React from 'react'
import Speed from './Comp/Speed'
import DateController from './DateController'
import OptionsSelector from './Comp/OptionsSelector'
import Position from './Comp/Position'
import { useContext } from 'react'
import Contxt from './Contx'
import Circle from './Comp/Circle'
import { Box, Button } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';

export default function Controller() {

  return (
    <div style={{height:'100%',width:'20%',backgroundColor:'#efefef',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
        <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',mb:'20px'}}>
          <DateController></DateController>
          <Speed></Speed>
          <Circle></Circle>
        </Box>
        <OptionsSelector></OptionsSelector>
        <Position></Position>
        <Button endIcon={<HelpIcon/>}  size='small' variant='outlined' sx={{border:'2px solid grey',backgroundColor:'#efefef',color:'black',alignSelf:'end',mr:'10px','&:hover':{backgroundColor:'#e3e3e3',color:'black',border:'2px solid grey'}}}>help</Button>
    </div>
  )
}
