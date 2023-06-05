import { IAboutSection } from '@/widgets/AboutSection/interface';
import { IHowItWorkSection } from '@/widgets/HowItWorkSection/interface';
import { IReviewSection } from '@/widgets/ReviewSection/interface';
import { ICar } from '@/widgets/SoldCarSection/interface';

export interface ISellMyCarPageData {
	hero_title: string;
	hero_subtitle: string;
	hero_image: string;
	about_section: IAboutSection;
	review_section: IReviewSection[];
	how_it_work_section: IHowItWorkSection;
	sold_car_amount: number;
	sold_cars: ICar[];
}
