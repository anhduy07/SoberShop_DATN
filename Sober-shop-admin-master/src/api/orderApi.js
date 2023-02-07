import axiosClient from './axiosClient';

const orderApi = {
	getAll: ({ page, limit }) => {
		const url = `/order/admin?page=${page}&limit=${limit}`;
		return axiosClient.get(url);
	},
	update: (id, data) => {
		const url = `/order/admin/${id}`;
		return axiosClient.patch(url, data);
	}
}

export default orderApi;