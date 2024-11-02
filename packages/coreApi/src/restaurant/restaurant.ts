import { z } from "@hono/zod-openapi";
import { generateId } from "@src/utils/generateId";

export const restaurantId = z.string().uuid().brand("RestaurantId").describe("店舗ID");
const name = z.string().brand("RestaurantName").describe("店舗名");
const phoneNumber = z.string().brand("PhoneNumber").describe("電話番号");
const address = z.string().brand("Address").describe("住所");
const building = z.string().optional().brand("Building").describe("建物名");
const nearestStation = z.string().optional().brand("NearestStation").brand("最寄り駅");
const access = z.string().brand("Access").describe("アクセス");
const closedDay = z.string().brand("ClosedDay").describe("土曜日・日曜日などのフリーテキスト入力の仕様なのでstring");
const serviceChargeRate = z.number().nonnegative().max(100).brand("ServiceChargeRate").describe("サービス料金(%)");
const coverCharge = z.number().nonnegative().brand("CoverCharge").describe("チャージ料金");
const introductionTitle = z.string().max(35).brand("IntroductionTitle").describe("店舗紹介タイトル");
const introductionContent = z.string().max(200).brand("IntroductionDetail").describe("店舗紹介詳細");

const restaurant = z
	.object({
		id: restaurantId,
		name: name,
		phoneNumber: phoneNumber,
		address: address,
		building: building,
		nearestStation: nearestStation,
		access: access,
		closedDay: closedDay,
		serviceChargeRate: serviceChargeRate,
		coverCharge: coverCharge,
		introductionTitle: introductionTitle,
		introductionContent: introductionContent,
	})
	.strict();

export const newRestaurant = restaurant.omit({ id: true }).brand("NewRestaurant").openapi("NewRestaurant");
export const createdRestaurant = restaurant.brand("CreatedRestaurant").openapi("CreatedRestaurant");

const generateRestaurantId = () => toRestaurantId(generateId());

export const toRestaurantId = (input: string): RestaurantId => restaurantId.parse(input);
export const toRestaurantName = (input: string): Name => name.parse(input);
export const toPhoneNumber = (input: string): PhoneNumber => phoneNumber.parse(input);
export const toAddress = (input: string): Address => address.parse(input);
export const toBuilding = (input?: string): Building => building.parse(input);
export const toNearestStation = (input?: string): NearestStation => nearestStation.parse(input);
export const toAccess = (input: string): Access => access.parse(input);
export const toClosedDay = (input: string): ClosedDay => closedDay.parse(input);
export const toServiceChargeRate = (input: number): ServiceChargeRate => serviceChargeRate.parse(input);
export const toCoverCharge = (input: number): CoverCharge => coverCharge.parse(input);
export const toIntroductionTitle = (input: string): IntroductionTitle => introductionTitle.parse(input);
export const toIntroductionContent = (input: string): IntroductionContent => introductionContent.parse(input);

export type RestaurantId = z.infer<typeof restaurantId>;
type Name = z.infer<typeof name>;
type PhoneNumber = z.infer<typeof phoneNumber>;
type Address = z.infer<typeof address>;
type Building = z.infer<typeof building>;
type NearestStation = z.infer<typeof nearestStation>;
type Access = z.infer<typeof access>;
type ClosedDay = z.infer<typeof closedDay>;
type ServiceChargeRate = z.infer<typeof serviceChargeRate>;
type CoverCharge = z.infer<typeof coverCharge>;
type IntroductionTitle = z.infer<typeof introductionTitle>;
type IntroductionContent = z.infer<typeof introductionContent>;
type Restaurant = z.infer<typeof restaurant>;

export type NewRestaurant = z.infer<typeof newRestaurant>;
export type NewRestaurantInput = z.input<typeof newRestaurant>;
export type CreatedRestaurant = z.infer<typeof createdRestaurant>;
export type CreatedRestaurantInput = z.input<typeof createdRestaurant>;

export const toNewRestaurant = (input: NewRestaurantInput): NewRestaurant => {
	return newRestaurant.parse({
		name: toRestaurantName(input.name),
		phoneNumber: toPhoneNumber(input.phoneNumber),
		address: toAddress(input.address),
		building: toBuilding(input.building),
		nearestStation: toNearestStation(input.nearestStation),
		access: toAccess(input.access),
		closedDay: toClosedDay(input.closedDay),
		serviceChargeRate: toServiceChargeRate(input.serviceChargeRate),
		coverCharge: toCoverCharge(input.coverCharge),
		introductionTitle: toIntroductionTitle(input.introductionTitle),
		introductionContent: toIntroductionContent(input.introductionContent),
	});
};

export const toCreatedRestaurant = (input: CreatedRestaurantInput): CreatedRestaurant => {
	return createdRestaurant.parse({
		id: toRestaurantId(input.id),
		name: toRestaurantName(input.name),
		phoneNumber: toPhoneNumber(input.phoneNumber),
		address: toAddress(input.address),
		building: toBuilding(input.building),
		nearestStation: toNearestStation(input.nearestStation),
		access: toAccess(input.access),
		closedDay: toClosedDay(input.closedDay),
		serviceChargeRate: toServiceChargeRate(input.serviceChargeRate),
		coverCharge: toCoverCharge(input.coverCharge),
		introductionTitle: toIntroductionTitle(input.introductionTitle),
		introductionContent: toIntroductionContent(input.introductionContent),
	});
};

export const createRestaurant = (input: NewRestaurant): CreatedRestaurant => {
	return createdRestaurant.parse({
		id: generateRestaurantId(),
		name: input.name,
		phoneNumber: input.phoneNumber,
		address: input.address,
		building: input.building,
		nearestStation: input.nearestStation,
		access: input.access,
		closedDay: input.closedDay,
		serviceChargeRate: input.serviceChargeRate,
		coverCharge: input.coverCharge,
		introductionTitle: input.introductionTitle,
		introductionContent: input.introductionContent,
	});
};

export const updateRestaurantName = (restaurant: CreatedRestaurant, name: Name): CreatedRestaurant => ({
	...restaurant,
	name,
});

export const updatePhoneNumber = (restaurant: CreatedRestaurant, phoneNumber: PhoneNumber): CreatedRestaurant => ({
	...restaurant,
	phoneNumber,
});

export const updateAddress = (restaurant: CreatedRestaurant, address: Address): CreatedRestaurant => ({
	...restaurant,
	address,
});

export const updateBuilding = (restaurant: CreatedRestaurant, building: Building): CreatedRestaurant => ({
	...restaurant,
	building,
});

export const updateNearestStation = (
	restaurant: CreatedRestaurant,
	nearestStation: NearestStation,
): CreatedRestaurant => ({
	...restaurant,
	nearestStation,
});

export const updateAccess = (restaurant: CreatedRestaurant, access: Access): CreatedRestaurant => ({
	...restaurant,
	access,
});

export const updateClosedDay = (restaurant: CreatedRestaurant, closedDay: ClosedDay): CreatedRestaurant => ({
	...restaurant,
	closedDay,
});

export const updateServiceChargeRate = (
	restaurant: CreatedRestaurant,
	serviceChargeRate: ServiceChargeRate,
): CreatedRestaurant => ({
	...restaurant,
	serviceChargeRate,
});

export const updateCoverCharge = (restaurant: CreatedRestaurant, coverCharge: CoverCharge): CreatedRestaurant => ({
	...restaurant,
	coverCharge,
});

export const updateIntroductionTitle = (
	restaurant: CreatedRestaurant,
	introductionTitle: IntroductionTitle,
): CreatedRestaurant => ({
	...restaurant,
	introductionTitle,
});

export const updateIntroductionContent = (
	restaurant: CreatedRestaurant,
	introductionContent: IntroductionContent,
): CreatedRestaurant => ({
	...restaurant,
	introductionContent,
});
