import React, { Component, Fragment } from 'react';
import './createContest.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { DatePicker, Button,  Spin,  Select, Input  } from 'antd';
import {DropzoneArea} from 'material-ui-dropzone'
import moment from 'moment'
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";


const { RangePicker } = DatePicker;
const { Option } = Select;



class CreateContest extends Component{
  constructor(props){
    super(props)
    this.state = {

      contestTitle: "",
      contestStartAt: "",
      contestEndAt: "",
      files: [],
      participants: [{participantName:'', participantCategory:'', participantImageUrl: ''}]
    }
  }



    handleParticipantNameChange = idx => evt => {
      const addNewParticipant = this.state.participants.map((participant, sidx) => {
        if (idx !== sidx) return participant;
        return { ...participant, participantName: evt.target.value };
      });

      this.setState({ participants: addNewParticipant });
    };

    handleParticipantCategoryChange = idx => value => {
      const addNewParticipant = this.state.participants.map((participant, sidx) => {
        if (idx !== sidx) return participant;
        return { ...participant, participantCategory: value };
      });

      this.setState({ participants: addNewParticipant });
    };

    handleParticipantImageUpload =  idx => value =>  {
            this.state.participants.map((participant, sidx) => {
            if(idx !==sidx) return participant;

            const files = this.state.files
            if(files.length ==0){
              toast.error('Please Choose file')
            }
            var imageData = new FormData();
            imageData.append('upload_preset','zjhyapj2')
            imageData.append('file',files);

            axios.post(`${process.env.REACT_APP_API}/upload`,imageData)
            .then(res => {
              // this.setState()
             // participantImageUrl: res.data.data[0].url
              return toast.success('Participant picture uploaded')

             })
            .catch((error) => {
                return { message: "failed to upload"} });
     });

  }



    handleAddParticipant = () => {
      this.setState({
        participants: this.state.participants.concat([{ participantName: "", participantCategory:"", participantImageUrl:"" }])
      });
    };

    handleRemoveParticipant = idx => () => {
      this.setState({
        participants: this.state.participants.filter((s, sidx) => idx !== sidx)
      });
    };

  onImageSelect = (files) => {
    this.setState({
      files: files[0]
    });
  }


 createContest = () => {
const { contestTitle, contestStartAt, contestEndAt, participants } = this.state

   axios({
     method: 'POST',
     url: `${process.env.REACT_APP_API}/create-contest`,
     data :{
       contestTitle,
       contestStartAt,
       contestEndAt,
       participants
     }
   })
   .then((result) => {
    toast.success(result.data.message)
    console.log(result)
   })

   .catch(err => {
      toast.error("Failed to create contest")
     console.log(err)
   })
 }



  render(){
console.log(this.state)
  return <div>
          <Header />
          <ToastContainer />
  <form  className='container col-md-6 form-container-contest'>
  <h2 className='text-center'>Create Contest</h2>
  <div className='container text-center'>
  <TextField
    fullWidth={true}
    className='input-style'
    variant="outlined"
    type="text"
    label="Contest title"
    value={this.state.contestTitle}
    onChange={(e) => this.setState({ contestTitle: e.target.value })}

  />

 <RangePicker showTime onChange={(e) => {
   this.setState({ contestStartAt: moment(e[0]).toDate(), contestEndAt:  moment(e[1]).toDate() })}}
  className='input-style rangeDate-picker'/>
</div>
<div className='row col justify-content-center '>
<div className='col-md-12'>
{this.state.participants.map((participant, idx) => (
  <div className="participant add-participants">
  <span className='participant-count'>{`Participant #${idx + 1}`}</span>
  <IoMdCloseCircle onClick={this.handleRemoveParticipant(idx)} className="close-icon float-right" />
     <div className='inner-add-participant'>
    <label>{`Participant name`}</label>
    <Input
      fullWidth={true}
      className='input-style'
      variant="outlined"
      type="text"
      label={`Participant name#${idx + 1}`}
      value={participant.participantName}
      onChange={this.handleParticipantNameChange(idx)}
    />
    <label>Select category</label>
    <Select
    className='input-style'
    showSearch
    style={{ width: "100%" }}
    placeholder="Select category"
    optionFilterProp="children"
    filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    onChange={this.handleParticipantCategoryChange(idx)}
    value={participant.participantCategory}>
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
   <label>Participant picture</label>
   <div className='container row col justify-content-center'>
      <div className='col-md-6'>
      <DropzoneArea
             dropzoneText='Drag and drop an image here or click'
             acceptedFiles={['image/*']}
             onChange={this.onImageSelect}
             className='upload-participant-image'
             />
      </div>
      <Button onClick={this.handleParticipantImageUpload(idx)} className='btn-primary upload-btn-style input-style'>Upload image</Button>
    </div>

</div>
  </div>
))}
</div>

</div>
<div className='container text-center'>
  <Button type="button" onClick={this.handleAddParticipant} className="add-more-participant-btn">
    Add participant
  </Button>
  <br />
  <Button block className='input-style contest-submit-btn' onClick={this.createContest}>Create Contest</Button>
</div>
</form>
        <Footer />
  </div>

  }
}

export default CreateContest;
