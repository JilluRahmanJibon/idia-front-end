import { z } from "zod";

// ─── Login Schema ────────────────────────────────────────────────────────────
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Register Schema ─────────────────────────────────────────────────────────
export const registerSchema = z
	.object({
		fullName: z
			.string()
			.min(1, "Full name is required")
			.min(2, "Name must be at least 2 characters")
			.max(60, "Name must be under 60 characters")
			.regex(/^[a-zA-Z\s'\-]+$/, "Name may only contain letters"),

		phone: z
			.string()
			.min(1, "Phone number is required")
			.regex(
				/^\+?[0-9\s\-()\-.]{7,20}$/,
				"Enter a valid phone number (e.g. +880 1X XXXX XXXX)",
			),

		email: z
			.string()
			.min(1, "Email is required")
			.email("Enter a valid email address"),

		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Include at least one uppercase letter")
			.regex(/[0-9]/, "Include at least one number")
			.regex(/[^A-Za-z0-9]/, "Include at least one special character"),

		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterFormValues = z.infer<typeof registerSchema>;
