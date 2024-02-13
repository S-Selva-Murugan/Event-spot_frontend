import React,{useEffect} from 'react'
import { config } from '../../Api_Resources/config'
import { ToastContainer } from 'react-bootstrap'
import axios from '../../Api_Resources/axios'
import {Link} from "react-router-dom"

function Success() {
  useEffect(()=>{
    (async()=>{
      try{
        const stripeId = localStorage.getItem("stripeId")
        console.log(stripeId)
        const response = await axios.put("/api/booking/update-payment",{stripeId},config)
        if(response) localStorage.removeItem("stripeId")
        


      }catch(err){
        // toast.error(JSON.stringify(err))
      }
    })()
  })
  return (
    <div>
      <img src={`https://www.freepik.com/free-vector/man-transferring-money-woman-via-smartphone-online-transaction-banking-flat-vector-illustration-finance-digital-technology-concept_10613198.htm#query=payment%20successful&position=0&from_view=keyword&track=ais&uuid=bc27d54a-1c86-414f-9289-ffc326f74a10`}/>
      <Link to="/">Home</Link>
      <ToastContainer/>
    </div>
  )
}

export default Success