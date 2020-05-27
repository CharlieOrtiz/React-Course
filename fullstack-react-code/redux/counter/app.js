function reducer(state, action) {
    if(action.type === 'INCREMENT') {
        return state + action.amount;
    } else if(action.type === 'DECREMENT') {
        return state - action.amount;
    } else {
        return state;
    }
}

function createStore() {
    let state = 0;

    const getState = () => (state);
    const dispatch = (action) => {
        state = reducer(state, action);
    }

    return {
        getState,
        dispatch,
    }
}

const store = createStore();

const incrementAction = {
    type: 'INCREMENT',
    amount: 5,
}

store.dispatch(incrementAction);
console.log(store.getState())//5

store.dispatch(incrementAction);
console.log(store.getState())//10

const unknownAction = {
    type: 'UNKNOWN'
}

const decrementAction = {
    type: 'DECREMENT',
    amount: 3,
}

store.dispatch(decrementAction);
console.log(store.getState())//7
