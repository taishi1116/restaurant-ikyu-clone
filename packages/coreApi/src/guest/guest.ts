import type { NewType } from "@src/types/newType";
import { generateId } from "@src/utils/generateId";
import { type Result, ok } from "neverthrow";

const generateGuestId = () => toGuestId(generateId());

export const GENDER = {
	MEN: "men",
	WOMEN: "women",
} as const;

export type Men = "men";
type Women = "women";
export type Gender = (typeof GENDER)[keyof typeof GENDER];

export type GuestId = NewType<"GuestId", string>;
type GuestName = NewType<"GuestName", string>;
type GuestEmail = NewType<"GuestEmail", string>;
type GuestGender = NewType<"GuestGender", Gender>;
type GuestBirthYear = NewType<"GuestBirthYear", number>;
type GuestBirthMonth = NewType<"GuestBirthMonth", number>;
type GuestBirthDay = NewType<"GuestBirthDay", number>;
type PostCode = NewType<"PostCode", number>;

// 未検証のゲスト情報
export type UnValidateGuest = {
	name: string;
	email: string;
	gender: Gender;
	birthYear: number;
	birthMonth: number;
	birthDay: number;
	postCode: number;
};

// 検証されたゲスト情報(ただしdbに登録されているかは不明)
export type ValidatedGuest = {
	name: GuestName;
	email: GuestEmail;
	gender: GuestGender;
	birthYear: GuestBirthYear;
	birthMonth: GuestBirthMonth;
	birthDay: GuestBirthDay;
	postCode: PostCode;
};

/**
 * 作成済みゲスト情報
 * note おそらく作成済みゲストと決済未設定ゲストは違うはず
 */
export type CreatedGuest = {
	id: GuestId;
	name: GuestName;
	email: GuestEmail;
	gender: GuestGender;
	birthYear: GuestBirthYear;
	birthMonth: GuestBirthMonth;
	birthDay: GuestBirthDay;
	postCode: PostCode;
};

//  todo idがulidか?メアドがメアド形式か?誕生日の年の桁数が正しいか?などのバリデーションがあるはず
export const toGuestId = (id: string): GuestId => id as GuestId;
const toGuestName = (name: string): GuestName => name as GuestName;
const toGuestEmail = (email: string): GuestEmail => email as GuestEmail;
const toGender = (gender: Men | Women): GuestGender => gender as GuestGender;
const toGuestBirthYear = (year: number): GuestBirthYear => year as GuestBirthYear;
const toGuestBirthMonth = (month: number): GuestBirthMonth => month as GuestBirthMonth;
const toGuestBirthDay = (day: number): GuestBirthDay => day as GuestBirthDay;
const toGuestPostCode = (code: number): PostCode => code as PostCode;

type ToUnValidateGuest = (guest: ValidatedGuest) => UnValidateGuest;

export const toUnValidateGuest: ToUnValidateGuest = (guest) => {
	return {
		name: guest.name,
		email: guest.email,
		gender: guest.gender,
		birthYear: guest.birthYear,
		birthMonth: guest.birthMonth,
		birthDay: guest.birthDay,
		postCode: guest.postCode,
	};
};

type ValidateGuest = (guest: UnValidateGuest) => ValidatedGuest;

export const toValidateGuest: ValidateGuest = (guest) => {
	return {
		name: toGuestName(guest.name),
		email: toGuestEmail(guest.email),
		gender: toGender(guest.gender),
		birthYear: toGuestBirthYear(guest.birthYear),
		birthMonth: toGuestBirthMonth(guest.birthMonth),
		birthDay: toGuestBirthDay(guest.birthDay),
		postCode: toGuestPostCode(guest.postCode),
	};
};

type CreateGuest = (guest: ValidatedGuest) => CreatedGuest;

export const createGuest: CreateGuest = (guest) => {
	return {
		...guest,
		id: generateGuestId(),
	};
};

export const updateGuestName = (guest: CreatedGuest, name: GuestName): CreatedGuest => {
	return {
		...guest,
		name,
	};
};

export const updateGuestEmail = (guest: CreatedGuest, email: GuestEmail): CreatedGuest => {
	return {
		...guest,
		email,
	};
};

export const updateGuestGender = (guest: CreatedGuest, gender: GuestGender): CreatedGuest => {
	return {
		...guest,
		gender,
	};
};

export const updateGuestBirthYear = (guest: CreatedGuest, birthYear: GuestBirthYear): CreatedGuest => {
	return {
		...guest,
		birthYear,
	};
};

export const updateGuestBirthMonth = (guest: CreatedGuest, birthMonth: GuestBirthMonth): CreatedGuest => {
	return {
		...guest,
		birthMonth,
	};
};

export const updateGuestBirthDay = (guest: CreatedGuest, birthDay: GuestBirthDay): CreatedGuest => {
	return {
		...guest,
		birthDay,
	};
};

export const updateGuestPostCode = (guest: CreatedGuest, postCode: PostCode): CreatedGuest => {
	return {
		...guest,
		postCode,
	};
};
