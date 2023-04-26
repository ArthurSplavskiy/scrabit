import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import { FileUploader } from '@/shared/ui/FormComponents/FileUploader';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import classNames from 'classnames';
import { FC } from 'react';
import styles from '../index.module.scss';
import { IBuyerApiData } from './interface';
import { useBuyerForm } from './useBuyerForm';

interface Props {
	form: IBuyerApiData;
}

export const BuyerForm: FC<Props> = ({ form }) => {
	const { formData, onSubmit, isLoading, success, fileList, handleFileChange } = useBuyerForm();
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
						<ReactSelect
							errors={formData.industry.errors}
							onChange={formData.industry.inputProps.onChange}
							options={form.industry}
							label={'Industry'}
							placeholder='Enter industry'
						/>
						<ReactSelect
							errors={formData.goal.errors}
							onChange={formData.goal.inputProps.onChange}
							options={form.goal}
							label={'Goal'}
							placeholder='Choose your goal'
						/>
						<ReactSelect
							errors={formData.license.errors}
							onChange={formData.license.inputProps.onChange}
							options={form.license}
							label={'License'}
							placeholder='Choose license'
						/>
						<ReactSelect
							errors={formData.feedback.errors}
							onChange={formData.feedback.inputProps.onChange}
							options={form.feedback}
							label={'Where did you hear about us?'}
							placeholder='Choose feedback'
						/>
					</fieldset>
					<fieldset className={styles.FormControls}>
						<div className={styles.FormLicense}>
							<div className={styles.FormUpload}>
								<h3 className={classNames(styles.FormTitle, 'text-24-14')}>
									license or permit verification (optional)
								</h3>
								{/* <Button
									type='button'
									customType='text-underline'
									iconName='upload'
									iconPosition='right'
									onUploadFile={(e: any) => setFile(e.target)}
									uploadFile={file?.files}
									uploadFileValue={file?.value}>
									upload files
								</Button> */}
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
