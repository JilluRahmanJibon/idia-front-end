"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usersApi } from "@/src/lib/api/users.api";
import { useAuth } from "@/src/context/AuthContext";

export default function DangerZoneSection() {
	const [isLoading, setIsLoading] = useState(false);
	const [confirm, setConfirm] = useState("");
	const { logout } = useAuth();
	const router = useRouter();

	const handleDelete = async () => {
		if (confirm !== "DELETE") {
			toast.error('Type "DELETE" to confirm');
			return;
		}

		setIsLoading(true);

		try {
			await usersApi.deleteAccount();
			await logout();
			router.push("/");
			toast.success("Account deleted");
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Failed to delete account",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="border border-red-200 bg-red-50/60 rounded-2xl p-6 space-y-5">
			<div className="space-y-1">
				<h3 className="text-lg font-semibold text-red-700">Delete Account</h3>
				<p className="text-sm text-red-600/80">
					This action is permanent and cannot be undone. All your data will be
					deleted.
				</p>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-medium text-[#1a1a2e]">
					Type DELETE to confirm
				</label>
				<input
					type="text"
					value={confirm}
					onChange={e => setConfirm(e.target.value)}
					placeholder="DELETE"
					className="w-full px-4 py-3 border border-red-200 rounded-xl bg-white text-sm text-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-red-400 transition"
				/>
			</div>

			<button
				onClick={handleDelete}
				disabled={isLoading || confirm !== "DELETE"}
				className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 disabled:opacity-50 transition shadow-sm">
				{isLoading ? "Deleting..." : "Delete Account"}
			</button>
		</div>
	);
}
