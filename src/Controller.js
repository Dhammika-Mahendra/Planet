import React from 'react'
import Speed from './Comp/Speed'
import DateController from './DateController'
import OptionsSelector from './Comp/OptionsSelector'

export default function Controller() {

  return (
    <div style={{height:'100%',width:'20%'}}>
        <DateController></DateController>
        <Speed></Speed>
        <OptionsSelector></OptionsSelector>
    </div>
  )
}
