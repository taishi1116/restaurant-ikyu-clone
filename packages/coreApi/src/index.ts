import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import restaurant from "./restaurant/route";

const app = new OpenAPIHono();

const port = 3000;

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "一休レストランAPI",
	},
});

app.get(
	"/reference",
	apiReference({
		spec: {
			url: "/doc",
		},
	}),
);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/restaurants", restaurant);

serve({
	fetch: app.fetch,
	port,
});
