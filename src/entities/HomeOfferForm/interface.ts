import { FormField } from '@/shared/interfaces/shared';

export interface IOfferFormData {
	car_year: FormField<number | string>;
	car_make: FormField<string>;
	car_model: FormField<string>;
	car_submodel: FormField<string>;
	car_zipcode: FormField<string>;
	phone_number: FormField<string>;
	customer_name: FormField<string>;
}
