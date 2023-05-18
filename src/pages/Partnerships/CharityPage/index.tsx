import { queryKeys } from '@/app/queryClient/queryKeys';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { MessageSection } from '@/widgets/MessageSection';
import { FaqsBlock } from '@/widgets/Partnerships/FaqsBlock';
import { FormBlock } from '@/widgets/Partnerships/FormBlock';
import { PartnershipContent } from '@/widgets/Partnerships/PartnershipContent';
import { PersonBlock } from '@/widgets/Partnerships/PersonBlock';
import { useQuery } from 'react-query';
import { ICharityPageData } from './interface';
import { HeroSection } from '../ui/HeroSection';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import api from './api';
import { Preloader } from '@/widgets/Preloader';

function CharityPage() {
	const { data, isLoading } = useQuery<ICharityPageData>(
		queryKeys.pageCharity,
		api.getCharityPageData
	);
	const { setPageIsLoaded } = useCommon();

	useLayoutEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
		return () => {
			setPageIsLoaded(false);
		};
	}, [isLoading]);

	return (
		<>
			<Preloader />
			<HeroSection
				title={data?.hero_section.title || ''}
				subtitle={data?.hero_section.subtitle || ''}
				messageType={'charity'}
				btnText={'Sign into buyer account'}
				btnSlug={'/help-center'}
				breadcrumbs={<Breadcrumbs homepageIsFirst={true} />}
				bg={'white'}
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
							formType={'charity'}
						/>
					}
				/>
			)}
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'If you have any questions you can always contact us'}
				btnText={'Check what your car worth'}
				btnSlug={'/'}
				goToOfferForm
				bg='green'
			/>
		</>
	);
}

export default CharityPage;
