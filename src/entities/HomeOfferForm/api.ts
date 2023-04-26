import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getOfferFormData: async () => {
		const res = await axios.get(API_URL + '/offer_form_data');
		return res.data;
	}
};

export default api;
