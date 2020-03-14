import React, { Component } from 'react';
import Header from '../../core/header'
import Footer from '../../core/footer/footer'
import axios from 'axios';
import {
  FacebookShareCount,
   PinterestShareCount,
   VKShareCount,
   OKShareCount,
   RedditShareCount,
   TumblrShareCount,
   FacebookShareButton,
   FacebookMessengerShareButton,
   FacebookMessengerIcon,
   LinkedinShareButton,
   TwitterShareButton,
   PinterestShareButton,
   VKShareButton,
   OKShareButton,
   TelegramShareButton,
   WhatsappShareButton,
   RedditShareButton,
   EmailShareButton,
   TumblrShareButton,
   LivejournalShareButton,
   MailruShareButton,
   ViberShareButton,
   WorkplaceShareButton,
   LineShareButton,
   WeiboShareButton,
   PocketShareButton,
   InstapaperShareButton,
   FacebookIcon,
   TwitterIcon,
   LinkedinIcon,
   PinterestIcon,
   VKIcon,
   OKIcon,
   TelegramIcon,
   WhatsappIcon,
   RedditIcon,
   TumblrIcon,
   MailruIcon,
   EmailIcon,
   LivejournalIcon,
   ViberIcon,
   WorkplaceIcon,
   LineIcon,
   PocketIcon,
   InstapaperIcon,
   WeiboIcon,
} from "react-share";

import VideoPlayer from './videoPlayer'
import './videoDetail.css'
import CountUp from 'react-countup';
import { AiTwotoneLike, AiFillDislike } from "react-icons/ai";
import VideoCountUp from './videoCountUp';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
const { TextArea } = Input;




const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button loading={submitting} onClick={onSubmit} type="primary" className='add-comment-btn'>
        Add Comment
      </Button>
    </Form.Item>
  </div>
);


class VideoDetail extends Component{

  constructor(props){
    super(props)

    this.state = {
        video: [],
        allComments: [],
        comments: [],

        submitting: false,
        value: '',
        }
  }

componentDidMount(){
window.scrollTo(0, 0)
  axios(`${process.env.REACT_APP_API}/video/${this.props.match.params.id}`)
    .then((result) => this.setState({ video: result.data.result }))
    .catch(err => console.log(err));

    axios(`${process.env.REACT_APP_API}/video/all-video-comment/${this.props.match.params.id}`)
    .then((res) => this.setState({ allComments: res.data.comments }))
    .catch(err => console.log(err))
}




  onAddingComment(user) {
    const { comments } = this.state
     if (!this.state.value) {
       return;
     }
     this.setState({ submitting: true });

     setTimeout(() => {
      var  date = new Date(Date.now()).toString();
       this.setState({
         submitting: false,
         value: '',
         comments: [
           {
             author: user.name,
             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
             content:  this.state.value,
             datetime: date,
           },
            ...this.state.comments,
         ],
       });
     },1000);

     axios({
       method: 'PATCH',
       url: `${process.env.REACT_APP_API}/video/video-comment/${this.props.match.params.id}`,
       data: { author: user.name,
               avatar:'',
               content: this.state.value,
               datetime: Date.now()}
     })
     .then((res) => console.log(res))
     .catch(err => console.log(err))

   }


  render(){
    console.log(this.state.allComments)
    const { comments, submitting, value, video } = this.state;
    const getVideo = () => {
      if(!video) return;
      return <div className='video-detail-container'>
            <VideoPlayer url={video.videoUrl}/>
              <div className='video-detail-description text-center'>
              <div className='row col justify-content-center'>
              <FacebookShareButton
              url={`${process.env.REACT_APP_DOMAIN_API}/video/${video.videoCategory}/${this.props.match.params.id}`}
              quote={video.videoTitle}
              className="Demo__some-network__share-button"
              >
              <FacebookIcon size={32} round />
              </FacebookShareButton>

              <WhatsappShareButton
              url={`${process.env.REACT_APP_DOMAIN_API}/video/${video.videoCategory}/${this.props.match.params.id}`}
              quote={video.videoTitle}
              className="Demo__some-network__share-button"
              >
              <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <TelegramShareButton
              url={`${process.env.REACT_APP_DOMAIN_API}/video/${video.videoCategory}/${this.props.match.params.id}`}
              quote={video.videoTitle}
              className="Demo__some-network__share-button"
              >
              <TelegramIcon size={32} round />
              </TelegramShareButton>

              <RedditShareButton
              url={`${process.env.REACT_APP_DOMAIN_API}/video/${video.videoCategory}/${this.props.match.params.id}`}
              quote={video.videoTitle}
              className="Demo__some-network__share-button"
              >
              <RedditIcon size={32} round />
              </RedditShareButton>

              <EmailShareButton
              url={`${process.env.REACT_APP_DOMAIN_API}/video/${video.videoCategory}/${this.props.match.params.id}`}
              quote={video.videoTitle}
              className="Demo__some-network__share-button"
              >
              <EmailIcon size={32} round />
              </EmailShareButton>

              <TwitterShareButton
              url={`${process.env.REACT_APP_DOMAIN_API}/video/${video.videoCategory}/${this.props.match.params.id}`}
              quote={video.videoTitle}
              className="Demo__some-network__share-button"
              >
              <TwitterIcon size={32} round />
              </TwitterShareButton>
              </div>

      </div>
             <div className='add-comment-container'>
             <div className='container'>
             <div>

                 <Comment
                   avatar={
                     <Avatar
                       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                     />
                   }
                   content={
                     <Editor
                       className='editor-comment'
                       onChange={(e) => this.setState({ value: e.target.value })}
                       onSubmit={this.onAddingComment.bind(this, user)}
                       submitting={submitting}
                       value={value}
                     />
                   }
                 />

                    {comments.length > 0 && <CommentList comments={comments} />}
                      {<CommentList comments={this.state.allComments} />}
               </div>
             </div>
             </div>
      </div>
    }


   const user = JSON.parse(localStorage.getItem('user'))
   return <div className='outer-video-detail-containers'>
   <Header />
    <div className=''>
      {getVideo(user)}

   <Footer />
     </div>
     </div>
  }
}
export default VideoDetail;
