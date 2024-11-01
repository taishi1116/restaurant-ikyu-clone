import { describe, expect, test } from "vitest";
import { nullToUndefined } from "./nullToUndefined";

describe("nullToUndefined", () => {
	test("null値をundefinedに変換する", () => {
		const input = { a: null, b: 1, c: "test" };
		const expected = { a: undefined, b: 1, c: "test" };
		expect(nullToUndefined(input)).toEqual(expected);
	});

	test("null以外の値を変更しない", () => {
		const input = { a: 0, b: false, c: "", d: [], e: {} };
		const expected = { a: 0, b: false, c: "", d: [], e: {} };
		expect(nullToUndefined(input)).toEqual(expected);
	});

	test("ネストされたオブジェクト内のnull値を処理する", () => {
		const input = { a: { b: null, c: 2 }, d: null };
		const expected = { a: { b: undefined, c: 2 }, d: undefined };
		expect(nullToUndefined(input)).toEqual(expected);
	});

	test("配列内のnull値を処理する", () => {
		const input = [null, 1, "test", { a: null }];
		const expected = [undefined, 1, "test", { a: undefined }];
		expect(nullToUndefined(input)).toEqual(expected);
	});

	test("null値がない場合、同じオブジェクトを返す", () => {
		const input = { a: 1, b: "test", c: true };
		const expected = { a: 1, b: "test", c: true };
		expect(nullToUndefined(input)).toEqual(expected);
	});
});
