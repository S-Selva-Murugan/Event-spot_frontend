import React from 'react';
import Chart from 'react-apexcharts';
import { Container, Table } from 'react-bootstrap';
import BookedUserInfo from './BookedUserInfo';

const OrganiserDashboard = ({ event }) => {
  const ticketNames = Array.isArray(event.ticketType) ? event.ticketType.map(ticket => ticket.ticketName) : [];
  const ticketsSold = Array.isArray(event.ticketType) ? event.ticketType.map(ticket => ticket.ticketCount - ticket.remainingTickets) : [];
  console.log(ticketNames, ticketsSold);

  const renderTicketTypes = () => (
    <Table striped bordered hover style={{width:"100%"}}>
      <thead>
        <tr>
          <th>Ticket Name</th>
          <th>Total Tickets</th>
          <th>Remaining Tickets</th>
          <th>Ticket Price</th>
          <th>Tickets Sold</th>
          <th>Total Revenue</th>
        </tr>
      </thead>
      <tbody>
        {event?.ticketType?.map(ticket => (
          <tr key={ticket._id}>
            <td>{ticket.ticketName}</td>
            <td>{ticket.ticketCount}</td>
            <td>{ticket.remainingTickets}</td>
            <td>{ticket.ticketPrice}</td>
            <td>{ticket.ticketCount - ticket.remainingTickets}</td>
            <td>{(ticket.ticketCount - ticket.remainingTickets) * ticket.ticketPrice}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const totalRevenue = event?.ticketType?.reduce((acc, ticket) => acc + (ticket.ticketCount - ticket.remainingTickets) * ticket.ticketPrice, 0);

  const options = {
    colors: ['#66DA26'], // Adjust colors array
    chart: {
      id: 'TicketTypeChart', // Adjust chart id
      type: 'bar', // Adjust chart type
    },
    xaxis: {
      categories: ticketNames,
    },
  };

  const series = [
    {
      name: 'Tickets Sold', // Adjust series name
      data: ticketsSold,
    },
  ];

  return (
    <div>
      {totalRevenue!==0 && <Chart options={options} series={series} type="bar" height={350} />}
      <Container>
        {renderTicketTypes()}
        <tfoot>
          <tr>
          </tr>
        </tfoot>
        <BookedUserInfo   eventId={event._id}/>

      </Container>
    </div>
  );
};

export default OrganiserDashboard;

// import React, { useState } from 'react';
// import Chart from 'react-apexcharts';
// import { Container, Table} from 'react-bootstrap';

// const OrganiserDashboard = ({ event }) => {
//   const ticketNames = Array.isArray(event.ticketType) &&  event?.ticketType?.map(ticket => ticket.ticketName);
//   const ticketsSold = Array.isArray(event.ticketType) && event?.ticketType?.map(ticket => ticket.ticketCount - ticket.remainingTickets);
//   console.log(ticketNames,ticketsSold)

//   const renderTicketTypes = () => {
//  return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Ticket Name</th>
//           <th>Total Tickets</th>
//           <th>Remaining Tickets</th>
//           <th>Ticket Price</th>
//           <th>Tickets Sold</th>
//           <th>Total Revenue</th>
//         </tr>
//       </thead>
//       <tbody>
//         {event?.ticketType?.map(ticket => (
//           <tr key={ticket._id}>
//             <td>{ticket.ticketName}</td>
//             <td>{ticket.ticketCount}</td>
//             <td>{ticket.remainingTickets}</td>
//             <td>{ticket.ticketPrice}</td>
//             <td>{ticket.ticketCount - ticket.remainingTickets}</td>
//             <td>{(ticket.ticketCount - ticket.remainingTickets) * ticket.ticketPrice}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// }

//   const totalRevenue = event?.ticketType?.reduce((acc, ticket) => {
//     return acc + (ticket.ticketCount - ticket.remainingTickets) * ticket.ticketPrice;
//   }, 0)




// const options =  {
//       colors: ['#66DA26', "red"],
//       chart: {
//         id: 'Ticket Type'
//       },
//       xaxis: {
//         categories:ticketNames
//       }
//     }
//    const series= [
//       {
//         name: 'Ticket Purchase',
//         data: ticketsSold// Initialize data arrays with empty arrays
//       },

//     ]
  

//   // Check if ticketsSold is an array before calling every method
//   // const allSoldOut = Array.isArray(ticketsSold) && ticketsSold?.every(count => count === 0);

//   return (
//     <div>
      
//       <Chart options={options} series={series} type="bar" height={350} /> 

//       <div>
//         <Container>
//           {renderTicketTypes()}
//           <tfooter >Total Revenue: {totalRevenue}</tfooter>
//           </Container>
//         {/* {allSoldOut && <p>All tickets sold out!</p>} */}
//       </div>
//     </div>
//   );
// };

// export default OrganiserDashboard;


