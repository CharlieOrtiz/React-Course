import React from 'react';

export const themes = {
  light: {
    foreground: '#222222',
    background: '#e9e9e9'
  },
  dark: {
    foreground: '#fff',
    background: '#222222'
  }
}; 

//Creation of the context with an argument as a default value
export const ThemeContext = React.createContext(themes.dark);
