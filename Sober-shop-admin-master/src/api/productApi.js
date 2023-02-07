import axiosClient from './axiosClient';

const productApi = {
	getAll: ({ page, limit , name}) => {
		const url = `/product?page=${page}&limit=${limit}&name=${name}`;
		return axiosClient.get(url);
	},
	getAllCate: () => {
		const url = `/category`;
		return axiosClient.get(url);
	},
	delete: (id) => {
		const url = `product/${id}`;
		return axiosClient.delete(url);
	},
	create: (formData) => {
		const url = `/product`;
		return axiosClient.post(url, formData);
	},
	update: (id, data) => {
		const url = `/product/${id}`;
		return axiosClient.put(url, data);
	},
	searchByCategory: (categoryId) => {
		const url = `/product?category_id=${categoryId}`;
		return axiosClient.get(url);
	}
}

export default productApi;