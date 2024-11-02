import type { Prisma, PrismaClient } from "@prisma/client";
import { type CreatedRestaurant, type RestaurantId, toCreatedRestaurant } from "@src/restaurant/restaurant";
import { nullToUndefined } from "@src/utils/nullToUndefined";

export const findRestaurantById = async (prisma: PrismaClient, id: RestaurantId): Promise<CreatedRestaurant> => {
	const restaurant = await prisma.restaurant.findUniqueOrThrow({
		where: {
			id,
		},
	});

	return toCreatedRestaurant(nullToUndefined(restaurant));
};

export const findManyRestaurants = async (
	prisma: PrismaClient,
	where?: Prisma.RestaurantWhereInput,
): Promise<CreatedRestaurant[]> => {
	const restaurants = await prisma.restaurant.findMany({
		where,
	});
	return restaurants.map((restaurant) => toCreatedRestaurant(nullToUndefined(restaurant)));
};

export const createRestaurant = async (
	prisma: PrismaClient,
	restaurant: CreatedRestaurant,
): Promise<CreatedRestaurant> => {
	await prisma.restaurant.create({
		data: {
			id: restaurant.id,
			name: restaurant.name,
			phoneNumber: restaurant.phoneNumber,
			address: restaurant.address,
			building: restaurant.building,
			nearestStation: restaurant.nearestStation,
			access: restaurant.access,
			closedDay: restaurant.closedDay,
			serviceChargeRate: restaurant.serviceChargeRate,
			coverCharge: restaurant.coverCharge,
			introductionTitle: restaurant.introductionTitle,
			introductionContent: restaurant.introductionContent,
		},
	});

	return restaurant;
};

export const updateRestaurant = async (
	prisma: PrismaClient,
	restaurant: CreatedRestaurant,
): Promise<CreatedRestaurant> => {
	await prisma.restaurant.update({
		where: {
			id: restaurant.id,
		},
		data: {
			name: restaurant.name,
			phoneNumber: restaurant.phoneNumber,
			address: restaurant.address,
			building: restaurant.building,
			nearestStation: restaurant.nearestStation,
			access: restaurant.access,
			closedDay: restaurant.closedDay,
			serviceChargeRate: restaurant.serviceChargeRate,
			coverCharge: restaurant.coverCharge,
			introductionTitle: restaurant.introductionTitle,
			introductionContent: restaurant.introductionContent,
		},
	});

	return restaurant;
};

export const softDeleteRestaurant = async (prisma: PrismaClient, id: RestaurantId): Promise<void> => {
	await prisma.restaurant.update({
		where: {
			id,
		},
		data: {
			isDeleted: true,
		},
	});
};
