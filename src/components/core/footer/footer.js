import React from 'react';
import './footer.css'
import { Button } from 'antd'
import { FaFacebook, FaTwitter,FaCopyright} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Footer  = () => {
  return <div className='footer'>
          <div className='row col justify-content-center container'>
             <div className='col-md-6 text-center'>
               <Link to='/about'><Button className='footer-btn'>About</Button></Link>
               <Link to='/contact'><Button className='footer-btn'>Contact</Button></Link>
             </div>

             <div className='col-md-6'>
                   <div className='text-center icons'>
                       <AiFillInstagram className='kkc-social insta-icon'/>
                       <FaTwitter className='kkc-social twitter-icon' />
                       <FaFacebook className='kkc-social fb-icon'/>
                   </div>

             </div>
          </div>
          <div className='text-center copyright'>
          कला की CAR  <FaCopyright  className='cc'/>2020
          </div>
        </div>
}

export default Footer;
