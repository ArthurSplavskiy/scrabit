import { queryKeys } from '@/app/queryClient/queryKeys';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { MessageSection } from '@/widgets/MessageSection';
import { FaqsBlock } from '@/widgets/Partnerships/FaqsBlock';
import { FormBlock } from '@/widgets/Partnerships/FormBlock';
import { PartnershipContent } from '@/widgets/Partnerships/PartnershipContent';
import { PersonBlock } from '@/widgets/Partnerships/PersonBlock';
import { useQuery } from 'react-query';
import { IPublisherPageData } from './interface';
import { HeroSection } from '../ui/HeroSection';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useEffect } from 'react';
import api from './api';

function PublisherPage() {
	const { data, isLoading } = useQuery<IPublisherPageData>(
		queryKeys.pageBuyer,
		api.getPublisherPageData
	);
	const { setPageIsLoaded } = useCommon();
	useEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
	}, [isLoading]);
	return (
		<>
			<HeroSection
				title={data?.hero_section.title || ''}
				subtitle={data?.hero_section.subtitle || ''}
				messageType={'publisher'}
				btnText={'Check what your car worth'}
				btnSlug={'/help-center'}
				breadcrumbs={<Breadcrumbs />}
				bg={'grey'}
			/>
			{data && (
				<PartnershipContent
					personBlock={
						<PersonBlock img={data.buyer.img} name={data.buyer.name} post={data.buyer.post} />
					}
					faqsBlock={
						<FaqsBlock title={data.faq.title} subtitle={data.faq.subtitle} faqs={data.faq.faqs} />
					}
					formBlock={
						<FormBlock
							title={data.form.title}
							category={data.form.category}
							form={data.form.selects}
							formType={'buyer'}
						/>
					}
				/>
			)}
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'if you have any questions you can always contact us'}
				btnText={'Check what your car worth'}
				btnSlug={'/help-center'}
				bg={'green'}
			/>
		</>
	);
}

export default PublisherPage;
