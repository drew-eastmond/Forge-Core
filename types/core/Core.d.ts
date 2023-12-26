export type Attributes = Record<string, unknown>;
export type IntervalClear = ReturnType<typeof setInterval>;
export type TimeoutClear = ReturnType<typeof setTimeout>;
export type Serialize = Record<string, unknown>;
export declare function EmptyFunction(): void;
export declare function EncodeBase64(json: Record<string, unknown>): string;
export declare function DecodeBase64(value: string): any;
export declare function FlattenObject(obj: any, accessor?: string): {
    access: string;
    value: unknown;
}[];
export declare function QuickHash(): string;
export type $Promise<Resolve = unknown, Reject = unknown> = [Promise<Resolve>, Function | ((resolve?: Resolve) => unknown), Function | ((resolve?: Reject) => unknown)];
export declare function $UsePromise<Resolve = unknown, Reject = unknown>(): $Promise<Resolve, Reject>;
export declare function $UseRace<Resolve = unknown, Reject = unknown>(delay: number, capture?: (error: unknown) => unknown): $Promise<Resolve, Reject>;
//# sourceMappingURL=Core.d.ts.map