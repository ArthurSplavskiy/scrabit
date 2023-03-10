import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import { FileUploader } from '@/shared/ui/FormComponents/FileUploader';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import classNames from 'classnames';
import { FC } from 'react';
import styles from '../index.module.scss';
import { ICharityApiData } from './interface';
import { useCharityForm } from './useCharityForm';

interface Props {
	form: ICharityApiData;
}

export const CharityForm: FC<Props> = ({ form }) => {
	const {
		formData,
		onSubmit,
		isLoading,
		success,
		fileList,
		handleFileChange,
		handleRadioChange,
		radioStateError
	} = useCharityForm();
	const { isMobile } = useDevice();

	return (
		<>
			{success ? (
				<p className={classNames(styles.FormSuccess, 'text-24-18')}>
					A representative from our Buyer team will reach out to you shortly to review your
					application and talk about next steps. Looking forward to it!
				</p>
			) : (
				<form className={styles.Form} onSubmit={onSubmit}>
					<h3 className={classNames(styles.FormTitle, 'text-24-14')}>contact</h3>
					<fieldset className={styles.FormFieldset}>
						<InputField
							{...formData.first_name.inputProps}
							errors={formData.first_name.errors}
							label='First name'
							placeholder='Enter first name'
						/>
						<InputField
							{...formData.last_name.inputProps}
							errors={formData.last_name.errors}
							label='Last name'
							placeholder='Enter last name'
						/>
						<InputField
							{...formData.email.inputProps}
							errors={formData.email.errors}
							label='E-mail'
							placeholder='Enter e-mail'
						/>
						<InputField
							{...formData.phone_number.inputProps}
							errors={formData.phone_number.errors}
							label='Phone number'
							placeholder='(____) ____-______'
						/>
					</fieldset>
					<h3 className={classNames(styles.FormTitle, 'text-24-14')}>company</h3>
					<fieldset className={classNames(styles.FormFieldset, styles.FormFieldsetSecond)}>
						<InputField
							{...formData.company_name.inputProps}
							errors={formData.company_name.errors}
							label='Company name'
							placeholder='Enter company name'
						/>
						<InputField
							{...formData.city_name.inputProps}
							errors={formData.city_name.errors}
							label='City'
							placeholder='Enter city'
						/>
						<ReactSelect
							errors={formData.state.errors}
							onChange={formData.state.inputProps.onChange}
							options={form.state}
							label={'State'}
							placeholder='Choose state'
						/>
						<InputField
							{...formData.url.inputProps}
							errors={formData.url.errors}
							label='Website URL'
							placeholder='Add a link'
							className='fullColumn'
						/>
						<div
							className={classNames(styles.radioBoxGroup, 'fullColumn', {
								[styles.hasError]: radioStateError
							})}>
							<h3 className={classNames(styles.FormTitle, 'text-24-14')}>
								{' '}
								Is your organization a 501 (c) 3?
							</h3>
							<div className={styles.radioBoxesGroup}>
								<div className={styles.radioBoxes}>
									<div className={styles.radioBox}>
										<input
											type='radio'
											name='radio'
											id='radio-1'
											onChange={handleRadioChange}
											value={'yes'}
										/>
										<label htmlFor='radio-1'>yes</label>
									</div>
									<div className={styles.radioBox}>
										<input
											type='radio'
											name='radio'
											id='radio-2'
											onChange={handleRadioChange}
											value={'no'}
										/>
										<label htmlFor='radio-2'>no</label>
									</div>
									<div className={styles.radioBox}>
										<input
											type='radio'
											name='radio'
											id='radio-3'
											onChange={handleRadioChange}
											value={'other'}
										/>
										<label htmlFor='radio-3'>other</label>
									</div>
								</div>
								<span className={styles.errorOops}>Oops. Missed one.</span>
							</div>
						</div>
						<div className='fullColumn'>
							<ReactSelect
								errors={formData.platform.errors}
								onChange={formData.platform.inputProps.onChange}
								options={form.platform}
								label={'Where did you hear about us?'}
								placeholder='Choose a platform'
							/>
						</div>
					</fieldset>
					<fieldset className={styles.FormControls}>
						<div className={styles.FormLicense}>
							<div className={styles.FormUpload}>
								<h3 className={classNames(styles.FormTitle, 'text-24-14')}>
									license or permit verification (optional)
								</h3>
								<FileUploader onUploadFile={handleFileChange} uploadFileValue={fileList} />
							</div>
							<p className='text-16-14'>
								Share a copy of your dealer, salvage, dismantler, scrap or other applicable liecnse
								to apply faster. If you don’t have a copy close by, no worries - you can always
								submit it later
							</p>
						</div>
						<Button
							size={isMobile ? 'middle' : 'big'}
							width={isMobile ? 'fullWidth' : undefined}
							loading={isLoading}>
							submit application
						</Button>
					</fieldset>
				</form>
			)}
		</>
	);
};
