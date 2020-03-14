import React, { Fragment} from 'react';
import './about.css';
import { Icon } from 'antd';
import { FaFacebook, FaTwitter} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Header from '../../core/header'
import Footer from '../../core/footer/footer';

const Team = [
  { img: "https://res.cloudinary.com/denjmsbaw/image/upload/v1583845495/chirag_fhogjp.jpg", name: "Chirag Rajput", designation: "Founder" },
  { img: 'https://res.cloudinary.com/denjmsbaw/image/upload/v1583845495/Shwetansh_it7xdu.jpg', name: 'Shwetansh Gaur', designation: "Founder" },
  { img: 'https://res.cloudinary.com/denjmsbaw/image/upload/v1583845496/tushar_p0c50n.jpg', name: 'Tushar Rajput', designation: "Founder" },
  { img: 'https://res.cloudinary.com/denjmsbaw/image/upload/v1583845495/Soumya_uk6sgs.jpg', name: 'Soumya Kandari', designation: 'Content Head' },
  { img: 'https://res.cloudinary.com/denjmsbaw/image/upload/v1583845496/shristi_qgpmqu.jpg', name: 'Shristi', designation: 'Promotion Head' }
]
const teamProfile = () => {
 return Team.map( item => {
    return <div className='col-md-2 each-member'>
             <img src={item.img} height="150" width='150'  className='each-member-each'/>
             <h6 className='name'>{item.name}</h6>
             <h6 className='designation'>{item.designation}</h6>
          </div>
  })
}

const About = () => {
  return <div className='about-container'>
  <Header />
        <div className='container team-member text-center'>
         <div className='row col justify-content-center'>
          {teamProfile()}
         </div>
       </div>
       <Footer />
       </div>
}

export default About;
