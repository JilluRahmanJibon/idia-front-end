import { LucideIcon } from "lucide-react";

export type StatItem = {
	label: string;
	value: string;
	icon: LucideIcon;
};

export type CategoryItem = {
	name: string;
	slug: string;
	icon: string;
	count: number;
};

export type ProductItem = {
	id: string;
	title: string;
	slug: string;
	thumbnailUrl: string;
	price: number;
	category: string;
	rating: number;
	reviewCount: number;
	isFeatured: boolean;
};

export type StepItem = {
	number: string;
	title: string;
	desc: string;
};

export type TestimonialItem = {
	name: string;
	role: string;
	avatar: string;
	rating: number;
	text: string;
};
