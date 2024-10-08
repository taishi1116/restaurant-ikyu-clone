import type { CreatedGuest, GuestId } from "@src/guest/guest";
import { type ResultAsync, ok, okAsync } from "neverthrow";

export const getGuestById = async (guestId: GuestId) => {
	return {};
};

type SaveGuest = (guest: CreatedGuest) => ResultAsync<CreatedGuest, Error>;

export const saveGuest: SaveGuest = async (guest) => {
	return okAsync(guest);
};
