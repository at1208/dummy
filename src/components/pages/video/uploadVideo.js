import React, { Component } from 'react'
import './uploadVideo.css';
import Header from  '../../core/header';
import Footer from '../../core/footer/footer';
import { Select,Input, Button,Spin   } from 'antd';
import axios, { post } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {DropzoneArea} from 'material-ui-dropzone'
import { TextField } from '@material-ui/core';


const { Option } = Select;
const { TextArea } = Input;




class UploadVideo extends Component {
  constructor(props){
    super(props)
    this.state = {
      videoCategory: '',
      videoTitle: '',
      videoDuration: '',
      videoDescription: '',
      videoCategory:'',
      videoUrl: null,
      videoThumbnailUrl: null,
      files: [],
      thumbnailFile: [],
      videoUploadError: false,
      videoUploadButtonClicked: false,
      thumnailUploadButtonClicked: false,
      thumbnailUploadError: false,
      videoDetailUploadError: false,
      videoDetailUploadSuccess: false,
      uploadVideoDetailButtonClicked: false
    }

    }

    onVideoSelect = (files) => {
      this.setState({
        files: files[0]
      });
    }

    onThumbnailSelect = (files) => {
      this.setState({
        thumbnailFile: files[0]
      });
    }

  videoUpload = (e) => {
this.setState({ videoUploadButtonClicked: true })
  const files = this.state.files
  if(files.length ==0){
    toast.error('Please upload file')
  }
  var data = new FormData();
  data.append('upload_preset','zjhyapj2')
  data.append('file',files);
  axios.post(`${process.env.REACT_APP_API}/upload`,data)
  .then(res => {
    this.setState({ videoUrl: res.data.data[0].url })
    if(this.state.videoUrl){
      toast.success(res.data.message)
    }
  })
  .catch((error) => {
   console.log(error);
   this.setState({ videoUploadError: true })
  });

}

videoThumnailUpload = () => {
  this.setState({ thumnailUploadButtonClicked: true })
  const thumbnailFile = this.state.thumbnailFile
  if(thumbnailFile.length ==0){
    toast.error('Please upload file')
  }
  var formData = new FormData();
  formData.append('upload_preset','zjhyapj2')
  formData.append('file',thumbnailFile)
  axios.post(`${process.env.REACT_APP_API}/upload`, formData)
  .then(res => {
    this.setState({ videoThumbnailUrl: res.data.data[0].url })
    if(this.state.videoThumbnailUrl){
      toast.success(res.data.message)
    }
  })
  .catch((error) => {
   console.log(error);
    this.setState({ thumbnailUploadError: true })
 });
}

uploadVideoDetail = (e) => {
  this.setState({ uploadVideoDetailButtonClicked: true })
  e.preventDefault()
  const { videoTitle,
          videoDuration,
          videoDescription,
          videoCategory,
          videoUrl,
          videoThumbnailUrl,
          files,
          thumbnailFile
        } = this.state


axios({
   method: 'POST',
   url: `${process.env.REACT_APP_API}/upload-video`,
   data: { videoTitle,
           videoDuration,
           videoDescription,
           videoCategory,
           videoUrl,
           videoThumbnailUrl
          }
 })
 .then((res) => {
   this.setState({ videoDetailUploadSuccess: true })
   toast.success(res.data.message)})
 .catch(err => {
   this.setState({ videoDetailUploadError: true })
   toast.error('Please fill all the fields')}
)
}

render(){

  console.log(this.state.videoUrl)
    console.log(this.state.videoThumbnailUrl)
  return <>
      <Header />
      <ToastContainer />
       <div className='container text-center upload-video-container'>
           <h1>Upload Video</h1>

          <div className='justify-content-center row'>
           <div className='container'>
             <div className='row col justify-content-center'>
                <div className='container-style'>
                <DropzoneArea
                       dropzoneText='Drag and drop a video here or click'
                       maxFileSize="3000000000000"
                       acceptedFiles={['video/*']}
                       onChange={this.onVideoSelect}
                       className=' '
                       />
                </div>
                <div className='col-md-2 upload-button'>
                   <button onClick={this.videoUpload} className='btn-primary upload-btn-style'>Upload video</button>
                   { this.state.videoUploadButtonClicked && !this.state.videoUploadError && this.state.videoUrl ===null && <Spin size="large" />}
                </div>
             </div>

             <div className='row col justify-content-center'>
                <div className='container-style'>
                <DropzoneArea
                       dropzoneText='Drag and drop a image here or click'
                       onChange={this.onThumbnailSelect}
                        className=''
                       />
                </div>
                <div className='col-md-2 upload-button'>
                 <button onClick={this.videoThumnailUpload} className='btn-primary upload-btn-style'>Upload thumbnail</button>
                    {this.state.thumnailUploadButtonClicked && !this.state.thumbnailUploadError && this.state.videoThumbnailUrl ===null && <Spin size="large" />}
                </div>
             </div>

         <div className='row justify-content-center textField-container'>
          <div >
          <TextField id="outlined-basic" label="Video Title" variant="outlined" fullWidth={true} onChange={(e) => this.setState({ videoTitle: e.target.value })} className='input-style'/>
          <TextField id="outlined-basic" label="Video duration fromat(00:00)" variant="outlined" fullWidth={true} onChange={(e) => this.setState({ videoDuration: e.target.value })} className='input-style'/>

          <TextArea rows={4}  onChange={ e => this.setState({ videoDescription: e.target.value }) } className='input-style' placeholder='Video description'/>
              <Select
              className='input-style'
              showSearch
              style={{ width: "100%" }}
              placeholder="Select category"
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
               <Button block onClick={this.uploadVideoDetail} className='input-style btn-primary'>Upload</Button>
               {this.state.uploadVideoDetailButtonClicked && !this.state.videoDetailUploadError && this.state.videoDetailUploadSuccess ===false && <Spin size="large" />}
          </div>
          </div>

           </div>
</div>
       </div>
       <Footer />
           </>
  }
}

export default UploadVideo;
