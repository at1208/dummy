import React, { Component } from 'react';
import CountUp from 'react-countup';
import './videoCountUp.css'

class VideoCountUp extends Component {
  render(){
    return <>
        <CountUp
      start={0}
      end={100}
      duration={2}
      delay={0}
    >
    {({ countUpRef }) => (
    <span ref={countUpRef} className='video-count'/>
)}
    </CountUp>
         </>
  }
}

export default VideoCountUp;
