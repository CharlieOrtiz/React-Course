import React, { useState } from 'react'
 
const ThemeContext = React.createContext('lightMode'); //Context object

//Custom component that returns the context provider with the theme and setTheme as values
export function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState('lightMode');

    return(//Provider takes the state variable and the setState function as values inside of an object, these values are going to be accesible by the useContext Hook.
        <ThemeContext.Provider value={{theme, setTheme}}>  {/* With this, we can get the setState function where we are going to make uodates or just the state variable where we just want to read */}
            { children } 
        </ThemeContext.Provider>
    )
}

export default ThemeContext;