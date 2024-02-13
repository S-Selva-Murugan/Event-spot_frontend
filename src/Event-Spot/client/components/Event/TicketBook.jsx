import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Spinner, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startGetEvents } from '../../react-redux/action/eventAction';
import { startCreateBooking, startPayment ,setClearTicket, startCancelBooking} from "../../react-redux/action/bookingAction";
import { config } from '../Api_Resources/config';
import axios from '../Api_Resources/axios';
import { toast,ToastContainer } from 'react-toastify';

const updateRemainingTickets = (eventId, updatedTickets) => ({
  type: 'UPDATE_REMAINING_TICKETS',
  payload: { eventId, updatedTickets },
});

const TicketBook = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [tickets, setTickets] = useState([]);
  const card = useRef("CARD")
  const [totalPrice, setTotalPrice] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const events = useSelector((state) => state.events);
  const bookedTicket = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const checkObject = Object.keys(bookedTicket).length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startGetEvents());
        const eventData = await events.find((ele) => ele._id === eventId);
        if (eventData) {
          setEventDetails(eventData);
          setTickets(Array(eventData.ticketType.length).fill(0));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
    dispatch(setClearTicket())
  }, [])

  useEffect(()=>{
    (async ()=>{
      try{
        const stripeId = localStorage.getItem("stripeId") 
        const response = await axios.delete(`/api/delete-payment/${stripeId}`,config)
        if(response) localStorage.removeItem("stripeId")


      }catch(err){
        console.log(err)
      }
    })()
  },[])
  useEffect(()=>{
    calculateTotalAmount()
  },[tickets])

  const handlePayment =()=>{
    console.log("payment")
      dispatch(startPayment(bookedTicket._id,card))   
  }
  const handleCancelPayment = ()=>{
    if(bookedTicket) dispatch(startCancelBooking(bookedTicket._id))
    setModalVisible(false)
  }

  const updateTicketsAndRemaining = (index, updateCount) => {
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];
      updatedTickets[index] += updateCount;

      const updatedEventDetails = {
        ...eventDetails,
        ticketType: eventDetails.ticketType.map((ticket, i) => {
          if (i === index) {
            const remainingTickets = ticket.remainingTickets - updateCount;
            const updatedTicket = { ...ticket, remainingTickets, Quantity: ticket.ticketCount - remainingTickets };

            // Dispatch action to update remaining ticket count in the Redux store

            dispatch(updateRemainingTickets(eventId, [...eventDetails.ticketType.slice(0, i), updatedTicket, ...eventDetails.ticketType.slice(i + 1)]));

            return updatedTicket;
          }
          return ticket;
        }),
      };

      setEventDetails(updatedEventDetails)
      return updatedTickets;
    });
  };

  const incrementTicket = (index) => {
    updateTicketsAndRemaining(index, 1);
  };

  const decrementTicket = (index) => {
    if (tickets[index] > 0) {
      updateTicketsAndRemaining(index, -1);
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = tickets.reduce((total, count, index) => {
      const ticket = eventDetails.ticketType[index];
      return total + count * ticket.ticketPrice;
    }, 0);
    setTotalPrice(totalAmount);
    return totalAmount;
  };

  const handleBookTicket = () => {
    if (!eventDetails) {
      console.error('Event details not available.');
      toast.error("Ticket is unavailable")
    }

    const bookedTickets = tickets
      .map((count, index) => ({ count, ticket: eventDetails.ticketType[index] }))
      .filter((ticket) => ticket.count > 0);

    // Update remainingTickets based on booked tickets
    const updatedEventTickets = eventDetails.ticketType.map((ticket, index) => {
      const bookedTicket = bookedTickets.find((booked) => booked.ticket._id === ticket._id);
      const bookedCount = bookedTicket ? bookedTicket.count : 0;
      const remainingCount = ticket.ticketCount - bookedCount;

      // Calculate the total amount for the current ticket
      const totalAmountForTicket = bookedTicket ? bookedTicket.count * ticket.ticketPrice : 0;


      return { ...ticket, remainingTickets: remainingCount, Quantity: ticket.ticketCount - remainingCount,ticketPrice:ticket.ticketPrice   }; //
    });
    const filteredTickets = updatedEventTickets.filter((ticket) => ticket.Quantity > 0);


    dispatch(startCreateBooking(eventId, filteredTickets));
    setModalVisible(true); // Show modal after creating booking
  };

  return (
    <div>
      <h2>Ticket Booking</h2>
      {eventDetails &&
        eventDetails.ticketType.map((ticket, index) => (
          <Card key={index} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title>{ticket.ticketName}</Card.Title>
              <Card.Text>Price: ₹ {ticket.ticketPrice}</Card.Text>
              <Card.Text>Remaining: {ticket.remainingTickets}</Card.Text>
              <Card.Text>Quantity: {tickets[index]}</Card.Text>
              <Button variant="primary" onClick={() => incrementTicket(index)}>
                Increment
              </Button>{' '}
              <Button variant="danger" onClick={() => decrementTicket(index)}>
                Decrement
              </Button>
            </Card.Body>
          </Card>
        ))}
    <Button onClick={handleBookTicket} style={{ display: 'flex', flexWrap: 'flex-end' }}>
    Book
  </Button>
  <h2>Total Amount: {totalPrice}</h2>

      <Modal show={modalVisible} >
        <Modal.Header >
          <Modal.Title>Seats are Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {checkObject >= 0 && (
            <div>
              <h2>{bookedTicket?.eventId?.Title}</h2>
              <h4>{bookedTicket?.eventId?.eventStartDateTime}</h4>
              <ul>
                {bookedTicket?.tickets?.map((ele) => (
                  <li key={ele._id}>
                    TicketType : {ele.ticketType} <br /> Quantity : {ele.quantity}<br /> Total Price : {ele.totalAmount}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <h2>Total Amount: {totalPrice}</h2>

        <Modal.Footer>
          <Button color="primary" onClick={handlePayment}>
            Confirm Payment
          </Button>{' '}
          <Button color="secondary" onClick={handleCancelPayment}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default TicketBook
