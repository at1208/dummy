import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../core/header';
import Footer from '../../core/footer/footer'
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import Google from './google';
import Facebook from './facebook';
import 'react-toastify/dist/ReactToastify.min.css';
import './signin.css';
import {Input, Button} from 'antd';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/') : history.push('/');
        });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    isAuth() && isAuth().role === 'admin' ? history.push('/') : history.push('/');
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form className='text-center'>
            <div className="form-group">

                <Input onChange={handleChange('email')} value={email} type="email" placeholder='Email' className="input-submit-style name-input" />
            </div>

            <div className="form-group">
                <Input onChange={handleChange('password')} value={password} type="password" placeholder='Password' className="input-submit-style name-input" />
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
        <div className='row justify-content-center signing'>
            <div className="signin-container col-md-6">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="text-center signin-text">Signin</h1>
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot">
                  <Button className='forgot-btn'>Forgot Password</Button>
                </Link>
            </div>
          </div>
        </Header>
        <div className=''>
        </div>
        <Footer />
      </div>
    );
};

export default Signin;
