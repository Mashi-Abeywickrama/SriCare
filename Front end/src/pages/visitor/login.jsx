import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../constants/SessionContext.jsx';

import axios from 'axios';

import {Link} from 'react-router-dom';


import { Container, Row, Col, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

import './../../styles/login.css';
import { Form } from 'react-bootstrap';


import * as Icon from 'react-bootstrap-icons';


import useAlert from '../../components/useAlert';
  
const Login = () => {

  const apiBaseURL = 'http://localhost:8080'; // Replace this with the base URL of your Spring Boot backend

  const axiosInstance = axios.create({
    baseURL: apiBaseURL,
    timeout: 10000, // You can adjust the timeout value as needed
    // You can also set other default config options if required
    // For example, you might want to set headers for authorization or other request-specific headers
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setSessionData } = useSession(); // Access the setSessionData function from context


  const { setAlert } = useAlert();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/login', { 
        username: username, 
        password: password 
        });
      if (response.status === 200) {
        setSessionData({
          loggedIn: true,
          username: response.data.username,
          userType: response.data.userType,
          userid: response.data.userId, // Make sure to pass the actual userId
        });
        const userType = response.data.userType;
        console.log(response);
        if (userType === 'admin') {
          setAlert('Successful Login!', 'success');
          setTimeout(() => {
            navigate('/admin/dashboard');
        }, 1000);
        } else if (userType === 'customer') {
          setAlert('Successful Login!', 'success');
          setTimeout(() => {
            location.href = '/customer/dashboard';
        }, 1000);
        }  else if (userType === 'vendor') {
          // console.log(response.data);
          setAlert('Successful Login!', 'success');
          setTimeout(() => {
            navigate('/vendor/dashboard');
        }, 1000);
        }  else if (userType === 'designer') {
          setAlert('Successful Login!', 'success');
          setTimeout(() => {
            navigate('/designer/dashboard');
        }, 1000);
        }  else if (userType === 'support') {
          setAlert('Successful Login!', 'success');
          setTimeout(() => {
            navigate('/customersupport/dashboard');
        }, 2000);
        }else if (userType === 'manager') {
          setAlert('Successful Login!', 'success');
          setTimeout(() => {
            navigate('/manager/dashboard');
        }, 2000);
        }
      }
    } catch (error) {
      console.error('Authentication failed');
      setAlert('Incorrect Credintials!', 'error');
    }
  };

  return (
    <>
      <div>
        {/* <Header /> */}

        <div className='row'>

          <div className='col-md-6 align-self-start banner-login'>
            {/* slider with 3 images */}
            <Carousel className="login-carousel w-100">
              <Carousel.Item className='carousel-img'>
                <img
                  className="d-block w-100 h-100 img-fluid"
                  src="https://causeandeffectstrategy.com/wp-content/uploads/2016/06/483171893-1.jpg"
                  alt="Slide 1"
                />
              </Carousel.Item>
        </Carousel>

          </div>

          <div className='col-md-6 align-self-start justify-content-center content-login'>
            <div className="d-flex row justify-content-center w-100 mt-5 login-form">
              
              <h2 className='heading-txt mt-5 fw-400'>
                  Welcome to
              </h2>
               
              <h2 className='heading-txt mb-5 fw-600'>
                  Sri Care
              </h2>
              {/* login form */}
              <Form className='d-flex row w-92 gap-2 ' onSubmit={handleLogin}>
                
                <Form.Group controlId="formName" >
                  <Form.Control
                  type="text"
                  placeholder="Username"
                  size='lg'
                  className='mb-3 bg-transparent'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control
                  type="password"
                  className='mb-3 bg-transparent'
                  placeholder="Password"
                  size='lg'
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button
                  onClick={handleLogin}
                  className='d-flex justify-content-center align-self-center mb-4 btnstyle'
                  size='lg'
                  variant="primary"
                  style={{ backgroundColor: '#035C94', color: '#FFFFFF' }}
                  >
                  Login
                </Button>

              </Form>

              <h6 className='text-center fw-400'>
                  Don't have an Account?
              </h6>

              <h6 className='text-center f-color-signup'
                >
                 <Link to="/signup" className='f-color-signup'> Register </Link> 
              </h6>

            </div>

          </div>


        </div>
       

      </div>
    </>
  );
};

export default Login;