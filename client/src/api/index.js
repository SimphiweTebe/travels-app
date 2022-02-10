import axios from 'axios';
const BASE_URL = 'https://map-it-api.herokuapp.com/api';

export const createNewPin = (newPin) => axios.post(`${BASE_URL}/pins`, newPin);
export const getAllPins = () => axios.get(`${BASE_URL}/pins`);

export const registerUser = (user) => axios.post(`${BASE_URL}/users/register`, user);
export const loginUser = (user) => axios.post(`${BASE_URL}/users/login`, user);