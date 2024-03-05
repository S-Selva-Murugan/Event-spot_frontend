import React, { useState, useEffect, useMemo } from 'react';
import Chart from 'chart.js/auto'; // Import Chart for Chart.js 3 support
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Doughnut } from 'react-chartjs-2';
import { startOragniserEvents } from '../../../react-redux/action/organiserAction';

const OrganiseHomeCharts = () => {
  const orgEvents = useSelector(state => state.organiserDetails.organiserEvents)

  const [isLoading, setIsLoading] = useState(false)

  const memoizedChartData = useMemo(() => {
    setIsLoading(false)
    if (!orgEvents) return null

    const averageTicketCost = orgEvents.reduce((acc, cv) => {
      const perEventCost = cv.ticketType.reduce((acc, cv) => {
        acc += cv.ticketPrice

        return acc
      }, 0)
      acc += perEventCost
      return acc
    }, 0)

    const totalTicketSold = orgEvents.reduce((acc, cv) => {
      const totalTicketsPerEvents = cv.ticketType.reduce((acc, cv) => {
        acc += cv.ticketCount - cv.remainingTickets
        return acc
      }, 0)
      acc += totalTicketsPerEvents
      return acc
    }, 0)

    const avgReviews = orgEvents.reduce((acc, cv) => {
      acc += cv.reviews.length
      return acc
    }, 0)

    return {
      labels: [
        `Avg Ticket-Cost : ${Math.ceil(averageTicketCost / orgEvents.length)}`,
        `totalTicketsSold : ${totalTicketSold}`,
        `Avg Review : ${Math.ceil(avgReviews / orgEvents.length)}`,
      ],
      datasets: [
        {
          label: 'Organiser Statistics',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 206, 86, 0.4)',
          ],
          hoverBorderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          data: [
            averageTicketCost / orgEvents.length,
            totalTicketSold,
            Math.ceil(avgReviews / orgEvents.length),
          ],
        },
      ],
    };
  }, [orgEvents])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startOragniserEvents())
  }, []);

  useEffect(() => {

  }, []);

  return (
    <div style={{ width: '90%', height: '10%', marginLeft: '5%' }}>
        <Bar data={memoizedChartData} width={100} height={500} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default OrganiseHomeCharts
