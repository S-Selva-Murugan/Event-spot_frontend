import React,{useState} from 'react';
import Card from '@mui/material/Card';
import {CardContent,Typography,Button} from '@mui/material';

import moment from 'moment'
import QrGenerator from "../Booking/Qr-Component/QrGenerator" 


function readableDate(inputDateString) {
  const momentObject = moment(inputDateString);
  return momentObject.format('L');
}


function TicketCard({ eventInfo, id, quantity, ticketPrice, ticketType, totalAmount, createdAt }) {
  const [qrToggle, setQrToggle] = useState(false)

  return (
    <Card style={{width:"100%",height:"100%"}} key={id}>
      <CardContent style={{marginLeft:"-10px"}}>
        <Typography variant="body2" component="div">
          {eventInfo?.title}<br/>
        </Typography>
        <Typography variant="body2" color="text.secondary">

          StartsOn :{readableDate(eventInfo?.eventStartDateTime)}
          </Typography>
 
        <Typography variant="body2" color="text.secondary">

          EndsOn:{eventInfo?.eventEndDateTime && readableDate(new Date(eventInfo?.eventStartDateTime))}         
          </Typography>

        <Typography variant="body2" color="text.secondary">
          Type: {ticketType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Q: {quantity}₹
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Paid: {totalAmount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          On: {createdAt.toLocaleDateString('en-GB')}
        </Typography>
        {qrToggle ? <Button onClick={() => setQrToggle(false)}>Hide</Button> : <Button onClick={() => setQrToggle(true)}>Show</Button>}

        {qrToggle &&<QrGenerator QrData={{ eventInfo, id, quantity, ticketPrice, ticketType, totalAmount, createdAt }} />}

      </CardContent>
    </Card>
  );
}

export default TicketCard;
