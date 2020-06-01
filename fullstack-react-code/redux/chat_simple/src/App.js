import React from "react";

function createStore(reducer, initialState) {
  let state = initialState;
  //1. Define the array called listeners
  let listeners = [];

  const getState = () => (state);
  //2.Add a subscribe method which adds a new listener to listeners
  const subscribe = (cb) => listeners.push(cb);

  const dispatch = (action) => {
    state = reducer(state, action);
    //3. Call each listener function when the state is changed
    listeners.forEach(element => {
      element();
    });
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if(action.type === 'ADD_MESSAGE') {
    return {
      message: state.message.concat(action.message)
    };
  } else if(action.type === 'DELETE_MESSAGE') {
    return {
      message: [
        ...state.message.slice(0, action.index),
        ...state.message.slice(action.index + 1, state.message.length)
      ],
    };
  } else {
    return state;
  }
}

const initialState = {
  message: []
};
const store = createStore(reducer, initialState);

//COMPONENTS
class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages =  store.getState().message;

    return(
      <div className='ui segment'>
        <MessageView messages={messages}/>
        <MessageInput/>
      </div>
    );
  }
}

class MessageView  extends React.Component {

  onClickMessage = (index) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      index: index
    });
  }

  render() {
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.onClickMessage(index)}
      >
        {message}
      </div>
    ));

    return(
      <div className='ui comments'>
        {messages}
      </div>
    )
  }
}

class MessageInput extends React.Component {
  state = {
    value: '',
  }

  onChangeInput = (e)=> {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit = () => {
    store.dispatch(
      {
        type: 'ADD_MESSAGE',
        message: this.state.value,
      }
    );

    this.setState({
      value: '',
    });
  }
  render() {
    return <div className="ui input">
      <input
        onChange={this.onChangeInput}
        value={this.state.value}
        type='text'
      />
      <button
        onClick={this.handleSubmit}
        className='ui primary button'
        type='submit'
      >
        Submit
      </button>
    </div>
  }

}

export default App;