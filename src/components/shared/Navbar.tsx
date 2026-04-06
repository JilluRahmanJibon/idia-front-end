"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	Bell,
	Bookmark,
	ChevronDown,
	ClipboardList,
	Grip,
	LogIn,
	LogOut,
	Menu,
	Settings,
	ShoppingBag,
	User,
	X,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavUser {
	name: string;
	email: string;
	avatar?: string;
	role?: "USER" | "ADMIN" | "SUPER_ADMIN";
}

// ─── Mock auth hook — replace with your real auth (NextAuth / Zustand / etc.) ─
function useAuth() {
	// TODO: Replace this entire hook with your real auth state
	// e.g. const { data: session } = useSession();
	// e.g. const user = useAuthStore((s) => s.user);
	const [user] = useState<NavUser | null>(null); // null = logged out, set a user object to test logged-in state
	const logout = async () => {
		// TODO: await signOut() or clear auth store
		console.log("logout");
	};
	return { user, logout };
}

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Browse", href: "/products" },
	{ label: "Categories", href: "/categories" },
	{ label: "About", href: "/about" },
];

// ─── Auth-gated routes — redirect to login if not authenticated ───────────────
const PROTECTED_ROUTES = ["/purchases", "/saved", "/profile", "/notifications"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const { user, logout } = useAuth();

	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [notifOpen, setNotifOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const notifRef = useRef<HTMLDivElement>(null);

	// Scroll shadow
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close dropdowns on outside click
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			)
				setDropdownOpen(false);
			if (notifRef.current && !notifRef.current.contains(e.target as Node))
				setNotifOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	// Close mobile on route change
	useEffect(() => setMobileOpen(false), [pathname]);

	// Auth-gate handler
	const handleProtected = (href: string) => {
		if (!user) {
			router.push(`/login?redirect=${encodeURIComponent(href)}`);
		} else {
			router.push(href);
		}
	};

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		<>
			{/* ── Navbar ── */}
			<header
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
					scrolled
						? "bg-brand-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] py-3"
						: "bg-brand-white py-4",
				)}>
				<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
					{/* ── Logo ── */}
					<Link href="/" className="flex-shrink-0 group">
						<span className="font-serif text-[22px] font-semibold text-brand-navy tracking-tight group-hover:text-brand-gold-dark transition-colors duration-200">
							Idia<span className="text-brand-gold">Designs</span>
						</span>
					</Link>

					{/* ── Desktop Nav Links ── */}
					<ul className="hidden lg:flex items-center gap-1">
						{NAV_LINKS.map(({ label, href }) => (
							<li key={href}>
								<Link
									href={href}
									className={cn(
										"relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-[4px]",
										isActive(href)
											? "text-brand-navy"
											: "text-brand-black/55 hover:text-brand-navy",
									)}>
									{label}
									{isActive(href) && (
										<span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-brand-gold rounded-full" />
									)}
								</Link>
							</li>
						))}
					</ul>

					{/* ── Right section ── */}
					<div className="hidden lg:flex items-center gap-2">
						{user ? (
							<>
								{/* Saved */}
								<NavIconBtn
									icon={<Bookmark className="w-4 h-4" />}
									label="Saved items"
									onClick={() => handleProtected("/saved")}
								/>

								{/* Purchases */}
								<NavIconBtn
									icon={<ShoppingBag className="w-4 h-4" />}
									label="Purchases"
									onClick={() => handleProtected("/purchases")}
								/>

								{/* Notifications */}
								<div ref={notifRef} className="relative">
									<NavIconBtn
										icon={<Bell className="w-4 h-4" />}
										label="Notifications"
										badge={3} // TODO: replace with real unread count
										onClick={() => setNotifOpen(v => !v)}
									/>
									{notifOpen && (
										<NotifDropdown onClose={() => setNotifOpen(false)} />
									)}
								</div>

								{/* Profile dropdown */}
								<div ref={dropdownRef} className="relative ml-1">
									<button
										onClick={() => setDropdownOpen(v => !v)}
										className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-brand-parchment hover:border-brand-gold/40 transition-colors duration-200"
										aria-label="User menu">
										<Avatar user={user} size="sm" />
										<ChevronDown
											className={cn(
												"w-3 h-3 text-brand-black/40 transition-transform duration-200",
												dropdownOpen && "rotate-180",
											)}
										/>
									</button>
									{dropdownOpen && (
										<ProfileDropdown
											user={user}
											onClose={() => setDropdownOpen(false)}
											onLogout={logout}
										/>
									)}
								</div>
							</>
						) : (
							<>
								<Link
									href="/login"
									className="text-[13px] font-medium text-brand-black/60 hover:text-brand-navy transition-colors px-3 py-2">
									Sign in
								</Link>
								<Link
									href="/register"
									className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-navy text-brand-white text-[13px] font-medium tracking-wide rounded-[6px] hover:bg-[#252550] transition-colors duration-200">
									<LogIn className="w-3.5 h-3.5" />
									Get Started
								</Link>
							</>
						)}
					</div>

					{/* ── Mobile hamburger ── */}
					<button
						onClick={() => setMobileOpen(v => !v)}
						className="lg:hidden p-2 rounded-[6px] text-brand-black/60 hover:text-brand-navy hover:bg-brand-parchment/50 transition-colors"
						aria-label="Toggle menu">
						{mobileOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</button>
				</nav>
			</header>

			{/* ── Mobile Drawer ── */}
			<MobileMenu
				open={mobileOpen}
				user={user}
				pathname={pathname}
				onProtected={handleProtected}
				onLogout={logout}
				onClose={() => setMobileOpen(false)}
			/>

			{/* Spacer so content doesn't go under fixed navbar */}
			<div className="h-[64px]" />
		</>
	);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavIconBtn({
	icon,
	label,
	badge,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	badge?: number;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			aria-label={label}
			className="relative p-2 rounded-full text-brand-black/50 hover:text-brand-navy hover:bg-brand-parchment/60 transition-colors duration-200">
			{icon}
			{badge ? (
				<span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-brand-gold text-brand-navy text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
					{badge > 9 ? "9+" : badge}
				</span>
			) : null}
		</button>
	);
}

function Avatar({ user, size = "md" }: { user: NavUser; size?: "sm" | "md" }) {
	const dim = size === "sm" ? "w-7 h-7 text-[11px]" : "w-9 h-9 text-[13px]";
	if (user.avatar) {
		return (
			<img
				src={user.avatar}
				alt={user.name}
				className={cn("rounded-full object-cover", dim)}
			/>
		);
	}
	return (
		<span
			className={cn(
				"rounded-full bg-brand-navy text-brand-white font-semibold flex items-center justify-center",
				dim,
			)}>
			{user.name.charAt(0).toUpperCase()}
		</span>
	);
}

function ProfileDropdown({
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

	return (
		<div className="absolute right-0 top-full mt-2 w-60 bg-brand-white border border-brand-parchment rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden animate-fade-in z-50">
			{/* User info */}
			<div className="px-4 py-3.5 border-b border-brand-parchment">
				<p className="text-[13px] font-semibold text-brand-navy truncate">
					{user.name}
				</p>
				<p className="text-[11px] text-brand-black/40 truncate mt-0.5">
					{user.email}
				</p>
				{user.role && user.role !== "USER" && (
					<span className="mt-1.5 inline-block px-2 py-0.5 bg-brand-gold/15 text-brand-gold-dark text-[10px] font-medium rounded-full tracking-wide">
						{user.role.replace("_", " ")}
					</span>
				)}
			</div>

			{/* Links */}
			<div className="py-1.5">
				{[
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
					...(user.role === "ADMIN" || user.role === "SUPER_ADMIN"
						? [
								{
									icon: <Grip className="w-3.5 h-3.5" />,
									label: "Admin Panel",
									href: "/admin",
								},
							]
						: []),
				].map(({ icon, label, href }) => (
					<button
						key={href}
						onClick={() => go(href)}
						className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-brand-black/70 hover:bg-brand-parchment/50 hover:text-brand-navy transition-colors text-left">
						<span className="text-brand-gold-dark">{icon}</span>
						{label}
					</button>
				))}
			</div>

			{/* Logout */}
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

function NotifDropdown({ onClose }: { onClose: () => void }) {
	// TODO: replace with real notifications from API
	const notifs = [
		{
			id: 1,
			title: "Purchase Successful",
			message: "Epic Logo Reveal is ready to download.",
			time: "2m ago",
			read: false,
		},
		{
			id: 2,
			title: "New Product",
			message: "Motion Pack Vol. 3 just dropped!",
			time: "1h ago",
			read: false,
		},
		{
			id: 3,
			title: "Review Approved",
			message: "Your review on Cinematic Titles is live.",
			time: "Yesterday",
			read: true,
		},
	];

	return (
		<div className="absolute right-0 top-full mt-2 w-80 bg-brand-white border border-brand-parchment rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden animate-fade-in z-50">
			<div className="px-4 py-3 border-b border-brand-parchment flex items-center justify-between">
				<p className="text-[13px] font-semibold text-brand-navy">
					Notifications
				</p>
				<button
					onClick={onClose}
					className="text-brand-black/30 hover:text-brand-navy">
					<X className="w-3.5 h-3.5" />
				</button>
			</div>
			<div className="max-h-72 overflow-y-auto divide-y divide-brand-parchment/60">
				{notifs.map(n => (
					<div
						key={n.id}
						className={cn(
							"px-4 py-3 hover:bg-brand-parchment/30 transition-colors cursor-pointer",
							!n.read && "bg-brand-gold/5",
						)}>
						<div className="flex items-start gap-2.5">
							{!n.read && (
								<span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
							)}
							<div className={cn(!n.read ? "" : "pl-4")}>
								<p className="text-[12px] font-semibold text-brand-navy">
									{n.title}
								</p>
								<p className="text-[11px] text-brand-black/50 mt-0.5 leading-relaxed">
									{n.message}
								</p>
								<p className="text-[10px] text-brand-black/30 mt-1">{n.time}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="px-4 py-2.5 border-t border-brand-parchment text-center">
				<Link
					href="/notifications"
					onClick={onClose}
					className="text-[11px] text-brand-gold-dark hover:text-brand-gold font-medium transition-colors">
					View all notifications →
				</Link>
			</div>
		</div>
	);
}

function MobileMenu({
	open,
	user,
	pathname,
	onProtected,
	onLogout,
	onClose,
}: {
	open: boolean;
	user: NavUser | null;
	pathname: string;
	onProtected: (href: string) => void;
	onLogout: () => void;
	onClose: () => void;
}) {
	return (
		<>
			{/* Backdrop */}
			{open && (
				<div
					className="fixed inset-0 z-40 bg-brand-navy/20 backdrop-blur-sm lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Drawer */}
			<div
				className={cn(
					"fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-brand-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
					open ? "translate-x-0" : "translate-x-full",
				)}>
				{/* Drawer header */}
				<div className="flex items-center justify-between px-5 py-4 border-b border-brand-parchment">
					<span className="font-serif text-[18px] font-semibold text-brand-navy">
						Idia<span className="text-brand-gold">Designs</span>
					</span>
					<button
						onClick={onClose}
						className="p-1.5 rounded-full hover:bg-brand-parchment/60 text-brand-black/40 transition-colors">
						<X className="w-4 h-4" />
					</button>
				</div>

				{/* Nav links */}
				<div className="flex-1 overflow-y-auto py-4 px-3">
					<p className="px-3 text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-medium mb-2">
						Navigation
					</p>
					{NAV_LINKS.map(({ label, href }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								"flex items-center px-3 py-3 rounded-[6px] text-[14px] font-medium transition-colors mb-0.5",
								pathname === href || (href !== "/" && pathname.startsWith(href))
									? "bg-brand-navy text-brand-white"
									: "text-brand-black/70 hover:bg-brand-parchment/60 hover:text-brand-navy",
							)}>
							{label}
						</Link>
					))}

					{user && (
						<>
							<div className="my-4 border-t border-brand-parchment" />
							<p className="px-3 text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-medium mb-2">
								My Account
							</p>
							{[
								{
									icon: <ShoppingBag className="w-4 h-4" />,
									label: "Purchases",
									href: "/purchases",
								},
								{
									icon: <Bookmark className="w-4 h-4" />,
									label: "Saved Items",
									href: "/saved",
								},
								{
									icon: <Bell className="w-4 h-4" />,
									label: "Notifications",
									href: "/notifications",
								},
								{
									icon: <User className="w-4 h-4" />,
									label: "Profile",
									href: "/profile",
								},
								{
									icon: <Settings className="w-4 h-4" />,
									label: "Settings",
									href: "/settings",
								},
							].map(({ icon, label, href }) => (
								<button
									key={href}
									onClick={() => {
										onProtected(href);
										onClose();
									}}
									className="w-full flex items-center gap-3 px-3 py-3 rounded-[6px] text-[14px] text-brand-black/70 hover:bg-brand-parchment/60 hover:text-brand-navy transition-colors mb-0.5 text-left">
									<span className="text-brand-gold-dark">{icon}</span>
									{label}
								</button>
							))}
						</>
					)}
				</div>

				{/* Drawer footer */}
				<div className="px-5 py-4 border-t border-brand-parchment">
					{user ? (
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<Avatar user={user} size="md" />
								<div className="min-w-0">
									<p className="text-[13px] font-semibold text-brand-navy truncate">
										{user.name}
									</p>
									<p className="text-[11px] text-brand-black/40 truncate">
										{user.email}
									</p>
								</div>
							</div>
							<button
								onClick={() => {
									onLogout();
									onClose();
								}}
								className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-500 text-[13px] font-medium rounded-[6px] hover:bg-red-50 transition-colors">
								<LogOut className="w-4 h-4" />
								Sign out
							</button>
						</div>
					) : (
						<div className="space-y-2.5">
							<Link
								href="/login"
								className="block w-full text-center py-2.5 border border-brand-parchment text-brand-navy text-[13px] font-medium rounded-[6px] hover:bg-brand-parchment/40 transition-colors">
								Sign In
							</Link>
							<Link
								href="/register"
								className="block w-full text-center py-2.5 bg-brand-navy text-brand-white text-[13px] font-medium rounded-[6px] hover:bg-[#252550] transition-colors">
								Get Started
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
