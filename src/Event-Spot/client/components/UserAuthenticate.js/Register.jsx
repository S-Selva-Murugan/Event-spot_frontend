import React, { useState } from 'react';
import axios from '../Api_Resources/axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './register.css';

const registerValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(16),
  role: yup.string().required(),
  username: yup.string().required(),
  number: yup.number().required(),
});

export default function Register() {
  const [serverErrors, setServerErrors] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
      username: '',
      number: '',
    },
    validateOnChange: false,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        setServerErrors('');
        const response = await axios.post('/api/user/register', values);
        toast.success(`Hello ${response.data}! Successfully registered your Account!`);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        console.error(err);
        setServerErrors(err.response.data.error);
        toast.error(err.response.data.error[0].msg);
        console.log(serverErrors);
      }
    },
  });

  return (
    <div>
      <Row className='maxi'>
        <Col md={6}>
          <div>
            <h1 style={{ marginLeft: '60px', marginTop: '15px' }}>Sign Up</h1>
            <Form onSubmit={formik.handleSubmit} style={{ marginLeft: '60px', marginTop: '20px' }}>
              <FormGroup>
                <strong htmlFor='username'>Username:</strong>
                <Input
                  style={{width:"90%"}}
                  type='text'
                  id='username'
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className={formik.errors.username ? 'is-invalid' : ''}
                />
                <div className='invalid-feedback'>{formik.errors.username}</div>
              </FormGroup>

              <FormGroup>
                <strong htmlFor='email'>Email:</strong>
                <Input
                  style={{width:"90%"}}
                  type='text'
                  id='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={formik.errors.email ? 'is-invalid' : ''}
                />
                <div className='invalid-feedback'>{formik.errors.email}</div>
              </FormGroup>

              <Row form>
                <Col>
                  <FormGroup>
                    <strong htmlFor='number'>Number:</strong>
                    <Input
                    style={{width:"80%"}}
                      type='text'
                      id='number'
                      name='number'
                      value={formik.values.number}
                      onChange={formik.handleChange}
                      className={formik.errors.number ? 'is-invalid' : ''}
                    />
                    <div className='invalid-feedback'>{formik.errors.number}</div>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <strong htmlFor='role'>Role:</strong>
                    <Input
                    style={{width:"78%"}}
                      type='select'
                      id='role'
                      name='role'
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      className={formik.errors.role ? 'is-invalid' : ''}
                    >
<option value='' disabled className='option'>
  Select a role
</option>
<option value='Customer' >Customer</option>
<option value='Organiser' >Organiser</option>

                    </Input>
                    <div className='invalid-feedback'>{formik.errors.role}</div>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <strong htmlFor='password'>Password:</strong>
                <Input
                  style={{width:"90%"}}
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
                <ToastContainer />
              </div>

              
                
                <div style={{ display: 'flex', justifyContent: 'space-between', }}>

                <h5>Already have an account?<Link to='/login' >Login</Link></h5>
                  
                <div style={{ display: 'flex', justifyContent: 'flex-end',marginRight:"10%" }}>
  <button type='submit' className='btn btn-dark sign-up'>
    Signup
  </button>
</div>
                


              </div>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <div>
            <img
              className='image'
              src='https://images.pexels.com/photos/1378866/pexels-photo-1378866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='Login Image'
              style={{ objectFit: 'cover', width: "100%", height: '585px' }}
            />
          </div>
          <div className="image-background">
            <img
              src='https://images.pexels.com/photos/1378866/pexels-photo-1378866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='Login Image'
              style={{ objectFit: 'cover', maxWidth: '110%', width: '102%', height: '585px' }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}


