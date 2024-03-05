// import React, { useEffect, useState } from 'react';
// import { Button, Card, Modal, Container } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { startGetEvents } from '../../react-redux/action/eventAction';
// import { startCreateBooking, startPayment, setClearTicket, startCancelBooking ,updateRemainingTickets} from "../../react-redux/action/bookingAction";
// import { config } from '../Api_Resources/config';
// import axios from '../Api_Resources/axios';
// import { toast } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';


// const TicketBook = () => {
//   const { eventId } = useParams();
//   const [eventDetails, setEventDetails] = useState(null);
//   const [tickets, setTickets] = useState([]);
//   const card = "CARD"
//   const [modalVisible, setModalVisible] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0)

//   const events = useSelector((state) => state.events);
//   const bookedTicket = useSelector((state) => state.booking);
//   const dispatch = useDispatch();
//   const checkObject = Object.keys(bookedTicket).length;

//   useEffect(() => {
//     dispatch(setClearTicket());
//     dispatch(startGetEvents());
//   }, [])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const eventData = await events.find((ele) => ele._id === eventId);
//         if (eventData) {
//           setEventDetails(eventData);
//           setTickets(Array(eventData.ticketType.length).fill(0));
//         }
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchData();
//   }, [events]);


//   useEffect(() => {
//     (async () => {
//       try {
//         const stripeId = localStorage.getItem("stripeId");
//         const response = await axios.delete(`/api/delete-payment/${stripeId}`, config);
//         if (response) localStorage.removeItem("stripeId");
//       } catch (err) {
//         console.log(err);
//       }
//     })();
//   }, []);

//   const handlePayment = () => {
//     console.log("payment");
//     dispatch(startPayment(bookedTicket._id, card));
//   }

//   const handleCancelPayment = () => {
//     if (bookedTicket) dispatch(startCancelBooking(bookedTicket._id));
//     setModalVisible(false);
//   }

//   const updateTicketsAndRemaining = (index, updateCount) => {
//     setTickets((prevTickets) => {
//       const updatedTickets = [...prevTickets];
//       updatedTickets[index] += updateCount;

//       const updatedEventDetails = {
//         ...eventDetails,
//         ticketType: eventDetails.ticketType.map((ticket, i) => {
//           if (i === index) {
//             const remainingTickets = ticket.remainingTickets - updateCount;
//             const updatedTicket = { ...ticket, remainingTickets, Quantity: ticket.ticketCount - remainingTickets };

//             dispatch(updateRemainingTickets(eventId, [...eventDetails.ticketType.slice(0, i), updatedTicket, ...eventDetails.ticketType.slice(i + 1)]));

//             return updatedTicket;
//           }
//           return ticket;
//         }),
//       };

//       setEventDetails(updatedEventDetails)
//       return updatedTickets;
//     });
//   };

//   const incrementTicket = (index) => {
//     updateTicketsAndRemaining(index, 1);
//   };

//   const decrementTicket = (index) => {
//     if (tickets[index] > 0) {
//       updateTicketsAndRemaining(index, -1);
//     }
//   };

//   const calculateTotalAmount = () => {
//     console.log("in the cal",tickets)
    
//     const totalAmount = (tickets).reduce((total, count, index) => {
//       const ticket = eventDetails.ticketType[index];
//       return total + count * ticket.ticketPrice;
//     }, 0);
//     setTotalAmount(totalAmount ? totalAmount : 0)
//   }


//   const calculateBookedTicketsAmount = ()=>{
//     if(Object.keys(bookedTicket).length > 0){
//       const totalBookedTicketAmount = bookedTicket?.tickets.reduce((acc,cv)=>{
//         acc += cv.totalAmount
//         return acc
//       },0)
//       return totalBookedTicketAmount
//     }

//   }

//   useEffect(()=>{
//     console.log(calculateBookedTicketsAmount())
//   },[calculateBookedTicketsAmount])

 

//   useEffect(()=>{calculateTotalAmount()},[bookedTicket,tickets,modalVisible])
//   useEffect(()=>{console.log(totalAmount)},[totalAmount])


//   const handleBookTicket = () => {
//     if (!eventDetails) {
//       console.error('Event details not available.');
//       toast.error("Ticket is unavailable")
//     }

//     const bookedTickets = tickets
//       .map((count, index) => ({ count, ticket: eventDetails.ticketType[index] }))
//       .filter((ticket) => ticket.count > 0);

//     const updatedEventTickets = eventDetails.ticketType.map((ticket) => {
//       const bookedTicket = bookedTickets.find((booked) => booked.ticket._id === ticket._id);
//       const bookedCount = bookedTicket ? bookedTicket.count : 0;
//       const remainingCount = ticket.ticketCount - bookedCount;

//       return { ...ticket, remainingTickets: remainingCount, Quantity: ticket.ticketCount - remainingCount, ticketPrice: ticket.ticketPrice }; //
//     });
//     const filteredTickets = updatedEventTickets.filter((ticket) => ticket.Quantity > 0);
//     console.log(filteredTickets)

//     dispatch(startCreateBooking(eventId, filteredTickets));
//     setModalVisible(true); //  modal after creating booking successfully
//   };

//   return (
//     <div style={{ marginTop: "50px" }}>
//       <Container>
//         <h2 style={{ textAlign: "center" }}>Ticket Booking</h2>
//         <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap' }}>
//           {eventDetails &&
//             eventDetails.ticketType.map((ticket, index) => (
//               <div style={{ marginTop: "30px" }} key={index}>
//                 <Card style={{ width: '18rem', margin: '10px' }}>
//                   <Card.Body style={{margin: '10px 5% 0 5%',border:"2px solid black",borderRadius:"20px"}}>
//                     <Card.Title>{ticket.ticketName}</Card.Title>
//                     <Card.Text>Price: ₹ {ticket.ticketPrice}</Card.Text>
//                     <Card.Text>Remaining: {ticket.remainingTickets}</Card.Text>
//                     {ticket.remainingTickets ?
//                       <div style={{display:"flex",justifyContent:"space-around"}}>
//                         <Button variant="primary" onClick={() => incrementTicket(index)}>
//                         <FontAwesomeIcon icon={faPlus} />
//                         </Button>
//                         <Card.Text> {tickets[index]} </Card.Text>

//                         { <Button variant="danger" onClick={() => decrementTicket(index)}>
//                         <FontAwesomeIcon icon={faMinus} />
//                         </Button>}</div> : <span style={{ color: 'red' }}>Tickets are Sold</span>}
//                   </Card.Body>
//                 </Card>
//               </div>
//             ))}
//         </div>
//         <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap', border: "2px solid black", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
//         <h2 style={{ marginTop: "10px" }}>Total Amount: {totalAmount ? totalAmount : calculateBookedTicketsAmount() || 0}</h2>
//           <Button variant='success' style={{ width: "100px", height: "40px", marginTop: "10px" }} onClick={handleBookTicket}>
//             Book
//           </Button>
//         </div>
//         <Modal show={modalVisible} onHide={handleCancelPayment}>
//           <Modal.Header closeButton>
//             <Modal.Title>Seats are Confirmed</Modal.Title>
//           </Modal.Header>
//             <Card.Text style={{margin:"5px 0 0 5%"}}><h3>{eventDetails?.title}</h3></Card.Text>
//             {/* <Card.Text>{eventDetails?.eventStartDateTime}</Card.Text> */}
//           <Modal.Body>
//             {checkObject >= 0 ? (
//               <Card style={{ width: "95%" }}>
//                 <Card.Body>
//                   <ul>
//                     {bookedTicket?.tickets?.map((ele, index) => (
//                       <li key={index}>
//                         <Card.Text> TicketType : {ele.ticketType} </Card.Text>
//                         <Card.Text> Quantity : {ele.quantity}</Card.Text>
//                         <Card.Text> Total Price : {ele.totalAmount}</Card.Text>
//                       </li>
//                     ))}
//                   </ul>
//                 </Card.Body>
//               </Card>
//             ) : <img style={{ width: "100%", height: "100%" }} src={`https://eventpot.s3.ap-south-1.amazonaws.com/Animation+-+ticeket.gif`} />}
//             <h2>Total Amount: {calculateBookedTicketsAmount() || 0}</h2>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="primary" onClick={handlePayment}>
//               Confirm Payment
//             </Button>
//             <Button variant="secondary" onClick={handleCancelPayment}>
//               Cancel
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </div>
//   );
// };

// export default TicketBook;

import React, { useEffect, useState, useMemo } from 'react';
import { Button, Card, Modal, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startGetEvents } from '../../react-redux/action/eventAction';
import { startCreateBooking, startPayment, setClearTicket, startCancelBooking, updateRemainingTickets } from "../../react-redux/action/bookingAction";
import { config } from '../Api_Resources/config';
import axios from '../Api_Resources/axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const TicketBook = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [tickets, setTickets] = useState([]);
  const card = "CARD"
  const [modalVisible, setModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0)

  const events = useSelector((state) => state.events);
  const bookedTicket = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const checkObject = Object.keys(bookedTicket).length;

  useEffect(() => {
    dispatch(setClearTicket());
    dispatch(startGetEvents());
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [events]);


  useEffect(() => {
    (async () => {
      try {
        const stripeId = localStorage.getItem("stripeId");
        const response = await axios.delete(`/api/delete-payment/${stripeId}`, config);
        if (response) localStorage.removeItem("stripeId");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handlePayment = () => {
    console.log("payment");
    dispatch(startPayment(bookedTicket._id, card));
  }

  const handleCancelPayment = () => {
    if (bookedTicket) dispatch(startCancelBooking(bookedTicket._id));
    setModalVisible(false);
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
    setTotalAmount(totalAmount ? totalAmount : 0)
  }

  const calculateBookedTicketsAmount = useMemo(() => {
    if (Object.keys(bookedTicket).length > 0) {
      return bookedTicket?.tickets.reduce((acc, cv) => {
        acc += cv.totalAmount
        return acc
      }, 0)
    }
    return 0;
  }, [bookedTicket]);

  useEffect(() => { calculateTotalAmount() }, [bookedTicket, tickets, modalVisible])
  useEffect(() => { console.log(totalAmount) }, [totalAmount])


  const handleBookTicket = () => {
    if (!eventDetails) {
      console.error('Event details not available.');
      toast.error("Ticket is unavailable")
    }

    const bookedTickets = tickets
      .map((count, index) => ({ count, ticket: eventDetails.ticketType[index] }))
      .filter((ticket) => ticket.count > 0);

    const updatedEventTickets = eventDetails.ticketType.map((ticket) => {
      const bookedTicket = bookedTickets.find((booked) => booked.ticket._id === ticket._id);
      const bookedCount = bookedTicket ? bookedTicket.count : 0;
      const remainingCount = ticket.ticketCount - bookedCount;

      return { ...ticket, remainingTickets: remainingCount, Quantity: ticket.ticketCount - remainingCount, ticketPrice: ticket.ticketPrice }; //
    });
    const filteredTickets = updatedEventTickets.filter((ticket) => ticket.Quantity > 0);
    console.log(filteredTickets)

    dispatch(startCreateBooking(eventId, filteredTickets));
    setModalVisible(true); //  modal after creating booking successfully
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Container>
        <h2 style={{ textAlign: "center" }}>Ticket Booking</h2>
        <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap' }}>
          {eventDetails &&
            eventDetails.ticketType.map((ticket, index) => (
              <div style={{ marginTop: "30px" }} key={index}>
                <Card style={{ width: '18rem', margin: '10px' }}>
                  <Card.Body style={{ margin: '10px 5% 0 5%', border: "2px solid black", borderRadius: "20px" }}>
                    <Card.Title>{ticket.ticketName}</Card.Title>
                    <Card.Text>Price: ₹ {ticket.ticketPrice}</Card.Text>
                    <Card.Text>Remaining: {ticket.remainingTickets}</Card.Text>
                    {ticket.remainingTickets ?
                      <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Button variant="primary" onClick={() => incrementTicket(index)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Card.Text> {tickets[index]} </Card.Text>
                        <Button variant="danger" onClick={() => decrementTicket(index)} disabled={tickets[index] <= 0}>
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                      </div> : <span style={{ color: 'red' }}>Tickets are Sold</span>}
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap', border: "2px solid black", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
          <h2 style={{ marginTop: "10px" }}>Total Amount: {totalAmount ? totalAmount : calculateBookedTicketsAmount || 0}</h2>
          <Button variant='success' style={{ width: "100px", height: "40px", marginTop: "10px" }} onClick={handleBookTicket}>
            Book
          </Button>
        </div>
        <Modal show={modalVisible} onHide={handleCancelPayment}>
          <Modal.Header closeButton>
            <Modal.Title>Seats are Confirmed</Modal.Title>
          </Modal.Header>
          <Card.Text style={{ margin: "5px 0 0 5%" }}><h3>{eventDetails?.title}</h3></Card.Text>
          {/* <Card.Text>{eventDetails?.eventStartDateTime}</Card.Text> */}
          <Modal.Body>
            {checkObject >= 0 ? (
              <Card style={{ width: "95%" }}>
                <Card.Body>
                  <ul>
                    {bookedTicket?.tickets?.map((ele, index) => (
                      <li key={index}>
                        <Card.Text> TicketType : {ele.ticketType} </Card.Text>
                        <Card.Text> Quantity : {ele.quantity}</Card.Text>
                        <Card.Text> Total Price : {ele.totalAmount}</Card.Text>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ) : <img style={{ width: "100%", height: "100%" }} src={`https://eventpot.s3.ap-south-1.amazonaws.com/Animation+-+ticeket.gif`} />}
            <h2>Total Amount: {calculateBookedTicketsAmount || 0}</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlePayment}>
              Confirm Payment
            </Button>
            <Button variant="secondary" onClick={handleCancelPayment}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default TicketBook;
