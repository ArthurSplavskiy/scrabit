import { IDType } from '@/shared/interfaces/shared';

export interface ICommonContacts {
	address: string;
	phone: string;
	contact_us_link: string;
}

export interface ICommonStaticPages {
	id: IDType;
	name: string;
	slug: string;
}

export interface ICommonPromoCars {
	id: IDType;
	name: string;
	slug: string;
}

export interface IUser {
	id: IDType;
	email: string;
	password: string;
}

export interface IUserProfile {
	userId: number;
	email: string;
	telegram: string;
	password: string;
	balance: number;
	//proxy: IProxy[];
}
