import React, { useState, useCallback } from 'react'
import TaskForm from './TaskForm';

export default function ToggleTaskForm() {
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
                openTaskForm ? (
                    <TaskForm
                        closeTaskForm={toggleTaskForm}
                    />
                ) : (
                    <button onClick={toggleTaskForm}>+</button>
                )
            }        
        </div>
    )
}
