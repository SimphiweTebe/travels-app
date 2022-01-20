import { REGISTER_USERS, LOGIN_USERS, LOGOUT_USERS, GET_ALL_USERS } from '../types';

const defaultState = {
    isAuth: false,
    jwt: null,
    data: null
}

function userReducer(state = defaultState, action){
    switch(action.type){

        case REGISTER_USERS:
            return {...state, data: action.payload };

        case LOGIN_USERS:
            return {...state, data: action.payload };

        case LOGOUT_USERS:
            return state;

        default:
            return state;
    }
}

export default userReducer;