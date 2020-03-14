import React, { useState } from 'react';
import Header from '../../core/header';
import Footer from '../../core/footer/footer'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Input, Button} from 'antd';
import './forgot.css'

const Forgot = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request password reset link'
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Requested' });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Request password reset link' });
            });
    };

    const passwordForgotForm = () => (
        <form className='text-center'>
            <div className="">

                <Input onChange={handleChange('email')} value={email} type="email" placeholder='Email' className="input-submit-style name-input" />
            </div>

            <div>
                <Button className="reset-password-link" onClick={clickSubmit}>
                    {buttonText}
                </Button>
            </div>
        </form>
    );

    return (
      <div className='s-container'>
        <Header>
          <div className='row justify-content-center'>
            <div className="col-md-6 signin-container">
                <ToastContainer />
                <h1 className="text-center signin-text">Forgot password</h1>
                {passwordForgotForm()}
            </div>
        </div>
        </Header>
        <Footer />
      </div>
    );
};

export default Forgot;
