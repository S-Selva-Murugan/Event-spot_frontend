import React from 'react'
import ExpiryTime from './ExpiryTime'
import {useState}  from 'react'

const CreateBookingInfo = () => {
    const [expiryTime,seExpiryTime] = useState(2) 
    const [detailsInfo,setDetailsInfo] = useState({
        
        eventName:"eventName",
        ticketBookedAt:"2pm",
        seats:"5",
        eventEndTime:"4pm"
    })

  return (
    <div>
      <ExpiryTime detailsInfo={detailsInfo} expiryTime={expiryTime}/>
    </div>
  )
}

export default CreateBookingInfo
