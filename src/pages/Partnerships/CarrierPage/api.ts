import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getCarrierPageData: async () => {
		const res = await axios.get(API_URL + '/carrier_page');
		return res.data;
	}
};

export default api;
