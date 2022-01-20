import * as api from '../../api';
import { CREATE_PINS, GET_ALL_PINS } from '../types';

export const createPin = (newPin) => async (dispatch) => {
    try {
        const res = await api.createNewPin(newPin);
        dispatch({ type: CREATE_PINS, payload: res })
    } catch (error) {
        console.log(error);
    }
}

export const getPins = () => async (dispatch) => {
    try {
        const res = await api.getAllPins();
        dispatch({ type: GET_ALL_PINS, payload: res })
    } catch (error) {
        console.log(error);
    }
}