import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Countdown from 'react-countdown';

const CountDown = ({ ticketSaleStartTime }) => {
  console.log(ticketSaleStartTime,"date")
  const calculateRemainingTime = () => {
    const targetTime = new Date(ticketSaleStartTime).getTime();
    const currentTime = new Date().getTime();
    return Math.max(0, targetTime - currentTime);
  };

  return (
    <div className='countDown'>
      <Countdown
        seconds={calculateRemainingTime() / 1000}
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
