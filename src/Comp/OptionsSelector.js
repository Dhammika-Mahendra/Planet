import React from 'react'
import Contxt from '../Contx'
import { useContext } from 'react'
import { Box } from '@mui/system'
import SouthEastIcon from '@mui/icons-material/SouthEast';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { EquatorIco } from './Icons/equatorIco'
import MidAxisIco from './Icons/midAxisIco'
import { TropicIco } from './Icons/tropicIco'
import { PolesIco } from './Icons/polesIco'
import { LightIco } from './Icons/lightIco'
import { Tooltip, Typography } from '@mui/material';

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
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
        <Box sx={{position:'relative',display:'flex',justifyContent:'space-around',alignItems:'center',m:'10px',width:'80%',border:'1px solid lightGrey',borderRadius:'6px',p:'5px','&:hover':{backgroundColor:'#e3e3e3'}}}>
          <EquatorIco vr={equ} setVar={setEqu}></EquatorIco>
          <TropicIco vr={tropics} setVar={setTropics}></TropicIco>
          <PolesIco vr={poleCircles} setVar={setPoleCircles}></PolesIco>
          <LightIco vr={lightHalf} setVar={setlightHalf}></LightIco>
          <MidAxisIco vr={earthAxis} setVar={setEarthAxis}></MidAxisIco>
          <Typography sx={{fontSize:'12px',position:'absolute',top:'-16px',left:'5px',color:'grey'}}>Earth</Typography>
        </Box>
        <Box sx={{position:'relative',display:'flex',justifyContent:'space-around',alignItems:'center',m:'10px',width:'80%',pl:'20px',pr:'20px',border:'1px solid lightGrey',borderRadius:'6px',p:'5px','&:hover':{backgroundColor:'#e3e3e3'}}}>
          <SouthEastIcon sx={{width:'20px',height:'20px',color:sunRay?'blue':'black',cursor:'pointer'}} onClick={()=>setSunRay(!sunRay)}></SouthEastIcon>
          <Brightness5Icon sx={{width:'20px',height:'20px',color:sunSph?'blue':'black',cursor:'pointer'}} onClick={()=>setSunSph(!sunSph)}></Brightness5Icon>
          <RotateLeftIcon sx={{width:'20px',height:'20px',color:traject?'blue':'black',cursor:'pointer'}} onClick={()=>setTraject(!traject)}></RotateLeftIcon>
          <Typography sx={{fontSize:'12px',position:'absolute',top:'-16px',left:'5px',color:'grey'}}>System</Typography>
        </Box>
    </Box>
  )
}
