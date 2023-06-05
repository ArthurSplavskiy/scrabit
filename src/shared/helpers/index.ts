import { IFormComponentSelect } from '../interfaces/shared';

export const dataOrEmptyArray = (data: any[] | undefined | null) => (data ? data : []);

export function notValidForm<T>(data: T, scrollToFirstError = false) {
	//@ts-ignore
	const invalidFields = Object.entries(data).filter(([key, value]) => !value?.checkValidity());

	if (!!invalidFields?.length && scrollToFirstError) {
		const firstInvalidKey = invalidFields?.[0]?.[0];
		const firstInvalidInput = document.querySelector(`#${firstInvalidKey}`);
		firstInvalidInput?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'start'
		});
	}

	return invalidFields.length > 0;
}

export const getApiError = (error: any, formData?: any) => {
	const errors = error?.response?.data?.errors;
	const isErrors = errors && !!Object.keys(errors).length;

	isErrors &&
		Object.entries(errors).forEach(([key, value]) => {
			formData?.[key]?.setErrors(value as string[]);
		});

	return {
		//msg: error?.response?.data?.message,
		msg: error?.response?.data,
		errors: isErrors ? errors : null
	};
};

export const easeOutElastic = (t: number, b: number, c: number, d: number) => {
	var s = 1.70158;
	var p = 0;
	var a = c;
	if (t == 0) return b;
	if ((t /= d) == 1) return b + c;
	if (!p) p = d * 0.3;
	if (a < Math.abs(c)) {
		a = c;
		var s = p / 4;
	} else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
	return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
};

export const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatter = new Intl.NumberFormat('uk', {
	style: 'unit',
	unit: 'day',
	unitDisplay: 'long'
});

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour12: false
});

export const withZero = (id: number) => (id < 10 ? '0' + id : id);

export function getFileSize(number: number) {
	if (number < 1024) {
		return `${number} bytes`;
	} else if (number >= 1024 && number < 1048576) {
		return `${(number / 1024).toFixed(1)} KB`;
	} else if (number >= 1048576) {
		return `${(number / 1048576).toFixed(1)} MB`;
	}
}

export const normalizeSelectData = (data: IFormComponentSelect | undefined) => {
	if (!data) return [{ label: 'option', value: 'option' }];
	const valueArray = data.value.split('$');
	return valueArray.map((item) => ({ label: String(item), value: String(item).toLowerCase() }));
};

export const setFieldId = (arr: number[] | undefined, idx: number): number => {
	return arr?.[idx] || 0;
};
