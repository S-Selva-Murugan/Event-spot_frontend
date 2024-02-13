// import React,{useState,useEffect} from 'react'
// import axios from '../Api_Resources/axios'
// import { config } from '../Api_Resources/config'
// import { toast } from 'react-toastify'


// const TicketCancel = () => {
//     // /api/booking/:bookingId
//     const [allBookings,setAllBookings] = useState("")
//     useEffect(()=>{
//         (async ()=>{
//             try{
//             const {data} = axios.get('/api/get/bookings',config) //check its working or not
//             console.log(data)
//             setAllBookings(data)
//             }catch(err){
//                 console.log(err)
//                 toast.error(JSON.stringify(err))
//             }
 
//         })()


//     })
//   return (

//     <div>
//       {allBookings && console.log(allBookings)}
//     </div>
//   )
// }

// export default TicketCancel
import React from 'react'

const TicketCancel = () => {
  return (
    <div>
      HI 
    </div>
  )
}

export default TicketCancel

