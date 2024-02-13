import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ActualProfile.css';
import ViewHisBookings from '../ProfileHelpers/ViewHisBookings';
import { MyContext } from '../../ContextApi/Context';

export default function Profile() {
  const { profile, error } = useContext(MyContext);

  


  if (error) {
    return (
      <div className="container mt-5">
        <div className="card text-center bg-light p-3">
          <h1 className="card-title">Hello</h1>
          <p className="card-text text-danger">Create your profile</p>
          <div>
            <Link to="/create-profile" className="btn btn-success">
              Create
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5">
        <div className="card text-center bg-light p-3">
          <h1 className="card-title">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow" style={{ width: '700px', marginLeft: '200px' }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Profile Details</h5>
          <div>
            {profile && (
              <Link to="/edit-profile" className="btn btn-warning me-2">
                Edit
              </Link>
            )}
            {!profile && (
              <Link to="/edit-profile" className="btn btn-success">
                Create
              </Link>
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center" style={{ marginTop: '20px' }}>
              <img
                className="rounded-circle mb-3"
                src={`${process.env.REACT_APP_IMAGE_URL}${profile.profilePic}`}
                alt="Profile"
                width="150"
                height="150"
              />
              {console.log(`${process.env.REACT_APP_IMAGE_URL}`)}
            </div>
            <div className="col-md-8">
              <p className="card-text">
                <strong>Username:</strong> {profile.userId.username}
              </p>
              <p className="card-text">
                <strong>Role:</strong> {profile.userId.role}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {profile.userId.email}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {profile.description}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {profile.addressInfo.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <ViewHisBookings profileData={profile} />
      </div>
    </div>
  );
}
