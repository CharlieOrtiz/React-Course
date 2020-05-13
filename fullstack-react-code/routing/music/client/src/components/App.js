import React from 'react';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer';
import Login from './Login';
import Logout from './Logout'; 
import { Route, Redirect } from 'react-router-dom';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Route path='/albums' component={AlbumsContainer}/>
      <Route exact path='/' render={() => (
        <Redirect to='/albums' /> 
      )}/>
      <Route path='/login' component={Login}/>
      <Route path='/logout' component={Logout} />
    </div>
  </div>
);

export default App;
