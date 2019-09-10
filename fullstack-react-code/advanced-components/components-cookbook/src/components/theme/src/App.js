import React, {Component} from 'react';

//To use the context we need to import it and at the same time import the themes object
import {ThemeContext, themes} from './theme';
import './App.css';
import Header from './Header';

class App extends Component {
  state = {theme: themes.dark}; //State is equal to the themes property called dark, this themes object was imported

  changeTheme = evt => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
  };

  render() {
    return (
      <div className="App">
        <ThemeContext.Provider value={this.state.theme}> {/*With the context being imported we can create our provider component, used just to pass down data to the child components. Its value is equal to the state*/}
          <Header /> {/*This child can access to the data in the context*/}
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <button onClick={this.changeTheme}>Change theme</button>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
