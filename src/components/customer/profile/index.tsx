"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import AvatarSection from "./sections/avatar-section";
import PersonalInfoSection from "./sections/personal-info-section";
import PasswordSection from "./sections/password-section";
import DangerZoneSection from "./sections/danger-zone-section";

export default function ProfileClient() {
	const { user, isLoading } = useAuth();
	const [activeTab, setActiveTab] = useState<"info" | "password" | "danger">(
		"info",
	);

	if (isLoading) return <ProfileSkeleton />;
	if (!user) return null;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
			<div className="rounded-3xl border border-[#e4d8c4] bg-gradient-to-br from-[#fffdf9] via-[#f9f5ee] to-[#f3ecdf] shadow-[0_20px_60px_rgba(13,13,13,0.06)] overflow-hidden">
				<div className="h-24 bg-gradient-to-r from-[#0d0d0d] via-[#1a1a2e] to-[#7c6a4a]" />
				<div className="px-6 md:px-8 pb-8 -mt-10 space-y-8">
					<AvatarSection user={user} />

					<div className="flex flex-wrap gap-3 border-b border-[#e4d8c4] pb-4">
						{(["info", "password", "danger"] as const).map(tab => {
							const isActive = activeTab === tab;

							return (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
										isActive
											? "bg-[#c8a96e] text-[#0d0d0d] border-[#c8a96e] shadow-md"
											: "bg-white/70 text-[#5c5244] border-[#e4d8c4] hover:bg-[#f5f0e8] hover:text-[#0d0d0d]"
									}`}>
									{tab === "info"
										? "Personal Info"
										: tab === "password"
											? "Password"
											: "Danger Zone"}
								</button>
							);
						})}
					</div>

					<div className="rounded-2xl border border-[#eadfce] bg-white/80 backdrop-blur-sm p-5 md:p-6 shadow-[0_8px_30px_rgba(13,13,13,0.04)]">
						{activeTab === "info" && <PersonalInfoSection user={user} />}
						{activeTab === "password" && <PasswordSection />}
						{activeTab === "danger" && <DangerZoneSection />}
					</div>
				</div>
			</div>
		</div>
	);
}

function ProfileSkeleton() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-10">
			<div className="rounded-3xl border border-[#e4d8c4] bg-[#fffdf9] overflow-hidden animate-pulse">
				<div className="h-24 bg-[#e8e0d0]" />
				<div className="px-6 md:px-8 pb-8 -mt-10 space-y-8">
					<div className="flex items-center gap-4">
						<div className="w-24 h-24 rounded-full bg-[#e8e0d0] border-4 border-white" />
						<div className="space-y-2 mt-8">
							<div className="h-5 w-44 bg-[#e8e0d0] rounded" />
							<div className="h-4 w-24 bg-[#f0e7d8] rounded" />
							<div className="h-3 w-32 bg-[#f0e7d8] rounded" />
						</div>
					</div>

					<div className="flex gap-3">
						<div className="h-10 w-28 rounded-full bg-[#f0e7d8]" />
						<div className="h-10 w-28 rounded-full bg-[#f0e7d8]" />
						<div className="h-10 w-28 rounded-full bg-[#f0e7d8]" />
					</div>

					<div className="rounded-2xl border border-[#eadfce] bg-white p-6 space-y-4">
						<div className="h-10 w-full rounded-lg bg-[#f5f0e8]" />
						<div className="h-10 w-full rounded-lg bg-[#f5f0e8]" />
						<div className="h-10 w-40 rounded-lg bg-[#f0e7d8]" />
					</div>
				</div>
			</div>
		</div>
	);
}
