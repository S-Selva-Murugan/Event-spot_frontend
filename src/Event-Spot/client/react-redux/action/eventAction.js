import axios from "../../components/Api_Resources/axios"
import { config, fileConfig } from "../../components/Api_Resources/config"
import {toast} from 'react-toastify'

export const startGetEvents = ()=>{
    return async(dispatch)=>{
       
            try{
                const response = await axios.get(`/api/event`)
                dispatch(setEvents(response.data))
                console.log(response.data,"data action")
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

const setEventsToOrganise = (data)=>{
    console.log(data,"in userAction")
    return{
        type:"CREATE_A_NEW_EVENT",
        payload:data
    }
}

export const startCreateEvent = (eventFormData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post('/api/event', eventFormData, fileConfig)
            dispatch(setEventsToOrganise(response.data))
            toast.success( `${response.data.title} Event created successfully`)
            localStorage.removeItem('form');
            localStorage.removeItem('youTube');
            localStorage.removeItem('actors', );
            localStorage.removeItem('allCategory');
            localStorage.removeItem('searchTerm');
            localStorage.removeItem('locObj');
            localStorage.removeItem('searchResults')
            localStorage.removeItem('selectedAddress');

        }catch(err){
            console.log(err)
            alert(err,"Cannot create a Event")
        }
    }
}

const setCreateEvents =(data)=>{//because the event must be approved then only i want to show the event
    return {
        type:"CREATE_NEW_EVENT",
        payload:data
    }
}

//this upating the existing event and also whenever a user create a new booking i am getting back the new updated on to show how much seats are left

export const startUpdateEvent = (eventFormData,eventId)=>{
    return async(dispatch)=>{
        try{
            console.log(eventFormData,"in the update Action")
            const response = await axios.put(`/api/event/${eventId}`, {eventFormData}, config)
            dispatch(setUpdateEvents(response.data))

        }catch(err){
            console.log(err)
            toast.error(err,"Cannot create a Event")
        }
    }
}

const setUpdateEvents =(data)=>{
    return {
        type:"UPDATE_EVENT",
        payload:data
    }
}

export const startCreateReview = (eventId,reviewForm)=>{
    console.log(reviewForm)
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}/review`, reviewForm, config)
            console.log(response.data)
                dispatch({
                    type: "ADD_REVIEW_TO_EVENT",
                    payload:{
                        eventId,review:response.data
                    }
                })

            toast.success("Review Created Successfully")

        }catch(err){
            err.response.data.errors.forEach(ele =>  toast.error(ele.msg));
            console.log(err)
        }
    }
}


export const startUpdateReview = (eventId, reviewId, reviewForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/event/${eventId}/review/${reviewId}`, reviewForm, config);
            console.log(response.data,"aaaaaaaaaaaaaaaa")
            dispatch({
                type: "UPDATE_REVIEW_IN_EVENT",
                payload: {
                    eventId,
                    reviewId,
                    updatedReview: response.data
                }

            });
            toast.success("Review edited successfully")
        } catch (err) {
            err.response.data.errors.forEach(ele =>  toast.error(ele.msg));
            // toast.error("Cannot edit review");
        }
    };
};




export const startDeleteReview = (eventId,reviewId)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`/api/event/${eventId}/review/${reviewId}`, config)

            dispatch({
                type:"DELETE_REVIEW_FROM_EVENT",
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

