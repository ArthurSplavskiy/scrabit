import { IFormComponent, ISelectOption } from '@/shared/interfaces/shared';
import { IAboutSection } from '@/widgets/AboutSection/interface';
import { IBlogPostSlider } from '@/widgets/BlogPostSlider/interface';
import { IFaqSection } from '@/widgets/FaqSection/interface';
import { IHowItWorkSection } from '@/widgets/HowItWorkSection/interface';
import { IReviewSection } from '@/widgets/ReviewSection/interface';

export interface IHomePageData {
	hero_title: string;
	hero_subtitle: string;
	offer_form: {
		form_fields: IFormComponent[];
		form_id: number;
		form_identifier: string;
		next_step: string;
		title: string;
		// car_make: ISelectOption[];
		// car_model: ISelectOption[];
		// car_submodel: ISelectOption[];
	};
	about_section: IAboutSection;
	how_it_work_section: IHowItWorkSection;
	review_section: IReviewSection[];
	faq_section: IFaqSection;
	home_blogposts_section: IBlogPostSlider;
}
