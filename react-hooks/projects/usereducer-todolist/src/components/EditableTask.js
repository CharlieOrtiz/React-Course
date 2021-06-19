import React, { useState, useCallback } from 'react'
import Task from './Task';
import TaskForm from './TaskForm';

export default function EditableTask({task}) {
    const [openTaskForm, setOpenTaskForm] = useState(false);

    const toggleTaskForm = useCallback(
        () => {
            setOpenTaskForm(!openTaskForm);
        },
        [openTaskForm],
    );

    return (
        <div>
            {
                !openTaskForm ? (
                    <Task
                        task={task}
                        openTaskForm={toggleTaskForm}
                    />
                ) : (
                    <TaskForm
                        task={task}
                        closeTaskForm={toggleTaskForm}
                    />
                )
            }
        </div>
    )
}
