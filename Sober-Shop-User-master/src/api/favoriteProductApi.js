import { ENDPOINT } from 'constants/global'
import axiosClient from './axiosClient'

const favoriteProductApi = {
    add: (formValues) => {
        return axiosClient.post(ENDPOINT.favouriteProduct.add, formValues);
    },
    getAll: () => {
        return axiosClient.get(ENDPOINT.favouriteProduct.getAll)
    }
}

export default favoriteProductApi;