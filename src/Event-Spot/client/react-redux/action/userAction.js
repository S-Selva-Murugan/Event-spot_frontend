import axios from "../../components/Api_Resources/axios"

export const startGetUser = ()=>{
    return async(dispatch)=>{
       
            try{
                const response = await axios.get(``)
                dispatch(setUser(response.data))
                console.log(response.data)
            }catch(err){
                console.log(err)
                alert(err)
            }
        
    }
}


const setUser = (data)=>{
    console.log(data,"in userAction")
    return{
        type:"GET_USER_BY_API",
        payload:data
    }
}