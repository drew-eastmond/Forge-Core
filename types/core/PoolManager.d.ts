export interface IPoolable {
    init(...rest: unknown[]): void;
    reclaim(): void;
}
export declare class PoolManager {
    private static __ClassMap;
    static Instantiate<T>(constructor: Function | (new () => T), ...rest: unknown[]): T;
    static Reclaim(instance: any): void;
}
//# sourceMappingURL=PoolManager.d.ts.map