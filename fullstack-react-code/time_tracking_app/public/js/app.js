//First we're going to create the parent top level componet
class TimerDashboard extends React.Component {
    render() {
        return (
            <div className='ui three column centered grid'>>
                <div className="column">
                    <EditableTimerList /> {/* Parent element of every EditableTimer component */}
                    <ToggleTimerForm isOpen={true} /> {/* Here we pass the property isOpen to determine whether to render a "+" or a TimerForm component */} 
                </div>
            </div>
        );
    }
}

//This is the component that has every Editable Timer, this one does not include the button that adds a new Timer task
class EditableTimerList extends React.Component {
    render() {
        return (
            <div id="timers">
                <EditableTimer
                    title="Learn React"
                    project="Web Domination"
                    elapsed="8986300"
                    runningSince={null}
                    editFormOpen={false} //This property determine whether to render the TimerForm component or just the Timer component
                />
                <EditableTimer
                    title="Learn extreme ironing"
                    project="World domination"
                    elapsed="3890985"
                    runningSince={null}
                    editFormOpen={true}
                />
            </div>
        );
    }
}