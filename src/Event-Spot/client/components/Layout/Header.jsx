import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser ,faPlus} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Darkmode from '../Z_Dark_Mode/Darkmode';
import { MyContext } from '../../ContextApi/Context';
import eventLogo from "../../Z_images/event_logo.png"

function Header() {
  const [search,setSearch] = useState(" ")
  const {searchQuery,setSearchQuery,userData} = useContext(MyContext)
  const navigate = useNavigate();

  const handleChangeLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout logic
        localStorage.removeItem('token');
        navigate('/login');
        
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been logged out.',
          icon: 'success',
        });
      }
    });
  };

  const handleSearch = () => {
    setSearchQuery(search.toLowerCase())
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {/* <img style={{height:"50px",width:"0px",borderRadius:"20%"}} src={eventLogo}/> */}
          LOGO
        </Link>
        
        {userData.role==="Organiser"&&<Link className="navbar-brand" to="/event-form">
        <FontAwesomeIcon icon={faPlus} />Event
        </Link>}
    
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {localStorage.getItem("token") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex mx-auto justify-content-start">
            <input
              className="form-control me-2 "
              type="search"
              style={{ width: '250px'}}
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn text-white"
              type="button"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <ul className="navbar-nav ml-auto" style={{ display:"flex"}}>
            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item">
                  <Link to="/user-profile" >
                    <FontAwesomeIcon icon={faUser} style={{ marginTop:"10px",marginRight:"10px"}}/>
                  </Link>
                </li>
                <li className="nav-item" style={{marginRight:"10px"}}>
                <Darkmode/>

                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleChangeLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                <Darkmode/>

                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;