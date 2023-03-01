// import { iZipData } from 'interfaces/users';

export class Validation {
	constructor() {}

	/**
	 * Validates phone number
	 * @param {string} value - any value to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */
	alphanumericValidation = <T>(value: T) => {
		if (typeof value !== 'string') return false;
		return Boolean(value.match(/^[a-z0-9]+$/i));
	};

	/**
	 * Validates phone number
	 * @param {string} value - phone number to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */
	phoneValidation = <T>(value: T) => {
		const newPhone = String(value).replace(/\D/g, '');
		return newPhone.length >= 10;
	};
	/**
	 * Validates name
	 * @param {string} value - name to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */
	nameValidation = <T>(value: T) => {
		if (typeof value !== 'string') return false;
		const lettersRx = new RegExp(/[^\p{L}'`\s-]+/gmu);
		const twoSpacesRx = new RegExp(/\s\s+/gm);
		return !lettersRx.test(value) && !twoSpacesRx.test(value) && value.length >= 2;
	};

	/**
	 * Validates name
	 * @param {string} value - first param to validate
	 * @param {string} secondValue - second param to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */

	compareFieldValidation = <T>(value: T, secondValue: T): boolean => {
		return value === secondValue;
	};

	/**
	 * Validates name
	 * @param {string | number | undefined} value - birth year to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */
	birthYearValidation = <T>(value: T): boolean => {
		if (String(value).length !== 4) return false;
		return !(Number(value) < 1900 || Number(value) > new Date().getFullYear());
	};

	/**
	 * Validates email
	 * @param {string} value - email to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */
	emailValidation = <T>(value: T) => {
		if (typeof value !== 'string') return false;
		const re = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		return re.test(value);
	};

	/**
	 * Validates name
	 * @param {string} value - password to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */

	passwordValidation = <T>(value: T) => {
		if (typeof value !== 'string') return false;

		const hasDigits = new RegExp(/\d/gim).test(value);
		const hasUppercaseLetters = new RegExp(/\p{Lu}/gmu).test(value);
		const hasLowerLetters = new RegExp(/\p{Ll}/gmu).test(value);
		const hasSpecialChars = new RegExp(/[^\p{L}\d]/gmu).test(value);
		const sufficientLength = 8;

		return (
			hasDigits &&
			hasUppercaseLetters &&
			hasLowerLetters &&
			hasSpecialChars &&
			value.length >= sufficientLength
		);
	};

	/**
	 * Validates name
	 * @param {string} value - zipcode to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */

	zipcodeValidation = <T>(value: T): boolean => {
		if (typeof value !== 'string') return false;
		const re = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/g);
		return re.test(value);
	};

	/**
	 * Validates name
	 * @param {any} value - any value to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */

	checkEmptyValidation = <T>(value: T) => {
		const type = typeof value;
		let isValid = false;
		switch (type) {
			case 'boolean':
				isValid = true;
				break;
			case 'string':
				if (typeof value !== 'string') return false;
				isValid = value!.length > 0;
				break;
			case 'bigint':
				isValid = true;
				break;
			// FIXME
			// eslint-disable-next-line no-self-compare
			case 'number':
				isValid = value === value; // NaN is considered here to be kinda empty for number
				break;
			case 'object':
				if (value !== null && value !== undefined) isValid = Object.keys(value).length > 0;
				else if (Array.isArray(value)) isValid = value!.length > 0;
				break;
			case 'function':
				isValid = true;
				break;
			default:
				break;
		}
		return isValid;
	};

	/**
	 * Validates name
	 * @param {string} value - phone number to validate
	 * @param {boolean} required - status to validate to validate
	 * @param {number} maxLength - msx length to validate
	 * @return {boolean} - true in case if validation was successful, false in opposite
	 */

	isValidPhoneNumber = <T>({
		value,
		required = false,
		maxLength = 10
	}: {
		value: T;
		required?: boolean;
		maxLength?: number;
	}) => {
		if (typeof value !== 'string') return false;
		if (required && !value) return false;
		return !(value && value.replace(/\D/g, '').length < maxLength);
	};

	isValidZipCode = ({ value, zipcodeList }: { value: string; zipcodeList: any[] }) => {
		return Boolean(zipcodeList.find((key) => key.zip_code === value));
	};
}
