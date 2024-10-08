import type { NewType } from "@src/types/newType";
import { generateId } from "@src/utils/generateId";

type Men = "men";
type Women = "women";

type GuestId = NewType<"GuestId", string>;
type GuestName = NewType<"GuestName", string>;
type GuestEmail = NewType<"GuestEmail", string>;
type Gender = NewType<"GuestGender", Men | Women>;
type GuestBirthYear = NewType<"GuestBirthYear", number>;
type GuestBirthMonth = NewType<"GuestBirthMonth", number>;
type GuestBirthDay = NewType<"GuestBirthDay", number>;
type PostCode = NewType<"PostCode", number>;
// type PaymentId = NewType<"PaymentId", string>;

type UnValidateGuest = {
	name: string;
	email: string;
	gender: Men | Women;
	birthYear: number;
	birthMonth: number;
	birthDay: number;
	postCode: number;
};

type ValidatedGuest = {
	name: GuestName;
	email: GuestEmail;
	gender: Gender;
	birthYear: GuestBirthYear;
	birthMonth: GuestBirthMonth;
	birthDay: GuestBirthDay;
	postCode: PostCode;
};

//  note おそらく作成済みゲストと決済未設定ゲストは違うはず
type CreatedGuest = {
	id: GuestId;
	name: GuestName;
	email: GuestEmail;
	gender: Gender;
	birthYear: GuestBirthYear;
	birthMonth: GuestBirthMonth;
	birthDay: GuestBirthDay;
	postCode: PostCode;
};

type Guest = UnValidateGuest | CreatedGuest | ValidatedGuest;

const toGuestId = (id: string): GuestId => id as GuestId;
const toGuestName = (name: string): GuestName => name as GuestName;
const toGuestEmail = (email: string): GuestEmail => email as GuestEmail;
const toGender = (gender: Men | Women): Gender => gender as Gender;
const toGuestBirthYear = (year: number): GuestBirthYear => year as GuestBirthYear;
const toGuestBirthMonth = (month: number): GuestBirthMonth => month as GuestBirthMonth;
const toGuestBirthDay = (day: number): GuestBirthDay => day as GuestBirthDay;
const toGuestPostCode = (code: number): PostCode => code as PostCode;

export const validateGuest = (guest: UnValidateGuest): ValidatedGuest => {
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

export const createGuest = (guest: Omit<ValidatedGuest, "id">): CreatedGuest => {
	return {
		...guest,
		id: toGuestId(generateId()),
	};
};

export const changeGuestName =
	(guest: CreatedGuest) =>
	(name: GuestName): CreatedGuest => {
		return {
			...guest,
			name,
		};
	};

export const changeGuestEmail =
	(guest: CreatedGuest) =>
	(email: GuestEmail): CreatedGuest => {
		return {
			...guest,
			email,
		};
	};

export const updateGuestGender =
	(guest: CreatedGuest) =>
	(gender: Gender): CreatedGuest => {
		return {
			...guest,
			gender,
		};
	};

export const updateGuestBirthYear =
	(guest: CreatedGuest) =>
	(birthYear: GuestBirthYear): CreatedGuest => {
		return {
			...guest,
			birthYear,
		};
	};

export const updateGuestBirthMonth =
	(guest: CreatedGuest) =>
	(birthMonth: GuestBirthMonth): CreatedGuest => {
		return {
			...guest,
			birthMonth,
		};
	};

export const updateGuestBirthDay =
	(guest: CreatedGuest) =>
	(birthDay: GuestBirthDay): CreatedGuest => {
		return {
			...guest,
			birthDay,
		};
	};

export const updatePostCode =
	(guest: CreatedGuest) =>
	(postCode: PostCode): CreatedGuest => {
		return {
			...guest,
			postCode,
		};
	};
