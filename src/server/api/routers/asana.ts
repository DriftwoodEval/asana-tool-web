import z from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { redis } from "~/server/redis";
const Asana = require("asana");

const client = Asana.ApiClient.instance;
const token = client.authentications.token;
token.accessToken = env.ASANA_TOKEN;
const workspaceId = env.ASANA_WORKSPACE;

const opts = {
	opt_fields: "name,color,permalink_url,notes,offset",
	workspace: workspaceId,
	limit: 100,
	archived: false,
};

const cacheKey = "asana-projects";

export const asanaRouter = createTRPCRouter({
	getProjects: protectedProcedure
		.input(z.object({ forceRefresh: z.boolean() }).optional())
		.query(async ({ input }) => {
			const forceRefresh = input?.forceRefresh ?? false;
			if (forceRefresh) {
				await redis.del(cacheKey);
			}
			const cachedData = await redis.get(cacheKey);
			if (cachedData) {
				return JSON.parse(cachedData);
			}
			const projectsApiInstance = new Asana.ProjectsApi();
			// biome-ignore lint/suspicious/noExplicitAny: Asana API is not typed
			let projectsData: any[] = [];
			let projectsResponse = await projectsApiInstance.getProjects(opts);
			projectsData = projectsData.concat(projectsResponse.data);
			let offset = projectsResponse._response.next_page.offset;
			while (offset) {
				const optsWithOffset = {
					...opts,
					offset: offset,
				};
				projectsResponse =
					await projectsApiInstance.getProjects(optsWithOffset);
				projectsData = projectsData.concat(projectsResponse.data);
				if (!projectsResponse._response.next_page) {
					offset = null;
				} else {
					offset = projectsResponse._response.next_page.offset;
				}
			}

			await redis.setex(cacheKey, 300, JSON.stringify(projectsData)); // Expires after 5 minutes
			return projectsData;
		}),
});
