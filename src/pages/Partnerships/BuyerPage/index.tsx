import { queryKeys } from '@/app/queryClient/queryKeys';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { MessageSection } from '@/widgets/MessageSection';
import { FaqsBlock } from '@/widgets/Partnerships/FaqsBlock';
import { FormBlock } from '@/widgets/Partnerships/FormBlock';
import { PartnershipContent } from '@/widgets/Partnerships/PartnershipContent';
import { PersonBlock } from '@/widgets/Partnerships/PersonBlock';
import { useQuery } from 'react-query';
import { IBuyerPageData } from './interface';
import { HeroSection } from '../ui/HeroSection';
import api from './api';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useEffect } from 'react';

function BuyerPage() {
	const { data, isLoading } = useQuery<IBuyerPageData>(queryKeys.pageBuyer, api.getBuyerPageData);
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
				message={data?.hero_section.message || ''}
				btnText={'Sign into buyer account'}
				btnSlug={'/help-center'}
				breadcrumbs={<Breadcrumbs homepageIsFirst={true} />}
				bg={'blue'}
			/>
			{data && (
				<PartnershipContent
					personBlock={
						<PersonBlock
							img={data.buyer.img}
							name={data.buyer.name}
							post={data.buyer.post}
							message={data.buyer.message}
						/>
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

export default BuyerPage;
