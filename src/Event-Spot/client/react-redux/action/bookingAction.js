import { toast } from "react-toastify"
import axios from "../../components/Api_Resources/axios"
import { config, paymentConfig } from "../../components/Api_Resources/config"

export const startCreateBooking = (eventId,tickets)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}/booking`,{ tickets} ,config)
            console.log(response.data,"i action")
            dispatch(setTicketBooked(response.data.booking))
            dispatch(updateEventsAfterBooking(response.data.updatedEvents))
        }catch(err){
            console.log(localStorage.getItem("token"),"ask")
            console.log(config)
            console.log(err)
            toast.info(err.map((ele)=>ele.msg))
            return{
                type:"CLEAR_BOOKING_IN_STATE"
            }
            
        }
    }
}

const setTicketBooked =(data)=>{
    return{
        type:"SET_TICKET_BOOKED_TRUE",
        payload:data
    }
}



export const setClearTicket =()=>{
    return{
        type:"CLEAR_BOOKING_IN_STATE"
    }
}

const updateEventsAfterBooking = (data)=>{
    return {
        type:"GET_ALL_EVENTS_BY_API",
        payload:data
    }

}



export const startPayment = (bookingId,card)=>{
    return async(dispatch)=>{

        try{
            if(bookingId) {
            const response = await axios.post(`/api/booking/${bookingId}/payment`,{card},paymentConfig)
            console.log(response.data.id)
            dispatch(setStartBooking(response.data)) 
            }else{
                toast.info("Please select the seats")
            }
        }catch(err){
            console.log(err)
        }
    }
}

const setStartBooking = (data)=>{
    if(data){
        console.log(data.id)
        localStorage.setItem("stripeId",data.id)
        window.location = data.url
    }else{

    }


}

export const updateRemainingTickets = (eventId, updatedTickets) => ({
    type: 'UPDATE_REMAINING_TICKETS',
    payload: { eventId, updatedTickets },
})//instead of this i am getting a new events and replace the existing event because to know how much other tickets are purchased

export const startCancelBooking = (bookingId)=>{
    console.log(bookingId,"id")
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`/api/booking/${bookingId}`,config)
            console.log(response.data.updatedEvent,"delete tickets")
            dispatch(setClearTicket())
            dispatch(setCancelPayment(response.data.updatedEvent))   
        }catch(err){
            console.log(err)
            // toast.error(err.response.data.error)
        }
    }
}
const setCancelPayment = (data)=>{
    console.log(data._id,"in action")
    return {
        type:"UPDATE_EVENT_AFTER_BOOKING",
        payload:data
    }
}
