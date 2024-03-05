const profileInitialState={

    allProfile:[]
    
}



const profileReducer = (state=profileInitialState,action)=>{
    switch(action.type){
        
        case "GET_ALL_PROFILE":
            return {...state,allProfile:action.payload}
        
        case "SET_PROFILES":
            return {...state,allProfile:action.payload}

        default:
            return {...state}
        
    } 
}


export default profileReducer