import { ISelectOption } from '@/shared/interfaces/shared';

export interface IBuyerFormData {
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	company_name: string;
	city_name: string;
	state: string;
	industry: string;
	goal: string;
	license: string;
	feedback: string;
	file: any;
}

export interface IBuyerApiData {
	state: ISelectOption[];
	industry: ISelectOption[];
	goal: ISelectOption[];
	license: ISelectOption[];
	feedback: ISelectOption[];
}
