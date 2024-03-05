import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ActualProfile.css';
import ViewHisBookings from '../ProfileHelpers/ViewHisBookings';
import { MyContext } from '../../ContextApi/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faUserAstronaut, faPlus} from '@fortawesome/free-solid-svg-icons'

export default function Profile() {
  const { profile, error,fetchProfileData,userData ,token} = useContext(MyContext);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetchProfileData()

  },[token])

  useEffect(() => {
    if (profile) {
      setLoading(false)
    }
  }, [profile])



  if (!profile) {
    return (
      <div className="container mt-5" >
        <div className="card text-center bg-light p-3" style={{width:"500px", marginLeft:"275px"}}>
          <img src="https://cdn.pixabay.com/animation/2022/08/06/11/56/11-56-56-209_512.gif" alt="" 
          style={{height:"300px"}}></img>
          <h3>Hey there, you can create your profile now by clicking the button below</h3>
          <Link to="/create-profile" className="btn btn-success">
                Create
              </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Display loading spinner while loading */}
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="card shadow" style={{ width: '700px', marginLeft: '200px' }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Profile Details</h5>
            <div>
              {profile && (
                <Link to="/edit-profile" className="btn btn-warning me-2">
                  Edit
                </Link>
              )}
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 text-center" style={{ marginTop: '20px' }}>
                {profile.profilePic ? <img
                  className="rounded-circle mb-3"
                  src={`${process.env.REACT_APP_IMAGE_URL}${profile.profilePic}`}
                  alt="Profile"
                  width="75%"
                  height="80%"
                /> : <FontAwesomeIcon icon={faUserAstronaut} style={{color:"black",width:"75%",height:"80%"}}/>
              }
                {console.log(`${process.env.REACT_APP_IMAGE_URL}`)}
              </div>
              <div className="col-md-8">
                <p className="card-text">
                  <strong>Username:</strong> {profile?.userId?.username}
                </p>
                <p className="card-text">
                  <strong>Role:</strong> {profile?.userId?.role}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {profile?.userId?.email}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {profile?.description}
                </p>
                <p className="card-text">
                  <strong>Address:</strong> {profile?.addressInfo?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginTop: '50px' }}>
        <ViewHisBookings profileData={profile} />
      </div>
    </div>
  )
}
