import { queryKeys } from '@/app/queryClient/queryKeys';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { MessageSection } from '@/widgets/MessageSection';
import { FaqsBlock } from '@/widgets/Partnerships/FaqsBlock';
import { FormBlock } from '@/widgets/Partnerships/FormBlock';
import { PartnershipContent } from '@/widgets/Partnerships/PartnershipContent';
import { PersonBlock } from '@/widgets/Partnerships/PersonBlock';
import { Preloader } from '@/widgets/Preloader';
import { useQuery } from 'react-query';
import { ICarrierPageData } from './interface';
import { HeroSection } from '../ui/HeroSection';
import api from './api';

function CarrierPage() {
	const { data } = useQuery<ICarrierPageData>(queryKeys.pageBuyer, api.getCarrierPageData);
	return (
		<>
			<Preloader hide={true} />
			<HeroSection
				title={data?.hero_section.title || ''}
				subtitle={data?.hero_section.subtitle || ''}
				message={data?.hero_section.message || ''}
				btnText={'Check what your car worth'}
				btnSlug={'/help-center'}
				breadcrumbs={<Breadcrumbs />}
				bg={'green'}
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

export default CarrierPage;
