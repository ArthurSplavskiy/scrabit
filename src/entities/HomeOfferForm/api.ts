import axios, { API_URL } from '@/app/common/api/axios';
import { IOfferFormData } from './interface';

interface IPostOfferFormData {
	next_step: string;
	form_identifier: string;
	form_id: number;
	form_data: IOfferFormData;
}

const api = {
	getOfferFormData: async () => {
		const res = await axios.get(API_URL + '/offer_form_data');
		return res.data;
	},
	postOfferFormData: async (data: IOfferFormData) => {
		const prepareData: IPostOfferFormData = {
			next_step: 'second',
			form_identifier: 'offer',
			form_id: 2,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	},
	getCarModel: async (car: string) => {
		const res = await axios.get(API_URL + `/get_car_model?car=${car}`);
		return res.data;
	},
	getCarSubmodel: async (car: string, model: string) => {
		const res = await axios.get(API_URL + `/get_car_submodel?car=${car}&model=${model}`);
		return res.data;
	},
	getCarsByYear: async (year: string) => {
		const res = await axios.get(API_URL + `/get_car_make?year=${year}`);
		return res.data;
	}
};

export default api;
