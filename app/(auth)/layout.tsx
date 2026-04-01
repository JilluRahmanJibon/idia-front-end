import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Customer — Authentication",
	description: "Sign in or create your customer account",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
