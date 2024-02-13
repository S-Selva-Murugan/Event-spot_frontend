const bookingInitialState = {}
const bookingReducer = (state=bookingInitialState,action)=>{
    switch(action.type){
        case "SET_TICKET_BOOKED_TRUE":{
            return {...state,...action.payload}
        }
        case "CLEAR_BOOKING_IN_STATE":{
            return {  }//puting the empty becoz in ticket i am checking if the 
        }
        default:{
            return {...state}
        }
    }
}
//when booking is true i want to push the confirmed ticket to the profile bookings
export default bookingReducer