import { ISelectOption } from '@/shared/interfaces/shared';

export interface ICharityFormData {
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	company_name: string;
	city_name: string;
	state: string;
	website_url: string;
	platform: string;
	is_your_organization: string;
	file: any;
}

export interface ICharityApiData {
	state: ISelectOption[];
	platform: ISelectOption[];
}
