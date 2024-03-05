import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import axios from '../Api_Resources/axios';

function Approved({ events }) {
  const [expandedEventId, setExpandedEventId] = useState(null);

  const handleToggleDescription = (eventId) => {
    setExpandedEventId((prevExpandedId) =>
      prevExpandedId === eventId ? null : eventId
    );
  };

  // const handleApprove = async (eventId) => {
  //   try {
  //     const response = await axios.put(`/api/event/cancel-approve/${eventId}`);
  //     console.log(response)
  //   } catch (error) {
  //     console.error('Error cancelling approval:', error);
  //   }
  // };

  return (
    <div className="container mt-5">
      <div>
        <h1 style={{ borderBottom: '3px solid black', paddingBottom: '1px'}}>Approved list</h1>
      </div>
      <div className="row events-list" style={{ marginTop: '20px' }}>
        {events.map((event) => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}${event.posters[0].image}`}
                className="card-img-top"
                alt="image"
              />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">Category: {event.categoryId.name}</p>
                <div className="card-text">
                  {expandedEventId === event._id ? (
                    <div>{event.description}</div>
                  ) : (
                    <div>{event.description.slice(0, 100)}...</div>
                  )}
                </div>
                <button
                  className="btn btn-link"
                  onClick={() => handleToggleDescription(event._id)}
                >
                  {expandedEventId === event._id ? 'Read Less' : 'Read More'}
                </button>
                {/* <button
                  className="btn btn-danger"
                  onClick={() => handleApprove(event.id)}
                >
                  Cancel approval
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  events: state.events.filter((event) => event.isApproved), // Assuming your Redux state structure
});


export default connect(mapStateToProps)(Approved);