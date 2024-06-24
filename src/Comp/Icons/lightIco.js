import { Box } from '@mui/material'
import React from 'react'

export const LightIco = ({vr,setVar}) => {
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
        strokeWidth="22"
        stroke={vr?'#0000ff':"#231f20"}
        strokeMiterlimit="10"
      />
      <path
        d="M157.75,11V304.51s-146.44-13-146.44-156.16C11.31,25.29,157.75,11,157.75,11Z"
        fill={vr?'#0000ff':"#231f20"}
        strokeWidth="12"
        stroke={vr?'#0000ff':"#231f20"}
        strokeMiterlimit="10"
      />
    </g>
  </g>
</svg>

        </div>
    </Box>
  )
}
