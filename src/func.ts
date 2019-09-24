
export type Func<P extends any[] = any[], R = any> = (...args: P) => R;
export type Params<F extends Func> = F extends Func<infer P, any> ? P : never;
export type Return<F extends Func> = F extends Func<any[], infer R> ? R : never;
