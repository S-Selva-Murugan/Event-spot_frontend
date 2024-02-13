import React,{useState,useEffect, useContext} from 'react'
import ReviewForm from './ReviewForm'
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Badge, Button,Form, CardText } from 'react-bootstrap';
import { MyContext } from '../../ContextApi/Context';


const ReviewCard = ({eventId,review}) => {
    const [reviewToggle, setReviewToggle] = useState(false)
    const {userData} = useContext(MyContext)

  return (
    <div style={{width:"100%",marginTop:"10%",borderRadius:"5%"}}>
        <ListGroup.Item key={review._id} as="li" className="d-flex justify-content-between align-items-start"  >
            {reviewToggle ?<ReviewForm eventId={eventId} updatingReview={review} />:<div className="ms-2 me-auto">
                <div>
                Name:{review.userId.username}
              <div className="fw-bold">Title:{review.title}</div>
              Body:{review.body}
            </div>
            <Badge bg="primary" pill>
              {review.rating}
            </Badge>
            </div>}
            { userData.id===review.userId._id && <div style={{ display: 'block' }}>
              {reviewToggle ? (
                <Button onClick={() => setReviewToggle(!reviewToggle)}>cancel</Button>
              ) : (
                <Button onClick={() => setReviewToggle(!reviewToggle)}>Edit</Button>
              )}
              <Button>delete</Button>

            {reviewToggle && <ReviewForm eventId={eventId} updatingReview={review} />}
            </div>}
          </ListGroup.Item>
    </div>
  )
}

export default ReviewCard
