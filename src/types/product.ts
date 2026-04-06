export type ProductListItem = {
	id: string;
	title: string;
	slug: string;
	description: string;
	price: number;
	thumbnailUrl: string;
	isFeatured: boolean;
	viewCount: number;
	createdAt: string;
	category: {
		id: string;
		name: string;
		slug: string;
	};
	tags: {
		tag: {
			id: string;
			name: string;
			slug: string;
		};
	}[];
	reviews: {
		rating: number;
		isApproved: boolean;
	}[];
	_count?: {
		purchases: number;
		saved: number;
	};
};

export type CategoryOption = {
	id: string;
	name: string;
	slug: string;
};

export type TagOption = {
	id: string;
	name: string;
	slug: string;
};

export type ProductsResponse = {
	products: ProductListItem[];
	categories: CategoryOption[];
	tags: TagOption[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
};
