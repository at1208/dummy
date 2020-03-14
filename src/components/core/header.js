import React, { Fragment, Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout,authenticate } from '../pages/auth/helpers';
import './header.css';
import { Drawer, Button,} from 'antd';
import {Icon} from 'antd'
import { MdReorder, } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
import Google from '../pages/auth/google'
import Facebook from '../pages/auth/facebook'



const Header = ({ match,children, history}) => {

// const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
// const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
const isTabletOrMobileDevice = useMediaQuery({ query: '(max-device-width: 1024px)' })
// const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
// const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })



const [ visible, setVisible] = useState(false);
const [placement, setPlacement] = useState('left')

  const showDrawer = () => {
   setVisible(true)
  };

  const onClose = () => {
  setVisible(false)
  };

  const onChange = e => {
    setPlacement(e.target.value)
  };

  const isActive = path => {
        if (match.path === path) {
            return { color: 'blue' };
        } else {
            return { color: 'white' };
        }
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/') : history.push('/');
        });
    };

const navStyle = () => {

  if(!isAuth()){
  console.log('dcdn')
    return null
  }else return 'col-6 row'
}


  const nav = () => (

          <div className="row header-container">

          {isTabletOrMobileDevice && <MdReorder type="primary" onClick={showDrawer} className='drawer-icon' />}

                  <Link to='/'><div className='header-title'>
                  कला की Car
                  </div></Link>

             {!isTabletOrMobileDevice && <Link to="/" className="header-menu" style={isActive('/')}>
                HOME
               </Link>}

               {isAuth() && !isTabletOrMobileDevice && isAuth().role === 'admin' && (
                       <Link className="header-menu" style={isActive('/admin')} to="/admin">
                           {isAuth().name.toUpperCase()}
                       </Link>
               )}

               {!isTabletOrMobileDevice && <Link to="/voting" className="header-menu" style={isActive('/voting')}>
                 VOTING
                 </Link>}

                 {isAuth()  && !isTabletOrMobileDevice && isAuth().role === 'admin' && (
                         <Link className="header-menu" style={isActive('/contest')} to="/contest">
                            CONTEST
                         </Link>
                 )}


              {!isAuth() && !isTabletOrMobileDevice && (
                  <Fragment>
                          <Link to="/signin" className="header-menu" style={isActive('/signin')}>
                              SIGIN
                          </Link>
                          <Link to="/signup" className="header-menu" style={isActive('/signup')}>
                              SIGN UP
                           </Link>
                  </Fragment>
              )}



              {isAuth()  && !isTabletOrMobileDevice && isAuth().role === 'admin' && (
                      <Link className="header-menu" style={isActive('/event')} to="/event">
                          EVENTS
                      </Link>
              )}

              {isAuth()  && !isTabletOrMobileDevice && isAuth().role === 'admin' && (
                      <Link className="header-menu" style={isActive('/video')} to="/video">
                          VIDEOS
                      </Link>
              )}

              {isAuth()  && !isTabletOrMobileDevice && isAuth().role === 'admin' && (
                      <Link className="header-menu" style={isActive('/users')} to="/users">
                          USERS
                      </Link>
              )}

              {isAuth()  && !isTabletOrMobileDevice && isAuth().role === 'admin' && (
                      <Link className="header-menu" style={isActive('/bulk-mail')} to="/bulk-mail">
                          BULK MAIL
                      </Link>
              )}

              {isAuth()  && !isTabletOrMobileDevice && isAuth().role === 'subscriber' && (
                      <Link className="header-menu" style={isActive('/private')} to="/private">
                          {isAuth().name.toUpperCase()}
                      </Link>
              )}

              {isAuth() && !isTabletOrMobileDevice && (
                      <div
                          className="header-menu signout-btn"
                          style={{ cursor: 'pointer', color: 'white' }}
                          onClick={() => {
                              signout(() => {
                                  history.push('/');
                              });
                          }}
                      >
                          SIGN OUT
                      </div>

              )}


          {!isAuth() && !isTabletOrMobileDevice && (
              <div className='social row'>
                      <Link to="/signin" className="social-btn" style={isActive('/signin')}>
                      <Google informParent={informParent}/>
                      </Link>

                      <Link to="/signup" className="social-btn" style={isActive('/signup')}>
                          <Facebook informParent={informParent}/>
                       </Link>

              </div>
          )}








          </div>
      );


    return (
          <Fragment>
          <Drawer
            title={isAuth() ? isAuth().name.toUpperCase() : ''}
            placement={placement}
            closable={false}
            onClose={onClose}
            visible={visible}
          >
          <div className='drawering'>
                <div className='side-menu-btn'>

                {isAuth() && isAuth().role === 'admin' && (
                    <div>
                    <Link to="/contest" className="" style={isActive('/contest')}>
                    <Button block className='drawer-menu-item'>CONTEST</Button>
                    </Link>
                    </div>
                )}
                    <div>
                    <Link to="/voting" className="" style={isActive('/voting')}>
                    <Button block className='drawer-menu-item'>VOTING</Button>
                    </Link>
                    </div>
                    <div>
                    <Link to="/about" className="" style={isActive('/about')}>
                    <Button block className='drawer-menu-item'>ABOUT</Button>
                    </Link>
                    </div>
                    <div>
                    <Link to="/contact" className="" style={isActive('/contact')}>
                    <Button block className='drawer-menu-item'>CONTACT</Button>
                    </Link>
                  </div>

                  {isAuth() && isAuth().role === 'admin' && (
                          <Link className="" style={isActive('/event')} to="/event">
                                <Button block className='drawer-menu-item'>EVENTS</Button>
                          </Link>
                  )}

                  {isAuth() && isAuth().role === 'admin' && (
                          <Link className="" style={isActive('/video')} to="/video">
                                <Button block className='drawer-menu-item'>VIDEOS</Button>
                          </Link>
                  )}

                  {isAuth() && isAuth().role === 'admin' && (
                          <Link className="" style={isActive('/users')} to="/users">
                                <Button block className='drawer-menu-item'>USERS</Button>
                          </Link>
                  )}

                  {isAuth() && isAuth().role === 'admin' && (
                          <Link className="" style={isActive('/bulk-mail')} to="/bulk-mail">
                              <Button block className='drawer-menu-item'>BULK MAIL</Button>
                          </Link>
                  )}
            </div>

          {!isAuth() && (
            <div className='social-btn'>
            <Google informParent={informParent}/>
            <Facebook informParent={informParent}/>
            </div>
          )}

          {!isAuth() && <Fragment>
              <div className='row col'>
                  <div className='col-6'>
                   <Link to="/signin"  style={isActive('/signin')}>
                       <Button className="login-drawer-btn">Login</Button>
                   </Link>
                </div>
                <div className=' signup-btn'>
                   <Link to="/signup"  style={isActive('/signup')}>
                    <Button className="signup-drawer-btn">SignUp</Button>
                 </Link>
                 </div>
              </div>
              </Fragment>
            }


         {isAuth() && isTabletOrMobileDevice && (
                 <span
                     className=""
                     style={{ cursor: 'pointer', color: 'white' }}
                     onClick={() => {
                         signout(() => {
                             history.push('/');
                         });
                     }}
                 >
                     <Button block className='drawer-menu-item signout-drawer'>SIGN OUT</Button>
                 </span>

         )}

          </div>
          </Drawer>
              {nav()}
              <div className="container">{children}</div>
          </Fragment>
      );

};

export default withRouter(Header);
