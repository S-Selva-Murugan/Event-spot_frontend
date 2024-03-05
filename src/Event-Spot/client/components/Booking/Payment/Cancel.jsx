import React,{useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from '../../Api_Resources/axios'
import { config } from '../../Api_Resources/config'

function Cancel() {
  const navigate = useNavigate()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 2000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout
  }, []);

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
    <div style={{display:"flex",marginLeft:"380px"}}> 
    <img src='https://miro.medium.com/v2/resize:fit:418/1*9MB_2QMF-LN5Va_V7urxwA.png'/>
    </div>
  )
}

export default Cancel