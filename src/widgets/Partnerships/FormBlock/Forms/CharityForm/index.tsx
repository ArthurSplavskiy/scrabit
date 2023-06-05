import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { useCharityForm } from './useCharityForm';
import { IFormComponent } from '@/shared/interfaces/shared';
import { getFileSize } from '@/shared/helpers';
import { FC } from 'react';
import ImageUploading from 'react-images-uploading';
import classNames from 'classnames';
import styles from '../index.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon';

interface Props {
	form: IFormComponent[]; //ICharityApiData;
	formIdentifier: string;
}

export const CharityForm: FC<Props> = ({ form, formIdentifier }) => {
	const {
		formData,
		onSubmit,
		isLoading,
		success,
		fileList,
		handleFileChange,
		handleRadioChange,
		radioStateError
	} = useCharityForm(form, formIdentifier);
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
							label={form?.[0]?.name || 'First name'}
							placeholder={form?.[0]?.placeholder || 'Enter first name'}
						/>
						<InputField
							{...formData.last_name.inputProps}
							errors={formData.last_name.errors}
							label={form?.[1]?.name || 'Last name'}
							placeholder={form?.[1]?.placeholder || 'Enter last name'}
						/>
						<InputField
							{...formData.email.inputProps}
							errors={formData.email.errors}
							label={form?.[2]?.name || 'E-mail'}
							placeholder={form?.[2]?.placeholder || 'Enter e-mail'}
						/>
						<InputField
							{...formData.phone_number.inputProps}
							errors={formData.phone_number.errors}
							label={form?.[3]?.name || 'Phone number'}
							placeholder={form?.[3]?.placeholder || '(____) ____-______'}
						/>
					</fieldset>
					<h3 className={classNames(styles.FormTitle, 'text-24-14')}>company</h3>
					<fieldset className={classNames(styles.FormFieldset, styles.FormFieldsetSecond)}>
						<InputField
							{...formData.company_name.inputProps}
							errors={formData.company_name.errors}
							label={form?.[4]?.name || 'Company name'}
							placeholder={form?.[4]?.placeholder || 'Enter company name'}
						/>
						<InputField
							{...formData.city_name.inputProps}
							errors={formData.city_name.errors}
							label={form?.[5]?.name || 'City'}
							placeholder={form?.[5]?.placeholder || 'Enter city'}
						/>
						<ReactSelect
							errors={formData.state.errors}
							onChange={formData.state.inputProps.onChange}
							options={form?.[6]?.items}
							label={form?.[6]?.name || 'State'}
							placeholder={form?.[6]?.placeholder || 'Choose state'}
						/>
						<InputField
							{...formData.url.inputProps}
							errors={formData.url.errors}
							label={form?.[7]?.name || 'Website URL'}
							placeholder={form?.[7]?.placeholder || 'Add a link'}
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
									{form?.[8].items?.map((checkbox, index) => (
										<div key={index} className={styles.radioBox}>
											<input
												type='radio'
												name='radio'
												id={`radio-${index}`}
												onChange={handleRadioChange}
												value={checkbox.value.toLowerCase()}
											/>
											<label htmlFor='radio-1'>{checkbox.label.toLowerCase()}</label>
										</div>
									))}
								</div>
								<span className={styles.errorOops}>Oops. Missed one.</span>
							</div>
						</div>
						<div className='fullColumn'>
							<ReactSelect
								errors={formData.platform.errors}
								onChange={formData.platform.inputProps.onChange}
								options={form?.[9]?.items}
								label={form?.[9]?.name || 'Where did you hear about us?'}
								placeholder={form?.[9]?.placeholder || 'Choose a platform'}
							/>
						</div>
					</fieldset>
					<fieldset className={styles.FormControls}>
						<div className={styles.FormLicense}>
							<div className={styles.FormUpload}>
								<h3 className={classNames(styles.FormTitle, 'text-24-14')}>
									license or permit verification (optional)
								</h3>
								<ImageUploading
									value={fileList}
									onChange={handleFileChange}
									maxNumber={1}
									acceptType={['jpg', 'jpeg', 'png']}>
									{({
										imageList,
										onImageUpload,
										onImageRemoveAll,
										onImageUpdate,
										onImageRemove,
										isDragging,
										dragProps,
										errors
									}) => (
										<div className={styles.uploader}>
											<div className={styles.uploaderZone}>
												<div className={styles.loadFiles}>
													{imageList.map((image: any, index) => (
														<div className={styles.loadFile} key={index}>
															<div>
																<span className={styles.loadFileName}>{image.file.name}</span>
																<span className={styles.loadFileSize}>
																	{getFileSize(image.file.size)}
																</span>
															</div>
															<button type='button' onClick={() => onImageRemove(index)}>
																<Icon icon='close' size='10' />
															</button>
														</div>
													))}
												</div>
												{errors && (
													<div className={styles.uploaderErrors}>
														{errors.maxNumber && (
															<span className='text-16'>Number of selected images exceed {1}</span>
														)}
														{errors.acceptType && (
															<span className='text-16'>Your selected file type is not allow</span>
														)}
														{errors.maxFileSize && (
															<span className='text-16'>
																Selected file size exceed {1 * 1024 * 1024}{' '}
															</span> // 5 Мб
														)}
														{errors.resolution && (
															<span className='text-16'>
																Selected file is not match your desired resolution
															</span>
														)}
													</div>
												)}
											</div>
											<div className={'Button-upload'}>
												<Button
													type='button'
													customType='text-underline'
													iconName='upload'
													iconPosition='right'
													style={isDragging ? { color: 'red' } : undefined}
													onClick={onImageUpload}
													{...dragProps}>
													upload files
												</Button>
											</div>
										</div>
									)}
								</ImageUploading>
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
