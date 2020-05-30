const initialState = {
  message: []
};

function createStore(reducer, initialState) {
  let state = initialState;

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
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

store.dispatch(addMessage1);
const stateV1 = store.getState();

const addMessage2 = {
  type: 'ADD_MESSAGE',
  message: 'Looking good, what about you?'
}

store.dispatch(addMessage2);
const stateV2 = store.getState();

console.log(stateV1);
console.log(stateV2);

store.dispatch(deleteMessage);
const  stateV3 = store.getState();

console.log(stateV3);