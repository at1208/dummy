import React, { Component } from 'react';
import './event.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import CreateEvent from './createEvent';
import AllEvent from './allEvent';
import { Link } from 'react-router-dom'

const events = [
  { eventOper: 'Create event', url: '/event/create-event' },
  { eventOper: 'Events', url: '/event/all-event'}]

class Event extends Component{

  eventTask = () => {
    const eventOperation = events.map(item => {
      return  <Link to={item.url} className='video-section text-center'>

                 {item.eventOper}

               </Link> })
     return eventOperation;
  }

  render(){
    return <div className=''>
         <Header />
         <div className='container video-content eve-containers'>
           <div className='row col justify-content-center'>
           {this.eventTask()}
           </div>
         </div>
         <Footer />
           </div>
  }
}
export default Event;
