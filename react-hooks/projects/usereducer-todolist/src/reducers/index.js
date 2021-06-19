import { v4 as uuidv4 } from 'uuid';

export default function reducer(state, action) {
    switch(action.type) {
        case 'ADD_TASK': {
            const newTask = {
                id: uuidv4(),
                title: action.title,
                project: action.project,
                complete: false
            }

            return [...state, newTask];
        }
        case 'EDIT_TASK': {
            const newState = state.map((task) => {
                if(task.id === action.id) {
                    return Object.assign({}, task, {
                        ...action.editedProps
                    });
                } else {
                    return task;
                }
            });

            return newState;
        }
        case 'REMOVE_TASK': {
            const newState = state.filter((task) => (
                task.id !== action.id
            ));

            return newState;
        }
        case 'COMPLETE_TASK': {
            const newState = state.map((task) => (
                task.id === action.id ? (
                    { ...task, complete: true }
                ) : task
            ));
            
            return newState;
        }
        case 'DISCARD_TASK': {
            const newState = state.map((task) => (
                task.id === action.id ? (
                    { ...task, complete: false }
                ) : task
            ));

            return newState;
        }
        default: {
            return state;
        }
    }
}