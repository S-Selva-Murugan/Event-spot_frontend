import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import EventCard from "./EventCard"
import "./EventCardsDisplay.css"
import { MyContext } from '../../ContextApi/Context'

function RadiusEventDis() {
    const {raduisEvents} = useContext(MyContext)
  return (
    <div className="containter">
      <div className="head">
    These are the radius event : {raduisEvents.length}
      </div>
      <div className='cards-display'>

        {raduisEvents?.map(ele=><EventCard
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

export default RadiusEventDis