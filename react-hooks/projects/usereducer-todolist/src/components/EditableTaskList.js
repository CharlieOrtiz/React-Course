import React from 'react'
import EditableTask from './EditableTask';

export default function EditableTaskList({taskList}) {
    return (
        <div className='task-dashboard'>
            {
                taskList.map((task) => (
                    <EditableTask
                        task={task}
                        key={task.id}
                    />
                ))
            }
        </div>
    )
}
