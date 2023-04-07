import { tInputFilter } from './inputsInterfaces';

/**
 * Function executes value filtration
 * @param {string} val - string to filter
 * @param {tInputFilter[]} filters - filtering fns array
 * @return {string} - filtered value
 */
export const applyFilters = (val: string, filters: tInputFilter[]) => {
	let filteredVal = val;
	filters.forEach((filter) => (filteredVal = filter(filteredVal)));
	return filteredVal;
};

export const prepareFiltersArr = (
	filters: Array<tInputFilter | keyof typeof inputFilters>
): tInputFilter[] => {
	const filtersArr: tInputFilter[] = [];
	filters.forEach((item) => {
		const filter = typeof item === 'string' ? inputFilters[item] : [item];
		// @ts-ignore
		filtersArr.push(...filter);
	});
	return filtersArr;
};

export const cutAndOnlyNumbers = (value: string, maxLength: number) => {
	let digitsValue = value.replace(/\D/g, '');

	let power = 100; // степінь, на яку треба розділити число
	let result =
		digitsValue.match(new RegExp(`\\d{1,${power.toString().length}}`, 'g'))?.join(' ') || '';

	if (maxLength) {
		const newValue = digitsValue.slice(0, maxLength);
		return newValue.match(new RegExp(`\\d{1,${power.toString().length}}`, 'g'))?.join(' ') || '';
	}
	return result;
};

export const nameFilter = (value: string): string => {
	return value.replace(/[^\p{L}\s'`-]/gmu, '').replace(/\s\s+/gm, ' ');
};

export const emailFilter = (value: string): string => {
	return value.replace(/[\<\>\(\)\[\]\\\{\}\,\;\:\"\s]/gm, '');
};

export const phoneFilter = <T>(value: T): string => {
	if (typeof value !== 'string') return '';
	// let x: any = str.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,4})/);
	// return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
	return value.replace(/^\[^7]+|^([0-9]{15}).*|[^0-9]+/g, '$1');
};

export const inputFilters = {
	name: [nameFilter],
	first_name: [nameFilter],
	last_name: [nameFilter],
	email: [emailFilter],
	phone: [phoneFilter],
	only_number: [cutAndOnlyNumbers]
};
