
import axios from 'axios';
import { URL } from './url/url'

export const createOpenRequest = (quantity, from, to, category_id, full_name, phone, city_id, street, building, address_details, ) => {
    return axios.post(URL + '/api/openRequest' ,{ quantity, from, to, category_id, full_name, phone, city_id, street, building, address_details,  });
}             

export const createOpenRequestCopy = (quantity, from, to, category_id, full_name, phone, city_id, street, building, address_details, ) => {
    return axios.post(URL + '/api/openRequest' ,{ quantity, from, to, category_id, full_name, phone, city_id, street, building, address_details,  });
}             

export const requestFromSupplier = (quantity, from, to, category_id, full_name, phone, city_id, street, building, address_details, supplier_id) => {
    return axios.post(URL + '/api/supplier/supplierOrder' ,{ quantity, from, to, category_id, full_name, phone, city_id, street, building, address_details, supplier_id });
}             

export const getOrderApplications = () => {
    return axios.get(URL + '/api/user');
}             

export const actionOnOpenApplication = (order_id, status, type) => {
    return axios.post(URL + `/api/supplier/order/${order_id}` ,{ status, type });
}             
