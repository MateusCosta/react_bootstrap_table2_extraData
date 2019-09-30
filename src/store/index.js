import {createStore} from 'redux';

const INITIAL_STATE = {
    pending: [],
    accepted: [],
    rejected: [],
    isLoading: false
}

function requests(state = INITIAL_STATE, action){
    switch (action.type) {
       
        case 'UPDATE_REQUESTS':
            return { ...state, pending: action.pending, accepted: action.accepted, rejected: action.rejected }
        
        case 'TOGGLE_LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state;
    }
}

const store = createStore(requests);

export default store;