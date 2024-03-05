import FullCalender from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import TicketCard from "./TicketCard"


function FullCalenderInProfile({profileData}) {
    const events = profileData?.bookings?.length > 0 && profileData.bookings.flatMap((value)=>
        value.tickets.map((ticket)=>({
            title:ticket.ticketType,
            start:new Date(value.createdAt),//Date
            ticketInfo:ticket,
            eventDetails:value.eventId

    })
    ))
    console.log(profileData,"in the full cal")
  
  return (
    <div style={{width:"100%"}}>
      <FullCalender
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
       
        
      />

      
    </div>
  )
}

function renderEventContent(eventInfo){
    return(
        <TicketCard
        eventInfo={eventInfo.event.extendedProps.eventDetails}

        id={eventInfo.event.extendedProps.ticketInfo._id}
        quantity={eventInfo.event.extendedProps.ticketInfo.quantity}
        ticketPrice={eventInfo.event.extendedProps.ticketInfo.ticketPrice}
        ticketType={eventInfo.event.extendedProps.ticketInfo.ticketType}
        totalAmount={eventInfo.event.extendedProps.ticketInfo.totalAmount}
        createdAt={eventInfo.event.start} // Pass the start time of the event
      />
    )
}

export default FullCalenderInProfile
