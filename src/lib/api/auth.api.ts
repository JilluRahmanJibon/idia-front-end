import { apiClient } from "./client";

export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
		status: string;
		avatar: string | null;
	};
}

export interface UserResponse {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: string;
	status: string;
	avatar: string | null;
	createdAt: string;
}

export const authApi = {
	login: (payload: LoginPayload) =>
		apiClient.post<LoginResponse>("/auth/login", payload),

	me: () => apiClient.get<UserResponse>("/auth/me"),

	logout: () => apiClient.post("/auth/logout", {}),
};
