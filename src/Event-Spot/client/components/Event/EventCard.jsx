import {memo} from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { format } from 'date-fns';



const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'EEE, MMM d • h:mm a');
}

function findCheapestTicketClass(ticketArray){
  const totalCost = ticketArray.reduce((acc,cv)=>{
      acc+=cv.ticketPrice
      return acc
  },0)

  let result = null 

  const dataToMap = ticketArray.forEach((ticket)=>{
      if(!result || ticket.ticketPrice < totalCost){
          result = ticket.ticketPrice
      }
  })

  return result
}

function EventCard({ title, image, start, categoryName, id,tickets }) {
  return (
    <Link to={`/event-info/${id}`} style={{ textDecoration: 'none'}} >
      <Card style={{ width: '18rem', border: '1px solid black' }}>
        <Card.Img src={`${process.env.REACT_APP_IMAGE_URL}${image}`} style={{width:"100%",height:"100%"}} />
        <Card.Body style={{ border: '2px solid white', marginTop: '10px' }}>
          <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{title}</Card.Title>
          <Card.Text style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>Start Date:</span> {formatDate(start)}
          </Card.Text>
          {categoryName && <Card.Text style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>Genre:</span> <span style={{ color: 'blue' }}>{categoryName && categoryName}</span>
          </Card.Text>}
          {tickets?.length > 0 && <Card.Text style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>{findCheapestTicketClass(tickets)} ₹ </span> 
          </Card.Text>}
          <Link to={`/event-info/${id}`} style={{ color: 'blue', textDecoration: 'none', fontSize: '0.9rem' }}>View Details</Link>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default memo(EventCard);
