import { apiClient } from "@/services/apiClient";
import { LoginPayload,   } from "./types";
import { UserResponse } from "@/types/user";

export interface LoginResponse {
	user: Omit<UserResponse, "phone" | "createdAt">;
}

// ─── API ────────────────────────────────────────────────
export const authApi = {
	login: (payload: LoginPayload) =>
		apiClient.post<LoginResponse>("/auth/login", payload),

	me: () => apiClient.get<UserResponse>("/auth/me"),

	logout: () => apiClient.post("/auth/logout", {}),
};
