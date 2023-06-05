import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { FC } from 'react';
import { useBuyerForm } from './useBuyerForm';
import { IFormComponent } from '@/shared/interfaces/shared';
import ImageUploading from 'react-images-uploading';
import classNames from 'classnames';
import styles from '../index.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon';
import { getFileSize } from '@/shared/helpers';

interface Props {
	form: IFormComponent[]; // IBuyerApiData;
	formIdentifier: string;
}

export const BuyerForm: FC<Props> = ({ form, formIdentifier }) => {
	const { formData, onSubmit, isLoading, success, fileList, handleFileChange } = useBuyerForm(
		form,
		formIdentifier
	);
	const { isMobile } = useDevice();
	//console.log(form);
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
							options={form[6]?.items}
							label={form?.[6]?.name || 'State'}
							placeholder={form?.[6]?.placeholder || 'Choose state'}
						/>
						<ReactSelect
							errors={formData.industry.errors}
							onChange={formData.industry.inputProps.onChange}
							options={form[7]?.items}
							label={form?.[7]?.name || 'Industry'}
							placeholder={form?.[7]?.placeholder || 'Enter industry'}
						/>
						<ReactSelect
							errors={formData.goal.errors}
							onChange={formData.goal.inputProps.onChange}
							options={form[8]?.items}
							label={form?.[8]?.name || 'Goal'}
							placeholder={form?.[8]?.placeholder || 'Choose your goal'}
						/>
						<ReactSelect
							errors={formData.license.errors}
							onChange={formData.license.inputProps.onChange}
							options={form[9]?.items}
							label={form?.[9]?.name || 'License'}
							placeholder={form?.[9]?.placeholder || 'Choose license'}
						/>
						<ReactSelect
							errors={formData.feedback.errors}
							onChange={formData.feedback.inputProps.onChange}
							options={form[10]?.items}
							label={form?.[10]?.name || 'Where did you hear about us?'}
							placeholder={form?.[10]?.placeholder || 'Choose feedback'}
						/>
					</fieldset>
					<fieldset className={styles.FormControls}>
						<div className={styles.FormLicense}>
							<div className={styles.FormUpload}>
								<h3 className={classNames(styles.FormTitle, 'text-24-14')}>
									license or permit verification (optional)
								</h3>
								{/* <FileUploader onUploadFile={handleFileChange} uploadFileValue={fileList} /> */}
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
														// <div key={index} className={styles.uploaderImage}>
														// 	<img src={image.dataURL} alt='upload photo' />
														// 	<div className={styles.uploaderImageBackdrop}>
														// 		{/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
														// 		<button type='button' onClick={() => onImageRemove(index)}>
														// 			<Icon icon='close' size='10' />
														// 		</button>
														// 	</div>
														// </div>
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
