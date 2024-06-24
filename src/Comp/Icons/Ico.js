import { Box } from '@mui/material'
import React from 'react'

export const Ico = ({img,imgA,vr,setVar}) => {
  const handleClick = () =>{
    setVar(!vr)
  }
  return (
    <Box sx={{height:'20px',width:'20px',cursor:'pointer'}} onClick={handleClick}>
        <div style={{height:'100%',width:'100%',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundImage:vr?`url(${imgA})`:`url(${img})`}}>
        </div>
    </Box>
  )
}
