import axiosClient from './axiosClient';
import {ENDPOINT} from "../constants/global";

const favouriteProductApi = {
  getAll: () => {
    return axiosClient.get(ENDPOINT.favouriteProduct.getAll);
  },
  add: data => {
    return axiosClient.post(ENDPOINT.favouriteProduct.add, data);
  },
  delete: id => {
    return axiosClient.delete(`/favouriteProduct/${id}`);
  }
}

export default favouriteProductApi;