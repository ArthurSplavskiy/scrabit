import { FormField, ISelectOption } from '@/shared/interfaces/shared';

export interface IBuyerFormData {
	first_name: FormField<string>;
	last_name: FormField<string>;
	email: FormField<string>;
	phone_number: FormField<string>;
	company_name: FormField<string>;
	city_name: FormField<string>;
	state: FormField<string>;
	industry: FormField<string>;
	goal: FormField<string>;
	license: FormField<string>;
	feedback: FormField<string>;
	file: FormField<any>;
}

export interface IBuyerApiData {
	state: ISelectOption[];
	industry: ISelectOption[];
	goal: ISelectOption[];
	license: ISelectOption[];
	feedback: ISelectOption[];
}
