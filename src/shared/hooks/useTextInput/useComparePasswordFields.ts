import { useEffect } from 'react';
import { useTextInputReturn } from './useTextInput';

type tUseComparePasswordFields = {
	pass: useTextInputReturn;
	confirmPass: useTextInputReturn;
};

export const useComparePasswordFields = ({ pass, confirmPass }: tUseComparePasswordFields) => {
	useEffect(() => {
		confirmPass.setIsEqualTo(pass.value);
	}, [pass]); // eslint-disable-line

	useEffect(() => {
		//pass.setIsEqualTo(confirmPass.value);
	}, [confirmPass]); // eslint-disable-line
};
