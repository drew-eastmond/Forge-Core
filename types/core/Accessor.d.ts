export declare class Accessor {
    private _source;
    private _seperator;
    private _entries;
    constructor(source: Record<string, unknown>, seperator?: string);
    /**
     * Iterates via Object.entries(...) on the internal _args property
     *
     * @generator
     * @yields {[string, unknown]}
     */
    [Symbol.iterator](): Iterator<{
        access: string;
        value: unknown;
    }>;
    has(accessor: string[]): boolean;
    extract(accessor: string[]): unknown;
    parse(query: string): unknown;
    inject(input: string, regExp: RegExp, delegate?: (match: string, access: string) => string): string;
}
//# sourceMappingURL=Accessor.d.ts.map