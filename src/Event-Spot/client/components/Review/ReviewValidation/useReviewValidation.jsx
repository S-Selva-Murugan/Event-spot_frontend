import {useState} from 'react'
import {z} from 'zod'

const ReviewSchema = z.object({
    title:z.string().required(),

    body:z.string().required(),

    rating:z.number().min(0.5).max(5).required(),

    
})

export function useReviewValidation(initalValues){
    const [values,setValues] = useState(initalValues)
    const [errors,setErrors] = useState({})

    const validate = (inputValues)=>{
        try{
            ReviewSchema.parse(inputValues)
            setErrors({})
            return true
        }catch(error){
            setErrors(error.errors)
            return false
        }
    }



    const handleChange = (e)=>{
        const {name,value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    return{
        values,errors,handleChange,validate
    }
}

import React, { useContext, useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { startCreateEvent, startCreateReview, startUpdateReview } from '../../react-redux/action/eventAction';
import { MyContext } from '../../ContextApi/Context';
import { useNavigate } from 'react-router';
import {toast,ToastContainer} from 'react-toastify'
import { useReviewValidation } from './ReviewValidation/useReviewValidation';

function ReviewForm({eventId,updatingReview,handleReviewToggle}) {
  const {userData} = useContext(MyContext)
  const {values,errors,handleChange,validate} = useReviewValidation({
      title: updatingReview ? updatingReview.title : '',
      body: updatingReview ? updatingReview.body : '',
      rating: updatingReview ? updatingReview.rating : 0,
    })


const dispatch = useDispatch()
const navigate = useNavigate()

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(values)
    console.log(errors)
    console.log(eventId,isValid,userData.role)

    if(isValid && eventId && userData.role==='Customer'){
      if(updatingReview?._id){

        dispatch(startUpdateReview(eventId,updatingReview?._id,values))
      
      } else {
        dispatch(startCreateReview(eventId,values))
      }
      handleReviewToggle()
    }else{
      toast.info("Please Login to Review the event")
    }
 };

  return (
    <div style={{width:"40%"}}>
      <Form onSubmit={handleReviewSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter title"
            value={values.title}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        {errors?.title && <span>{errors.title}</span>}
        <FormGroup>
          <Label for="body">Body</Label>
          <Input
            type="textarea"
            id="body"
            placeholder="Enter review body"
            value={values.body}
            onChange={(e) => handleChange(e)}
          />
          {errors?.body && <span>{errors.body}</span>}

        </FormGroup>
        <div style={{display:"flex"}}>
        <FormGroup>
          <Label for="rating">Rating</Label>
          <ReactStarsRating
            value={values.rating}
            count={5}
            onChange={(value) => handleChange({target:{name:"rating",value}})}
            size={30}
            isHalf={true}
          />
        </FormGroup>
        {errors?.rating && <span>{errors.rating}</span>}

        <Button color="primary" type="submit" style={{marginLeft:"20%"}}>
          Submit
        </Button>
        </div> 
      </Form>
      <ToastContainer/>
      <div>
      </div>
    </div>
  );
}

export default memo(ReviewForm)