import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../core/header';
import Footer from '../../core/footer/footer'
import axios from 'axios';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Input, Button} from 'antd';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signupForm = () => (
        <form>
            <div className="form-group">

                <Input onChange={handleChange('name')} value={name} type="text" placeholder='Name' className="input-submit-style name-input"/>
            </div>

            <div className="form-group">

                <Input onChange={handleChange('email')} value={email} type="email" placeholder='Email' className="input-submit-style name-input" />
            </div>

            <div className="form-group">

                <Input onChange={handleChange('password')} value={password} type="password" placeholder='Password' className="input-submit-style name-input"/>
            </div>

            <div>
                <Button className="signin-submit-btn" onClick={clickSubmit}>
                    {buttonText}
                </Button>
            </div>
        </form>
    );

    return (
       <div className='s-container'>
        <Header>
          <div className='row justify-content-center'>
            <div className="signin-container  col-md-6 ">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="text-center signin-text">Signup</h1>
                {signupForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    <Button className='forgot-btn'>Forgot Password</Button>
                </Link>
            </div>
        </div>
        </Header>
        <Footer />
          </div>
    );
};

export default Signup;
