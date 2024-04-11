import { Switch } from '@mui/material'
import React from 'react'
import { useState } from 'react';

export default function DateController() {

    const [checkStat,setCheckStat]=useState(true)

    function getMonthAndDay(dayNumber) {
        if(dayNumber<1 || dayNumber>365){
            return
        }
        console.log(checkStat)
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
        
        console.log(`${MonthTag[month-1]}/${day}`)
    }
    

  return (
    <div>
        <Switch size='small' checked={checkStat} onChange={(e)=>setCheckStat(e.target.checked)}></Switch>
        <input type='number' onChange={(e)=>getMonthAndDay(e.target.value)}></input>
    </div>
  )
}
