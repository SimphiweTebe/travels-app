import * as api from '../../api';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../types';

export const registerUser = (user) => async (dispatch) => {
    try {
        const res = await api.registerUser(user);
        dispatch({ type: REGISTER_USER, payload: res })
        localStorage.setItem('user', JSON.stringify(res.data))
    } catch (error) {
        console.log(error);
    }
}
export const loginUser = (user) => async (dispatch) => {
    try {
        const res = await api.loginUser(user);
        dispatch({ type: LOGIN_USER, payload: res.data })
        localStorage.setItem('user', JSON.stringify(res.data))
        console.log("login action: ", res.data);
    } catch (error) {
        console.log(error);
    }
}
export const logOut = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_USER })
        localStorage.removeItem('user');
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}