import React, { useEffect } from 'react';
import { config } from '../../Api_Resources/config';
import { ToastContainer } from 'react-bootstrap';
import axios from '../../Api_Resources/axios';
import { Link, useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/user-profile');
    }, 4000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  useEffect(() => {
    (async () => {
      try {
        const stripeId = localStorage.getItem("stripeId");
        console.log(stripeId);
        const response = await axios.put("/api/booking/update-payment", { stripeId }, config);
        if (response) localStorage.removeItem("stripeId");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "265px" }}>
        <img
          src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif"
          style={{ height: '500px' }}
          alt=""
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Success;
