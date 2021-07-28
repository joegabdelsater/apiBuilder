
import axios from 'axios';
import { URL } from './url/url'

export const fetchCategories = () => {
    return axios.get(URL + '/api/categories');
}             

export const fetchSuppliersByCityAndCategory = () => {
    return axios.get(URL + '/api/cities/category/1/suppliers');
}             

export const fetchCities = () => {
    return axios.get(URL + '/api/cities');
}             
