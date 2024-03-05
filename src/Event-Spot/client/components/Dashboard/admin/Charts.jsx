import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from '../../Api_Resources/axios';
import { config } from '../../Api_Resources/config';
import { Typography, Grid, Container } from '@mui/material';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh} from '@fortawesome/free-solid-svg-icons';
import SpinnerComponent from '../../Utils/Spinner/SpinnerComponent';



const Charts = () => {
  const [loading,setLoading] = useState(false)
  const [userState, setUserState] = useState({
    userInfo: { activeUsers: 0, notActiveUsers: 0 }, // Initialize userInfo
    options: {
      colors: ['#66DA26', "red"],
      chart: {
        id: 'basic'
      },
      xaxis: {
        categories: [] // Initialize categories with an empty array
      }
    },
    series: [
      {
        name: 'Active Users',
        data: [] // Initialize data arrays with empty arrays
      },
      {
        name: 'Non Active Users',
        data: []
      }
    ]
  });
  const [eventState, setEventState] = useState({
    popularEvent: [],
    options: {
      colors: ['#2E93fA', '#66DA26'],
      chart: {
        id: 'Popular Events'
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: 'Tickets Sold',
        data: []
      }
    ]
  });
  const [categoryEvents, setCategoryEvents] = useState({
    categoryEvents: [], // Initial empty array
    options: {
      // Initial options for the chart
      chart: {
        id: 'category-events-chart',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      xaxis: {
        categories: [] // Initial empty array for x-axis categories
      }
    },
    series: [
      {
        name: 'Events',
        data: [] // Initial empty array for series data
      }
    ]
  });
  const [paymentType,setpaymentType] = useState({
    series: [0],
    options: {
      chart: {
        type: 'donut',
      },
      labels: [],
    },
  }
  )
  const [totalState,setTotalEventPerOrganiserState] = useState({
    TotalEvent: [],
    options: {
      colors: ['#2E93fA', '#66DA26'],
      chart: {
        id: 'Organiser Event'
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: 'Tickets Sold',
        data: []
      }
    ]
  })
  const [TodayTotalRevenue,setTodayTotalRevenue] = useState(0);
  const [totalAmount,setTotalAmount] = useState(0)
  const [totalBooking,setTotalBooking] = useState(0)



  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = ()=>{
    fetchData();
  }

  const fetchData = async () => {
    console.log("Calling API")
    setLoading(false)
    try {
      
      const response = await axios.get('/api/dashboard', config);
      console.log(response.data)
      const { popularEvent } =response.data
      const totalAmount =  response.data?.totalAmount[0]?.totalAmount 
      const { activeUsers, notActiveUsers } = response.data.userInfo
      const {categoryEvents} = response.data.category
      const {paymentType} = response.data
      const {totalBooking} = response.data


      setTodayTotalRevenue(totalAmount)
      setTotalBooking(totalBooking[0].totalBookings)
      setUserState(prevState => ({
        ...prevState,
        userInfo: response.data.userInfo,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: ["Active", "inActive"]
          }
        },
        series: [
          {
            ...prevState?.series[0],
            data: [activeUsers]
          },
          {
            ...prevState?.series[1],
            data: [notActiveUsers]
          }
        ]
      }));
      if(Array.isArray(popularEvent)){
      setEventState(prevState => ({
        ...prevState,
        popularEvent: popularEvent,
        options: {
          ...prevState?.options,
          xaxis: {
            ...prevState.options?.xaxis,
            categories: popularEvent?.map(event => event?.title)
          }
        },
        series: [
          {
            ...prevState.series[0],
            data: popularEvent?.map(event => event?.ticketsSold)
          }
        ]
      }));
      setLoading(true)

    }
      // setCategoryEvents(prevState => ({
      //   ...prevState,
      //   categoryEvents: categoryEvents,
      //   options: {
      //     ...prevState.options,
      //     xaxis: {
      //       ...prevState.options.xaxis,
      //       categories: categoryEvents.map(ele => ele.title)
      //     }
      //   },
      //   series: [
      //     {
      //       ...prevState.series[0], // Assuming you have only one series
      //       name: 'Events',
      //       data: categoryEvents.map(ele => (ele.events ? ele.events.length + 1 : 0)) // Check if ele.events is defined
      //     }
      //   ]
      // }));

      // Calculate total amount from the data and update the state
      
      const total = popularEvent.reduce((acc, event) => acc + event.ticketsSold, 0);
      setTotalAmount(total);

      setpaymentType(prevState=>({
        ...prevState,
        series:[paymentType[0].totalAmount],
        options: {
          ...prevState.options,
          labels: [paymentType[0]._id]
        }
      }))
      console.log(paymentType[0]._id)
    } catch (err) {
      console.error(err);
    }
  };

  // return (
  //   <div>
  //     <div>in Charts</div>
  //     <div>bar line area radar histogram scatter heatmap</div>
  //     <div >Total Tickets sold: {totalAmount}  Total Revenu:{TodayTotalRevenue}/day</div>
  //     <div>
  //       <h2>Most Ticket purchased</h2>
  //       <Chart options={eventState.options} series={eventState.series} type="bar" width="450" />
  //     </div>
  //     <div>
  //     <Chart options={userState.options} series={userState.series} type="bar" width="450" />

  //     </div>
  //     <div>
  //       {/* <Chart options={categoryEvents.options} series={categoryEvents.series} type="bar" width="450" /> */}
  //     </div>

  //   </div>
  // );
  return (
    <div style={{ padding: '20px' }}>
      {loading ? <Container>
      
      <Typography variant="h3" style={{textAlign:"center",textDecoration:"underline"}}>Dashboard<Button onClick={handleRefresh}>  <FontAwesomeIcon icon={faRefresh} /></Button></Typography>
    <div style={{display:"flex",marginTop:"50px",justifyContent: "space-evenly"}}>
      <Button variant="body1" style={{ marginBottom: '20px' ,border:"2px solid black",backgroundColor:"lightblue"}}>
        Total Revenue: {TodayTotalRevenue ? TodayTotalRevenue : 0}/day
      </Button>
      <Button variant="body1" style={{ marginBottom: '20px' ,border:"2px solid black",backgroundColor:"lightblue"}}>
        Total Tickets sold: {totalAmount ? totalAmount : 0} 
      </Button>
      <Button variant="body1" style={{ marginBottom: '20px' ,border:"2px solid black",backgroundColor:"lightblue"}}>
        Total Booking: {totalBooking ? totalBooking : 0}/day 
      </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Most Tickets Purchased</Typography>
          <Chart options={eventState.options} series={eventState.series} type="bar" width="100%" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">User Statistics</Typography>
          <Chart options={userState.options} series={userState.series} type="bar" width="100%" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Payment Type</Typography>
          {console.log(paymentType.series)}
          <Chart options={paymentType.options} series={paymentType.series} type="pie" width="100%" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">User Statistics</Typography>
          <Chart options={userState.options} series={userState.series} type="bar" width="100%" />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Most Tickets Purchased</Typography>
          <Chart options={eventState.options} series={eventState.series} type="line" width="100%" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">User Statistics</Typography>
          <Chart options={userState.options} series={userState.series} type="bar" width="100%" />
        </Grid>
      </Grid>
      </Container> : <SpinnerComponent/>}
    </div>
  );
};

export default Charts
