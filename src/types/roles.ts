// src/config/roles.ts
// Single source of truth for role display config and permissions.
// Import this wherever you need role labels, colors, or access checks.

export type AppRole = "USER" | "ADMIN" | "OWNER";

export interface RoleConfig {
	label: string;
	bg: string;
	text: string;
	dot: string;
}

export const ROLE_CONFIG: Record<AppRole, RoleConfig> = {
	USER: {
		label: "Member",
		bg: "#f5f0e8",
		text: "#7c6a4a",
		dot: "#c8a96e",
	},
	ADMIN: {
		label: "Admin",
		bg: "#eef2ff",
		text: "#4338ca",
		dot: "#6366f1",
	},
	OWNER: {
		label: "Owner",
		bg: "#fdf6e8",
		text: "#92400e",
		dot: "#c8a96e",
	},
};

// ─── Permission helpers ───────────────────────────────────────────────────────

export function isAdmin(role: AppRole): boolean {
	return role === "ADMIN" || role === "OWNER";
}

export function isSuperAdmin(role: AppRole): boolean {
	return role === "OWNER";
}

// For use in API route protection
export function requireAdmin(role: AppRole | undefined): void {
	if (!role || !isAdmin(role)) {
		throw new Error("Forbidden: admin access required");
	}
}

export function requireSuperAdmin(role: AppRole | undefined): void {
	if (!role || !isSuperAdmin(role)) {
		throw new Error("Forbidden: super admin access required");
	}
}
