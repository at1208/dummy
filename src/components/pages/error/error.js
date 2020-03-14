import React from 'react';
import './error.css'

const Error = () => {
  window.scrollTo(0, 0);
  return <div className='error-container text-center'>
         <h1 className='error-title'>Error 404</h1>
         <h2 className='error-subtitle'>Not Found</h2>
  </div>
}

export default Error;
