import { Box, Slider, Switch, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import Contxt from './Contx';
import { useContext } from 'react';

export default function DateController() {

    const {autoR,setAutoR}=useContext(Contxt)
    const {date,setDate}=useContext(Contxt)

    const [dateStore,setDateStore]=useState(0)

    const handleDate=()=>{
        setDate(dateStore)
    }

    function getMonthAndDay(dayNumber) {
        if(dayNumber<1 || dayNumber>365){
            return
        }
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var MonthTag =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        var month = 0;
        var day = dayNumber;
        
        for (var i = 0; i < 12; i++) {
            day -= daysInMonth[i];
            if (day <= 0) {
                month = i + 1; // Months are 1-based
                day += daysInMonth[i]; // Add back the days of the current month
                break;
            }
        }
        return `${MonthTag[month-1]} ${day} ${dayNumber}`
        //console.log(`${MonthTag[month-1]}/${day}`)
    }


  return (
    <div>
        <Switch size='small' checked={autoR} onChange={(e)=>setAutoR(e.target.checked)}></Switch>
        <Typography>{getMonthAndDay(dateStore)}</Typography>
        <Box sx={{width:'750px',height:'30px',position:'fixed',top:'10px',left:'10px',backgroundColor:'#efefef',borderRadius:'15px',overflow:'hidden',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                    <div style={{display:'flex',justifyContent:'center',flex:'1',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Jan</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Feb</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Mar</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Apr</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>May</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Jun</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Jul</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Aug</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Sep</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Oct</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',width:'62px',backgroundColor:'yellow'}}>
                        <Typography sx={{fontSize:'12px'}}>Nov</Typography>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',flex:'1',backgroundColor:'yellow'}}>
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
            onMouseUp={handleDate}
            />
        </Box>
    </div>
  )
}
