import { CREATE_PINS, GET_ALL_PINS } from '../types';

function pinReducer(state = [], action){
    switch(action.type){

        case CREATE_PINS:
            return [...state, action.payload];

        case GET_ALL_PINS:
            return action.payload.data;

        default:
            return state;
    }
}

export default pinReducer;