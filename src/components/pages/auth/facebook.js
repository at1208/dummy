import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
import { GoogleLoginButton,FacebookLoginButton } from "react-social-login-buttons";

const Facebook = ({ informParent = f => f }) => {
    const responseFacebook = response => {
        console.log(response);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { userID: response.userID, accessToken: response.accessToken }
        })
            .then(response => {
                console.log('FACEBOOK SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
            });
    };
    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`154959638896320`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                  <FacebookLoginButton onClick={renderProps.onClick} className='google-btn'/>
                )}
            />
        </div>
    );
};

export default Facebook;
