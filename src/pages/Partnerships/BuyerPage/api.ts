import axios from '@/app/common/api/axios';

const api = {
	getBuyerPageData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/buyer_page');
		return res.data;
	}
};

export default api;
