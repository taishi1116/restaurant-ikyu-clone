import { z } from "@hono/zod-openapi";

export const errorResponse = z.object({
	requestId: z.string().describe("リクエストID"),
	errors: z
		.array(
			z.object({
				code: z.string().describe("HTTPステータスコード"),
				message: z.string().describe("開発者向けエラーメッセージ"),
			}),
		)
		.describe("エラーレスポンス"),
});
