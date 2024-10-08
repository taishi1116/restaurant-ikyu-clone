import type { CreatedGuest, GuestId } from "@src/guest/guest";
import { type ResultAsync, ok, okAsync } from "neverthrow";

/**
 * 一旦型定義だけの実装
 */

export const findGuestById = (id: GuestId): ResultAsync<CreatedGuest, Error> => {
	return any;
};

export const saveGuest = (guest: CreatedGuest): ResultAsync<CreatedGuest, Error> => {
	return any;
};
