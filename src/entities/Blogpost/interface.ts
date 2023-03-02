import { IDType } from '@/shared/interfaces/shared';

export interface IBlogPost {
	id: IDType;
	slug: string;
	image: string;
	title: string;
	createdAt: string;
	tag: string;
}
