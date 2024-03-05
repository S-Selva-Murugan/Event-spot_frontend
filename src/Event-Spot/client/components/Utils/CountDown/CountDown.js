import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Countdown from 'react-countdown';
import "./CountDown.css"

const CountDown = ({ ticketSaleStartTime }) => {
return (
    <div style={{border: '2px solid #004777',borderRadius: '5px',padding: '10px',width:"40%",height:"10%"}} >

      <Countdown
        date={new Date(ticketSaleStartTime)}
        color="#004777"
        alpha={0.9}
        size={50} 
        onComplete={() => toast.info("Booking are Opened")}
      />
 
      <ToastContainer/>
    </div>
  );
};

export default CountDown;



