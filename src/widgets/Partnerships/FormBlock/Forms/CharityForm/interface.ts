import { FormField, ISelectOption } from '@/shared/interfaces/shared';

export interface ICharityFormData {
	first_name: FormField<string>;
	last_name: FormField<string>;
	email: FormField<string>;
	phone_number: FormField<string>;
	company_name: FormField<string>;
	city_name: FormField<string>;
	state: FormField<string>;
	website_url: FormField<string>;
	platform: FormField<string>;
	is_your_organization: FormField<string>;
	file: FormField<any>;
}

export interface ICharityApiData {
	state: ISelectOption[];
	platform: ISelectOption[];
}
