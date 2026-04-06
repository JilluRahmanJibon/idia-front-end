import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/src/components/shared/Footer";
import { Providers } from "@/src/context/Providers";
import Navbar from "@/src/components/shared/Navbar";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "IdiaDesigns – %s",
		default: "IdiaDesigns — Where Elegance Meets Excellence",
	},
	description: "Premium motion graphics, templates, and digital assets.",
	icons: {
		icon: "/favicon.svg",
	},
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
			<body>
				<Providers>
					<Navbar />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
