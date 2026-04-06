'use client'
import {
	HeroSection,
	StatsSection,
	CategoriesSection,
	FeaturedSection,
	HowItWorksSection,
	TestimonialsSection,
	NewsletterSection,
} from "@/src/components/home";

 
export default function HomePage() {
	return (
		<div className="bg-brand-white">
			<HeroSection />
			<StatsSection />
			<CategoriesSection />
			<FeaturedSection />
			<HowItWorksSection />
			<TestimonialsSection />
			<NewsletterSection />
		</div>
	);
}
