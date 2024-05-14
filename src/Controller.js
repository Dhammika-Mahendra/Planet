import React from 'react'
import Speed from './Comp/Speed'
import DateController from './DateController'
import DateNavigator from './Comp/DateNavigator'

export default function Controller() {

  return (
    <div style={{height:'100%',width:'20%'}}>
        <DateController></DateController>
        <Speed></Speed>
    </div>
  )
}
