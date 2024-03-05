import {applyMiddleware,createStore,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import categoryReducer from "../react-redux/reducer/categoryReducer"
import eventReducer from "../react-redux/reducer/eventreducer"
import bookingReducer from "../react-redux/reducer/bookingReducer"
import paginateReducer from "../react-redux/reducer/paginateReducer"
import bookingDetailsReducer from "../react-redux/reducer/bookedFalseDetailsReducer"
import categoryCarouselReducer from "../react-redux/reducer/categoryCarousel"
import organiserReducer from "../react-redux/reducer/organiserReducer"
import profileReducer from "../react-redux/reducer/profileReducer"


const rootReducer = {

    profile: profileReducer,
    category: categoryReducer,
    events: eventReducer,
    booking: bookingReducer,
    pagination: paginateReducer,
    notbookedDetails : bookingDetailsReducer,
    categoryCarousel: categoryCarouselReducer, 
    organiserDetails: organiserReducer
    
}


const configureStore = ()=>{
    const store  = createStore(combineReducers(
        rootReducer
    ),applyMiddleware(thunk))
    return store
}

export default configureStore