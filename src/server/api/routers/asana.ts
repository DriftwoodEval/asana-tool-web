import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
const Asana = require("asana");
const fs = require("node:fs");

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

export const asanaRouter = createTRPCRouter({
	getProjects: protectedProcedure.query(async () => {
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
			projectsResponse = await projectsApiInstance.getProjects(optsWithOffset);
			projectsData = projectsData.concat(projectsResponse.data);
			if (!projectsResponse._response.next_page) {
				offset = null;
			} else {
				offset = projectsResponse._response.next_page.offset;
			}
		}
		return projectsData;
	}),
});
