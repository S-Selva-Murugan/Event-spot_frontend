import {applyMiddleware,createStore,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import userReducer from "../react-redux/reducer/userReducer"
import categoryReducer from "../react-redux/reducer/categoryReducer"
import eventReducer from "../react-redux/reducer/eventreducer"
import bookingReducer from "../react-redux/reducer/bookingReducer"
import paginateReducer from "../react-redux/reducer/paginateReducer"
import bookingDetailsReducer from "../react-redux/reducer/bookedFalseDetailsReducer"

const configureStore = ()=>{
    const store  = createStore(combineReducers({

        user: userReducer,
        category: categoryReducer,
        events: eventReducer,
        booking: bookingReducer,
        pagination: paginateReducer,
        notbookedDetails : bookingDetailsReducer
        
    }),applyMiddleware(thunk))
    return store
}

export default configureStore