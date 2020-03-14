import React, { Component } from 'react';
import './home.css';
import axios from 'axios';
import {Carousel as Slider} from 'antd'
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import 'antd/dist/antd.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VideoCarousel from './videoCarousel';
import Particles from 'react-particles-js';


class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
        beatBoxingVideos: [],
        poetryVideos:[],
        shayariVideos:[],
        storytellingVideos:[],
        monoactVideos: [],
        standupVideos: [],
        singingVideos: [],
        instrumentalVideos:[],
        mimicryVideos:[]
    }
  }
  componentDidMount(){
    this.videoByCategory('Beat Boxing', "beatBoxingVideos")
    this.videoByCategory('Poetry', "poetryVideos")
    this.videoByCategory('Shayari', "shayariVideos")
    this.videoByCategory('Monoact', "monoactVideos")
    this.videoByCategory('Storytelling', "storytellingVideos")
    this.videoByCategory('Standup', "standupVideos")
    this.videoByCategory('Singing', "singingVideos")
    this.videoByCategory('Instrumental', "instrumentalVideos")
    this.videoByCategory('Mimicry', "mimicryVideos")
  }

videoByCategory = (category, state) => {
  axios(`${process.env.REACT_APP_API}/all-videos/${category}`)
  .then( res => {
var obj ={}
const key = state
  obj[key] = res.data.result
    this.setState(obj)
    console.log(res.data.result)})
  .catch(err => console.log(err))
}




  render(){
    console.log(this.state)

    return (
          <div className='home-outer-container'>
                <Header />

                <div className='home home-container'>

                      <Slider autoplay>


                   <div className='sliding-home'>
                       <div className='home-carousel'>
                           <h1 className='home-title'>WE SPEAK ENTERTAINMENT</h1>
                       </div>
                   </div>

                      </Slider>

                </div>



                <div className='video-content-container'>
                {this.state.singingVideos &&   <div className='each-video-carousel'>
                  <VideoCarousel data={this.state.singingVideos} category='Singing'/>
                  </div>}
                  {this.state.standupVideos && <div className='each-video-carousel'>
                  <VideoCarousel data={this.state.standupVideos} category='Standup'/>
                  </div>}
                  {this.state.poetryVideos && <div className='each-video-carousel'>
                  <VideoCarousel data={this.state.poetryVideos} category='Poetry'/>
                  </div>}
                  {this.state.shayariVideos && <div className='each-video-carousel'>
                  <VideoCarousel data={this.state.shayariVideos} category='Shayari'/>
                  </div>}
                  {this.state.storytellingVideos && <div className='each-video-carousel'>
                  <VideoCarousel data={this.state.storytellingVideos} category='Storytelling'/>
                  </div>}
                {this.state.instrumentalVideos && <div className='each-video-carousel'>
                <VideoCarousel data={this.state.instrumentalVideos} category='Instrumental'/>
                </div>}
                {this.state.beatBoxingVideos && <div className='each-video-carousel'>
                <VideoCarousel data={this.state.beatBoxingVideos} category='Beat Boxing'/>
                </div>}
                {this.state.monoactVideos && <div className='each-video-carousel'>
                <VideoCarousel data={this.state.monoactVideos} category='Monoact'/>
                </div>}

                {this.state.mimicryVideos && <div className='each-video-carousel'>
                <VideoCarousel data={this.state.mimicryVideos} category='Mimicry'/>
                </div>}


                </div>
              <Footer />
           </div>
         )
  }
}

export default HomePage;
