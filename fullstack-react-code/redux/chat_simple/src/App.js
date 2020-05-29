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
  } else {
    return state;
  }
}

const store = createStore(reducer, initialState);

const addMessage1 = {
  type: 'ADD_MESSAGE',
  message: 'Hi, how does it look?'
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