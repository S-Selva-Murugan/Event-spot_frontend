import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pagination } from '../../react-redux/action/paginateAction';
import axios from '../Api_Resources/axios';
import { useNavigate } from 'react-router-dom';

const AllEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, totalPages, currentPage, error } = useSelector((state) => state.pagination);

  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [expandedEventId, setExpandedEventId] = useState(null);

  useEffect(() => {
    dispatch(pagination(currentPageNum));
  }, [dispatch, currentPageNum]);

  const handlePageChange = (page) => {
    setCurrentPageNum(page);
  };

  const handleToggleDescription = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  const handleApprove = async (eventId) => {
    try {
      await axios.put(`/api/event/approve/${eventId}`);
      // Refetch the API data for the current page
      dispatch(pagination(currentPage));
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };
  
  
  

  const handleNavigate = () => {
    navigate('/approved-list');
  };

  return (
    <div className="container mt-5">
      <div className="card text-center bg-light p-3" style={{width:"1050px"}}>
        <h1 className="card-title">Approval list</h1>
      </div>
      <div className="row" style={{ marginTop: '20px' }}>
        {error && <p>Error: {error}</p>}
        {data && (
          <>
            {/* Map over your paginated events where isApproved is false and display them */}
            {data.filter(event => !event.isApproved).map((event) => (
              <div key={event._id} className="col-md-4 mb-4">
                <div className="card" style={{ width: '18rem' }}>
                  <img src={`http://localhost:3333/Uploads/images/${event.posters[0].image}`} className="card-img-top" alt="card" />
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
                    <button className='btn btn-success' onClick={()=>handleApprove(event._id)}>
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Display pagination controls */}
        <div className="row justify-content-center mt-4" style={{marginBottom:"20px"}}>
          <div className="btn-group">
            <button
              className={`btn ${currentPageNum === 1 ? 'btn-dark' : 'btn-dark'}`}
              onClick={() => handlePageChange(currentPageNum - 1)}
              disabled={currentPageNum === 1}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                className={`btn ${currentPageNum === page + 1 ? 'btn-dark' : 'btn-secondary'}`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={`btn ${currentPageNum === totalPages ? 'btn-secondary' : 'btn-dark'}`}
              onClick={() => handlePageChange(currentPageNum + 1)}
              disabled={currentPageNum === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        
      </div>
      <button className='btn btn-primary' style={{marginBottom:"20px"}} onClick={handleNavigate}>
          Click here for already approved events
          </button>
    </div>
  );
};

export default AllEvents;
