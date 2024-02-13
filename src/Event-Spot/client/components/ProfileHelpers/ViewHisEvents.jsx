import React,{useState,useEffect, useContext} from 'react'
import { useSelector } from 'react-redux';
import EventCard from '../Event/EventCard';
import { MyContext } from '../../ContextApi/Context';
import Spinner from "../Utils/Spinner/SpinnerComponent"
import "./ViewHisEvents.css"


const ViewHisEvents = () => {
const eventsData = useSelector((state)=>state.events)
const [organizerEvents,setOrganizerEvents] = useState("")
const {userData} = useContext(MyContext)

useEffect(()=>{

function filterEventsByOrganizer(events, organizerId) {
    return events.filter(event => event.organiserId === organizerId)
}
try{
const foundEvent = filterEventsByOrganizer(eventsData, userData.id)
setOrganizerEvents(foundEvent)
console.log(foundEvent,"these are the events i created")
}catch(err){
  console.log(err)
}




},[userData])


// toast.promise(
//   foundEvent(), 
//   {
//     pending: 'Updating...',
//     success: 'Update successful!',
//     error: 'Update failed',
//   }
// )

  return (
    <div className="container">
      <div className="heading">
      <h2>Created Events :{organizerEvents?.length}</h2>
      </div>
    <div className='cards-display'>
        {organizerEvents?.length > 0 ? userData?.id && organizerEvents?.map(ele=><EventCard
          image={ele.posters[0].image}
          title={ele.title}
          start={ele.eventStartDateTime}
          categoryName={ele.categoryId.name}
          id={ele._id}
          organizerId={ele.organizerId}
        />): <Spinner/>}
      
    </div>
    </div>
  )
}

export default ViewHisEvents
