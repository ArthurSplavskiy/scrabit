export interface IStepObj {
	id: number;
	name: string;
	title: string;
	subtitle: string;
	optional: boolean;
	form: React.ReactNode;
}

export interface IStep {
	count: number;
	steps: IStepObj[];
}

export const initialStep: IStep = {
	count: 0,
	steps: [
		{
			id: 0,
			name: '',
			title: '',
			subtitle: '',
			optional: false,
			form: null
		}
	]
};
