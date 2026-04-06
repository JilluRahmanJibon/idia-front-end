export interface NavUser {
	name: string;
	email: string;
	avatar?: string | null;
	role?: "USER" | "ADMIN" | "OWNER";
}
