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
	email: string;
	password: string;
	active_since: string;
	car_status: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	notifications_enable: boolean;
}
