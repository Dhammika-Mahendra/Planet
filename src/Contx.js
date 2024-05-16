import React from 'react'
import { useState } from 'react'

let Contxt=React.createContext()

export function Contx({children}){
    
    const [speed,setSpeed]=useState(0.5)
    const [autoR,setAutoR]=useState(true)
    const [date,setDate]=useState(1)
    const [dateFeedBack,setDateFeedBack]=useState(1)
    
    return (
        <Contxt.Provider value={{speed,setSpeed,autoR,setAutoR,date,setDate,dateFeedBack,setDateFeedBack}}>
        {children}
        </Contxt.Provider>
  )
}

export default Contxt