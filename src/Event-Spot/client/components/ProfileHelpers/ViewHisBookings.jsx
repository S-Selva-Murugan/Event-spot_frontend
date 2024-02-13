import TicketCard from "./TicketCard"

export default function ViewHisBooking({profileData}) {
  return (
    <div className="tickets">
      {console.log(profileData)}
      {profileData.bookings.map((value)=>value.tickets.map((ticket)=><TicketCard
            eventInfo={value.eventId}
            id={ticket._id} 
            quantity={ticket.quantity}
            ticketPrice={ticket.ticketPrice}
            ticketType={ticket.ticketType}
            totalAmount={ticket.totalAmount}
          />
        ))
      } 

    </div>
  );
}
