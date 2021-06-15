import React from 'react';
import ThemeContext from '../context/ThemeContext';
import {useContext} from 'react'

export default function Header() {
    const {theme, setTheme} = useContext(ThemeContext); //Get the context value (The object we provide in ThemeContextProvider as a value) return by the Provider 
    //As here we are going to need to update the variable and read it itself, we destructure both properties from the Object.
    const handleClick = () => {
        //Update the state variable, so our context provider is going to update its value, more specific, its theme property
        setTheme(theme === 'lightMode' ? 'darkMode' : 'lightMode');
    }

    return (
        <div className='header'>
            <h1>React Hooks</h1>
            <button type='button' onClick={handleClick}>{theme === 'lightMode' ? 'Dark Mode' : 'Light Mode'}</button>
        </div>
    )
}

