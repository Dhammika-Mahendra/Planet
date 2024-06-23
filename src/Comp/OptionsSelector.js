import { FormControlLabel ,Checkbox} from '@mui/material'
import React from 'react'
import Contxt from '../Contx'
import { useContext } from 'react'
import {Ico} from './Icons/Ico'
import equator from './Icons/equator.png'
import light from './Icons/light.png'
import poles from './Icons/poles.png'
import tropic from './Icons/tropic.png'
import midAxis from './Icons/midAxis.png'
import { Box } from '@mui/system'
import SouthEastIcon from '@mui/icons-material/SouthEast';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export default function OptionsSelector() {

    const {lightHalf,setlightHalf}=useContext(Contxt)
    const {equ,setEqu}=useContext(Contxt)
    const {tropics,setTropics}=useContext(Contxt)
    const {poleCircles,setPoleCircles}=useContext(Contxt)
    const {earthAxis,setEarthAxis}=useContext(Contxt)
    const {sunRay,setSunRay}=useContext(Contxt)
    const {sunSph,setSunSph}=useContext(Contxt)
    const {traject,setTraject}=useContext(Contxt)

  return (
    <Box sx={{width:'100%',display:'flex',justifyContent:'space-around'}}>
        <Ico img={equator} vr={equ} setVar={setEqu}></Ico>
        <Ico img={tropic} vr={tropics} setVar={setTropics}></Ico>
        <Ico img={poles} vr={poleCircles} setVar={setPoleCircles}></Ico>
        <Ico img={light} vr={lightHalf} setVar={setlightHalf}></Ico>
        <Ico img={midAxis} vr={earthAxis} setVar={setEarthAxis}></Ico>
        <SouthEastIcon sx={{width:'20px',height:'20px',color:sunRay?'blue':'black',cursor:'pointer'}} onClick={()=>setSunRay(!sunRay)}></SouthEastIcon>
        <Brightness5Icon sx={{width:'20px',height:'20px',color:sunSph?'blue':'black',cursor:'pointer'}} onClick={()=>setSunSph(!sunSph)}></Brightness5Icon>
        <RotateLeftIcon sx={{width:'20px',height:'20px',color:traject?'blue':'black',cursor:'pointer'}} onClick={()=>setTraject(!traject)}></RotateLeftIcon>
    </Box>
  )
}
