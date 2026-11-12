export const createUnionGuard = <const T extends readonly unknown[]>(
    values: T,
    isEqual: (a: unknown, b: T[number]) => boolean = (a, b) => a === b
) =>
    (value: unknown): value is T[number] =>
        values.some(item => isEqual(value, item));