import { apiClient } from "./client";

export interface RegisterPayload {
	name: string;
	email: string;
	phone?: string;
	password: string;
}

export interface UserResponse {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
	createdAt: string;
}

export const usersApi = {
	register: (payload: RegisterPayload) =>
		apiClient.post<UserResponse>("/users", payload),

	getById: (id: string) => apiClient.get<UserResponse>(`/users/${id}`),
};
