import React, { useState, useContext } from 'react'
import { TaskDispatch } from '../contexts';

export default function TaskForm({task, closeTaskForm}) {
    const [title, setTitle] = useState(!task ? '' : task.title);
    const [project, setProject] = useState(!task ? '' : task.project);
    const dispatch = useContext(TaskDispatch);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeProject = (e) => {
        setProject(e.target.value);
    }

    const onSubmitTaskForm = (e) => {
        e.preventDefault();
        //Valid that there's no empty fields                                    
        if(!title || !project) return;
        //Check if there's no task to send an ADD action
        if(!task) {
            dispatch({
                type: 'ADD_TASK',
                title,
                project,
            })
        } else {
            const editedProps = {};
            if(title !== task.title) editedProps.title = title;
            if(project !==  task.project) editedProps.project = project;
            if(Object.keys(editedProps).length) {
                dispatch({
                    type: 'EDIT_TASK',
                    id: task.id,
                    editedProps,
                });
            }
        }
        closeTaskForm();
    }

    const onCancelClick = () => {
        closeTaskForm()
    }

    return (
        <div className='taskform-container'>
            <form className='taskform' onSubmit={onSubmitTaskForm}>
                <div>
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} onChange={onChangeTitle} />
                </div>
                <div>
                    <label htmlFor="">Project</label>
                    <input type="text" value={project} onChange={onChangeProject} />
                </div>
                <div className='buttons-container'>
                    <input type="button" value='Cancel' onClick={onCancelClick} />
                    <input type="submit" value='Save' />
                </div>
            </form>
        </div>
    )
}
