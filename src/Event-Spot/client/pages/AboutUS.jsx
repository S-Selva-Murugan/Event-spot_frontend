import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUS = () => {
  return (
    <div style={{background:"url(https://eventpot.s3.ap-south-1.amazonaws.com/About+us.svg)",backgroundSize:"cover",width:"100vw",height:"100vh",display:"flex",justifyContent:"center",}}>
    <Container style={{display:"flex",justifyContent:"center"}}>
      <div>
      <h1>About Us</h1>
<p>We are a company that specializes in providing solutions and planning your events. Our team is dedicated to creating memorable experiences tailored to your needs. From corporate gatherings to weddings and everything in between, we're here to make your event a success.</p>
<p>Join us as we build together at Event_spot. Together, we'll bring your vision to life and create unforgettable moments that will be cherished for a lifetime.</p>
<p>Connect with us today and let's make your event extraordinary!</p>

      </div>
    </Container>
    </div>
  );
};

export default AboutUS
