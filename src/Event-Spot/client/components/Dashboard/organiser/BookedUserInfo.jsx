import React, { useState, useEffect } from 'react'
import axios from '../../Api_Resources/axios'
import { config } from '../../Api_Resources/config'
import SpinnerComponent from '../../Utils/Spinner/SpinnerComponent'

const BookedUserInfo = ({ eventId }) => {
  const [bookingsInfo, setBookingInfo] = useState(false)

  useEffect(() => {
    fetchDataFromApi(eventId)
  }, [eventId])
  const fetchDataFromApi = async (eventId) => {
    // console.log(eventId, "adsf")
    try {
      const response = await axios.get(`/api/booked-users?eventId=${eventId}`, config)
      setBookingInfo(response.data)
    } catch (err) {
    //   console.log(err)
      setBookingInfo(false)
    }
  }
  return (
<div>
    <h2>Bookings</h2>
    {bookingsInfo && bookingsInfo.length > 0 ? (
        <div>
            <table >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Ticket Type</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingsInfo.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.userId.username}</td>
                            <td>{ele.userId.email}</td>
                            <td>
                                {ele.tickets.map((ticket) => (
                                    <div key={ticket._id}>
                                        {ticket.ticketType}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {ele.tickets.map((ticket) => (
                                    <div key={ticket._id}>
                                        {ticket.quantity}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <SpinnerComponent />
    )}
</div>

  )
}

export default BookedUserInfo



