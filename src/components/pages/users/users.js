import React, { Component } from 'react'
import './users.css';
import Header from '../../core/header';
import Footer from '../../core/footer/footer'
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

class Users extends Component{
constructor(props){
  super(props)
  this.state = {
      users: []
  }
}

componentDidMount(){
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API}/all-users`
  })
  .then( result => this.setState({ users: result.data.result}))
  .catch( err => console.log(err));
}

getAllUsers = () => {
  const { users } = this.state
  return users.map(item => {
    const date = new Date(item.createdAt)

    return <>
    <Tr>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{date.toUTCString()}</Td>
    </Tr>
           </>
  })
}

  render(){
    console.log(this.state.users)
    return <>
          <Header />
          <div className='container table-container'>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Created at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.getAllUsers()}
            </Tbody>
        </Table>
          </div>
  <Footer />
           </>
  }
}

export default Users;
