import React, { Component } from 'react';
import './contact.css';
import { Input, Button, Result } from 'antd';
import 'antd/dist/antd.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const { TextArea } = Input;


class Contact extends Component {

   state = {
      name: '',
      email: '',
      message: '',
   }

  onSubmit = () => {
    axios(`https://kalakicarmail.herokuapp.com/${this.state.email}/${this.state.name}/${this.state.message}`)
      .then(res => {
        toast.success('Message sent successfully')
        console.log(res)})
      .catch((err) => {
        toast.error('Failed to send')
        console.log(`ERROR: ${err}`)})
  }

  render(){


    return  <>
    <Header />
      <ToastContainer/>
    <div className='contact'>
         <div className='text-center'>
            <h1 className='contact-heading'>CONTACT</h1>
            <div className='contact-sub-title'>
            Reach out to us!
            </div>
         </div>
         <div className='text-center container col-sm-5'>
            <Input placeholder="Name" className='name-input input-submit-style ' onChange={e => this.setState({ name: e.target.value })}/>
              <br />
            <Input placeholder="Enter email" className='email-input input-submit-style'  onChange={e => this.setState({ email: e.target.value })}/>
              <br />
            <TextArea rows={4} placeholder='Your Message' className='textarea-input input-submit-style'  onChange={e => this.setState({ message: e.target.value })}/>
              <br />
            <Button className='submit-button' onClick={this.onSubmit}>SUBMIT</Button>
           </div>
           </div>

             <Footer />
             </>
  }
}

export default Contact;
