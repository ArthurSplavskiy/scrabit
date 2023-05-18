import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getCalculateOfferCost: async () => {
		const res = await axios.get(API_URL + '/calculate_offer_cost');
		return res.data;
	}
};

export default api;
