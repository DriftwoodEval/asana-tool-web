import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Link from "next/link";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	title: "Asana Tool",
	description: "Internal tool for filtering Asana projects by color",
	icons: [{ rel: "icon", url: "/favicon.svg" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-stone-800 to-stone-900 text-white">
				<div className="absolute top-4 left-4">
					<Link href="/" className="font-extrabold text-3xl tracking-tight">
						Asana Color Filters
					</Link>
				</div>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}
