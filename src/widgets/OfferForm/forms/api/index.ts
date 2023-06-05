import axios, { API_URL } from '@/app/common/api/axios';
import { IVehicleFormData } from '../VehicleForm';
import { IImagesFormData } from '../PhotosForm';
import { IDetailsFormData } from '../DetailsForm';
import { ITitleFormData } from '../TitleForm';
import { ILocationFormData } from '../LocationForm';
import { IPaymentFormData } from '../PaymentForm';

interface IBaseFormData<T> {
	next_step?: string;
	form_identifier: string;
	form_id: number;
	form_data: T;
}

const api = {
	postVehicleForm: async (data: IVehicleFormData) => {
		const prepareData: IBaseFormData<IVehicleFormData> = {
			next_step: 'third',
			form_identifier: 'offer',
			form_id: 2,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	},
	postImagesForm: async (data: IImagesFormData) => {
		const prepareData: IBaseFormData<IImagesFormData> = {
			next_step: 'fourth',
			form_identifier: 'offer',
			form_id: 2,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	},
	postDetailsForm: async (data: IDetailsFormData) => {
		const prepareData: IBaseFormData<IDetailsFormData> = {
			next_step: 'fifth',
			form_identifier: 'offer',
			form_id: 2,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	},
	postTitleForm: async (data: ITitleFormData) => {
		const prepareData: IBaseFormData<ITitleFormData> = {
			next_step: 'sixth',
			form_identifier: 'offer',
			form_id: 2,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	},
	postLocationForm: async (data: ILocationFormData) => {
		const prepareData: IBaseFormData<ILocationFormData> = {
			next_step: 'seventh',
			form_identifier: 'offer',
			form_id: 2,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	},
	postPaymentForm: async (data: IPaymentFormData) => {
		const prepareData: IBaseFormData<IPaymentFormData> = {
			form_identifier: 'offer',
			form_id: 2,
			form_data: data
		};
		const res = await axios.post(API_URL + '/form_handler', prepareData);
		return res.data;
	}
};

export default api;
