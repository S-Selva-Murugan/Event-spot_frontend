import React, { useEffect, useState,memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pagination } from '../../react-redux/action/paginateAction';
import axios from '../Api_Resources/axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AllEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, totalPages, currentPage, error } = useSelector((state) => state.pagination);

  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(pagination(currentPageNum));
  }, [dispatch, currentPageNum]);

  const handlePageChange = (page) => {
    setCurrentPageNum(page);
  };

  const handleApprove = async (eventId) => {
    try {
      await axios.put(`/api/event/approve/${eventId}`);
      // Refetch the API data for the current page
      dispatch(pagination(currentPage));
      Swal.fire({
        title: "Approved!",
        icon: "success"
      });
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleNavigate = () => {
    navigate('/approved-list');
  };

  return (
    <div className="container mt-5">
      <div>
        <h1 style={{ borderBottom: '3px solid black', paddingBottom: '1px'}}>Approval list</h1>
      </div>
      <div className="row" style={{ marginTop: '20px' }}>
        {error && <p>Error: {error}</p>}
        {data && (
          <>
            {/* events with isApproved: false */}
            {data.filter(event => !event.isApproved).map((event) => (
              <div key={event._id} className="col-md-4 mb-4">
                <div className="card" style={{ width: '18rem' }}>
                  <img src={`${process.env.REACT_APP_IMAGE_URL}${event.posters[0].image}`} className="card-img-top" alt="card" />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">Category: {event.categoryId.name}</p>
                    <div className="card-text">
                      Description: {event.description}...
                    </div>
                    <button className='btn btn-success' onClick={() => handleApprove(event._id)}>
                      Approve
                    </button>
                    <br/>
                    <br/>
                    <button className='btn btn-warning' onClick={() => handleViewDetails(event)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* pagination controls */}
        <div className="row justify-content-center mt-4" style={{ marginBottom: "20px" }}>
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

      {/* Modal for displaying event details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ whiteSpace: 'pre-line', maxHeight: '400px', overflowY: 'auto' }}>
  <h5>{selectedEvent?.title}</h5>
  <p>Category: {selectedEvent?.categoryId?.name}</p>
  <p>{selectedEvent?.description}</p>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <button className='btn btn-primary' style={{ marginBottom: "20px" }} onClick={handleNavigate}>
        Click here for already approved events
      </button>
    </div>
  );
};

export default memo(AllEvents);
