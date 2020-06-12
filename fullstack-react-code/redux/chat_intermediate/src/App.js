import React from 'react';
import {createStore} from 'redux';
import uuid from 'uuid';

function activeThreadIdReducer(state='1-fca2', action) {
  if(action.type === 'OPEN_THREAD') {
    return action.id;
  } else {
    return state;
  }
}

//As this function just take care of the threads property, we use another one to delegate managment for messages property and one more to get the thread index that we're going to use to change our messages property
function threadsReducer(
  state = [
      {
        id: '1-fca2',
        title: 'Buzz Aldrin',
        messages: messagesReducer(undefined, {}),
      },
      {
        id: '2-be91',
        title: 'Michael Collins',
        messages: messagesReducer(undefined, {}),
      }
  ], action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'DELETE_MESSAGE': {
      //find the Index of the thread where we are going to add our new message
      const threadIndex = findThreadIndex(state, action);
      //Create a new thread object based in the original thread where we want to add our new message
      const oldThread = state[threadIndex];
      const newThread = {
        ...oldThread,
        messages: messagesReducer(oldThread.messages, action), //Here we're using a function to take responsability for the messages property and keep the single responsability patter
      };
      //Return a new state object based in the old state and at the same time adding the new Thread object
      return [ //Slice returns a new array that goes from the index elements specify in the parameters, and the spread operator just add the elements, inside of the new array, to the threads array 
          ...state.slice(0, threadIndex), //Add the threads that are before the new one
          newThread,
          ...state.slice(threadIndex + 1, state.length) //Add the threads that are after the new one
        ]
    }

    default: {
      return state;
    }
  }
}

function findThreadIndex(state, action) {
  switch(action.type) {
    case 'ADD_MESSAGE': {
      return state.findIndex((thread) => thread.id === action.threadId);
    } 

    case 'DELETE_MESSAGE': {
      return state.findIndex((thread) => (
        thread.messages.find((m) => (m.id === action.id))
      ));
    }
  }
}

function messagesReducer(state=[], action) {
  switch(action.type) {
    case 'ADD_MESSAGE': {
      const newMessage = {
        text: action.text,
        timestamp: Date.now(),
        id: uuid.v4(),
      };
  
      return state.concat(newMessage);
    }

    case 'DELETE_MESSAGE': {
      return state.filter((m) => m.id !== action.id);
    }

    default: {
      return state;
    }
  }
}

//Notice how we use the single responsability pattern in activeThreadIdReducer and threadsReducer functions, each of these functions just take care of a single property from state.
function reducer(state={}, action) {
  return {
    activeThreadId: activeThreadIdReducer(state.activeThreadId, action), //Just take care of activeThreadId property
    threads: threadsReducer(state.threads, action), //Just take care of threads property
  }
}

const store = createStore(reducer);

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const threads = state.threads;
    const activeThread = threads.find((thread) => activeThreadId === thread.id);

    return (
      <div className='ui segment'>
        <ThreadTabs/>
        <Thread thread={activeThread} />
      </div>
    );
  }
}

const Tabs = (props) => (
  <div className='ui top attached tabular menu'>
    {
      props.tabs.map((tab, index) => (
        <div
          key={index}
          className={tab.active ? 'active item' : 'item'}
          onClick={()=>(props.onClick(tab.id))}
        >
          {tab.title}
        </div>
      ))
    }
</div>
);

class ThreadTabs extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();

    const threadTabs = state.threads.map((tab, index) => {
      return {
        title: tab.title,
        active: tab.id === state.activeThreadId,
        id: tab.id
      }
    });
    return (
      <Tabs
        tabs={threadTabs}
        onClick={(id)=>(
          store.dispatch({
            type: 'OPEN_THREAD',
            id: id,
          })
        )}
      />
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
