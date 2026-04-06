import { useRouter } from "next/navigation";
import {
	Bookmark,
	ClipboardList,
	Grip,
	LogOut,
	Settings,
	ShoppingBag,
	User,
} from "lucide-react";
import { NavUser } from "./types";

export function ProfileDropdown({
	user,
	onClose,
	onLogout,
}: {
	user: NavUser;
	onClose: () => void;
	onLogout: () => void;
}) {
	const router = useRouter();
	const go = (href: string) => {
		onClose();
		router.push(href);
	};

	const links = [
		{
			icon: <User className="w-3.5 h-3.5" />,
			label: "My Profile",
			href: "/profile",
		},
		{
			icon: <ShoppingBag className="w-3.5 h-3.5" />,
			label: "Purchase History",
			href: "/purchases",
		},
		{
			icon: <Bookmark className="w-3.5 h-3.5" />,
			label: "Saved Items",
			href: "/saved",
		},
		{
			icon: <ClipboardList className="w-3.5 h-3.5" />,
			label: "My Reviews",
			href: "/reviews",
		},
		{
			icon: <Settings className="w-3.5 h-3.5" />,
			label: "Settings",
			href: "/settings",
		},
		...(user.role === "ADMIN" || user.role === "OWNER"
			? [
					{
						icon: <Grip className="w-3.5 h-3.5" />,
						label: "Admin Panel",
						href: "/admin",
					},
				]
			: []),
	];

	return (
		<div className="absolute right-0 top-full mt-2 w-60 bg-brand-white border border-brand-parchment rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden animate-fade-in z-50">
			<div className="px-4 py-3.5 border-b border-brand-parchment">
				<p className="text-[13px] font-semibold text-brand-navy truncate">
					{user.name}
				</p>
				<p className="text-[11px] text-brand-black/40 truncate mt-0.5">
					{user.email}
				</p>
				{user.role && user.role !== "USER" && (
					<span className="mt-1.5 inline-block px-2 py-0.5 bg-brand-gold/15 text-brand-gold-dark text-[10px] font-medium rounded-full tracking-wide">
						{user.role}
					</span>
				)}
			</div>

			<div className="py-1.5">
				{links.map(({ icon, label, href }) => (
					<button
						key={href}
						onClick={() => go(href)}
						className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-brand-black/70 hover:bg-brand-parchment/50 hover:text-brand-navy transition-colors text-left">
						<span className="text-brand-gold-dark">{icon}</span>
						{label}
					</button>
				))}
			</div>

			<div className="border-t border-brand-parchment py-1.5">
				<button
					onClick={() => {
						onClose();
						onLogout();
					}}
					className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors text-left">
					<LogOut className="w-3.5 h-3.5" />
					Sign out
				</button>
			</div>
		</div>
	);
}
