import axios from '@/app/common/api/axios';

const api = {
	getCarrierPageData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/carrier_page');
		return res.data;
	}
};

export default api;
