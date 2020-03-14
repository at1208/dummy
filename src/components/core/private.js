import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import Footer from './footer/footer'
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../pages/auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button, Input} from 'antd';
import './private.css';

const Private = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form className=''>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <Input value={role} type="text"  className="input-submit-style name-input" disabled />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <Input onChange={handleChange('name')} value={name} type="text" className="input-submit-style name-input" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <Input value={email} type="email" className="input-submit-style name-input" disabled />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <Input onChange={handleChange('password')} value={password} type="password" className="input-submit-style name-input" />
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
          <div className='row justify-content-center subscriber'>
            <div className="signin-container col-md-6">
                <ToastContainer />
                <h1 className="text-center subscriber-title">Settings</h1>
                <p className="lead text-center subscriber-subtitle">Profile update</p>
                {updateForm()}
            </div>
        </div>
        </Header>
        <Footer />
      </div>
    );
};

export default Private;
