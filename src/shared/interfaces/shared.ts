export type IDType = number | string;

export interface IEventError {
	type: string;
	text: string;
}

export interface ISelectOption {
	id?: IDType;
	value: string;
	label: string;
}

export interface ITitleText {
	id?: IDType;
	title: string;
	text: string;
}
