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
    } else {
      try {
        const formData = _.pick(user, 'email');
        const response = await axios.post('/api/user/forgot-password', formData);

        if (response.data.status === "success") {
          toast.info(response.data.msg)
        }
        if(response.data.err)  toast.error(response.data.err)
        
      } catch (e) {
        toast.error("Something went Wrong !!!")
        setUser({ ...user, formErrors: {}, serverErrors: e.response.data.errors });
      }
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>

      {user?.serverErrors?.length > 0 && (
        <ul>
          {user.serverErrors.map((error, index) => (
            <li key={index} style={{ color: 'red' }}>
              {error.msg}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="g-3"        
>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter your Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            name="email"
            id="email"
            className="form-control"
            style={{width:"300px"}}

          />
        </div>

        {user?.formErrors?.email && <span style={{ color: 'red' }}>{user.formErrors.email}</span>}

        <div className="mb-3">
            <Link to="/login">Back to Sign In</Link>
          <button type="submit" className="btn btn-primary "> 
            Send
          </button>
       
        </div>

        <div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default ForgotPassword;
