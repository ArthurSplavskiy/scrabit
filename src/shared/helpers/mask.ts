export default class Mask {
	phoneMask = <T>(str: T) => {
		if (typeof str !== 'string') return false;
		let x: any = str.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,4})/);
		return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
	};

	nameMask = (str: string) => {
		let value = str.replace(/[^-\p{L}'` ]/gimu, '');
		return value.replace(/^.{12}$/, value.slice(0, 11));
	};
}
