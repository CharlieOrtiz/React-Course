//First we're going to create the parent top level componet
class TimerDashboard extends React.Component {
    state = {
        timers: []
    }

    componentDidMount() {
        this.loadTimersFromServer();
        setInterval(this.loadTimersFromServer, 5000);
    }

    loadTimersFromServer = () => {
        client.getTimers((serverTimers) => {
            this.setState({timers: serverTimers})
        });
        console.log('rendering...');
    }

    handleCreateFormSubmit = (timer) => {
        this.createFormSubmit(timer)
    }

    createFormSubmit = (timer) => {
        const t = helpers.newTimer(timer);

        this.setState({timers: this.state.timers.concat(t)});

        //Send data to the server
        client.createTimer(t)
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
        });
        //Send data to the server
        client.updateTimer(attr);
    }

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    }

    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter((timer) => timer.id !== timerId)
        });
        //Send data to the server
        client.deleteTimer(
            {id: timerId}
        );
    }

    handleStartClick  = (timerId) => {
        this.startTimer(timerId);
    }

    startTimer = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                //Condition to find the timer that is going to start
                if (timer.id === timerId) {
                    //If we did we modify the runningSince property of the timer object element 
                    return Object.assign({}, timer, {
                        runningSince: now
                    });
                } else {
                    //If we didn't we just return the element without any modifycation
                    return timer;
                }
            })
        })

        //Send the data to the server
        client.startTimer({id: timerId, start: now});
    }

    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    }

    stopTimer = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if(timer.id === timerId) {
                    const lastElapsed = now - timer.runningSince
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null,
                    });
                } else {
                    return timer;
                }
            })
        });

        //Send the data to the server
        client.stopTimer(
            {id: timerId, stop: now}
        )
    }

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className="column">
                    <EditableTimerList timers={this.state.timers} 
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
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
        //Here we make an array of EditableTimer components that its length is according the elements that contains our timers array inside our state object (One state above, in TimersDashboard)
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
                onStartClick={this.props.onStartClick}
                onStopClick={this.props.onStopClick}
            />
        ));
        
        return (
            <div id="timers">
                {timers} {/* Here we returns the timers array created above */}
            </div>
        );
    }
}

//Component to render a TimerForm or a Timer component as part of the EditableTimerList
class EditableTimer extends React.Component {
    //State that determine if the edit form is open or not
    state = {
        editFormOpen: false, //by default is not open
    };
    //This function is called when there's a click in the edit icon
    handleEditClick = () => {
        this.openForm();
    }
    //This function is called when there's a click in the cancel button from the TimerForm component
    handleFormClose = () => {
        this.closeForm();
    }
    //This function is called when there's a click in the Update button from the TimeForm component
    handleSubmit = (timer) =>{
        this.props.onFormSubmit(timer); //Here we call a function up this component and pass it the state properties and the id prop from the TimerForm component to respectively change their values in the general parent state object (TimerDashboard)
        this.closeForm(); //After click update we call closeForm
    } 
    //Here we change our state to true to render the edit form
    openForm = () => {
        this.setState({editFormOpen: true});
    }
    //So, when the closeForm function is called we just change our state to avoid render the edit form
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
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                />
            );
        }
    }
}

//Component to render a Form whether to create a Timer or update it 
class TimerForm extends React.Component {
    //Here we have our state with its property values equal to their props (defined as states in the general parent component) or empty in case these are not defined yet (This occurs when we make the instantiation from ToggleTimerForm)
    state = {
        title: this.props.title || '',
        project: this.props.project || '',
    }
    //This function is called when there's a change in the typing input for title, in other word is bound to the onChange event
    handleTitle = (e)=>{
        this.setState({title: e.target.value});
    }
    //Similar to the handleTitle function, this one is bound to the onChange event but for the project input
    handleProject = (e) => {
        this.setState({project: e.target.value});
    }
    //By the submit button being clicked this function is called and calls one function up, defined it wheter in the ToggleTimerForm or in the EditableTimer component depending in which component was made the instantiation
    handleSubmit = () => {
        //So here we pass it the id prop and the title and project properties from state to our up function
        this.props.onFormSubmit({
            id: this.props.id, //For a creation our id prop is undefined, we define it in our general parent 
            title: this.state.title,
            project: this.state.project
        });
    }

    render() {
        //Condition to defined the text value of a button, if we have defined the id prop we get 'Update' if we doesn't we get 'Create', so Update is for the Editable click icon and Update is for the ToggleTimerForm button
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
    //After the component is render this function is called and execute a forceUpdate method every 50ms to re-render the component
    componentDidMount () {
        this.forceUpdateInterval = setInterval(()=> this.forceUpdate(), 50) //With every re-render we call our helpers function to reflect every second change in our timer
    }
    //In case we remove our timer component we clear the interval above before that
    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval);
    }
    //This function is executed when the trash icon is clicked
    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id); //Here we move up until the general parent component (TimerDashboard) to modify state according with the id that we are passing as an argument
    }
    //This function is called when there's a click in the Start Button from the TimerActionButton component
    handleStartClick = () => {
        //Here we call a property function of Timer that is being defined in the EditableTimer Component
        this.props.onStartClick(this.props.id); //We pass it the id property of the element that is being clicked
    }
    //This function is called when there's a click in the Stop button from the TimerActionButton component
    handleStopClick = () => {
        //Here we call a property function of Timer that is being defined in the EditableTimer Component
        this.props.onStopClick(this.props.id); //We pass it the property of the element that is being clicked
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
                    //Functions that are pass as props to TimerActionButton
                    onStartClick={this.handleStartClick} 
                    onStopClick={this.handleStopClick}
                />
            </div>
        );
    }
}

class TimerActionButton extends React.Component {
    render() {
        //Condition to return the stop button or the start one depending on the timerIsRunning property
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