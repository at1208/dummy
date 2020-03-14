import React, { Component } from 'react';
import './audiencePoll.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import { Link } from 'react-router-dom';

const audiencePoll = [
  { contestOper: 'Create Contest', url: '/contest/create-contest' },
  { contestOper: 'All Contest', url: '/contest/all-contest'} ]


class AudiencePoll extends Component {

  contestTask = () => {
    const videoOperation = audiencePoll.map(item => {
      return  <Link to={item.url} className='video-section text-center'>

                 {item.contestOper}

               </Link> })
     return videoOperation;
  }

  render(){
    return <div className='outer-audience-poll-container'>
        <Header />
        <div className='container video-content allVideo'>
          <div className='row col justify-content-center'>
          {this.contestTask()}
          </div>

           </div>
               <Footer />
      </div>
  }
}

export default AudiencePoll;
