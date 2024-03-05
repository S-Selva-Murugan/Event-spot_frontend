import axios from "../../components/Api_Resources/axios";
import { config } from "../../components/Api_Resources/config";


export const startOragniserEvents = () => {
    return async (dispatch) => {
  
      try {
        const response = await axios.get(`/api/organiser-events`,config)
        console.log(response.data)
        dispatch(setOragniserEvents(response.data))
      } catch (err) {
        console.log(err);
      }
    } 
  }

 const setOragniserEvents =(data)=>{
    return({
        type:"GET_MY_ALL_EVENTS",
        payload:data
    })
 }