import React, { Component, Fragment } from 'react';
import Header from  '../../core/header';
import Footer from '../../core/footer/footer';
import './allVideos.css'
import axios from 'axios';
import { Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {Link } from 'react-router-dom';
import { Button} from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import VideoPlayer from './videoPlayer'


class AllVideos extends Component {
  state = {
    videos: []
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/all-videos`
    })
    .then((result) => this.setState({ videos: result.data.videos}))
    .catch(err => console.log(err))
  }

   allVideo = () => {
     const data = this.state.videos
     if(data){
      return data.map((item,key) => {
    const date = new Date(item.createdAt)
      const id = item._id
   return <Tr>
          <Td><VideoPlayer url={item.videoUrl}/></Td>
          <Td><img src={item.videoThumbnailUrl} width={220} height={160} className='img-mobile-view' /></Td>
          <Td>{item.videoTitle}</Td>
          <Td>{item.videoCategory}</Td>
          <Td>{item.videoDescription}</Td>
          <Td>{item.videoLike}</Td>
          <Td>{item.videoDislike}</Td>
          <Td>{item.videoDuration}</Td>
          <Td>{date.toUTCString()}</Td>
            <Link to={`/video/edit/${item._id}`}><Button className='edit-btn'>Edit</Button></Link>
            <Button className='edit-btn' onClick={() => this.deleteVideo(id)}>Delete</Button>
        </Tr>
      })
     }
   }

   deleteVideo = (id) => {
     axios({
       method: 'DELETE',
       url: `${process.env.REACT_APP_API}/delete-video/${id}`
     })
     .then((result) => {
       toast.success(result.data.message)
       window.location.reload();
       console.log(result)
     })

     .catch(err => console.log(err))
   }


  render(){
    console.log(this.state.videos)
    return <>
    <ToastContainer/>
    <Header />
        <div className='container video-containers'>
            <Table>
              <Thead>
                <Tr>
                  <Th>Video</Th>
                  <Th>Thumnail</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Description</Th>
                  <Th>Likes</Th>
                  <Th>Dislikes</Th>
                  <Th>Duration</Th>
                  <Th>Created at</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {this.allVideo()}
                <VideoPlayer />
              </Tbody>
          </Table>
        </div>
        <Footer />
           </>
  }
 }

export default AllVideos;
