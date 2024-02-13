import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import CountDown from '../Utils/CountDown/CountDown';
import { useParams,useNavigate } from 'react-router-dom';
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Badge, Button,Form, CardText } from 'react-bootstrap';
import axios from '../Api_Resources/axios';
import { useDispatch, useSelector } from 'react-redux';
import { startGetEvents, startRaduisEvents } from '../../react-redux/action/eventAction';
import ReviewForm from '../Review/ReviewForm';
import EventCardsDisplay from './EventCardsDisplay';
import ViewHisEvents from '../ProfileHelpers/ViewHisEvents';
import { MyContext } from '../../ContextApi/Context';
import ReviewCard from '../Review/ReviewCard';

// Import statements...
function countRemainingTicket(tickets){
const totalRemainingTickets = tickets.reduce((total, ticket) => total + ticket.remainingTickets, 0);
return totalRemainingTickets
}

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState('');
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events)
  const {userData} = useContext(MyContext)

  useEffect(() => {
    dispatch(startGetEvents());
    const eventData = events.find((ele) => ele._id === eventId);
    setEvent(eventData);
  }, [eventId]);

  function readableDate(inputDateString) {
    const momentObject = moment(inputDateString);
    return momentObject.format('LLLL');
  }

  const navigate = useNavigate();

  const handleBookTickets = () => {
    navigate(`/event-booking/${eventId}`);
  };
  console.log(event,"in the eventInfo")

  return (
    <div>
    <Container className="my-5">
    {event ? (
        <Carousel style={{ height: "400px", width: "100%", margin: "auto" }}>
          {event.posters.map((poster) => (
            <Carousel.Item key={poster._id}>
              <img
                style={{ height: "400px", width: "100%", objectFit: "cover" }}
                className="d-block w-100"
                src={`${process.env.REACT_APP_IMAGE_URL}${poster.image}`}


                alt={poster.ClipName || poster.BrochureName}
              />
              <Carousel.Caption>
                <h3>{poster.ClipName || poster.BrochureName}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
          {event.youTube && (
            <Carousel.Item>
<iframe
            width="100%"
            height="400px"
            src={event.youTube.url}
            title="youTube-video-player"
            allowFullScreen
  ></iframe>              <Carousel.Caption>
                <h3>{event.youTube.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Row>
        <Col>
          <h2 className="my-3">{event?.title}</h2>
          <h3>ORGANISER:{event?.organiserId?.username}</h3>

          <h5>Venue: {event?.venueName}</h5>
          <h5>Starts At: {readableDate(event?.eventStartDateTime)}</h5>
          
        </Col>

        {/* <Col>
      {event.ticketSaleStartTime && !event.ticketSaleEndTime && countRemainingTicket(event.ticketType) >=1 ? (
        <button onClick={handleBookTickets}>Book</button>
      ) : event.ticketSaleEndTime ? (
        <h4>Ticket Booking Closed</h4>
      ) : (
        <CountDown ticketSaleStartTime={event.ticketSaleStartTime} />
      )}
    </Col> */}
    <div>
      {userData.role === 'Organiser' && userData.id === event.organiserId ? (
        <Button onClick={()=>navigate(`/event-form/${event._id}`)}>Edit</Button>
      ) : (
        <Button onClick={handleBookTickets}>Book</Button>
      )}
    </div>
    </Row>
      <Row className="my-4">
        <Col>
        Actors :{event?.actors?.map((actor)=>actor?.name)}
        </Col>
        <Col >
        Description :{event?.description}
        </Col>
      </Row>
      <ListGroup numbered className="my-4">
        <ListGroup.Item className="fw-bold" style={{width:"40%"}}>Reviews</ListGroup.Item>
        <ReviewForm eventId={event._id}/>
        <div style={{width:"40%"}}>
        { event.reviews?.length > 0 && event?.reviews?.map((review) =><ReviewCard
          eventId={event._id}
          review={review}
        />)}
        </div>
      </ListGroup>
    </Container>
      {userData.role==="Organiser" && <ViewHisEvents/> }
    </div>
  );
}

export default EventInfo;