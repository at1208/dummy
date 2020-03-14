import React, { Component } from 'react';
import './voting.css';
import Header from '../../core/header'
import Footer from '../../core/footer/footer'

class AudiencePoll extends Component {
  render(){
    return <div className='outer-voting-container'>
         <Header />
           <div className='text-center voting-container'>
           <h1 className='voting-title'>Voting</h1>

           </div>
         <Footer />
           </div>
  }
}

export default AudiencePoll;
