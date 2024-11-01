import { OpenAPIHono, createRoute as honoRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import { createdRestaurant, newRestaurant, restaurantId } from "@src/restaurant/restaurant";

const createRoute = honoRoute({
	description: "新規店舗登録",
	method: "post",
	path: "/",
	request: {
		body: {
			description: "新規登録する店舗",
			content: {
				"application/json": {
					schema: newRestaurant,
				},
			},
		},
	},
	responses: {
		201: {
			description: "登録完了",
			content: {
				"application/json": {
					schema: createdRestaurant,
				},
			},
		},
	},
});

const findRestaurantRoute = honoRoute({
	description: "特定の店舗取得",
	method: "get",
	path: "/:id",
	request: {
		params: z.object({
			id: restaurantId,
		}),
	},
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: createdRestaurant,
				},
			},
		},
	},
});

const app = new OpenAPIHono();

// todo
app.openapi(createRoute, (c) => {});
app.openapi(findRestaurantRoute, (c) => {});

export default app;
