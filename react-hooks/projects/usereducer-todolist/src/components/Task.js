import React, { useContext } from 'react';
import { TaskDispatch } from '../contexts';

export default function Task({task, openTaskForm}) {
    const dispatch = useContext(TaskDispatch);

    const onEditClick = () => {
        openTaskForm()
    }

    const onDeleteClick = () => {
        const confirm = window.confirm(`Are you sure do you want to delete ${task.title} task?`);
        if(confirm) {
            dispatch({
                type: 'REMOVE_TASK',
                id: task.id
            });
        }
    }

    const onCompleteClick = () => {
        dispatch({
            type: 'COMPLETE_TASK',
            id: task.id,
        });
    }

    const onDiscardClick = () => {
        dispatch({
            type: 'DISCARD_TASK',
            id: task.id,
        });
    }

    return (
        <div className={task.complete ? 'done-task' : 'undone-task'}>
            <div>
                <h3>{task.title}</h3>
                <p>{task.project}</p>
            </div>
            <div>
                <button onClick={onEditClick}>Edit</button>
                <button onClick={onDeleteClick}>Delete</button>
            </div>
            {
                task.complete ? (
                    <button onClick={onDiscardClick}>Discard</button>
                ) : (
                    <button onClick={onCompleteClick}>Complete</button>
                )
            }
        </div>
    )
}
