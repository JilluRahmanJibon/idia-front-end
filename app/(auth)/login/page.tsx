"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { LoginFormValues, loginSchema } from "@/lib/validations/auth.schema";
import { BrandPanel } from "@/components/ui/BrandPanel";
import { FormField } from "@/components/ui/FormField";

 

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		setIsLoading(true);
		try {
			// Replace with your actual auth logic (e.g. NextAuth signIn, API call)
			console.log("Login payload:", data);
			await new Promise(r => setTimeout(r, 1200)); // simulate network
			// router.push("/dashboard");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="flex min-h-screen">
			<BrandPanel />

			{/* ── Form panel ── */}
			<div className="flex-1 bg-brand-white flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
				<div className="w-full max-w-[400px] animate-fade-up">
					{/* Mobile logo */}
					<div className="lg:hidden text-center mb-10">
						<h1 className="font-serif text-4xl font-semibold text-brand-navy">
							Aurum
						</h1>
						<p className="font-serif italic text-brand-gold text-sm mt-1">
							Where elegance meets excellence
						</p>
					</div>

					{/* Header */}
					<div className="mb-8">
						<h2 className="font-serif text-[32px] font-semibold text-brand-navy leading-tight">
							Welcome back
						</h2>
						<p className="text-sm text-brand-black/50 mt-1.5 font-light">
							Sign in to your account to continue
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5"
						noValidate>
						<FormField
							label="Email address"
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
							error={errors.email?.message}
							{...register("email")}
						/>

						<FormField
							label="Password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password"
							autoComplete="current-password"
							error={errors.password?.message}
							rightElement={
								<button
									type="button"
									onClick={() => setShowPassword(v => !v)}
									className="text-brand-black/30 hover:text-brand-gold-dark transition-colors p-1"
									aria-label={showPassword ? "Hide password" : "Show password"}>
									{showPassword ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							}
							{...register("password")}
						/>

						{/* Forgot password */}
						<div className="flex justify-end -mt-2">
							<Link
								href="/forgot-password"
								className="text-[11px] text-brand-gold-dark hover:text-brand-gold transition-colors tracking-wide">
								Forgot password?
							</Link>
						</div>

						{/* Submit */}
						<button
							type="submit"
							disabled={isLoading}
							className="
                relative w-full py-3.5 mt-2
                bg-brand-navy text-brand-white
                text-sm font-medium tracking-widest uppercase
                rounded-[6px] transition-all duration-200
                hover:bg-[#252550] active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-brand-gold focus-visible:ring-offset-2
              ">
							{isLoading ? (
								<span className="flex items-center justify-center gap-2">
									<span className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
									Signing in…
								</span>
							) : (
								<span className="flex items-center justify-center gap-2">
									<LogIn className="w-4 h-4" />
									Sign In
								</span>
							)}
						</button>
					</form>

					{/* Ornamental divider */}
					<div className="ornament-divider my-7 text-brand-gold/40 text-[9px]">
						✦
					</div>

					{/* Footer */}
					<p className="text-center text-sm text-brand-black/50">
						Don&apos;t have an account?{" "}
						<Link
							href="/register"
							className="text-brand-gold-dark font-medium hover:text-brand-gold transition-colors">
							Create one
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
