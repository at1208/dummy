import React, {Component} from 'react';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { TextField } from '@material-ui/core';
import { DatePicker, Input, Button } from 'antd';
import './editEvent.css'

const { TextArea } = Input;

class EditEvent extends Component{
  constructor(props){
    super(props)
    this.state = {
       eventTitle: '',
       eventDate: '',
       eventPrice: null,
       eventVenue: '',
       eventImageUrl: '',
       eventDescription: ''
    }
  }

  componentDidMount(){
   const _id = this.props.match.params.id
   axios.get(`${process.env.REACT_APP_API}/event/${_id}`)
     .then((res) => {
       this.setState({ eventImageUrl: res.data.event[0].eventImageUrl,
                       eventTitle: res.data.event[0].eventTitle,
                       eventDate:  res.data.event[0].eventDate,
                       eventPrice: res.data.event[0].eventPrice,
                       eventVenue: res.data.event[0].eventVenue,
                       eventDescription: res.data.event[0].eventDescription
                    })
       console.log(res)
     })
     .catch(err => console.log(err))
  }

  onDateChange = (value, dateString) => {
   console.log('Selected Time: ', value);
   this.setState({ eventDate: dateString })
 }

updateEvent = () => {
  const { eventImageUrl,
          eventTitle,
          eventDate,
          eventPrice,
          eventVenue,
          eventDescription
        } = this.state

  axios({
    method: 'PATCH',
    url:`http://localhost:8000/api/update-event/${this.props.match.params.id}`,
    data:{
              eventImageUrl,
              eventTitle,
              eventDate,
              eventPrice,
              eventVenue,
              eventDescription
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
console.log(this.state)
    return <>
        <ToastContainer/>
       <Header />
           <div className='container text-center edit-event-container'>
        <h2>Edit event details</h2>
         <img src={this.state.eventImageUrl} with={200} height={200}/>
        <TextField   label="Event title" variant="outlined" fullWidth={true} value={this.state.eventTitle} onChange={(e) => this.setState({ eventTitle: e.target.value })} className='input-style'/>
        <DatePicker showTime onChange={this.onDateChange}   className='input-styling input-style' />
        <div className='des'>
          <label >Description</label>
        </div>
         <TextArea rows={4} placeholder='Event description' value={this.state.eventDescription} onChange={(e) => this.setState({ eventDescription: e.target.value })} className='input-style'/>
         <TextField   label="Event Price" variant="outlined" fullWidth={true} value={this.state.eventPrice} onChange={(e) => this.setState({ eventPrice: e.target.value })} className='input-style'/>
        <TextField   label="Event Venue" variant="outlined" fullWidth={true} value={this.state.eventVenue} onChange={(e) => this.setState({ eventVenue: e.target.value })} className='input-style'/>
        <Button block className='input-style' onClick={this.updateEvent}>Update</Button>
           </div>
           <Footer />
           </>
  }
}

export default EditEvent;
