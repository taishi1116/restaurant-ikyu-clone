declare const __newType: unique symbol;

/**
 * nominal typeを実現するための型
 * @see {@link https://typescript-jp.gitbook.io/deep-dive/main-1/nominaltyping#intfsuno}
 */
export type NewType<Constructor, Type> = Type & { readonly [__newType]: Constructor };
