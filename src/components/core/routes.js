import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../pages/home/home'
import About from '../pages/about/about';
import Contact from '../pages/contact/contact';
import Signup from '../pages/auth/signup';
import Signin from '../pages/auth/signin';
import Activate from '../pages/auth/activate';
import Private from './private';
import Admin from './admin';
import PrivateRoute from '../pages/auth/privateRoute';
import AdminRoute from '../pages/auth/adminRoute';
import Video from '../pages/video/video';
import Forgot from '../pages/auth/forgot';
import Reset from '../pages/auth/reset';
import UploadVideo from '../pages/video/uploadVideo';
import AllVideos from '../pages/video/allVideos'
import Event from '../pages/event/event';
import CreateEvent from '../pages/event/createEvent';
import AllEvent from '../pages/event/allEvent';
import Users from '../pages/users/users';
import BulkMail from '../pages/bulkMail/bulkMail';
import EditEvent from '../pages/edit/editEvent';
import EditVideo from '../pages/edit/editVideo';
import VideoDetail from '../pages/video/videoDetail';
import Error404 from '../pages/error/error';
import Voting from '../pages/voting/voting';
import AudiencePoll from '../pages/audiencePoll/audiencePoll';
import CreateContest from '../pages/audiencePoll/createContest';
import AllContest from '../pages/audiencePoll/createContest';


const Routes = () => {
  return (
     <BrowserRouter>
       <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          <Route path="/auth/activate/:token" exact component={Activate} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/admin" exact component={Admin} />
          <AdminRoute path="/video" exact component={Video} />
          <AdminRoute path="/video/upload-video" exact component={UploadVideo} />
          <AdminRoute path="/video/all-videos" exact component={AllVideos} />
          <AdminRoute path="/event" exact component={Event} />
          <AdminRoute path="/event/all-event" exact component={AllEvent} />
          <AdminRoute path="/event/create-event" exact component={CreateEvent} />
          <AdminRoute path="/users" exact component={Users} />
          <AdminRoute path="/bulk-mail" exact component={BulkMail} />
          <AdminRoute path="/event/edit/:id" exact component={EditEvent} />
          <AdminRoute path="/video/edit/:id" exact component={EditVideo} />
          <AdminRoute path="/contest/create-contest" exact component={CreateContest} />
          <AdminRoute path="/contest/all-contest" exact component={AllContest} />
          <Route path="/video/:videoTitle/:id" exact component={VideoDetail} />
          <Route path="/auth/password/forgot" exact component={Forgot} />
          <Route path="/auth/password/reset/:token" exact component={Reset} />
          <Route path="/voting" exact component={Voting} />
          <Route path="/contest" exact component={AudiencePoll} />
          <Route component={Error404}/>
       </Switch>
     </BrowserRouter>
  )
}

export default Routes;
