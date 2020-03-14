import React, { Component } from 'react';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import UploadVideo from './uploadVideo';
import './video.css';
import { Link } from 'react-router-dom';

 const video = [
   { videoOper: 'Upload video', url: '/video/upload-video' },
   { videoOper: 'Videos', url: '/video/all-videos'} ]



class Video extends Component{

  videoTask = () => {
    const videoOperation = video.map(item => {
      return  <Link to={item.url} className='video-section text-center'>

                 {item.videoOper}

               </Link> })
     return videoOperation;
  }

  render(){
    return <>
        <Header />
           <div className='container video-content allVideo'>
             <div className='row col justify-content-center'>
             {this.videoTask()}
             </div>
           </div>
           <Footer />
           </>
  }
}
export default Video;
