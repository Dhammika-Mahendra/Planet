import { Box, Checkbox, FormControlLabel, Slider, Switch, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import Contxt from './Contx';
import { useContext } from 'react';
import { useEffect } from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

export default function DateController() {

    const [mouseX, setMouseX] = useState(0);

    useEffect(() => {
      const handleMouseMove = (event) => {
        setMouseX(event.clientX);
      };
      window.addEventListener('mousemove', handleMouseMove); 
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    const {autoR,setAutoR}=useContext(Contxt)
    const {date,setDate}=useContext(Contxt)
    const {dateFeedBack}=useContext(Contxt)//date updated by the view

    const [move,setMove]=useState(false)//slider is on the move

    const [dateStore,setDateStore]=useState(1)//needed for this component only
    const handleDate=()=>{//as soon as handle released storedate set to be real date
        setDate(dateStore)
        setMove(false)
    }

    function getMonthAndDay(dayNumber) {
        if(dayNumber<1 || dayNumber>365){
            return
        }
        var month = 0;
        var day = 0;

        if(dayNumber>13){
            day=dayNumber-13
        }else{
            day=352+dayNumber
        }

        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var MonthTag =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        
        for (var i = 0; i < 12; i++) {
            day -= daysInMonth[i];
            if (day <= 0) {
                month = i + 1; // Months are 1-based
                day += daysInMonth[i]; // Add back the days of the current month
                break;
            }
        }
        return `${MonthTag[month-1]} ${day}`
        //console.log(`${MonthTag[month-1]}/${day}`)
    }

    function getMonthAndDayNav(dayNumber) {
        if(dayNumber<1 || dayNumber>365){
            return
        }
        var month = 0;
        var day = dayNumber;

        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var MonthTag =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        
        for (var i = 0; i < 12; i++) {
            day -= daysInMonth[i];
            if (day <= 0) {
                month = i + 1; // Months are 1-based
                day += daysInMonth[i]; // Add back the days of the current month
                break;
            }
        }
        return `${MonthTag[month-1]} ${day}`
        //console.log(`${MonthTag[month-1]}/${day}`)
    }

    function adjustDateFeedback(dayNumber){
        if(dayNumber<1 || dayNumber>365){
            return
        }
        var day = 0;

        if(dayNumber>13){
            day=dayNumber-13
        }else{
            day=352+dayNumber
        }
        return day
    }

    function getEvent(dayNumber){
        if(dayNumber<1 || dayNumber>365){
            return
        }
        var day = 0;

        if(dayNumber>13){
            day=dayNumber-13
        }else{
            day=352+dayNumber
        }

        if(day===80||day===81){
            return 'Vernal Equinox'
        }else if(day===265||day===266){
            return 'Autumnal Equinox'
        }else if(day===355||day===356){
            return 'Winter Solstice'
        }else if(day===172||day===173){
            return 'Summer Solstice'
        }
        return ''
    
    }

    useEffect(()=>{
        if(!autoR){
            let tmp=dateFeedBack
            if(tmp>13){
                tmp=tmp-12
            }else{
                tmp=353+tmp
            }
            setDateStore(tmp)
        }

        //space bar to start/stop auto rotation
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                setAutoR(!autoR)
            }
          };
          window.addEventListener('keydown', handleKeyDown);
                return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
    },[autoR])

  return (
    <div>
        <Box sx={{width:'220px',display:'flex',alignItems:'center',pr:'5px',pl:'10px',border:'1px solid lightGrey',borderRadius:'8px',pt:'5px',pb:'5px',position:'relative'}}>
        {!autoR?<PlayCircleFilledWhiteIcon sx={{fontSize:'40px',cursor:'pointer','&:hover':{color:'blue'}}} onClick={()=>setAutoR(!autoR)}/>:<PauseCircleIcon sx={{fontSize:'40px',cursor:'pointer','&:hover':{color:'blue'}}} onClick={()=>setAutoR(!autoR)}/>}
        <Box sx={{flex:1,display:'flex',flexDirection:'column',ml:'10px',pl:'15px',borderLeft:'1px solid grey'}}>
            <Typography sx={{fontSize:'24px',fontWeight:'bold'}}>{getMonthAndDay(dateFeedBack)}</Typography>
            <Typography>{`day ${adjustDateFeedback(dateFeedBack)}`}</Typography>
            <Typography sx={{position:'absolute',bottom:'7px',right:'5px',fontSize:'11px',color:'blue'}}>{getEvent(dateFeedBack)}</Typography>
        </Box>
        </Box>

{/*         <Box sx={{backgroundColor:'yellow'}}>
            <Typography>Date nav</Typography>
            <Typography>{getMonthAndDayNav(dateStore)}</Typography>
            <Typography>{dateStore}th day</Typography>
        </Box> */}

        <Box sx={{width:'750px',height:'30px',position:'fixed',top:'10px',left:'10px',backgroundColor:'#efefef',borderRadius:'15px',overflow:'hidden',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                    <div style={{display:'flex',justifyContent:'center',flex:'1',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Jan</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Feb</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Mar</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Apr</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>May</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Jun</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Jul</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Aug</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Sep</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Oct</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Nov</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',flex:'1',backgroundColor:'#efefef'}}>
                        <Typography sx={{fontSize:'12px'}}>Dec</Typography>
                    </div>
            </Box>
            <Slider sx={{ width:730,position:'relative',top:'-10px'}}
            aria-label="Date"
            min={1}
            max={365}
            value={dateStore}
            size='small'
            onChange={(e)=>setDateStore(e.target.value)}
            onMouseDown={()=>setMove(true)}
            onMouseUp={handleDate}
            />
        </Box>
        {move?<Box sx={{backgroundColor:'#efefef',position:'fixed',top:'45px',left:'20px',borderRadius:'3px',width:'45px',left:`${mouseX}px`}}>
            <Typography sx={{fontSize:'12px',textAlign:'center'}}>{getMonthAndDayNav(dateStore)}</Typography>
        </Box>:''}
 
    </div>
  )
}
