export interface BlogsType {
	excerpt: string;
	id: string;
	slug: string;
	title: string;
	notion: string;
	createdAt: Date;
	image: {
		url: string;
	};
	author: {
		name: string;
		avatar: {
			url: string;
		};
	};
	category: {
		label: string;
		slug: string;
	};
	description: {
		text: string;
		html: string;
	};
	docs: {
		url: string;
	};
}
