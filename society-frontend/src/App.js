import React from 'react';
import './App.css';
import Main from './components/public-component/main';
import Footer from './components/public-component/footer';
import Rules from './components/private-components/rules';
import Home from './components/private-components/home';
import NavBar from './components/public-component/navbar';
import Signin from './components/public-component/user/signin';
import Register from './components/public-component/user/register';
import Activate from './components/public-component/user/activate';
import { PublicRoute } from './route/publicRoute';
import { PrivateRoute } from './route/privateRoute';
import {Provider} from 'react-redux'
import store from './redux/store';
import ViewMembers from './components/private-components/members/viewMembers';
import Complaints from './components/private-components/complaints/complaints';
import ActivateAdmin from './components/public-component/user/adminActivate';
import AdminSignin from './components/private-components/admin/AdminSignin';
import AdminRegister from './components/private-components/admin/AdminRegister';
import AdminHome from './components/private-components/admin/components/AdminHome';

import SocietyRegister from './components/private-components/admin/components/createSociety';
import Societies from './components/private-components/admin/components/societies';
import Society from './components/private-components/admin/components/Society';
import { Switch } from 'react-router-dom';


function App() {
  return (<Provider store={store}>
    <div className="App grid-container">
      <NavBar />
  
    <Switch>
      
      <PrivateRoute component={SocietyRegister} exact={true} path="/societyRegister" />
      <PublicRoute component={AdminSignin} exact={true} path="/AdminSignin/" />
      <PublicRoute component={AdminRegister} exact={true} path="/AdminRegister"/>
      <PublicRoute component={ActivateAdmin} exact={true} path="/society/activateAdmin/:token"  />
      <PrivateRoute component={AdminHome} exact={true} path="/AdminHome" />
      <PrivateRoute component={Society} exact={true} path="/society/:id" />



      {/* user */}
      <PublicRoute component={Signin} exact={true} path="/signin/" />
      <PublicRoute component={Register} exact={true} path="/register" />
      <PublicRoute component={Activate} exact={true} path="/society/activate/:token"  />
      <PrivateRoute component={Home} exact={true} path="/home" />
      <PrivateRoute component={Rules} exact={true} path="/rules" />
      <PrivateRoute component={ViewMembers} exact={true} path="/members" />
      <PrivateRoute component={Complaints} exact={true} path="/complaints"/>
      <PublicRoute component={Main} exact={true} path="/" />
      </Switch>
      <Footer />
    </div>
    </Provider>
  );
}

export default App;
