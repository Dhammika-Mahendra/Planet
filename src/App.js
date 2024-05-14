import { useEffect } from "react";
import Controller from "./Controller";
import { Contx } from "./Contx";
import View from "./View";

function App() {

  useEffect(()=>{
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  })

  return (
    <Contx>
      <div style={{margin:'0',padding:'0',width:'100vw',height:'100vh',display:'flex'}}>
        <View></View>
        <Controller></Controller>
      </div>
    </Contx>
  );
}

export default App;
