import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useNavigate} from 'react-router-dom'
import ViewHisBooking from './ViewHisBookings';

function OffCanvasProfile() {
  const [show, setShow] = useState(true);
  const [showBookings,setShowBooking] = useState(false)
  let data = true
  const handleToggle = () => setShow(!show);
  const navigate = useNavigate()

  return (
    <>
      <Offcanvas show={show} onHide={handleToggle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div onClick={()=>setShowBooking(!showBookings)}>Bookings</div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="body">
        {showBookings && <ViewHisBooking/>}
        {data && <ViewHisBooking/>}

      </div>
 

    </>
  );
}

export default OffCanvasProfile



