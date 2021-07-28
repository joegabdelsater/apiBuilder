
import axios from 'axios';
import { URL } from './url/url'

export const getSupplierOrders = () => {
    return axios.get(URL + '/api/supplier/supplierOrder');
}             

export const getOpenRequests = () => {
    return axios.get(URL + '/api/supplier/openRequests');
}             

export const viewOrder = (order_id, type) => {
    return axios.post(URL + '/api/supplier/order' ,{ order_id, type });
}             

export const applyToOpenRequest = (status, type) => {
    return axios.post(URL + '/api/supplier/order/44' ,{ status, type });
}             

export const applyToOpenRequestCopy = (status, type) => {
    return axios.post(URL + '/api/supplier/order/44' ,{ status, type });
}             
