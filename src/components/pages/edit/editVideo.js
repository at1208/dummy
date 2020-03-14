import React, {Component} from 'react';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { TextField } from '@material-ui/core';
import { DatePicker, Input, Button, Select } from 'antd';
import './editVideo.css'

const { TextArea } = Input;
const { Option } = Select;

class EditVideo extends Component{
  constructor(props){
    super(props)
    this.state = {

        videoTitle: '',
        videoDescription: '',
        videoCategory: '',
        videoDuration: '',
        videoUrl: '',
        videoThumbnailUrl: ''
    }
  }

  componentDidMount(){
   const _id = this.props.match.params.id
   axios.get(`${process.env.REACT_APP_API}/video/${_id}`)
     .then((res) => {
       this.setState({ videoUrl: res.data.result.videoUrl,
                       videoTitle: res.data.result.videoTitle,
                       videoDescription:  res.data.result.videoDescription,
                       videoCategory: res.data.result.videoCategory,
                       videoThumbnailUrl: res.data.result.videoThumbnailUrl,
                       videoDuration: res.data.result.videoDuration
                    })
       console.log(res)
     })
     .catch(err => console.log(err))
  }


updateVideo = () => {
  const { videoTitle,
          videoDescription,
          videoUrl,
          videoThumbnailUrl,
          videoDuration,
          videoCategory
        } = this.state

  axios({
    method: 'PATCH',
    url:`${process.env.REACT_APP_API}/update-video/${this.props.match.params.id}`,
    data:{
              videoTitle,
              videoDescription,
              videoUrl,
              videoThumbnailUrl,
              videoDuration,
              videoCategory
    }
  })
  .then((result) => {
    toast.success(result.data.message)
    console.log(result)
  })
  .catch(err => {
   toast.error(err.response.error.msg)
    console.log(err)});
}
  render(){

    return <>
        <ToastContainer/>
       <Header />
           <div className='container text-center edit-video-container'>
        <h2>Edit video details</h2>
         <img src={this.state.videoThumbnailUrl} with={200} height={200}/>
        <TextField   label="Video title" variant="outlined" fullWidth={true} value={this.state.videoTitle} onChange={(e) => this.setState({ videoTitle: e.target.value })} className='input-style'/>
         <div className='des'>
          <label >Description</label>
        </div>
         <TextArea rows={4} placeholder='Video description' value={this.state.videoDescription} onChange={(e) => this.setState({ videoDescription: e.target.value })} className='input-style'/>
          <Select
         className='input-style'
         showSearch
         style={{ width: "100%" }}
         value={this.state.videoCategory}
         optionFilterProp="children"
         onChange={(e) => this.setState({ videoCategory: e}) }
         filterOption={(input, option) =>
         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
         }
         >
         <Option value="Poetry">Poetry</Option>
         <Option value="Beat Boxing">Beat Boxing</Option>
         <Option value="Storytelling">Storytelling</Option>
         <Option value="Shayari">Shayari</Option>
         <Option value="Monoact">Monoact</Option>
         <Option value="Instrumental">Instrumental</Option>
         <Option value="Mimicry">Mimicry</Option>
         <Option value="Standup">Standup</Option>
         <Option value="Singing">Singing</Option>
         </Select>
        <TextField   label="Event Duration" variant="outlined" fullWidth={true} value={this.state.videoDuration} onChange={(e) => this.setState({ videoDuration: e.target.value })} className='input-style'/>
        <Button block className='input-style' onClick={this.updateVideo}>Update</Button>

           </div>
           <Footer />
           </>
  }
}

export default EditVideo;
