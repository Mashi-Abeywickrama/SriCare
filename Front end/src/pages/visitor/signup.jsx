import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Dropdown } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as yup from 'yup';
import { Link } from 'react-router-dom';

import './../../styles/login.css';
import { Form } from 'react-bootstrap';
import useAlert from '../../components/useAlert';


const SignUp = () => {

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validateField(field);
    };

    const apiBaseURL = 'http://localhost:8080'; // Replace this with the base URL of your Spring Boot backend

    const axiosInstance = axios.create({
        baseURL: apiBaseURL,
        timeout: 5000, // You can adjust the timeout value as needed
        // You can also set other default config options if required
        // For example, you might want to set headers for authorization or other request-specific headers
    });

    const navigate = useNavigate(); // Initialize useNavigate
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const [selectedRole, setSelectedRole] = useState("Select Role");

    const { setAlert } = useAlert();

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const validateField = async (field) => {
        try {
            await validationSchema.validateAt(field, {
                [field]: stateValues[field],
            });

            setErrors({ ...errors, [field]: undefined });
        } catch (validationError) {
            setErrors({ ...errors, [field]: validationError.message });
        }
    };

    const stateValues = {
        name,
        email,
        username,
        password,
        cpassword,

    };

    const handleSignup = async (e) => {
        setAlert('Successful Signup!', 'success');
        e.preventDefault();



        try {
            // Validate each field individually before making the API call
            const validationPromises = Object.keys(stateValues).map((field) =>
                validateField(field)
            );
            await Promise.all(validationPromises);

            const isValid = !Object.values(errors).some((error) => error);
            console.log(errors);

            if (isValid === false) {

                console.log(isValid);
            }
            else if (isValid) {
                const response = await axiosInstance.post('/register', {
                    username: username,
                    email: email,
                    name: name,
                    password: password,
                    cpassword: cpassword,
                });
                if (response.status === 200) {
                    setAlert('Successful Signup!', 'success');
                    console.log('Successful Signup!');
                    setTimeout(() => {
                        // navigate('/login');
                    }, 3000);
                }
                else {
                    console.log('Signup failed');
                }
            }
        } catch (error) {
            console.error('Authentication failed');
        }
    };

    return (
        <>
            <div>
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
                                Sign up with
                            </h2>

                            <h2 className='heading-txt fw-600'>
                                Sri Care
                            </h2>

                            {/* login form */}
                            <Form className='d-flex row w-92 gap-2 f-color-signup' onSubmit={handleSignup}>

                                <Form.Group  >
                                    <Form.Control touched="true"
                                        type="text"
                                        required
                                        placeholder="Name"
                                        size='lg'
                                        className='mb-2 bg-transparent border-0 rounded-0 border-bottom'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={() => handleBlur('name')}
                                    />
                                    {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                </Form.Group>
                                {/* DOB and Email */}

                                <Form.Group controlId="formEmail" >
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Email"
                                        size='lg'
                                        className=' w-75 bg-transparent border-0 rounded-0 border-bottom'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => handleBlur('email')}
                                    />
                                    {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                                </Form.Group>


                                {/* User Name and Password */}
                                <Form.Group controlId="formuName" >
                                    <Form.Control
                                        type="text"
                                        placeholder="User Name"
                                        size='lg'
                                        className='mb-2 bg-transparent border-0 rounded-0 border-bottom'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => handleBlur('username')}
                                    />
                                    {touched.username && errors.username && <div className="text-danger">{errors.username}</div>}
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Control
                                        type="password"
                                        className='mb-2 bg-transparent border-0 rounded-0 border-bottom'
                                        placeholder="Password"
                                        size='lg'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => handleBlur('password')}
                                    />
                                    {touched.password && errors.password && <div className="text-danger">{errors.password}</div>}

                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Control
                                        type="password"
                                        className='mb-2 bg-transparent border-0 rounded-0 border-bottom'
                                        placeholder="Confirm Password"
                                        size='lg'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => handleBlur('password')}
                                    />
                                    {touched.password && errors.password && <div className="text-danger">{errors.password}</div>}

                                </Form.Group>
                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className='d-flex justify-content-center align-self-center mt-3 mb-3'
                                    size='lg'
                                    variant="primary"
                                    style={{ backgroundColor: '#035C94', color: '#FFFFFF' }}
                                >
                                    Sign Up
                                </Button>

                            </Form>

                            <h6 className='text-center fw-400'>
                                Already have an Account?
                            </h6>

                            <h6 className='text-center f-color-signup'>
                                <Link to="/login" className='f-color-signup'>Login </Link>
                            </h6>

                        </div>

                    </div>


                </div>

            </div>
        </>
    );
};

export default SignUp;