import React, { useEffect, useContext, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../Event/EventCard';
import { MyContext } from '../../ContextApi/Context';
import Spinner from "../Utils/Spinner/SpinnerComponent"
import "./ViewHisEvents.css"
import { startOragniserEvents } from '../../react-redux/action/organiserAction';


const ViewHisEvents = () => {
  const organizerEvents = useSelector((state)=>state.organiserDetails.organiserEvents)
  const { userData,searchQuery } = useContext(MyContext)
  const searchEvents = searchQuery && organizerEvents.filter(event=>event.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const dispatch  = useDispatch()

  useEffect(() => {
    console.log("calling the api")
    dispatch(startOragniserEvents())
  }, [])


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
        <h2 style={{textAlign:"center",margin:"20px 0 20px 0 "}}>Created Events :{organizerEvents?.length}</h2>
      </div>
      <div className='cards-display'>
        {organizerEvents?.length > 0 ? userData?.id && (searchEvents ? searchEvents : organizerEvents)?.map(ele => <EventCard
          image={ele?.posters[0]?.image}
          title={ele?.title}
          start={ele?.eventStartDateTime}
          categoryName={ele?.categoryId?.name}
          id={ele?._id}
          organizerId={ele?.organizerId}
        />) : <Spinner />}

      </div>
    </div>
  )
}

export default memo(ViewHisEvents)
