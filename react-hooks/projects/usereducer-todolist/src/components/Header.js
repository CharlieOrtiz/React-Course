import React, {useContext} from 'react';
import { Theme } from '../contexts';

export default function Header() {
    const [theme, setTheme] = useContext(Theme);

    const onSetThemeClick = () => {
        setTheme(theme === 'light-mode' ? 'dark-mode' : 'light-mode');
    }

    return (
        <div className='header'>
            <h1>ToDo's List</h1>
            <div>
                <button onClick={onSetThemeClick}>{theme === 'light-mode' ? 'Dark Mode' : 'Light Mode'}</button>
            </div>
        </div>
    )
}
