import { zValidator } from "@hono/zod-validator";
import { GENDER, createGuest, validateGuest } from "@src/guest/guest";
import { saveGuest } from "@src/guest/guestRepository";
import { Hono } from "hono";
import { ok } from "neverthrow";
import { z } from "zod";

const app = new Hono();

app.post(
	"/",
	zValidator(
		"json",
		z.object({
			name: z.string(),
			email: z.string(),
			gender: z.union([z.literal(GENDER.MEN), z.literal(GENDER.WOMEN)]),
			birthYear: z.number(),
			birthMonth: z.number(),
			birthDay: z.number(),
			postCode: z.number(),
		}),
	),
	async (c) => {
		const request = c.req.valid("json");

		return ok(request)
			.map(validateGuest)
			.map(createGuest)
			.asyncAndThen(saveGuest)
			.match(
				(guest) =>
					c.json({
						ok: true,
						guest,
					}),
				(error) => c.json({ ok: false, error: error.message }, 500),
			);
	},
);

export default app;
