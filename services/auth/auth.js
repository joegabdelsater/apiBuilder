
import axios from 'axios';
import { URL } from './url/url'

export const register = (email, password, phone, name) => {
    return axios.post(URL + '/api/register' ,{ email, password, phone, name });
}             

export const login = (email, password) => {
    return axios.post(URL + '/api/login' ,{ email, password });
}             

export const userDetails = () => {
    return axios.get(URL + '/api/user');
}             
