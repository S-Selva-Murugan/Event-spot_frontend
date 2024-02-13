import { toast } from "react-toastify"
import axios from "../../components/Api_Resources/axios"
import { config, paymentConfig } from "../../components/Api_Resources/config"


export const startAllBookedStatusfalse = (eventId,tickets)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get("/api/get/false/bookings",config)
            dispatch(setAllBookedStatusfalse(response.data))
            console.log(response.data)
        }catch(err){
            console.log(err)
            toast.error(err)
            
        }
    }
}

const setAllBookedStatusfalse =(data)=>{
    return{
        type:"SET_ALL_BOOKED_TICKETS",
        payload:data
    }
}