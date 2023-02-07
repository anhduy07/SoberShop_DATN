import axiosClient from './axiosClient';

const statisticalApi = {
	get: () => {
		const url = `/home`;
		return axiosClient.get(url);
	}
}

export default statisticalApi;