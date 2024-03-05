import React,{memo} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Footer (){
  return (
    <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
      <p style={{color:"black"}}>&copy; 2024 Event-Spot. All rights reserved.</p>
      <p><Link to="contact-us">Contact us</Link></p>
      <p><Link to="about-us">About us</Link></p>
     
    </footer>
  );
};

export default memo(Footer)
