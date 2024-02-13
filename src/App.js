import React, { useEffect ,useReducer,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom' 
import { jwtDecode } from 'jwt-decode';
import './App.css'
import { MyContext } from './Event-Spot/client/ContextApi/Context'
import DisplayUser from './Event-Spot/client/components/UserProfile.js/DisplayUser'
import Darkmode from './Event-Spot/client/components/Z_Dark_Mode/Darkmode'
import Map from './Event-Spot/client/components/Location/Map'
import CreateBookingInfo from './Event-Spot/client/components/Booking/Qr-Component/CreateBookingInfo'
import Test from './Event-Spot/client/components/Location/Test'
import MapWithPolyline from './Event-Spot/client/components/Location/MapWithPolyline'
import EventInfo from './Event-Spot/client/components/Event/EventInfo'
import TicketBook from './Event-Spot/client/components/Event/TicketBook'
import Create from './Event-Spot/client/components/Category/Create'
import Header from './Event-Spot/client/components/Layout/Header'
import Home from './Event-Spot/client/pages/Home'
import Register from './Event-Spot/client/components/UserAuthenticate.js/Register'
import Login from './Event-Spot/client/components/UserAuthenticate.js/Login'
import UserProfile from './Event-Spot/client/components/UserProfile.js/UserProfile'
import EventForm from './Event-Spot/client/components/Event/EventForm'
import EventInMap from './Event-Spot/client/components/Location/EventInMap'
import Success from './Event-Spot/client/components/Booking/Payment/Success'
import Cancel from './Event-Spot/client/components/Booking/Payment/Cancel'
import axios from './Event-Spot/client/components/Api_Resources/axios'
import UserForm from './Event-Spot/client/components/UserProfile.js/UserForm'
import AllEvents from './Event-Spot/client/components/Event/AllEvents'
import ApprovedList from './Event-Spot/client/components/Event/ApprovedList'
import { ToastContainer, toast } from 'react-toastify'
import ForgotPassword from './Event-Spot/client/components/UserAuthenticate.js/ForgotPassword'
import ResetPassword from './Event-Spot/client/components/UserAuthenticate.js/ResetPassword'
import ViewHisBookings from './Event-Spot/client/components/ProfileHelpers/ViewHisBookings';
import Deactivate from './Event-Spot/client/components/UserProfile.js/Deactivate';
import { config } from './Event-Spot/client/components/Api_Resources/config';
import UserForm2 from './Event-Spot/client/components/UserProfile.js/UserForm2';
import EventUpdate from './Event-Spot/client/components/Event/EventUpdate'

function geoWithin(state,action){
  switch(action.type){
    case "GET_ALL_RADIUSEVENT_BY_API_TRUE" :{
      return action.payload
    }
    default :{
      return [...state]
    }
  }
}

function profileFunction (state, action){
  switch(action.type){
    case "SET_PROFILE_DATA":
      return action.payload
      default:
        return { ...state }
  }
}

const App = () => {
  const [raduisEvents,radiusDispatch] = useReducer(geoWithin,[])
  const [searchQuery,setSearchQuery] = useState("")
  const [userData,setUserData] = useState("")
  const [profile, profileDispatch] = useReducer(profileFunction,"")

  const handleGeoWithinEvents = async(radius,lon,lat) =>{
    try{
        const response = await axios.get(`/api/event/${radius}/${lon}/${lat}`)
        console.log(response.data)
        radiusDispatch(
          {
            type:"GET_ALL_RADIUSEVENT_BY_API_TRUE",
            payload:response.data
          }
        )
        
    }catch(err){
      console.log(err)
        toast.error(err.response.data.err)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
    const userObj = jwtDecode(localStorage.getItem('token'))
    if(userObj) setUserData(userObj)
    }

    console.log(raduisEvents,"inside the contextAPI")
  },[raduisEvents])

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`api/profile`, config);

        if (response.data) {
          console.log(response.data);
          profileDispatch({ type: 'SET_PROFILE_DATA', payload: response.data });
        } else {
          // setError('User profile not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // setError('Error fetching user profile');
      }
    };

    fetchProfileData();
  }, [userData]);



  return (
    <div>

      
    <MyContext.Provider value={
                              {raduisEvents,handleGeoWithinEvents,//handling the radius events
                                searchQuery,setSearchQuery,//handling the search query
                                userData,//obj of the user info id,role,expriesIn
                                profile //displaying user profile
                              }
    }>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/user-profile' element={<UserProfile/>}/>
          <Route path='/event-form' element={<EventForm/>}/>
          <Route path='/event-in-map' element={<EventInMap style={{ height: '100vh' }}/>}/>
              {/* <div style={{height:"100vh"}}><EventInMap/></div> */}
          <Route path='/event-info/:eventId' element={<EventInfo/>}/>
          <Route path='/event-booking/:eventId' element={<TicketBook/>}/>
          <Route path='/show-QrCode' element={<CreateBookingInfo/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/cancel" element={<Cancel/>}/>
          <Route path="/edit-profile" element={<UserForm/>}/>
          <Route path="/all-events" element={<AllEvents/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>} exact="true"/> 
          <Route path="/resetPassword/:id/:token" element={<ResetPassword/>}/>
          {/* <Route path="/user-booking" element={<ViewHisBookings/>}/> */}
          <Route path="/event-form/:eventId" element={<EventForm/>}/>
          <Route path="/approved-list" element={<ApprovedList/>}/>
          <Route path="/user-deactivate" element={<Deactivate/>}/>
          <Route path="/create-profile" element={<UserForm2/>}/>
          <Route path="/edit-profile" element={<UserForm/>}/>
          <Route path="/all-events" element={<AllEvents/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>} exact="true"/> 
          <Route path="/resetPassword/:id/:token" element={<ResetPassword/>}/>
          {/* <Route path="/user-booking" element={<ViewHisBookings/>}/> */}
          <Route path="/event-form/:eventId" element={<EventUpdate/>}/>
          <Route path="/approved-list" element={<ApprovedList/>}/>
          <Route path="/user-deactivate" element={<Deactivate/>}/>

          





      </Routes>
      <ToastContainer/>
    </MyContext.Provider>
    </div>
  )
}
export default App

