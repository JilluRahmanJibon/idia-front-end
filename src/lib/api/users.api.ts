import { RegisterPayload } from "@/features/auth/types";
import { apiClient } from "@/services/apiClient";
import { UserResponse } from "@/types/user";

export const usersApi = {
	register: (payload: RegisterPayload) =>
		apiClient.post<UserResponse>("/users", payload),

	getById: (id: string) => apiClient.get<UserResponse>(`/users/${id}`),

	updateProfile: (payload: { name: string; phone: string }) =>
		apiClient.patch<UserResponse>("/users/profile", payload),

	changePassword: (payload: { currentPassword: string; newPassword: string }) =>
		apiClient.patch("/users/change-password", payload),

	deleteAccount: () => apiClient.delete("/users/me"),
};
