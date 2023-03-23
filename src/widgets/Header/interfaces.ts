import { IDType } from '@/shared/interfaces/shared';

export interface IMenu {
	id: IDType;
	name: string;
	slug: string;
	anchor: boolean;
	sublist?: {
		id: IDType;
		name: string;
		link: string;
	}[];
}
