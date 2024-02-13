import _ from 'lodash';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../Api_Resources/axios";
import { toast,ToastContainer } from 'react-toastify';

function ResetPassword() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: '',
    serverErrors: [],
  });

  const errors = {};

  function runValidator() {
    if (_.isEmpty(user.password.trim())) {
      errors.password = 'Password is required';
    } else if (user.password.length < 8 || user.password.length > 128) {
      errors.password = 'Password must be 8-128 characters';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    runValidator();

    if (!_.isEmpty(errors)) {
      setUser({ ...user, serverErrors: errors });
    } else {
      try {
        const formData = _.pick(user, 'password');
        const response = await axios.post(`/api/reset-password/${id}/${token}`, formData);
       

        if (response.data.msg) {
          toast.success(response.data.msg)
            navigate('/login');
        }
      } catch (e) {
        toast.error("Somthing Went Wrong!")
        setUser({ ...user, serverErrors: e.response.data.errors });
      }
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>

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
          <label htmlFor="password" className="form-label">
            Enter your Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            name="password"
            id="password"
            className="form-control"
            style={{width:"300px"}}
          />
        </div>

        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

        <div className="mb-3">
          <p>
            <Link to="/login">Back to Sign In</Link>
          </p>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </div>
      </form>
      <ToastContainer/>

    </div>
  );
}

export default ResetPassword
