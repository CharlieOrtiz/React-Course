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

//Component to render a TimerForm or a Timer component as part of the EditableTimerList
class EditableTimer extends React.Component {
    render() {
        //Here we determine if it is necessary to render the TimerForm or the Timer component
        if (this.props.editFormOpen) {
            return (
                <TimerForm 
                    title={this.props.title} 
                    project={this.props.project} //We pass the title and project property values to take them as default values in the inputs sons from TimerForm
                />
            );
        } else {
            return(
                <Timer 
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                />
            );
        }
    }
}

//Component to render a Form whether to create a Timer or update it 
class TimerForm extends React.Component {
    render() {
        const submitText = this.props.title ? 'Update' : 'Create';

        return(
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input type="text" defaultValue={this.props.title} />
                        </div>
                        <div className="field">
                            <label>Project</label>
                            <input type="text" defaultValue={this.props.project} />
                        </div>
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button">
                                {submitText}
                            </button>
                            <button className="ui basic red button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}