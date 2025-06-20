import Link from "next/link";

import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

import ColorList from "./_components/colorList";

export default async function Home() {
	const session = await auth();
	if (!session) {
		return (
			<Link
				href={session ? "/api/auth/signout" : "/api/auth/signin"}
				className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
			>
				{session ? "Sign out" : "Sign in"}
			</Link>
		);
	}



	return (
		<HydrateClient>
			<main>
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<ColorList />
					<div className="flex flex-col items-center gap-2">
						<div className="flex flex-col items-center justify-center gap-4">
							<Link
								href={session ? "/api/auth/signout" : "/api/auth/signin"}
								className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
							>
								{session ? "Sign out" : "Sign in"}
							</Link>
						</div>
					</div>
				</div>
			</main>
		</HydrateClient>
	);
}
