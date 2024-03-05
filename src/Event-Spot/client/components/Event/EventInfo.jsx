import React, { useContext, useEffect, useState, memo } from 'react';
import moment from 'moment';
import CountDown from '../Utils/CountDown/CountDown';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Badge, Button, Form, CardText, Modal, CardBody } from 'react-bootstrap';
import axios from '../Api_Resources/axios';
import { useDispatch, useSelector } from 'react-redux';
import { startGetEvents, startRaduisEvents } from '../../react-redux/action/eventAction';
import ReviewForm from '../Review/ReviewForm';
import EventCardsDisplay from './EventCardsDisplay';
import ViewHisEvents from '../ProfileHelpers/ViewHisEvents';
import { MyContext } from '../../ContextApi/Context';
import ReviewCard from '../Review/ReviewCard';
import { toast } from 'react-toastify';
import OrganiserDashboard from '../Dashboard/organiser/OrganiserDashboard';
import { startOragniserEvents } from '../../react-redux/action/organiserAction'
import "./EventInfo.css"

function countRemainingTicket(tickets) {
    const totalRemainingTickets = tickets?.reduce((total, ticket) => total + ticket?.remainingTickets, 0);
    return totalRemainingTickets
}

function EventInfo() {
    const { eventId } = useParams();
    const [event, setEvent] = useState('');
    const [showReviewModal, setShowReviewModal] = useState(false); // State variable for modal visibility
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);
    const { userData } = useContext(MyContext);
    const organizerEvents = useSelector((state) => state.organiserDetails.organiserEvents);

    useEffect(() => {
        if (userData.role === 'Organiser') {
            dispatch(startOragniserEvents());
        } else {
            dispatch(startGetEvents());
        }
    }, []);

    useEffect(() => {
        if (userData.role === 'Organiser' && organizerEvents.length > 0) {
            const eventData = organizerEvents.find((ele) => ele._id === eventId);
            setEvent(eventData);
        } else if (events.length > 0) {
            const eventData = events.find((ele) => ele._id === eventId);
            if (eventData) {
                setEvent(eventData);
            }
        }
    }, [events, organizerEvents, eventId]);

    function readableDate(inputDateString) {
        const momentObject = moment(inputDateString);
        return momentObject.format('L');
    }

    const navigate = useNavigate();

    const handleBookTickets = () => {
        if (userData.role === "Customer") {
            navigate(`/event-booking/${eventId}`);
        } else {
            toast.info("Please Login or Register to Book the tickets");
            navigate("/login");
        }
    };

    // Function to handle the click event of the "Add a Review" button
    const handleAddReview = () => {
        setShowReviewModal(true);
    };

    // Function to handle the closing of the modal
    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
    };

    return (
        <div>
            <Container className="my-5">
                {/* Event Details */}
                {event ? (
                    <Card style={{ width: "98%" }} className='event-details-container'>
                        <Card.Body>
                            {/* Carousel */}
                            <Carousel style={{ height: "400px", width: "100%", margin: "auto" }}>
                                {event.posters.map((poster) => (
                                    <Carousel.Item key={poster._id}>
                                        <img
                                            style={{ height: "400px", width: "100%", objectFit: "cover", borderRadius: "20px" }}
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
                                            src={event.youTube.url}
                                            title="youTube-video-player"
                                            allowFullScreen
                                            style={{ height: "400px", width: "100%", objectFit: "cover", borderRadius: "20px" }}
                                        ></iframe>
                                        <Carousel.Caption>
                                            <h3>{event.youTube.title}</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                            {/* Event Details */}
                            <Row>
                                <Col style={{ marginTop: "20px" }}>
                                    <Card style={{ width: "100%" }}>
                                        <Card.Body className="card-body" style={{ fontFamily: "Arial, sans-serif" }}>
                                            <Card.Title style={{ fontWeight: "bold" }}>{event?.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Created By: {event?.organiserId?.username}</Card.Subtitle>
                                            <Card.Text>Venue: {event?.venueName}</Card.Text>
                                            <Card.Text>Starts At: {readableDate(event?.eventStartDateTime)}</Card.Text>
                                            <Card.Text style={{ width: "100%", fontWeight: "bold" }}>Address: {event?.addressInfo?.address}<br />
                                                City: {event?.addressInfo?.city}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col style={{ marginTop: "25px" }}>
                                    {/* Ticket Booking Button */}
                                    {new Date(event.ticketSaleStartTime) > new Date() ? (
                                        <div style={{margin:"40px 0 0 25%"}}>
                                            <CountDown ticketSaleStartTime={event.ticketSaleStartTime} />
                                            {userData.role === "Organiser" && userData.id === event.organiserId._id && (
                                                <Button style={{ marginTop: "20px" ,width:"40%"}} onClick={() => navigate(`/event-form/${event._id}`)}>Edit</Button>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            {countRemainingTicket(event?.ticketType) >= 1 ?
                                                (userData.role !== "Organiser" && userData.role !== "Admin" && <Button className='btn btn-dark' style={{ border: '2px solid #004777', borderRadius: '5px', padding: '10px', width: "40%", height: "10%",marginLeft:"30%" ,marginTop:"100px"}} onClick={handleBookTickets}>Book</Button>)
                                                :
                                                <h2>All Seats are Booked</h2>
                                            }

                                        </div>
                                    )}
                                </Col>
                            </Row>
                            {/* Actors & Description */}
                            <Row className="my-4" style={{marginLeft:"5%"}}>
                                <Col>
                                    <Card.Text className='fw-bold'>Actors : {event?.actors?.map((actor) => actor?.name)}</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text className='fw-bold'>Description : {event?.description}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ) : (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}

                {/* Organiser Dashboard */}
                {userData.role === "Organiser" && <OrganiserDashboard event={event} />}

                {/* Reviews */}
                <ListGroup numbered className="my-4">
                    <h1 className="fw-bold" style={{ width: "40%" }}>Reviews</h1>
                    <Button variant="warning" onClick={handleAddReview} style={{ width: "20%", height: "10%" }}>Add a Review</Button>
                    {/* <ReviewForm eventId={event?._id} /> */}
                    <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {event?.reviews?.length > 0 && event?.reviews?.map((review) => (
                            <div key={review.reviewId} style={{ flex: "0 0 calc(50% - 20px)" }}>
                                <ReviewCard
                                    eventId={event._id}
                                    reviewinfo={review.reviewId}
                                    style={{ width: "100%", marginBottom: "10px" }} // Adjust margin as needed
                                />
                            </div>
                        ))}
                    </div>
                </ListGroup>

                {/* Add Review Modal */}
                <Modal show={showReviewModal} onHide={handleCloseReviewModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ width: "500px" }}>
                        <ReviewForm eventId={event?._id} />
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
}

export default EventInfo;
