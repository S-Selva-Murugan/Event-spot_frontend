import axios from "../../components/Api_Resources/axios"
import { config, fileConfig } from "../../components/Api_Resources/config"
import {toast} from 'react-toastify'

export const startGetEvents = ()=>{
    return async(dispatch)=>{
       
            try{
                const response = await axios.get(`/api/event`)
                dispatch(setEvents(response.data.events))
                console.log(response.data.events,"data action")
            }catch(err){
                console.log(err)
                alert(err)
            }
        
    }
}

const setEvents = (data)=>{
    console.log(data,"in userAction")
    return{
        type:"GET_ALL_EVENTS_BY_API",
        payload:data
    }
}

export const startCreateEvent = (eventFormData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post('/api/event', eventFormData, fileConfig)
            dispatch(setCreateEvents(response.data))
            toast.success( `${response.data.title} Event created successfully`)

        }catch(err){
            console.log(err)
            alert(err,"Cannot create a Event")
        }
    }
}

const setCreateEvents =(data)=>{
    return {
        type:"CREATE_NEW_EVENT",
        payload:data
    }
}

export const startUpdateEvent = (eventFormData,eventId)=>{
    return async(dispatch)=>{
        try{
            console.log(eventFormData)
            const response = await axios.put(`/api/event/${eventId}`, eventFormData, fileConfig)
            dispatch(setUpdateEvents(response.data))

        }catch(err){
            console.log(err)
            toast.error(err,"Cannot create a Event")
        }
    }
}

const setUpdateEvents =(data)=>{
    return {
        type:"UPDATE_EVENT_AFTER_BOOKING",
        payload:data
    }
}
export const startDeleteEvent = (eventId,eventFormData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}`, eventFormData, fileConfig)
            dispatch(setDeleteEvents(response.data))
            toast.success("Event Created Successfully")

        }catch(err){
            console.log(err)
            alert(err,"Cannot create a Event")
        }
    }
}

const setDeleteEvents =(data)=>{
    return {
        type:"DELETE_EVENT",
        payload:data
    }
}

export const startCreateReview = (eventId,reviewForm)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}/review`, reviewForm, config)
                dispatch({
                    type: "CREATE_REVIEW_FOR_EVENT",
                    payload:{
                        eventId,
                        review:response.data
                    }
                })
                console.log({
                    eventId,
                    review:response.data
                })

            toast.success("Review Created Successfully")

        }catch(err){
            console.log(err)
            toast.error(err,"Cannot create a Reviw")
        }
    }
}



export const startUpdateReview = (eventId,reviewId,reviewForm)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.put(`/api/event/${eventId}/review/${reviewId}`, reviewForm, config)
            dispatch({
                type:"UPDATE_REVIEW_FOR_EVENT",
                payload:{
                    eventId,
                    reviewId,
                    updatedReview:response.data
                }
            })
            toast.success("Review Edited Successfully")

        }catch(err){
            console.log(err)
            toast.error(err,"Cannot Edit a Review")
        }
    }
}



export const startDeleteReview = (eventId,reviewId,reviewForm)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`/api/event/${eventId}/review/${reviewId}`, config)
            dispatch({
                type:"DELETE_REVIEW_FOR_EVENT",
                payload:{
                    eventId,
                    reviewId
                }
            })
            toast.success("Review Deleted Successfully")

        }catch(err){
            console.log(err)
            toast.error(err,"Cannot Edit a Review")
        }
    }
}

