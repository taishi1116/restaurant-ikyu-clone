import { PrismaClient } from "@prisma/client";
import { env } from "hono/adapter";

export const getPrismaInstance = (databaseUrl: string): PrismaClient =>
	new PrismaClient({
		datasourceUrl: databaseUrl,
	});
