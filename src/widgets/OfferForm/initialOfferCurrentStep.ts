import { IFormComponent } from '@/shared/interfaces/shared';

export interface IOfferCurrentStep {
	title: string;
	price: string;
	prev_step: string;
	next_step: string;
	form_identifier: string;
	form_id: number;
	form_fields: IFormComponent[];
	offer_id?: string;
}

export const initialOfferCurrentStep: IOfferCurrentStep[] = [
	{
		title: '',
		price: '',
		prev_step: '',
		next_step: '',
		form_identifier: '',
		form_id: 0,
		form_fields: []
	}
];
