export interface IOfferData {
	stepIndex: number;
	carForm: {
		year: string;
		make: string;
		model: string;
		submodel: string;
		zipcode: string;
		phoneNumber: string;
		customerName: string;
		isFilled: boolean;
	};
	vehicleForm: {
		mileage: string;
		drive: string;
		wheels: string;
		title: string;
		isFilled: boolean;
	};
	detailsForm: {
		car_condition: string;
		wheels: string;
		damage: string;
		flood: string;
		converters: string;
		damageZone: number[];
		isFilled: boolean;
	};
	photos: never[];
	titleForm: {
		title: string;
		vim: string;
		issue: string;
		color: string;
		isFilled: boolean;
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
		isFilled: boolean;
	};
	paymentForm: {
		name: string;
		time: string;
		date: string;
		isFilled: boolean;
	};
	isDone: boolean;
	detailsStepCheck: boolean;
	calculateOfferCost: boolean;
}

export const initialOfferData: IOfferData = {
	stepIndex: 0,
	carForm: {
		year: '',
		make: '',
		model: '',
		submodel: '',
		zipcode: '',
		phoneNumber: '',
		customerName: '',
		isFilled: false
	},
	vehicleForm: {
		mileage: '',
		drive: '',
		wheels: '',
		title: '',
		isFilled: false
	},
	detailsForm: {
		car_condition: '',
		wheels: '',
		damage: '',
		flood: '',
		converters: '',
		damageZone: [],
		isFilled: false
	},
	photos: [],
	titleForm: {
		title: '',
		vim: '',
		issue: '',
		color: '',
		isFilled: false
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
		text_me_check: false,
		isFilled: false
	},
	paymentForm: {
		name: '',
		time: '',
		date: '',
		isFilled: false
	},
	isDone: false,
	detailsStepCheck: false,
	calculateOfferCost: false
};

export interface IOfferDataResponseInfo {
	price: string;
}

export const initialOfferDataResponseInfo: IOfferDataResponseInfo = {
	price: ''
};
