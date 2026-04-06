import { Quote, Star } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { TESTIMONIALS } from "../data/home";

export default function TestimonialsSection() {
	return (
		<section className="py-24 bg-brand-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader
					eyebrow="Reviews"
					title="Loved by Creators"
					subtitle="Thousands of designers and filmmakers trust IdiaDesigns for their projects."
				/>

				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					{TESTIMONIALS.map(t => (
						<div
							key={t.name}
							className="relative p-6 rounded-xl border border-brand-parchment bg-brand-white hover:border-brand-gold/30 hover:shadow-[0_4px_24px_rgba(200,169,110,0.08)] transition-all duration-300">
							<Quote className="w-6 h-6 text-brand-gold/25 mb-4" />

							<div className="flex gap-0.5 mb-3">
								{Array.from({ length: t.rating }).map((_, i) => (
									<Star
										key={i}
										className="w-3.5 h-3.5 fill-brand-gold text-brand-gold"
									/>
								))}
							</div>

							<p className="text-[13px] text-brand-black/65 leading-relaxed font-light italic">
								"{t.text}"
							</p>

							<div className="mt-5 flex items-center gap-3">
								<div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-brand-white text-[13px] font-semibold flex-shrink-0">
									{t.avatar}
								</div>
								<div>
									<p className="text-[13px] font-semibold text-brand-navy">
										{t.name}
									</p>
									<p className="text-[11px] text-brand-black/40">{t.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
