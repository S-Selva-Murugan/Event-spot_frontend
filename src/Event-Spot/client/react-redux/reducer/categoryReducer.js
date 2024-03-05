let categoryInitialState = []

const categoryReducer = (state = categoryInitialState, action) => {
    switch(action.type) {
        case "ADD_CATEGORY":
            return[...state,{...action.payload}]
        case "GET_CATEGORY": 
            return action.payload
        case "REMOVE_CATEGORY":
            return state.filter((category) => category._id !== action.payload);
        case 'EDIT_CATEGORY': 
            return state.map((ele)=> {
                if(ele._id === action.payload._id){
                    return{...ele,name : action.payload.name}
                }else{
                    return {...ele}
                }
            })
        default: {
            return [...state]
        }
            
    }

}

export default categoryReducer