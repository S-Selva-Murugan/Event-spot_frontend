const bookingDetailsState = []
const bookingDetailsReducer = (state=bookingDetailsState,action)=>{
    switch(action.type){
        case "SET_ALL_BOOKED_TICKETS":{
            return action.payload
        }

        default:{
            return [...state]
        }
    }
}

export default bookingDetailsReducer