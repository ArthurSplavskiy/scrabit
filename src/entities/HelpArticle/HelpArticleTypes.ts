export interface HelpCenterFAQ {
	data: ArticlesCategoryFAQ[];
}

export interface ArticlesCategoryFAQ {
	slug: string;
	title: string;
	subtitle: string;
	icon: string;
	authors: AuthorFAQ[];
	articles: ArticleFAQ[];
}

export interface ArticleFAQ {
	slug: string;
	created_at: string;
	author: AuthorFAQ;
	question: string;
	title: string;
	fullText: string;
}

export interface AuthorFAQ {
	avatar: string;
	name: string;
}
