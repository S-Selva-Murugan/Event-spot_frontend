const eventInitialState = []
const eventReducer = (state=eventInitialState,action)=>{
    switch(action.type){
        case "GET_ALL_EVENTS_BY_API":
            return action.payload
        
        case "CREATE_NEW_EVENT":
            return [action.payload,...state]


        case "DELETE_EVENT":
            return state.filter((ele)=>ele._id !== action.payload)
             

            

            case "ADD_REVIEW_TO_EVENT":
                const { eventId, review } = action.payload;
                console.log(eventId,review)
                const newStateWithReview = state.map((event) => {
                    if (event._id === eventId) {
                        return {
                            ...event,
                            reviews: [...event.reviews, review]
                        };
                    } else {
                        return event;
                    }
                });
                return newStateWithReview;
    
                case "UPDATE_REVIEW_IN_EVENT":
                    console.log(action.payload,"in reducer")
                    return state.map(event => {
                        if (event._id === action.payload.eventId) {
                            const updatedReviews = event.reviews.map(review => {
                                console.log(review._id,action.payload.reviewId,"1 if")
                                if (review.reviewId._id === action.payload.reviewId) {
                                    console.log("inside if")
                                    return { ...review, ...action.payload.updatedReview }; // Update existing review with new data
                                }
                                return review;
                            });
                            return { ...event, reviews: updatedReviews };
                        }
                        return event;
                    });
                
            case "DELETE_REVIEW_FROM_EVENT":
                const { eventId: deleteEventId, reviewId } = action.payload;
                const newStateWithoutReview = state.map((event) => {
                    if (event._id === deleteEventId) {
                        return {
                            ...event,
                            reviews: event.reviews.filter((review) => review.reviewId._id !== reviewId)
                        };
                    } else {
                        return event;
                    }
                });
                return newStateWithoutReview
    
            default:
                return state;
        }
    };



export default eventReducer