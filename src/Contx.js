import React from 'react'
import { useState } from 'react'

let Contxt=React.createContext()

export function Contx({children}){
    
    const [speed,setSpeed]=useState(0.5)
    const [autoR,setAutoR]=useState(true)
    const [date,setDate]=useState(1)
    const [dateFeedBack,setDateFeedBack]=useState(1)
    {/* ----- options panel -------------- */}
    const [lightHalf,setlightHalf]=useState(false)//shows the light half of the earth
    const [equ,setEqu]=useState(true)//equator
    const [tropics,setTropics]=useState(false)//capricon and cancer
    
    return (
        <Contxt.Provider value={{speed,setSpeed,autoR,setAutoR,date,setDate,dateFeedBack,setDateFeedBack,lightHalf,setlightHalf,equ,setEqu,tropics,setTropics}}>
        {children}
        </Contxt.Provider>
  )
}

export default Contxt