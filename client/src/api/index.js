import axios from 'axios';
const BASE_URL = 'http://localhost:4000/api';

export const createNewPin = (newPin) => axios.post(`${BASE_URL}/pins`, newPin);
export const getAllPins = () => axios.get(`${BASE_URL}/pins`);

export const createUser = (user) => axios.post(`${BASE_URL}/users/register`, user);