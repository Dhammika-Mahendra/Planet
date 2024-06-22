import React from 'react'
import Speed from './Comp/Speed'
import DateController from './DateController'
import OptionsSelector from './Comp/OptionsSelector'
import Position from './Comp/Position'
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import { useContext } from 'react'
import Contxt from './Contx'

export default function Controller() {

  const {trackCam,setTrackCam}=useContext(Contxt)

  return (
    <div style={{height:'100%',width:'20%'}}>
        <DateController></DateController>
        <Speed></Speed>
        <OptionsSelector></OptionsSelector>
        <Position></Position>
        <ControlCameraIcon sx={{cursor:'pointer',color:trackCam?'blue':'black'}} onClick={()=>setTrackCam(!trackCam)}></ControlCameraIcon>
    </div>
  )
}
