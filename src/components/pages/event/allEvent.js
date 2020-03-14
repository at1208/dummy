import React, { Component } from 'react';
import './allEvent.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer';
import axios from 'axios';
import {DropzoneArea} from 'material-ui-dropzone'
import { TextField } from '@material-ui/core';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class AllEvent extends Component{

constructor(props){
  super(props)
  this.state = {
    events: [],

  }
}

  componentDidMount(){
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/all-event`
    })
    .then((result) =>  this.setState({ events: result.data.events}))
    .catch(err => console.log(err))
  }

  allEvents = () => {
    const {events} = this.state
    console.log(events)
    return events.map(item => {
      const id = item._id
      console.log(id)
      const eveDate = new Date(item.eventDate)
      const createdDate = new Date(item.createdAt)
      return    <Tr>
                  <Td><img src={item.eventImageUrl} width={100} height={100}/></Td>
                  <Td>{item.eventTitle}</Td>
                  <Td>{item.eventVenue}</Td>
                  <Td>{item.eventDescription}</Td>
                  <Td>{eveDate.toUTCString()}</Td>
                  <Td>{item.eventPrice}</Td>
                  <Td>{createdDate.toUTCString()}</Td>
                  <Link to={`/event/edit/${item._id}`}><Button className='edit-btn'>Edit</Button></Link>
                  <Button className='edit-btn' onClick={() => this.deleteEvent(id)}>Delete</Button>
                </Tr>
    })
  }



  deleteEvent = (id) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API}/delete-event/${id}`
    })
    .then((result) => {
      toast.success(result.data.message)
      window.location.reload();
      console.log(result)
    })

    .catch(err => console.log(err))
  }
  render(){


    return <>
        <ToastContainer/>
          <Header />
           <div className='container text-center all-event-container'>
            <h1>All Events</h1>
              <div className='container'>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Title</Th>
                    <Th>Venue</Th>
                    <Th>Description</Th>
                    <Th>Date</Th>
                    <Th>Price</Th>
                    <Th>Created at</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.allEvents()}
                </Tbody>
            </Table>
              </div>
           </div>
           <Footer />
           </>
  }
}
export default AllEvent;
