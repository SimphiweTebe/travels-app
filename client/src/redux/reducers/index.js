import { combineReducers } from 'redux';
import pinReducer from './pinReducer';
import userReducer from './userReducer';

const mainReducer = combineReducers({
    pins: pinReducer,
    user: userReducer
})

export default mainReducer;