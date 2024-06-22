import { Box } from '@mui/material'
import React from 'react'

export const Ico = ({img,vr,setVar}) => {

  const handleClick = () =>{
    setVar(!vr)
  }
  return (
    <Box sx={{backgroundColor:vr?'blue':'black',height:'20px',width:'20px',cursor:'pointer'}} onClick={handleClick}>
        <div style={{height:'100%',width:'100%',backgroundImage:`url(${img})`,backgroundRepeat:'no-repeat',backgroundSize:'contain'}}></div>
    </Box>
  )
}
