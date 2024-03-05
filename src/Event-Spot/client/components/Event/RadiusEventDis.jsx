import React from 'react'
import EventCard from "./EventCard"
import "./EventCardsDisplay.css"

function RadiusEventDis({raduisEvents}) {
  return (
    <div >

      <div className="head" >
 <h3 style={{color:"#023047",fontStyle:"oblique",marginTop:"20px"}}> In range Events : {raduisEvents.length}</h3>
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