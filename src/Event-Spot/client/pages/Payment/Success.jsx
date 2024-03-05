import React,{useEffect} from 'react'
import { Button, ToastContainer } from 'react-bootstrap'
import { config } from '../../components/Api_Resources/config'
import axios from '../../components/Api_Resources/axios'
import {Link, useNavigate} from "react-router-dom"

function Success() {
  const navigate = useNavigate()
  useEffect(()=>{
    (async()=>{
      try{
        const stripeId = localStorage.getItem("stripeId")
        console.log(stripeId)
        const response = await axios.put("/api/booking/update-payment",{stripeId},config)
        if(response) localStorage.removeItem("stripeId")
        


      }catch(err){
        console.log(err)
        // toast.error(JSON.stringify(err))
      }
    })()
  },[])
  setTimeout(()=>{
    navigate("/user-profile")
  },3000)
  return (
    <div style={{backgroundImage:"url(https://eventpot.s3.ap-south-1.amazonaws.com/success-gif.gif)"}}>
      <div style={{display:"flex",justifyContent:"space-around",backgroundImage:"url(https://eventpot.s3.ap-south-1.amazonaws.com/success-gif.gif)"}} >

      <Link to="/"><Button>Home</Button></Link>
      <Link to="/user-profile"><Button>Profile</Button></Link>
      </div>
      <img src={`https://eventpot.s3.ap-south-1.amazonaws.com/success-gif.gif`} style={{width:"80%",height:"40%",margin:"0 0 0 10%"}}/>
      <ToastContainer/>
    </div>
  );

  
  
}

export default Success