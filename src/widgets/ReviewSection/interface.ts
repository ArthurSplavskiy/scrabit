import { IDType } from '@/shared/interfaces/shared';

export interface IReviewSection {
	id: IDType;
	rating: number;
	author: string;
	text: string;
}
