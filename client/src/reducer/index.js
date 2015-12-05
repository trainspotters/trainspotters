import { combineReducer } from 'redux';

export default function rootReducer(state = 0, {type}) {
    switch (type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
