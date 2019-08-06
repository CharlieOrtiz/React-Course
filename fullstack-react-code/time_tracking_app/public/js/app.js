//First we're going to create the parent top level componet
class TimerDashboard extends React.Component {
    state = {
        timers: [
            {
                title: 'Practice Squat',
                project: 'Gym Chores',
                id: uuid.v4(),
                elapsed: 5456099,
                runningSince: Date.now(),
            },
            {
                title: 'Bake squash',
                project: 'Kitchen Chores',
                id: uuid.v4(),
                elapsed: 1273998,
                runningSince: null,
            }
        ]
    }

    handleCreateFormSubmit = (timer) => {
        this.createFormSubmit(timer)
    }

    createFormSubmit = (timer) => {
        const t = helpers.newTimer(timer);

        this.setState({timers: this.state.timers.concat(t)});
    }

    handleEditFormSubmit = (attr) => {
        this.updateFormSubmit(attr);
    }

    updateFormSubmit = (attr) => {
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === attr.id) {
                    return Object.assign({}, timer, {
                        title: attr.title,
                        project: attr.project,
                    });
                } else {
                    return timer;
                }
            })
        })
    }

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    }

    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter((timer) => timer.id !== timerId)
        });
    }

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className="column">
                    <EditableTimerList timers={this.state.timers} 
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                    /> {/* Parent element of every EditableTimer component */}
                    <ToggleTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                    /> {/* Here we pass the property isOpen to determine whether to render a "+" or a TimerForm component */} 
                </div>
            </div>
        );
    }
}

//This is the component that has every Editable Timer, this one does not include the button that adds a new Timer task
class EditableTimerList extends React.Component {
    render() {
        const timers = this.props.timers.map((timer) => (
            <EditableTimer
                key={timer.id}
                id={timer.id}
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                runningSince={timer.runningSince}
                onFormSubmit={this.props.onFormSubmit}
                onTrashClick={this.props.onTrashClick}
            />
        ));
        
        return (
            <div id="timers">
                {timers}
            </div>
        );
    }
}

//Component to render a TimerForm or a Timer component as part of the EditableTimerList
class EditableTimer extends React.Component {
    state = {
        editFormOpen: false,
    };

    handleEditClick = () => {
        this.openForm();
    }

    handleFormClose = () => {
        this.closeForm();
    }

    handleSubmit = (timer) =>{
        this.props.onFormSubmit(timer);
        this.closeForm();
    } 

    openForm = () => {
        this.setState({editFormOpen: true});
    }

    closeForm = () => {
        this.setState({editFormOpen: false});
    }

    render() {
        //Here we determine if it is necessary to render the TimerForm or the Timer component
        if (this.state.editFormOpen) {
            return (
                <TimerForm
                    id={this.props.id} 
                    title={this.props.title} 
                    project={this.props.project} //We pass the title and project property values to take them as default values in the inputs sons from TimerForm
                    onFormSubmit = {this.handleSubmit}
                    onFormClose = {this.handleFormClose}
                />
            );
        } else {
            return(
                <Timer
                    id={this.props.id} 
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                />
            );
        }
    }
}

//Component to render a Form whether to create a Timer or update it 
class TimerForm extends React.Component {
    state = {
        title: this.props.title || '',
        project: this.props.project || '',
    }

    handleTitle = (e)=>{
        this.setState({title: e.target.value});
    }

    handleProject = (e) => {
        this.setState({project: e.target.value});
    }

    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        });
    }

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';

        return(
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input type="text" value={this.state.title} onChange={this.handleTitle}/>
                        </div>
                        <div className="field">
                            <label>Project</label>
                            <input type="text" value={this.state.project} onChange={this.handleProject}/>
                        </div>
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button" onClick={this.handleSubmit}>
                                {submitText}
                            </button>
                            <button className="ui basic red button" onClick={this.props.onFormClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//Component that represents the plus icon button or the TimeForm component depending on the isOpen property value
class ToggleTimerForm extends React.Component {
    state = {
        isOpen: false,
    };

    handleFormOpen = () => {
        this.setState({isOpen: true})
    }

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);

        this.setState({isOpen: false});
    }

    handleFormClose = ()=>{
        this.setState({isOpen: false});
    }

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <div className="ui basic content aligned segment">
                    <button className="ui basic button icon" onClick={this.handleFormOpen}>
                        <i className="plus icon"/>
                    </button>
                </div>
            );
        }
    }
}

//This is our principal component, where the task are and where the time is running
class Timer extends React.Component {
    componentDidMount () {
        this.forceUpdateInterval = setInterval(()=> this.forceUpdate(), 50)
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval);
    }

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    }

    handleStartClick = () => {
        this.props.onStartClick(this.props.id);
    }

    handleStopClick = () => {
        this.props.onStopClick(this.props.id);
    }

    render() {
        //According with the elapsed property provided by EditableTimer we pass it as an argument to the renderElapsed function that is inside helpers.js returning us the standar format to see Hours, Minutes and seconds (HH:MM:SS)
        const elapsedSrting = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince); 
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="header">
                        {this.props.title}
                    </div>
                    <div className="meta">
                        {this.props.project}
                    </div>
                    <div className="center aligned description">
                        <h2>
                            {elapsedSrting}
                        </h2>
                    </div>
                    <div className="extra content">
                        <span className="right floated edit icon" onClick={this.props.onEditClick}>
                            <i className="edit icon" />
                        </span>
                        <span className="right floated trash icon" onClick={this.handleTrashClick}>
                            <i className="trash icon" />
                        </span>
                    </div>
                </div>
                <TimerActionButton 
                    timerIsRunning={!!this.props.runningSince} //If runningSince is null it returns false
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
                />
            </div>
        );
    }
}

class TimerActionButton extends React.Component {
    render() {
        if(this.props.timerIsRunning) {
            return <div className="ui bottom attached red basic button" onClick={this.props.onStopClick}>
                Stop
            </div>
        } else {
            return <div className="ui bottom attached green basic button" onClick={this.props.onStartClick}>
                Start
            </div>
        }
    }
}

ReactDOM.render(
    <TimerDashboard/>,
    document.getElementById('content')
);