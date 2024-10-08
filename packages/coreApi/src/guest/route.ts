import { zValidator } from "@hono/zod-validator";
import {
	GENDER,
	createGuest,
	toGuestId,
	toValidateGuest,
	updateGuestBirthDay,
	updateGuestBirthMonth,
	updateGuestBirthYear,
	updateGuestEmail,
	updateGuestGender,
	updateGuestName,
	updateGuestPostCode,
} from "@src/guest/guest";
import { findGuestById, saveGuest } from "@src/guest/guestRepository";
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
			.map(toValidateGuest)
			.map(createGuest)
			.asyncAndThen(saveGuest)
			.match(
				(_) =>
					c.json(
						{
							ok: true,
						},
						201,
					),
				// todo 本当はここで全てのエラーケースを検出してエラーハンドリング
				(error) => c.json({ ok: false, error: error.message }, 500),
			);
	},
);

app.put(
	"/:id",
	zValidator("query", z.object({ id: z.string() })),
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
		const query = c.req.valid("query");
		const request = c.req.valid("json");

		const input = toValidateGuest(request);

		return ok(toGuestId(query.id))
			.asyncAndThen(findGuestById)
			.map((guest) => updateGuestName(guest, input.name))
			.map((guest) => updateGuestEmail(guest, input.email))
			.map((guest) => updateGuestGender(guest, input.gender))
			.map((guest) => updateGuestBirthYear(guest, input.birthYear))
			.map((guest) => updateGuestBirthMonth(guest, input.birthMonth))
			.map((guest) => updateGuestBirthDay(guest, input.birthDay))
			.map((guest) => updateGuestPostCode(guest, input.postCode))
			.match(
				(_) =>
					c.json(
						{
							ok: true,
						},
						204,
					),
				// todo 本当はここで全てのエラーケースを検出してエラーハンドリング
				(error) => c.json({ ok: false, error: error.message }, 500),
			);
	},
);

export default app;
