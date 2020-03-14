import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { GoogleLoginButton } from "react-social-login-buttons";

const Google = ({ informParent = f => f }) => {
    const responseGoogle = response => {
        console.log(response.tokenId);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                console.log('GOOGLE SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };
    return (
        <div className="pb-3">
            <GoogleLogin
                clientId={`384115946551-cohmqe9rrp9pnl5uf4jihvfpo99q7jbn.apps.googleusercontent.com`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                  <GoogleLoginButton   onClick={renderProps.onClick}
                    disabled={renderProps.disabled} className='google-btn'/>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Google;
