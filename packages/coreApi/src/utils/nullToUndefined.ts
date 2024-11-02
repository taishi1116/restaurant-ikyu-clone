type NonNullableValue<T> = T extends null ? undefined : T;
type NonNullableObject<T> = {
	[Key in keyof T]: T[Key] extends object ? NonNullableObject<T[Key]> : NonNullableValue<T[Key]>;
};

export const nullToUndefined = <T>(obj: T): NonNullableObject<T> =>
	JSON.parse(JSON.stringify(obj), (_, v) => (v === null ? undefined : v));
