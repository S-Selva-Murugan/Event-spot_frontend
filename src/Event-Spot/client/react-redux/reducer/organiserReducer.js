let organiserInitialState = {
    organiserEvents : [],
    organiserDashboardInfo : []
}

const organiserReducer = (state = organiserInitialState, action) => {
    switch(action.type) {
        case "GET_MY_ALL_EVENTS":
            return{...state,organiserEvents:action.payload}
        case "GET_MY_ORGANISER_DASHBOARD": 
            return{...state,organiserDashboardInfo:action.payload}
        case "CREATE_A_NEW_EVENT":
            return {...state,organiserEvents:[action.payload,...state.organiserEvents]}
        case "UPDATE_EVENT": 
            const updatedEvent = state?.organiserEvents?.map((ele) => {
                console.log(ele._id,action.payload._id)
              if (ele._id ===  action.payload._id) {
                return {...action.payload, ...ele}
              } else {
                return ele
              }
            })
            return updatedEvent
        default: {
            return {...state}
        }
            
    }

}

export default organiserReducer