export interface IOfferData {
	stepIndex: number;
	vehicleForm: {
		mileage: string;
		drive: string;
		wheels: string;
		title: string;
	};
	detailsForm: {
		car_condition: string;
		wheels: string;
		damage: string;
		flood: string;
		converters: string;
		damageZone: number[];
	};
	photos: never[];
	titleForm: {
		title: string;
		vim: string;
		issue: string;
		color: string;
	};
	locationForm: {
		addressType: string;
		streetAddress: string;
		city: string;
		state: string;
		zipcode: string;
		phone: string;
		business_name?: string;
		business_phone?: string;
		text_me_check: boolean;
	};
	paymentForm: {
		name: string;
		time: string;
		date: string;
	};
	isDone: boolean;
}

export const initialOfferData: IOfferData = {
	stepIndex: 0,
	vehicleForm: {
		mileage: '',
		drive: '',
		wheels: '',
		title: ''
	},
	detailsForm: {
		car_condition: '',
		wheels: '',
		damage: '',
		flood: '',
		converters: '',
		damageZone: []
	},
	photos: [],
	titleForm: {
		title: '',
		vim: '',
		issue: '',
		color: ''
	},
	locationForm: {
		addressType: '',
		streetAddress: '',
		city: '',
		state: '',
		zipcode: '',
		phone: '',
		business_name: '',
		business_phone: '',
		text_me_check: false
	},
	paymentForm: {
		name: '',
		time: '',
		date: ''
	},
	isDone: false
};

export interface IOfferDataResponseInfo {
	price: string;
}

export const initialOfferDataResponseInfo: IOfferDataResponseInfo = {
	price: ''
};
