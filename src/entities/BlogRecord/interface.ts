import { IDType } from '@/shared/interfaces/shared';

export interface IBlogRecord {
	id: IDType;
	slug: string;
	image: string;
	title: string;
	createdAt: string;
	tag: ITag;
	fullText?: string;
}

export interface ITag {
	slug: string;
	name: string;
}
