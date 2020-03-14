import React, { Component } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import './videoCarousel.css'

class VideoCarousel extends Component {
   constructor(props){
     super(props)
     this.state = {

     }
   }

componentDidMount(){

}


  render(){

  // console.log(this.props.data)

  const videoCarousel = () => {
  const video = this.props.data
      return video.map(item => {
        return <Link to={`/video/${item.videoTitle}/${item._id}`}><img src={item.videoThumbnailUrl}   height={200} className='video-item-carousel'/></Link>
      })
  }


    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };

    return <>
    <div className='video-carousel-title'>
    {this.props.category}
    </div>
    <Carousel
     swipeable={false}
     draggable={false}
     showDots={false}
     centerMode={true}
     responsive={responsive}
     // ssr={true} // means to render carousel on server-side.
     infinite={true}
     autoPlay={this.props.deviceType !== "mobile" ? true : false}
     // autoPlaySpeed={1000}
     keyBoardControl={true}
     // customTransition="all .5"
     // transitionDuration={500}
     containerClass="carousel-container"
     removeArrowOnDeviceType={["tablet", "mobile"]}
     deviceType={this.props.deviceType}
     dotListClass="custom-dot-list-style"
     itemClass="carousel-item-padding-40-px"
   >
    {videoCarousel()}
   </Carousel>
     </>
  }
}

export default VideoCarousel;
