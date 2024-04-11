import React from 'react'
import { useState } from 'react'

let Contxt=React.createContext()

export function Contx({children}){
    
    const [speed,setSpeed]=useState(40)
    
    return (
        <Contxt.Provider value={{speed,setSpeed}}>
        {children}
    </Contxt.Provider>
  )
}

export default Contxt