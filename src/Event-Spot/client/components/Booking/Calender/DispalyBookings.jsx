import React from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid"
function DispalyBookings() {
  return (
    <div>
      <Fullcalendar
      plugins={{}}
      />
    </div>
  )
}

export default DispalyBookings
