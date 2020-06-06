import React from 'react';
import {createStore} from 'redux';
import uuid from 'uuid';

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      id: uuid.v4(),
      timestamp: Date.now(),
    }
    //find the Index of the thread where we are going to add our new message
    const threadIndex = state.threads.findIndex((thread) => thread.id === action.threadId);
    //Create a new thread object based in the original thread where we want to add our new message
    const oldThread = state.threads[threadIndex];
    const newThread = {
      ...oldThread,
      messages: oldThread.messages.concat(newMessage),
    };
    //Return a new state object based in the old state and at the same time adding the new Thread object
    return {
      ...state,
      threads: [ //Slice returns a new array that goes from the index elements specify in the parameters, and the spread operator just add the elements, inside of the new array, to the threads array 
        ...state.threads.slice(0, threadIndex), //Add the threads that are before the new one
        newThread,
        ...state.threads.slice(threadIndex + 1, state.threads.length) //Add the threads that are after the new one
      ]
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: state.messages.filter((message) => message.id !== action.id),
    };
  } else {
    return state;
  }
}

const initialState = { 
  activeThreadId: '1-fca2',
  threads: [
    {
      id: '1-fca2',
      title: 'Buzz Aldrin',
      messages: [
        {
          text: 'Twelve minutes to ignition.',
          timestamp: Date.now(),
          id: uuid.v4(),
        },
      ]
    },
    {
      id: '2-be91',
      title: 'Michael Collins',
      messages: []
    }
  ] 
};

const store = createStore(reducer, initialState);

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const threads = state.threads;
    const activeThread = threads.find((thread) => activeThreadId === thread.id);

    const tabs = threads.map((t) => (
      {
        title: t.title,
        active: t.id === activeThreadId,
      }
    ));

    return (
      <div className='ui segment'>
        <ThreadTabs tabs={tabs}/>
        <Thread thread={activeThread} />
      </div>
    );
  }
}

class ThreadTabs extends React.Component {
  render() {
    const tabs = this.props.tabs.map((tab, index) => (
      <div
        key={index}
        className={tab.active ? 'active item' : 'item'}
      >
        {tab.title}
      </div>
    ));

    return (
      <div className='ui top attached tabular menu'>
        {tabs}
      </div>
    );
  }
}

class Thread extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id,
    });
  };

  render() {
    const messages = this.props.thread.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(message.id)}
      >
        <div className='text'>
          {message.text}
          <span className="metadata">@{message.timestamp}</span>
        </div>
      </div>
    ));
    return (
      <div className='ui center aligned basic segment'>
        <div className='ui comments'>
          {messages}
        </div>
        <MessageInput threadId={this.props.thread.id}/>
      </div>
    );
  }
}

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      text: this.state.value,
      threadId: this.props.threadId,
    });
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className='ui input'>
        <input
          onChange={this.onChange}
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
    );
  }
}

export default App;
