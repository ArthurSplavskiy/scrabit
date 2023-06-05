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

export interface IFormComponent {
	id: number;
	component: 'select' | 'input';
	items?: IFormComponentSelect[];
	name: string;
	placeholder: string;
	required: 0 | 1;
	step_name: FormStepName;
	type: FormComponentType;
}

export type IFormComponentSelect = {
	selected: 0 | 1;
	label: string;
	value: string;
};

export type FormStepName = 'first' | 'second';

export type FormComponentType = 'select' | 'text';

export type FormField<T> = {
	id: string | number;
	value: T;
};
