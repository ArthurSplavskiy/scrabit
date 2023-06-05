import axios, { API_URL } from '@/app/common/api/axios';
import { IBuyerFormData } from './BuyerForm/interface';
import { ICharityFormData } from './CharityForm/interface';

interface IBaseFormData<T> {
	form_identifier: string;
	form_id: number;
	form_data: T;
}

const api = {
	postBuyerForm: async (data: IBuyerFormData, formIdentifier: string) => {
		const prepareData: IBaseFormData<IBuyerFormData> = {
			form_identifier: formIdentifier,
			form_id: 1,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	},
	postCharityForm: async (data: ICharityFormData, formIdentifier: string) => {
		const prepareData: IBaseFormData<ICharityFormData> = {
			form_identifier: formIdentifier,
			form_id: 1,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	}
};

export default api;
