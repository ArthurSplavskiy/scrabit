import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getSupplierPageData: async () => {
		const res = await axios.get(API_URL + '/supplier_page');
		return res.data;
	}
};

export default api;
