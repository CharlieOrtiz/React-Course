const initialState = {
  message: []
};

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

const store = createStore(reducer, initialState);

const addMessage1 = {
  type: 'ADD_MESSAGE',
  message: 'Hi, how does it look?'
}

const deleteMessage = {
  type: 'DELETE_MESSAGE',
  index: 0,
}

const addMessage2 = {
  type: 'ADD_MESSAGE',
  message: 'Looking good, what about you?'
}

const listener = () => {
  console.log(store.getState())
}
store.subscribe(listener);

store.dispatch(addMessage1);
store.dispatch(addMessage2);
store.dispatch(deleteMessage);