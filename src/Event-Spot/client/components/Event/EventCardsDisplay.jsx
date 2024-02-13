import React from 'react'
import { useSelector } from 'react-redux'
import EventCard from "./EventCard"
import "./EventCardsDisplay.css"

function EventCardsDisplay() {
  const events = useSelector((state)=>{
    return state.events
  })
  return (
    <div className="containter">
      <div className="head">

      </div>
      <div className='cards-display'>

        {events?.map(ele=><EventCard
          image={ele.posters[0].image}
          title={ele.title}
          start={ele.eventStartDateTime}
          categoryName={ele.categoryId.name}
          id={ele._id}

        
        />)}
      </div>
    </div>
  )
}

export default EventCardsDisplay