import { OpenAPIHono, createRoute as honoRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import { getPrismaInstance } from "@src/db/prisma";
import {
	createRestaurant,
	createdRestaurant,
	newRestaurant,
	restaurantId,
	toRestaurantId,
} from "@src/restaurant/restaurant";
import {
	createRestaurant as createRestaurantToDB,
	findManyRestaurants,
	findRestaurantById,
	updateRestaurant as updateRestaurantToDB,
} from "@src/restaurant/restaurantRepository";
import { errorResponse } from "@src/utils/errorResponse";
import { env } from "hono/adapter";

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
			description: "created",
			content: {
				"application/json": {
					schema: createdRestaurant,
				},
			},
		},
		400: {
			description: "bad request",
			content: {
				"application/json": {
					schema: errorResponse,
				},
			},
		},
	},
});

const updateRoute = honoRoute({
	description: "店舗情報更新",
	method: "put",
	path: "/:id",
	request: {
		body: {
			description: "更新する店舗",
			content: {
				"application/json": {
					schema: createdRestaurant,
				},
			},
		},
	},
	responses: {
		200: {
			description: "ok",
			content: {
				"application/json": {
					schema: createdRestaurant,
				},
			},
		},
		400: {
			description: "bad request",
			content: {
				"application/json": {
					schema: errorResponse,
				},
			},
		},
	},
});

const findOneRoute = honoRoute({
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
		404: {
			description: "not found",
			content: {
				"application/json": {
					schema: errorResponse,
				},
			},
		},
	},
});

const findManyRoute = honoRoute({
	description: "店舗一覧取得",
	method: "get",
	path: "/",
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: z.array(createdRestaurant),
				},
			},
		},
	},
});

const app = new OpenAPIHono();

app.openapi(createRoute, async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
	const prisma = getPrismaInstance(DATABASE_URL);

	const newRestaurant = c.req.valid("json");
	const createdModel = createRestaurant(newRestaurant);
	const savedModel = await createRestaurantToDB(prisma, createdModel);

	return c.json(savedModel, 201);
});
app.openapi(updateRoute, async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
	const prisma = getPrismaInstance(DATABASE_URL);

	const restaurantId = toRestaurantId(c.req.param("id"));

	await findRestaurantById(prisma, restaurantId);

	const updateRestaurant = c.req.valid("json");
	const updated = await updateRestaurantToDB(prisma, updateRestaurant);

	return c.json(updated, 200);
});
app.openapi(findOneRoute, async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
	const prisma = getPrismaInstance(DATABASE_URL);

	const restaurantId = toRestaurantId(c.req.param("id"));

	const model = await findRestaurantById(prisma, restaurantId);

	return c.json(model, 200);
});
app.openapi(findManyRoute, async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
	const prisma = getPrismaInstance(DATABASE_URL);

	const models = await findManyRestaurants(prisma);

	return c.json(models, 200);
});

export default app;
