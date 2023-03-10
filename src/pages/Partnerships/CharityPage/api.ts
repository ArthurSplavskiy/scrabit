import axios from '@/app/common/api/axios';

const api = {
	getCharityPageData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/charity_page');
		return res.data;
	}
};

export default api;
