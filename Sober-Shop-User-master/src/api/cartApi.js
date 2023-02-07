import { ENDPOINT } from 'constants/global';
import axiosClient from "./axiosClient";

const cartApi = {
    add: (cartForm) => {

        return axiosClient.post(ENDPOINT.cart.add, cartForm);
    },
    getAll: () => {

        return axiosClient.get(ENDPOINT.cart.getAll);
    },
    getCount: () => {
        return axiosClient.get(ENDPOINT.cart.getCount);
    },
    updateMany: (cartForm) => {
        return axiosClient.put(ENDPOINT.cart.updateMany, cartForm);
    },
    delete: (cartId) => {
        return axiosClient.delete(`${ENDPOINT.cart.delete}/${cartId}`);
    }
    
};

export default cartApi;