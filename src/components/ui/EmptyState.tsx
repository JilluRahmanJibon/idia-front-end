import Link from "next/link";

export function EmptyState({
	icon,
	title,
	description,
	href,
	linkLabel,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	href: string;
	linkLabel: string;
}) {
	return (
		<div className="rounded-2xl border border-[#e4d8c4] bg-[#fffdf9] p-12 text-center space-y-4">
			<div className="flex justify-center">{icon}</div>
			<h3 className="text-lg font-semibold text-[#1a1a1a]">{title}</h3>
			<p className="text-sm text-[#7c6a4a]">{description}</p>
			<Link
				href={href}
				className="inline-block px-6 py-2.5 bg-[#c8a96e] hover:bg-[#b69559] text-[#0d0d0d] text-sm font-medium rounded-xl transition-colors">
				{linkLabel}
			</Link>
		</div>
	);
}
