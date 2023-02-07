import { ENDPOINT } from "constants/global";
import axiosClient from "./axiosClient";

const orderApi = {
    addOrder: (payload) => {
        return axiosClient.post(ENDPOINT.order.addOrder, payload);
    },
    getOrderUser: () => {
        return axiosClient.get(ENDPOINT.order.getOrderUser);
    } ,
    getOrder: (id) => {
        const url = `${ENDPOINT.order.getOrder}/${id}`;
        return axiosClient.get(url);
    },
    paymentPaypal: (data) => {
        const url = `pay`;
        return axiosClient.post(url, data);
    }
};

export default orderApi;