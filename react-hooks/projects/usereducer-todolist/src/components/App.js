import React, { useState, useEffect, useReducer } from 'react'
import EditableTaskList from './EditableTaskList';
import ToggleTaskForm from './ToggleTaskForm';
import Header from './Header';
import reducer from '../reducers';
import { TaskDispatch, Theme } from '../contexts/index';

const state = [
    {
        title: 'Design',
        project: 'Social Media',
        complete: true,
        id: '55d3ssd8a',
    },
    {
        title: 'Testing',
        project: 'Social Media',
        complete: false,
        id: '68dwa38dre'
    }
];

/* WHY DID I USED useReducer?
    -Because I have a state with multiple sub-values 
    -and this cause to have multiple actions that ask for modifying these values,
    -Due to I have multiple actions, this results in to have multiple functions that has to call state to modify it, 
    -these functions tend to be pass as callbacks through the components tree as props, but we can optimize performance using just one function (dispatch) that can be pass through the component tree via context
*/

export default function App() {
    const [tasks, dispatch] = useReducer(reducer, state);
    const [theme, setTheme] = useState('light-mode');

    useEffect(() => {
        //Here we can emulate a fetch request to get the tasks that has been saved
    }, []);

    return (
        <TaskDispatch.Provider value={dispatch}>
            <Theme.Provider value={[theme, setTheme]}>
                <div className={`main-container ${theme}`}>
                    <Header/>
                    <EditableTaskList
                        taskList={tasks}
                    />
                    <ToggleTaskForm />
                </div>
            </Theme.Provider>
        </TaskDispatch.Provider>
    )
}
