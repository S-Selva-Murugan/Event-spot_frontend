import * as React from 'react'
import {useState} from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpiryTime from '../Booking/Qr-Component/ExpiryTime';
import { Button } from '@mui/material';

export default function TicketCard({eventInfo,quantity,ticketPrice,ticketType,totalAmount,id}) {
  const [qrToggle,setQrToggle] = useState(false)
  const expiryTime = 2
  const theme = useTheme();
  const detailsInfo = {
    quantity,ticketPrice,ticketType,totalAmount,id
  }

  return (
    <div>
      {qrToggle ? <Button onClick={()=>setQrToggle(false)}>Hide</Button> : <Button onClick={()=>setQrToggle(true)}>Show</Button>}
    {qrToggle && <Card key={id} sx={{ display: 'flex',border:"2px solid black",marginTop:"2px" ,width:"500px"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5" key={eventInfo._id}>
            EVENT:{eventInfo.title} <br/>Starts At:{eventInfo.eventStartDateTime}
          </Typography>
          <Typography component="div" variant="h5">
            CLASS:{ticketType}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            QUANTITY:{quantity}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
          <ExpiryTime detailsInfo={detailsInfo} expiryTime={expiryTime}/>

          </IconButton>
          <IconButton aria-label="play/pause">
          </IconButton>
          <IconButton aria-label="next">
            
          </IconButton>
        </Box>
      </Box>
      {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        // image={image}
        alt="Live from space album cover"
      /> */}
    </Card> }
    </div>
  );
}
