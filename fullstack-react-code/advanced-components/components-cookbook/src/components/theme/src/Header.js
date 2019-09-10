import React from 'react';
import logo from './logo.svg';

//We need to import again the context but now to use the consumer component
import {ThemeContext} from './theme';

export const Header = props => (
  <ThemeContext.Consumer> {/*Consumer component use an argument to reads the data provided by the provider component, in case our Header component is not wrapper by the Provider component, the argument exposed here takes the default value of the context*/}
    {theme => (
      <header
        className="App-header"
        style={{backgroundColor: theme.background}}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title" style={{color: theme.foreground}}>
          Welcome to React
        </h1>
      </header>
    )}
  </ThemeContext.Consumer>
);

export default Header;
