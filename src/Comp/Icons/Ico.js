import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'

export const Ico = ({img}) => {

    const [active,setActive] = useState(false)

  //setVar(active)

  return (
    <Box sx={{backgroundColor:active?'blue':'black',height:'20px',width:'20px',cursor:'pointer'}} onClick={()=>setActive(!active)}>
        <div style={{height:'100%',width:'100%',backgroundImage:`url(${img})`,backgroundRepeat:'no-repeat',backgroundSize:'contain'}}></div>
    </Box>
  )
}
