export interface IOfferData {
	vehicleForm: {
		mileage: string;
		drive: string;
		wheels: string;
		title: string;
	};
}

export const initialOfferData: IOfferData = {
	vehicleForm: {
		mileage: '',
		drive: '',
		wheels: '',
		title: ''
	}
};
