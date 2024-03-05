import axios from "../../components/Api_Resources/axios"
import { config } from "../../components/Api_Resources/config"


export const startGetProfile = (search)=>{
    return async(dispatch)=>{
       
            try{
                const response = await axios.get(`/api/profile-all?search=${search}`,config)
                dispatch(setProfile(response.data))
            }catch(err){
                console.log(err)
                // toast.error(err.response.data.err)
            }
        
    } 
}


const setProfile = (data)=>{
    return{
        type:"GET_ALL_PROFILE",
        payload:data
    }
}