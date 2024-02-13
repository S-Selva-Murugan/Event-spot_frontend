import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../Api_Resources/axios'
import { config } from '../../Api_Resources/config'

function Cancel() {
  useEffect(()=>{
    (async ()=>{
      try{
        const stripeId = localStorage.getItem("stripeId") 
        const response = await axios.delete(`/api/delete-payment/${stripeId}`,config)
        if(response) localStorage.removeItem("stripeId")


      }catch(err){
        console.log(err)
      }
    })()
  },[])
  return (
    <div style={{display:"flex"}}> 
    <div style={{backgroundImage:(`https://www.freepik.com/premium-vector/boy-looking-mobile-unlock-alert_51574639.htm#page=2&query=payment%20failure&position=8&from_view=search&track=ais&uuid=407009e3-3da6-4bda-b3fb-6044cc5bc0b5`)}}>
    </div>
      <Link to='/'>Home</Link>
      </div>
  )
}

export default Cancel