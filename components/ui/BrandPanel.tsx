export function BrandPanel() {
	return (
		<div className="hidden lg:flex w-[44%] bg-brand-navy flex-col items-center justify-center px-12 relative overflow-hidden">
			{/* Concentric ring ornaments */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-[420px] h-[420px] rounded-full border border-brand-gold/10" />
			</div>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-[280px] h-[280px] rounded-full border border-brand-gold/15" />
			</div>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-[150px] h-[150px] rounded-full border border-brand-gold/20" />
			</div>

			{/* Corner filigree */}
			<div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-brand-gold/30" />
			<div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-brand-gold/30" />
			<div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-brand-gold/30" />
			<div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-brand-gold/30" />

			{/* Brand content */}
			<div className="relative z-10 text-center animate-fade-up">
				<p className="text-brand-gold/70 text-[10px] tracking-[0.4em] uppercase font-sans font-light mb-5">
					Est. MMXXIV
				</p>
				<h1 className="font-serif text-6xl font-semibold text-brand-white leading-none tracking-tight">
					Idia Designs
				</h1>
				<div className="ornament-divider my-5 px-8 text-brand-gold/60 text-[9px]">
					✦
				</div>
				<p className="font-serif italic text-brand-gold text-base tracking-wide">
					Where elegance meets excellence
				</p>
				<p className="mt-6 text-brand-white/40 text-[12px] font-sans font-light leading-relaxed max-w-[220px] mx-auto">
					A distinguished experience curated for those who appreciate the finest
					things.
				</p>
			</div>
		</div>
	);
}
