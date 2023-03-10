import axios from '@/app/common/api/axios';

const api = {
	getSupplierPageData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/supplier_page');
		return res.data;
	}
};

export default api;
