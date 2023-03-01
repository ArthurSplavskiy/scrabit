import { ChangeEvent, useRef, useState } from 'react';

type tUseCheckBoxGroupe = {
	isRequired?: boolean;
	emptyErrText?: string;
	initValue?: Array<string | number>;
};

export const useCheckBoxGroupe = (props?: tUseCheckBoxGroupe) => {
	const selectedCheckBoxes = useRef<Array<string | number>>(props?.initValue || []);
	const [errors, setErrors] = useState<string[]>([]);
	const [isDirty, setIsDirty] = useState(false);
	const initValue = props?.initValue || [];
	const emptyErr = props?.emptyErrText ? props?.emptyErrText : "This field can't be empty";

	const checkBoxGroupeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		if (checked) {
			selectedCheckBoxes.current.push(value);
		} else {
			const filtered = selectedCheckBoxes.current.filter((item) => item.toString() !== value);
			selectedCheckBoxes.current = filtered;
		}

		checkValidity();
	};

	const checkValidity = () => {
		if (props?.isRequired && !selectedCheckBoxes.current.length) {
			setErrors([emptyErr]);
			!isDirty && setIsDirty(true);
			return false;
		} else {
			errors.length && setErrors([]);
			return true;
		}
	};

	return {
		selectedCheckBoxes,
		checkBoxGroupeOnChange,
		checkValidity,
		errors,
		initValue
	};
};
