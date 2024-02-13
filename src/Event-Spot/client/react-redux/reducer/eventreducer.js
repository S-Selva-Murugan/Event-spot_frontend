const eventInitialState = []
const eventReducer = (state=eventInitialState,action)=>{
    switch(action.type){
        case "GET_ALL_EVENTS_BY_API":
            return action.payload
        
        case "CREATE_NEW_EVENT":
            return [action.payload,...state]
        case "UPDATE_EVENT_AFTER_BOOKING": 
            const updatedEvent = state.map((ele) => {
              if (ele._id ===  action.payload._id) {
                return {...action.payload, ...ele}
              } else {
                return ele
              }
            })
            return updatedEvent;
        case "DELETE_EVENT":
            return state.filter((ele)=>ele._id !== action.payload)
             
        // case "CREATE_REVIEW_FOR_EVENT":
        //     return state.map((event)=>{
        //         if(event._id === action.payload.eventId){
        //             return {
        //                 ...event,
        //                 reviews:[action.payload.review,...event.review]
        //             }
        //         }else{
        //             return event
        //         }
        //     })

        case "CREATE_REVIEW_FOR_EVENT":
    return state.map((event) => {
        if (event._id === action.payload.eventId) {
            // Ensure that event.review is initialized as an array
            const reviews = Array.isArray(event.reviews) ? event.reviews : [];
            return {
                ...event,
                reviews: [action.payload.review, ...reviews]
            };
        } else {
            return event;
        }
    });

           
        case "UPDATE_REVIEW_FOR_EVENT":
            return state.map((event)=>{
                if(event._id===action.payload.eventId){
                    const updatedReview = event.reviews.map((review)=>{
                        if(review._id === action.payload.review._id){
                            return action.payload.review
                        }else{
                            return review
                        }
                    })
                    return {
                        ...event,reviews:updatedReview
                    }
                }else{
                    return event
                }
            })

        case "DELETE_REVIEW_FOR_EVENT":
            return state.map((event)=>{
                if(event._id===action.payload.eventId){
                    const updatedReviews = event.reviews.filter((review) => review._id !== action.payload.reviewId)
                    return{
                        ...event,reviews:updatedReviews
                    }
                }else{
                    return event
                }
            })

        
        default:
            return state
        
    }
}




export default eventReducer