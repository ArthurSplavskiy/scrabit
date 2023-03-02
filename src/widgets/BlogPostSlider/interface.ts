import { IBlogPost } from '@/entities/Blogpost/interface';

export interface IBlogPostSlider {
	title: string;
	subtitle: string;
	blogposts: IBlogPost[];
}
