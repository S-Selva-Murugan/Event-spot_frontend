import _ from 'lodash';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import axios from '../Api_Resources/axios';
import { ToastContainer, toast } from 'react-toastify';

function ForgotPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    formErrors: {},
    serverErrors: []
  });
  const [borderColorError, setBorderColorError] = useState(false);

  const errors = {};

  function runValidator() {
    if (_.isEmpty(user.email.trim())) {
      errors.email = 'Email is required';
    } else if (!isEmail(user.email)) {
      errors.email = 'Invalid email';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    runValidator();
    if (!_.isEmpty(errors)) {
      setUser({ ...user, formErrors: errors });
      setBorderColorError(true); // Set borderColorError to true if there are form errors
    } else {
      try {
        setBorderColorError(false)
        const formData = _.pick(user, 'email');
        const response = await axios.post('/api/user/forgot-password', formData);

        if (response.data.status === "success") {
          setBorderColorError(false)
          toast.info(response.data.msg)

        }
        if (response.data.err){
          setBorderColorError(true)
          toast.error(response.data.err)
        } 
          
      } catch (e) {
        toast.error("Something went Wrong ");
        setBorderColorError(true); // Set borderColorError to true if there are server errors
        setUser({ ...user, formErrors: {}, serverErrors: e.response.data.errors });
      }
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div style={{
      backgroundImage: "url(https://eventpot.s3.ap-south-1.amazonaws.com/7070629_3293466.svg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      marginTop: "-50px",
      width: "50vw",
      height: "100vh",
    }}>    
      <div className="container mt-5" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        <div style={{ margin: "0 -40% 200px 100%" }}>
          <h2 style={{ marginBottom: "50px" }}>Forgot Password</h2>

          {user?.serverErrors?.length > 0 && (
            <ul>
              {user.serverErrors.map((error, index) => (
                <li key={index} style={{ color: 'red' }}>
                  {error.msg}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="g-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your Email
              </label>
              <input
                type="email"
                value={user.email}
                onChange={handleChange}
                name="email"
                id="email"
                className="form-control"
                style={{ width: "100%", ...(borderColorError ? { border: "2px solid red" } : {}) }}
              />
            </div>

            {user?.formErrors?.email && <span style={{ color: 'red' }}>{user.formErrors.email}</span>}

            <div className="mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/login">Back to Sign In</Link>
              <button type="submit" className="btn btn-primary ">
                Send
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
