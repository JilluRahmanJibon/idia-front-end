"use client";

import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, UserResponse } from "../lib/api/auth.api";

interface AuthContextType {
	user: UserResponse | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	refetch: () => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	const { data: user, isLoading } = useQuery({
		queryKey: ["auth-user"],
		queryFn: () => authApi.me(),
		retry: false,  
		staleTime: 5 * 60 * 1000, 
	});
	console.log("🚀 ~ AuthProvider ~ user:", user)

	const refetch = async () => {
		await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
	};

	const logout = async () => {
		await authApi.logout();
		queryClient.setQueryData(["auth-user"], null);
	};

	return (
		<AuthContext.Provider
			value={{
				user: user ?? null,
				isLoading,
				isAuthenticated: !!user,
				refetch,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
