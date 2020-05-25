function reducer(state, action) {
    if(action.type === 'INCREMENT') {
        return state + action.amount;
    } else if(action.type === 'DECREMENT') {
        return state - action.amount;
    } else {
        return state;
    }
}

const incrementAction = {
    type: 'INCREMENT',
    amount: 5,
}

console.log(reducer(0, incrementAction)); // 5
console.log(reducer(1, incrementAction)); //6
console.log(reducer(5, incrementAction)); //10

const unknownAction = {
    type: 'UNKNOWN'
}

console.log(reducer(5, unknownAction)); //5
console.log(reducer(9, unknownAction)); //9

const decrementAction = {
    type: 'DECREMENT',
    amount: 3,
}

console.log(reducer(5, decrementAction)); //2
console.log(reducer(3, decrementAction)); //0
console.log(reducer(9, decrementAction)); //6

