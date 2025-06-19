import Link from "next/link";
import { getColorFromMap, isColorKey } from "~/server/utils";
import { api } from "~/trpc/server";

export default async function Page({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;
	const projects = await api.asana.getProjects();
	const filteredProjects = projects.filter((project) => project.color === name);
	return (
		<div>
			<div
				className="my-8 min-w-sm rounded-lg border border-stone-400 p-4 shadow-md"
				style={{
					backgroundColor: isColorKey(name) ? getColorFromMap(name) : undefined,
					color: isColorKey(name)
						? Number.parseInt(getColorFromMap(name).replace("#", ""), 16) >
							0xffffff / 2
							? "#333"
							: "#FFF"
						: undefined,
				}}
			>
				<ul className="grid list-disc grid-cols-1 gap-4 pl-5 sm:grid-cols-2">
					{filteredProjects.map((project) => (
						<li key={project.gid} className="py-1">
							<Link href={project.permalink_url} className="hover:underline">
								{project.name?.trim() || "Unnamed Project"}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
