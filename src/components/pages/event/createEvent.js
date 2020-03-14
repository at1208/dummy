import React, { Component } from 'react';
import './createEvent.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import { Input, Button,  DatePicker, InputNumber, Spin   } from 'antd';
import axios, { post } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {DropzoneArea} from 'material-ui-dropzone'
import { TextField } from '@material-ui/core';

const { TextArea } = Input;

class CreateEvent extends Component{
  constructor(props){
    super(props)
    this.state = {
        eventTitle: '',
        eventPrice:  null,
        eventDescription: '',
        eventVenue: '',
        eventDate: '',
        eventImageUrl: null,
        imageUploadError: false,
        imageUploadButtonClicked: false,
        files: []
    }
  }


  ImageUpload = (e) => {
      this.setState({ imageUploadButtonClicked: true })
  const files = this.state.files
  if(files.length ==0){
    toast.error('Please Choose file')
  }
  var imageData = new FormData();
  imageData.append('upload_preset','zjhyapj2')
  imageData.append('file',files);
  axios.post(`${process.env.REACT_APP_API}/upload`,imageData)
  .then(res => {
    this.setState({ eventImageUrl: res.data.data[0].url })
    if(this.state.eventImageUrl){
      toast.success(res.data.message)
    }
  })
  .catch((error) => {
  this.setState({ imageUploadError: true })
   console.log(error);
  });

}

createEvent = () => {

  const { eventTitle, eventDate, eventPrice, eventVenue, eventImageUrl, eventDescription} = this.state
  axios({
     method: 'POST',
     url: `${process.env.REACT_APP_API}/create-event`,
     data: { eventTitle,
             eventDate,
             eventPrice,
             eventVenue,
             eventImageUrl,
             eventDescription
            }
   })

  .then(res => {
    toast.success('Event is successfully created')
  console.log(res) })
  .catch(function (error) {
    toast.error('Event creation is unsuccessfull')
   console.log(error);
  });
}

 onDateChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  this.setState({ eventDate: dateString })
}

  onOk = (value) => {
  console.log('onOk: ', value);
}
 onPriceChange = (value) => {
this.setState({ eventPrice: value })
}

onImageSelect = (files) => {
  this.setState({
    files: files[0]
  });
}
  render(){
    return <div className=''>
    <ToastContainer/>
         <Header />
         <div className='text-center container create-event-container'>
            <h2>Manage Events</h2>
            <div className='row justify-content-center'>
               <div className=''>
                 <div className='row col justify-content-center upload-container'>
                    <div className='uploading'>
                    <DropzoneArea
                           dropzoneText='Drag and drop an image here or click'
                           acceptedFiles={['image/*']}
                           onChange={this.onImageSelect}
                            className=''
                           />
                    </div>
                    <div className='col-md-3 upload-button'>
                     <button onClick={this.ImageUpload} className='btn-primary upload-btn-style'>Upload image</button>
                       {this.state.imageUploadButtonClicked && !this.state.imageUploadError && this.state.eventImageUrl ===null && <Spin size="large" />}
                    </div>
                 </div>
                <div className='textField-container'>
                    <TextField id="outlined-basic" label="Event title" variant="outlined" fullWidth={true} onChange={(e) => this.setState({ eventTitle: e.target.value })} className='input-style'/>
                    <TextField id="outlined-basic" label="Event venue" variant="outlined" fullWidth={true} onChange={(e) => this.setState({ eventVenue: e.target.value })} className='input-style'/>
                    <InputNumber min={0} max={10000}  placeholder='Event Price (INR)' onChange={this.onPriceChange} className='input-style input-styling' />
                    <TextArea rows={4} placeholder='Event description' onChange={(e) => this.setState({ eventDescription: e.target.value })} className='input-style'/>
                    <DatePicker showTime onChange={this.onDateChange} onOk={this.onOk}  className='input-styling input-style' />
                    <Button block onClick={this.createEvent}>Create Event</Button>
                </div>

               </div>
            </div>
         </div>
         <Footer />
           </div>
  }
}
export default CreateEvent;
