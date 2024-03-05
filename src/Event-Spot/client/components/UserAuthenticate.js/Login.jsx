import React, { useState, useRef,useContext,useEffect } from 'react'
import axios from '../Api_Resources/axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../../ContextApi/Context';
import { jwtDecode} from 'jwt-decode';

const loginValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(16),
});

export default function Login() {
  const {setUserData} = useContext(MyContext)
  const tokenData = localStorage.getItem('token')

  useEffect(()=>{
    if(tokenData){
      setUserData(jwtDecode(tokenData))
    }

  },[tokenData])
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState('');
  const snackbarRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setServerErrors('');
        const response = await axios.post('api/user/login', values);
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token,"in login");
        setTimeout(() => {
          navigate('/user-profile');
        }, 2000);
        snackbarRef.current.show("Login Successful!", "success");
      } catch (e) {
        setServerErrors(e.response.data);
        snackbarRef.current.show("Login Failed. Check your credentials and try again.", "fail");
        toast.error(e.response.data);
        console.error(e);
      }
    },
  });

  return (
    <div>
      <Row className='maxi'  >
        <Col md={6}  >
          <div >
            <h1 style={{margin:"50px 0 50px 20%" }}>Login in to your account</h1>
            <Form onSubmit={formik.handleSubmit} style={{ marginLeft: '60px', marginTop: '20px' }}>

              <FormGroup>
                <strong for='email' className="form-label">Email:</strong>
                <Input
                  style={{ width: "80%" }}
                  type='text'
                  id='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{formik.errors.email}</div>
              </FormGroup>


              <FormGroup>
                <strong for='password'>Password:</strong>
                <Input
                  style={{ width: "80%" }}
                  type='password'
                  id='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={formik.errors.password ? 'is-invalid' : ''}
                />
                <div className='invalid-feedback'>{formik.errors.password}</div>
              </FormGroup>

              <div>
              </div>
              <div>
                <ToastContainer />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div>Don't have an account ? <Link to='/register'>Register</Link></div>
                <div style={{marginRight: "20%"}}> <Link to="/forgot-password">Forgot your password?</Link></div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end",margin:"5% 20% 0 0 " }}>
                  <button type='submit' className='btn btn-dark'>


                    Login
                  </button>
                </div>


            </Form>
          </div>
        </Col>
        <Col md={6}>
          <div>
            <img
              className='image'
              src='https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              alt='Login Image'
              style={{ objectFit: 'cover', width: '800px', height: '585px' }}
            />
          </div>
          <div className="image-background">
            <img
              src='https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              alt='Login Image'
              style={{ objectFit: 'cover', maxWidth: '110%', width: '102%', height: '585px' }}
            />
          </div>
        </Col>
      </Row>
      <Snackbar ref={snackbarRef} />
    </div>
  );
}
