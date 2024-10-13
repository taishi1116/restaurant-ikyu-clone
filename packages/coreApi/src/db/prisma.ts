import { PrismaClient } from "@prisma/client";

export const prisma = (databaseUrl: string): PrismaClient =>
	new PrismaClient({
		datasourceUrl: databaseUrl,
	});
