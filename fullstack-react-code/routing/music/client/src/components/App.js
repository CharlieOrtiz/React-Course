import React from 'react';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer';
import Login from './Login';
import Logout from './Logout'; 
import PrivateRoute from './PrivateRoute';
import { Route, Redirect, Switch } from 'react-router-dom';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Switch>
        <PrivateRoute path='/albums' component={AlbumsContainer}/>
        <Route exact path='/' render={() => (
          <Redirect to='/albums' /> 
        )}/>
        <Route path='/login' component={Login}/>
        <Route path='/logout' component={Logout} />
      </Switch>
    </div>
  </div>
);

export default App;
