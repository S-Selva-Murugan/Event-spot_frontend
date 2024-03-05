import React, { useContext, useState,memo } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { startCreateReview, startUpdateReview } from '../../react-redux/action/eventAction';
import { MyContext } from '../../ContextApi/Context';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

function ReviewForm({ eventId, updatingReview }) {
    const { userData } = useContext(MyContext);
    const [reviewData, setReviewData] = useState({
        title: updatingReview ? updatingReview.title : '',
        body: updatingReview ? updatingReview.body : '',
        rating: updatingReview ? updatingReview.rating : 0,
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        let valid = true;
        const newErrors = {};

        if (!reviewData.title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        }

        if (!reviewData.body.trim()) {
            newErrors.body = 'Body is required';
            valid = false;
        }

        if (reviewData.rating === 0) {
            newErrors.rating = 'Please provide a rating';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleReviewChange = (value, name) => {
        setReviewData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
      // if(validate()){
        if (eventId && userData.role === 'Customer') {
            if (updatingReview?._id) {
                dispatch(startUpdateReview(eventId, updatingReview?._id, reviewData));
            } else {
                dispatch(startCreateReview(eventId, reviewData));
            }

            setReviewData({ title: '', body: '', rating: 0 });
        } else {
            toast.info('Please Login to Review the event');
        }
      // }
    };

    return (
        <div style={{ width: '90%' }}>
            <Form onSubmit={handleReviewSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        value={reviewData.title}
                        onChange={(e) => handleReviewChange(e.target?.value, 'title')}
                    />
                    {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input
                        type="textarea"
                        id="body"
                        placeholder="Enter review body"
                        value={reviewData.body}
                        onChange={(e) => handleReviewChange(e.target.value, 'body')}
                    />
                    {errors.body && <span style={{ color: 'red' }}>{errors.body}</span>}
                </FormGroup>
                <div style={{ display: 'flex' }}>
                    <FormGroup>
                        <Label for="rating">Rating</Label>
                        <ReactStarsRating
                            value={parseFloat(reviewData.rating)}
                            count={5}
                            onChange={(value) => handleReviewChange(value, 'rating')}
                            size={30}
                            isHalf={true}
                        />
                    </FormGroup>
                    {errors.rating && <span style={{ color: 'red' }}>{errors.rating}</span>}
                    <Button color="dark" type="submit" style={{ marginLeft: '20%' }}>
                        Submit
                    </Button>
                </div>
            </Form>
            <ToastContainer />
            <div></div>
        </div>
    );
}

export default memo(ReviewForm);
