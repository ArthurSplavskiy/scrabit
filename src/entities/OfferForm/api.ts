import axios from '@/app/common/api/axios';

const api = {
	getOfferFormData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/offer_form_data');
		return res.data;
	}
};

export default api;
