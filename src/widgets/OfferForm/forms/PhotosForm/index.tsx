import { Button } from '@/shared/ui/Button';
import { IOfferData, initialOfferData } from '../../initialOfferData';
import { FC, useEffect, useState } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ProgressRing } from '@/shared/ui/ProgressRing';
import { BackButton } from '../../ui/BackButton';
import { NextButton } from '../../ui/NextButton';
import { IOfferCurrentStep, initialOfferCurrentStep } from '../../initialOfferCurrentStep';
import { useCommon } from '@/app/context/Common/CommonContext';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import styles from './index.module.scss';
import mainStyles from '../../index.module.scss';
import api from '../api';
import { IStep } from '../../initialStep';

interface Props {
	setStep: (...args: any[]) => void;
}

export interface IImagesFormData {
	images: any;
}

// setStep?.((prev: IStep) => ({
// 	...prev,
// 	count: prev.count + 1
// }));
// setOfferData((prev) => ({
// 	...prev,
// 	stepIndex: setStep ? prev.stepIndex + 1 : prev.stepIndex
// }));

export const PhotosForm: FC<Props> = ({ setStep }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [currentOfferData, setCurrentOffer] = useSessionStorage<IOfferCurrentStep[]>(
		'offerCurrentStep',
		initialOfferCurrentStep
	);
	const [images, setImages] = useState([]);
	const maxNumber = 10;
	const maxFileSize = 1 * 1024 * 1024; // 5 Мб
	const { setError } = useCommon();

	const onChange = async (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
		setImages(imageList as never[]);
	};

	const sendImages = async () => {
		//if (currentOfferData[3] || !images.length) return;
		try {
			setIsLoading(true);
			const data: IImagesFormData = {
				images
			};
			const res = await api.postImagesForm(data);
			setCurrentOffer((prev) => [...prev, res]);
			setStep((prev: IStep) => ({
				...prev,
				count: prev.count + 1
			}));
			setOfferData((prev) => ({
				...prev,
				photos: images as never[],
				stepIndex: prev.stepIndex + 1
			}));
			setIsLoading(false);
		} catch (error) {
			//const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: 'msg' || 'Image load Error !' });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (offerData.photos) setImages(offerData.photos);
	}, []);

	return (
		<div className={styles.form}>
			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
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
						{/* <button
							style={isDragging ? { color: 'red' } : undefined}
							onClick={onImageUpload}
							{...dragProps}>
							Click or Drop here
						</button> */}
						{/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
						<div className={styles.uploaderZone}>
							<div className={styles.uploaderImageList}>
								{imageList.map((image, index) => (
									<div key={index} className={styles.uploaderImage}>
										<img src={image.dataURL} alt='upload photo' />
										<div className={styles.uploaderImageBackdrop}>
											{/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
											<button type='button' onClick={() => onImageRemove(index)}>
												<Icon icon='close' size='10' color='white' />
												<ProgressRing progress={100} />
											</button>
										</div>
									</div>
								))}
							</div>
							<h3>{currentOfferData[2].form_fields[0].placeholder}</h3>
							<p className='text-16'>Suitable car photo formats .jpg .jpeg .png</p>
							{errors && (
								<div className={styles.uploaderErrors}>
									{errors.maxNumber && (
										<span className='text-16'>Number of selected images exceed {maxNumber}</span>
									)}
									{errors.acceptType && (
										<span className='text-16'>Your selected file type is not allow</span>
									)}
									{errors.maxFileSize && (
										<span className='text-16'>Selected file size exceed {maxFileSize}</span>
									)}
									{errors.resolution && (
										<span className='text-16'>
											Selected file is not match your desired resolution
										</span>
									)}
								</div>
							)}
						</div>
						<Button
							type='button'
							style={isDragging ? { color: 'red' } : undefined}
							onClick={onImageUpload}
							iconName='upload'
							iconPosition='right'
							className={styles.uploaderBtn}
							{...dragProps}>
							upload files
						</Button>
					</div>
				)}
			</ImageUploading>
			<div className={mainStyles.offerFormContentNav}>
				<BackButton setStep={setStep} />
				<NextButton loading={isLoading} onClickFn={sendImages} />
			</div>
		</div>
	);
};
