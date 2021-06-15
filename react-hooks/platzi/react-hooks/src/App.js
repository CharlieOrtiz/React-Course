import './App.css';
import Header from './components/Header';
import Episodes from './components/Episodes';
import ThemeContext from './context/ThemeContext';
import {useContext} from 'react'

function App() {
  const {theme} = useContext(ThemeContext); //Get the value from the Provider. 
  //We have to remember that this value is an object, where we have a state variable and a setState function as properties
  //At this point we don't need to make used of updating state and we just want to read the state value, so, we just destructure that variable
  return (
    <div className={`App ${theme}`}>
      <Header/>
      <Episodes/>
    </div>
  );
}

export default App;
