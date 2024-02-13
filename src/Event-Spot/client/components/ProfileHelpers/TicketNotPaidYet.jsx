import React,{useEffect,useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { startAllBookedStatusfalse } from '../../react-redux/action/bookingDetailsAction'
import { useContext } from 'react'
import { MyContext } from '../../ContextApi/Context';
import TicketCard from './TicketCard';
import { startCancelBooking, startPayment } from '../../react-redux/action/bookingAction';

const TicketNotPaidYet = () => {
    const {userData} = useContext(MyContext)
    const dispatch = useDispatch()
    const card = useRef("CARD")
    const notPaidTickets = useSelector((state)=>state.notbookedDetails)
    useEffect(()=>{
        dispatch(startAllBookedStatusfalse())
    },[])
    const handleMakePayment = ()=>{

    }
  return (
    <div>
        <div>These are ticket are you booked but not purchased</div>
        {/* {eventInfo,quantity,ticketPrice,ticketType,totalAmount,id} */}
        {notPaidTickets.length>0 && <div>
            {notPaidTickets.map((value)=>console.log(value,"in side the notPaidTickets"))}
            <ul>
{notPaidTickets.map((value)=>{
    return <li key={value._id}>
                EVENT NAME :{value.eventId.title}<br/>
                EVENT STARTS At :{value.eventId.eventStartDateTime}
                TICKETS : <ol>
                    {value.tickets.map((ticket)=>{
                        return <li>
                                TICKET NAME :   {ticket.ticketType}
                                QUANTITY:{ticket.quantity}
                                TOTALAMOUNT :{ticket.totalAmount} 
                            </li>
                    })}
                </ol>
                <button onClick={()=>dispatch(startCancelBooking(value._id))}> Cancel Booking</button>
                <button onClick={()=>dispatch(startPayment(value._id,card))}>Confirm Booking</button>
           </li>
})}
            </ul>


        </div>}
        {
            console.log(notPaidTickets)
        }
      
    </div>
  )
}

export default TicketNotPaidYet
