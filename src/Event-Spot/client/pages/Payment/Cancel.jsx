import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import { config } from '../../components/Api_Resources/config'
import axios from '../../components/Api_Resources/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt} from '@fortawesome/free-solid-svg-icons';

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
    <div style={{}}> 
    <div>
      <Link to='/' style={{display:"flex",justifyContent:"center",marginTop:"2%"}}><FontAwesomeIcon icon={faHomeAlt} style={{marginTop:".3%"}}/>HOME</Link></div>
    <img src={`https://eventpot.s3.ap-south-1.amazonaws.com/payment-error-info-message-smartphone-customer-cross-marks-failure_106788-2322.jpg`} style={{width:"90%",height:"50%",marginLeft:"5%"}}/>
      </div>
  )
}

export default Cancel