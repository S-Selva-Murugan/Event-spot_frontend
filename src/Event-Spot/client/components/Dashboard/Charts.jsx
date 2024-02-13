import React, {useState, useEffect } from 'react'
import {config} from '../Api_Resources/config'
import axios from '../Api_Resources/axios'
import { Bar, Doughnut } from 'react-chartjs-2';
import SpinnerComponent from '../Utils/Spinner/SpinnerComponent'

function Charts() {
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
    (async ()=>{        
        try{
            const response = await axios.get('/api/dashboard',config)
            console.log(response.data)
            setData(response.data)
            setLoading(true)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    })()

    },[])

    if(loading) return ( <div><SpinnerComponent/></div>)

    const activeUserData = {
        labels :[ 'Active Users','Not Active Users'],
        datasets:[
            {
                label:'User Status',
                data :[data?.userInfo?.activeUsers,data?.userInfo?.notActiveUsers],
                backgroundColor: ['#36A2EB', '#FF6384'],
            }
        ]
    }

    const totalAmountData = {
        labels : ["Total Amount"],
        datasets:[
            {
                label : 'Total Amount',
                data : [data?.totalAmount],
                backgroundColor: ['#FFCE56']
            }
        ]
    }

    // const popularEventsData = {
    //     label:data?.popularEvent.map(event=>event?.title),
    //     datasets:[
    //         {
    //             label:"Tickets Sold",
    //             data:data?.populatEvent?.map(event=>event?.ticketsSold),
    //             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    //         }
    //     ]

    // }

    // const categoryData = {
    //     labels :data?.categoryEvents?.map(category=>category?.name),
    //     datasets:[
    //         {
    //             label:"Number of Events",
    //             data:data?.category?.categoryEvents?.map(category=>category?.event?.length),
    //             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    //         },
    //     ],
    // }
    // const categoryData = {
    //     labels: data.categoryEvents.map(category => category.name),
    //     datasets: [
    //         {
    //             label: "Number of Events",
    //             data: data.category.categoryEvents.map(category => category.event.length),
    //             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    //         },
    //     ],
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true // Assuming you're using a linear scale for the y-axis
    //             }
    //         }
    //     }
    // }
    

    // const reviewData = {
    //     labels : ['Average Rating'],
    //     datasets:[{
    //         label:'Average Rating',
    //         data:[data.review.averageRating || 0],
    //         backgroundColor: ['#FF6384'],

    //     }]
    // }
  return (
    <>
    {data ? <div>
        data
         <h2>User Status</h2>
        <Doughnut data={activeUserData}/>
        <h2>Total Amount</h2>
        <Bar data={totalAmountData}/>
        <h2>Popular Events</h2>
        {/* <Bar data={popularEventsData}/> */}

        <h2>Category Events</h2>
        {/* <Bar data={categoryData}/> */}
        <h2>Average Review Rating</h2>
        {/* <Bar data={reviewData}/> */}
      
    </div> : <SpinnerComponent/>}
    </>
  )
}

export default Charts
