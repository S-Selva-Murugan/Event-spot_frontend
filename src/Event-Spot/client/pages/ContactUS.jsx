import { Container, Row, Col } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <Container fluid style={{ 
      backgroundImage: "url(https://eventpot.s3.ap-south-1.amazonaws.com/Contact+us.jpg)",
      backgroundSize: "cover",
      height: "100vh" }}>
      <Row>
        <Col style={{display:"flex",justifyContent:"center",marginLeft:"80px",marginTop:"35px"}}>
          <div>
          <h1 style={{textDecoration:"underline",marginBottom:"20px",fontFamily:"cursive",color:"blue"}}>Contact Us</h1>
          <p>You can contact us by email, phone, or by visiting our office.</p>
          <p >Email:<a href="mailto:vikkigouda73@gmail.com">vikkigouda73@gmail.com</a>
<a href="mailto:selvakvs@gmail.com" style={{marginLeft:"10px"}}>selvakvs@gmail.com</a>
</p>
          <p>Phone: 7899193268</p>
          <p >Address:<h6>Thirunenveli Tamil nadu </h6><h6>Banglore Kr puram Karnataka</h6></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
