import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../types';

const defaultState = {
    
}

const user = JSON.parse(localStorage.getItem('user')) || defaultState;

function userReducer(state = user, action){
    switch(action.type){

        case REGISTER_USER:
            console.log('Received user action');
            return {...state, data: action.payload };

        case LOGIN_USER:
            return {...state, data: action.payload };

        case LOGOUT_USER:
            return state;

        default:
            return state;
    }
}

export default userReducer;