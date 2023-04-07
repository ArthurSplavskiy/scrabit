import { FC, FormEvent, useEffect, useState } from 'react';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useProfile } from '@/app/context/User/UserContext';
import { getApiError, notValidForm } from '@/shared/helpers/index';
import { useDevice } from '@/app/context/Device/DeviceContext';
import styles from './index.module.scss';

interface Props {
	setFieldIsEdit: (p: boolean) => void;
	isActive: boolean;
}

export const AccountForm: FC<Props> = ({ setFieldIsEdit, isActive }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const { isMobile } = useDevice();
	const { user, setUser } = useProfile();

	const formData = {
		first_name: useTextInput(),
		last_name: useTextInput(),
		email: useTextInput({ validators: ['email'] })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data = {
				first_name: formData.first_name.value || ''
			};
			if (!user) return;
			// const res = await api.account.updateProfile({ ...user, telegram: data.telegram });
			// const resData = JSON.parse(res.config.data);
			// setUser(resData);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			// setError({ type: 'error', text: msg || 'Error !' });
			// openError();
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (user?.first_name) formData.first_name.setValue(user.first_name);
		if (user?.last_name) formData.last_name.setValue(user.last_name);
		if (user?.email) formData.email.setValue(user.email);
	}, [user]);

	useEffect(() => {
		if (!isEdit) formData.first_name.setErrors([]);
		if (!isEdit) formData.last_name.setErrors([]);
		if (!isEdit) formData.email.setErrors([]);
	}, [isEdit]);

	return (
		<form
			onSubmit={onSubmit}
			className={styles.formWidget}
			style={isActive && !isEdit ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
			<div className={styles.formWidgetEdit}>
				<div className={styles.formWidgetEditTitle}>
					<h3 style={{ color: isEdit ? '#1E1E21' : '' }}>Account</h3>
					{!isEdit && (
						<button
							type='button'
							onClick={() => {
								setIsEdit(true);
								setFieldIsEdit(true);
							}}>
							<Icon icon='edit' />
						</button>
					)}
				</div>
				{!isMobile && (
					<>
						{isEdit && (
							<div className={styles.formWidgetEditControls}>
								<Button
									type='button'
									customType='text-underline'
									onClick={() => {
										setIsEdit(false);
										setFieldIsEdit(false);
									}}>
									cancel
								</Button>
								<Button type='submit' loading={isLoading}>
									SAVE changes
								</Button>
							</div>
						)}
					</>
				)}
			</div>
			<div className={styles.formWidgetBody} style={{ pointerEvents: isEdit ? 'all' : 'none' }}>
				<InputField
					{...formData.first_name.inputProps}
					type='text'
					disabled={!isEdit}
					value={formData.first_name.value}
					label={'First Name'}
					errors={formData.first_name.errors}
				/>
				<InputField
					{...formData.last_name.inputProps}
					type='text'
					disabled={!isEdit}
					value={formData.last_name.value}
					label={'Last Name'}
					errors={formData.last_name.errors}
				/>
				<InputField
					{...formData.email.inputProps}
					type='text'
					disabled={!isEdit}
					value={formData.email.value}
					label={'Email'}
					errors={formData.email.errors}
				/>
			</div>
			{isMobile && (
				<>
					{isEdit && (
						<div className={styles.formWidgetEditControls}>
							<Button
								type='button'
								customType='text-underline'
								onClick={() => {
									setIsEdit(false);
									setFieldIsEdit(false);
								}}>
								cancel
							</Button>
							<Button type='submit' loading={isLoading} width='fullWidth'>
								SAVE changes
							</Button>
						</div>
					)}
				</>
			)}
		</form>
	);
};
