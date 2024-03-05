import { Card,Typography } from '@mui/material';
import React, { memo, useState } from 'react';
import QRCode from "react-qr-code";
import moment from 'moment';
import { renderToString } from 'react-dom/server';

function readableDate(inputDateString) {
  const momentObject = moment(inputDateString);
  return momentObject.format('L');
}

console.log(process.env.REACT_APP_URL,"url")

function QrGenerator({ QrData }) {
  const { eventInfo, id, quantity, ticketPrice, ticketType, totalAmount, createdAt } = QrData;
  console.log(QrData, "in qr code");
  const [qrVar, setQrVar] = useState({
    back: " ", //#FFFFFF bgcolor
    fore: " ", //#000000 color
    size: 100 //256 
  });

  const finalData = () => {
    return `
            Click here ${process.env.REACT_APP_URL}\n
            ${eventInfo?.title}\n
            Starts On: ${readableDate(eventInfo?.eventStartDateTime)}\n
            Ends On: ${eventInfo?.eventEndDateTime && readableDate(new Date(eventInfo?.eventEndDateTime))}\n
            Type: ${ticketType}\n
            Quantity: ${quantity}\n
            Paid: ${totalAmount}₹\n
            On: ${createdAt.toLocaleDateString('en-GB')}`;

  }
  
  
  

  const qrDataString = renderToString(finalData()); // Convert JSX to string

  return (
    <div className='Componet-Container' style={{ width: "100%", height: "100%" }}>
      <div className="qrCode" style={{ textAlign: "center" }}>
        <QRCode value={qrDataString} size={qrVar.size} fore={qrVar.fore} back={qrVar.back} />
      </div>
    </div>
  );
}

export default memo(QrGenerator)
