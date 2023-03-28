import axios, { API_URL } from '../axios';

const endpoints = {
	getMenu: async () => {
		const res = await axios.get(API_URL + '/menu');
		return res.data;
	},
	getContacts: async () => {
		const res = await axios.get(API_URL + '/contacts');
		return res.data;
	},
	getStaticPages: async () => {
		const res = await axios.get(API_URL + '/static_pages');
		return res.data;
	},
	getPromoCars: async () => {
		const res = await axios.get(API_URL + '/promo_cars');
		return res.data;
	}
};

export default endpoints;
