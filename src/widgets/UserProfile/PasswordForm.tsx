import { FC, FormEvent, useEffect, useState } from 'react';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useProfile } from '@/app/context/User/UserContext';
import { getApiError, notValidForm } from '@/shared/helpers/index';
import { useDevice } from '@/app/context/Device/DeviceContext';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

interface Props {
	isActive: boolean;
}

export const PasswordForm: FC<Props> = ({ isActive }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isMobile } = useDevice();
	const { user, setUser } = useProfile();

	const formData = {
		password: useTextInput()
	};

	// const onSubmit = async (event: FormEvent) => {
	// 	event.preventDefault();
	// 	if (notValidForm(formData)) return;

	// 	try {
	// 		setIsLoading(true);
	// 		const data = {
	// 			password: formData.password.value || ''
	// 		};
	// 		if (!user) return;
	// 		// const res = await api.account.updateProfile({ ...user, telegram: data.telegram });
	// 		// const resData = JSON.parse(res.config.data);
	// 		// setUser(resData);
	// 	} catch (error) {
	// 		const { msg } = getApiError(error, formData);
	// 		// setError({ type: 'error', text: msg || 'Error !' });
	// 		// openError();
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	useEffect(() => {
		if (user?.password) formData.password.setValue(user.password);
	}, [user]);

	return (
		<div
			className={styles.formWidget}
			style={isActive ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
			<div className={styles.formWidgetEdit}>
				<div className={styles.formWidgetEditTitle}>
					<h3>password</h3>
					<Link to='/settings/change-password'>
						<Icon icon='edit' />
					</Link>
				</div>
			</div>
			<div className={styles.formWidgetBody} style={{ pointerEvents: 'none' }}>
				<InputField
					{...formData.password.inputProps}
					type='text'
					disabled
					value={formData.password.value}
					label={'password'}
				/>
			</div>
		</div>
	);
};
