import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player'
import { Button } from 'antd';
import './videoPlayer.css'
import { FullscreenOutlined } from '@ant-design/icons'
import { FaPlay } from 'react-icons/fa';
import { IoMdPause } from 'react-icons/io';
import { AiFillSound } from 'react-icons/ai';
import { GoMute } from "react-icons/go";

import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'

class VideoPlayer extends Component {

  state = {
      url: null,
      pip: true,
      playing: false,
      controls: false,
      light: false,
      volume: 0.1,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false
    }


  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  ref = player => {
    this.player = player
  }




  render(){
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state

    return <div className='player-container'>
    <ReactPlayer

         onClick={this.handlePlayPause}
         ref={this.ref}
         className='react-player'
         url={this.props.url}
         width='100%'
         height='100%'
         playing={playing}
         pip={pip}
         playing={playing}
         controls={controls}
         light={light}
         loop={loop}
         playbackRate={playbackRate}
         volume={volume}
         muted={muted}
         onReady={() => console.log('onReady')}
         onStart={() => console.log('onStart')}
         onPlay={this.handlePlay}
         onEnablePIP={this.handleEnablePIP}
         onDisablePIP={this.handleDisablePIP}
         onPause={this.handlePause}
         onBuffer={() => console.log('onBuffer')}
         onSeek={e => console.log('onSeek', e)}
         onEnded={this.handleEnded}
         onError={e => console.log('onError', e)}
         onProgress={this.handleProgress}
         onDuration={this.handleDuration}
       />

   {this.props.url && <div className='control'>
   <input
           className='seek-input input-control'
           type='range' min={0} max={1} step='any'
           value={played}
           onMouseDown={this.handleSeekMouseDown}
           onChange={this.handleSeekChange}
           onMouseUp={this.handleSeekMouseUp}
         />
    {this.state.playing ? <IoMdPause  className='video-icon' onClick={this.handlePause}/> : <FaPlay className='video-icon' onClick={this.handlePlay}/>}

    <FullscreenOutlined className='video-icon float-right' onClick={this.handleClickFullscreen}/>
      <AiFillSound   className='video-icon sound-icon'/>
    <input type='range' min={0} max={1} step='any' value={volume} className='video-icon volume-input' onChange={this.handleVolumeChange} />
        </div>}
        </div>
  }
}

export default VideoPlayer;
