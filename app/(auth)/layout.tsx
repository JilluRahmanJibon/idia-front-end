import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Customer — Authentication",
	description: "Sign in or create your customer account",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default AuthLayout;
