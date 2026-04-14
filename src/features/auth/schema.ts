import { z } from "zod";

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerSchema = z
	.object({
		fullName: z
			.string()
			.min(1, "Full name is required")
			.min(2, "Name must be at least 2 characters")
			.max(60, "Name is too long"),
		phone: z
			.string()
			.min(1, "Phone number is required")
			.regex(/^\+?[0-9\s\-()]{7,20}$/, "Please enter a valid phone number"),
		email: z
			.string()
			.min(1, "Email is required")
			.email("Please enter a valid email address"),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterFormValues = z.infer<typeof registerSchema>;
