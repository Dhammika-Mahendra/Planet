import { FormControlLabel ,Checkbox} from '@mui/material'
import React from 'react'
import Contxt from '../Contx'
import { useContext } from 'react'
import {Ico} from './Icons/Ico'
import equator from './Icons/equator.png'
import light from './Icons/light.png'
import poles from './Icons/poles.png'
import ray from './Icons/ray.png'
import tropic from './Icons/tropic.png'
import { Box } from '@mui/system'

export default function OptionsSelector() {

    const {lightHalf,setlightHalf}=useContext(Contxt)
    const {equ,setEqu}=useContext(Contxt)
    const {tropics,setTropics}=useContext(Contxt)
    const {poleCircles,setPoleCircles}=useContext(Contxt)

  return (
    <Box sx={{width:'100%',display:'flex',justifyContent:'space-around'}}>
        <Ico img={equator} vr={equ} setVar={setEqu}></Ico>
        <Ico img={tropic} vr={tropics} setVar={setTropics}></Ico>
        <Ico img={poles} vr={poleCircles} setVar={setPoleCircles}></Ico>
        <Ico img={light} vr={lightHalf} setVar={setlightHalf}></Ico>
        <Ico img={ray} vr={lightHalf} setVar={setlightHalf}></Ico>
    </Box>
  )
}
