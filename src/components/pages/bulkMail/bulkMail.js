import React, { Component } from 'react'
import './bulkMail.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { Button } from 'antd';
import { TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class BulkMail extends Component{
constructor(props){
  super(props)
  this.state = {
 editorState: EditorState.createEmpty(),
 subject: null,

  }
}

sendBulkMail = () => {
 const {subject, text} = this.state

  const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
  const html = draftToHtml(rawContentState);

  axios({
     method: 'POST',
     url: `${process.env.REACT_APP_API}/bulk-mail`,
     data: {
             subject,
             html
            }
   })
  .then( result => {
    toast.success(result.data.message)
    console.log(result)})
  .catch( err => {
    toast.error(err.response.data.error)
    console.log(err.response.data.error)});
}

onEditorStateChange: Function = (editorState) => {
  this.setState({
    editorState
  });

};

  render(){
    const { editorState } = this.state;

    return <>
    <ToastContainer />
          <Header />
          <div className='container text-center bulk-mail-container'>
            <h2>Send bulk mail</h2>



             <div className='container'>
                  <TextField  label="Email to all users"disabled={true} variant="outlined" fullWidth={true} onChange={(e) =>  console.log(e.target.value)} className='input-style'/>
                  <TextField  label="Subject"  variant="outlined" fullWidth={true} onChange={(e) => this.setState({ subject: e.target.value})} className='input-style'/>
                  <Editor
                  placeholder='Please write here'
                  toolbarClassName="toolbar-class"
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  />
                  <Button onClick={this.sendBulkMail} block className='send-button'>Send</Button>
             </div>
          </div>
          <Footer />
           </>
  }
}

export default BulkMail;
