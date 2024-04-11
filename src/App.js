import { useEffect } from "react";
import Controller from "./Controller";
import Screen from "./Screen"
import { Contx } from "./Contx";

function App() {

  useEffect(()=>{
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  })

  return (
    <Contx>
      <div style={{margin:'0',padding:'0',width:'100vw',height:'100vh',display:'flex'}}>
        <Screen></Screen>
        <Controller></Controller>
      </div>
    </Contx>
  );
}

export default App;
