import { Box } from '@mui/material'
import React from 'react'

export const EquatorIco = ({vr,setVar}) => {
  const handleClick = () =>{
    setVar(!vr)
  }
  return (
    <Box sx={{height:'20px',width:'20px',cursor:'pointer'}} onClick={handleClick}>
        <div style={{height:'100%',width:'100%'}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315.51 315.51">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <circle
        cx="157.75"
        cy="157.75"
        r="146.75"
        fill="none"
        stroke={vr?'#0000ff':"#231f20"}
        strokeMiterlimit="10"
        strokeWidth="22"
      />
      <line
        x1="11"
        y1="157.75"
        x2="304.51"
        y2="157.75"
        fill="none"
        stroke={vr?'#0000ff':"#231f20"}
        strokeMiterlimit="10"
        strokeWidth="22"
      />
    </g>
  </g>
</svg>

        </div>
    </Box>
  )
}
