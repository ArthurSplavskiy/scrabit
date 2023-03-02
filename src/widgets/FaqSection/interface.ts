import { IDType } from '@/shared/interfaces/shared';

export interface IFaqSection {
	title: string;
	subtitle: string;
	questions: {
		id: IDType;
		title: string;
		text: string;
		slug: string;
	}[];
}
