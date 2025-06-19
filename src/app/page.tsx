import Link from "next/link";

import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";

import { getColorFromMap, isColorKey } from "~/server/utils";

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

	const projects = await api.asana.getProjects();

	let colors: { color: string; count: number }[] = [];
	for (const project of projects) {
		if (project.color) {
			const existingColor = colors.find(
				(color) => color.color === project.color,
			);
			if (existingColor) {
				existingColor.count++;
			} else {
				colors.push({ color: project.color, count: 1 });
			}
		}
	}

	colors = colors.sort((a, b) => b.count - a.count);

	return (
		<HydrateClient>
			<main>
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
						{colors.map((color) => {
							if (isColorKey(color.color)) {
								return (
									<Link
										key={color.color}
										href={`/color/${color.color}`}
										style={{
											backgroundColor: getColorFromMap(color.color),
											color:
												Number.parseInt(
													getColorFromMap(color.color).replace("#", ""),
													16,
												) >
												0xffffff / 2
													? "#333"
													: "#FFF",
										}}
										className="flex max-w-xs flex-col gap-4 rounded-xl p-4 transition-all duration-150 hover:scale-105"
									>
										<h3 className="font-bold text-2xl">
											{color.count} {color.count === 1 ? "Project" : "Projects"}
										</h3>
									</Link>
								);
							}
						})}
					</div>
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
