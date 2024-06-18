import { FormControlLabel ,Checkbox} from '@mui/material'
import React from 'react'
import Contxt from '../Contx'
import { useContext } from 'react'

export default function OptionsSelector() {

    const {lightHalf,setlightHalf}=useContext(Contxt)
    const {equ,setEqu}=useContext(Contxt)
    const {tropics,setTropics}=useContext(Contxt)

  return (
    <div>
        <FormControlLabel size='small' control={<Checkbox checked={lightHalf} onChange={(e)=>setlightHalf(e.target.checked)}/>} label="half" />
        <FormControlLabel size='small' control={<Checkbox checked={equ} onChange={(e)=>setEqu(e.target.checked)}/>} label="equator" />
        <FormControlLabel size='small' control={<Checkbox checked={tropics} onChange={(e)=>setTropics(e.target.checked)}/>} label="tropics" />
    </div>
  )
}
