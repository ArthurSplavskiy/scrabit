import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getSellMyCarPageData: async () => {
		const res = await axios.get(API_URL + '/sell_my_car_page');
		return res.data;
	},
	getCashForJunkCarPageData: async () => {
		const res = await axios.get(API_URL + '/cash_for_junk_car_page');
		return res.data;
	},
	getCarPageData: async () => {
		const res = await axios.get(API_URL + '/car_page');
		return res.data;
	},
	getCars: async (page: number, limit: number) => {
		const res = await axios.get(API_URL + `/sold_cars?_page=${page}&_limit=${limit}`);
		return res.data;
	}
};

export default api;
