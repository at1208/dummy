import React, { Component } from 'react';
import './allContest.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import { Link } from 'react-router-dom';

class AllContest extends Component{
  render(){
    return <div className='outer-audience-poll-container'>
        <Header />
       
               <Footer />
      </div>
  }
}

export default AllContest;
