type EnforceableValue = unknown | Promise<unknown>;
type EnforceableInquiry = Promise<unknown> | (($value: EnforceableValue) => Promise<unknown>);
export declare function $Enforce<T = unknown[]>($values: EnforceableValue[], $inquiries: EnforceableInquiry): Promise<T>;
export declare function $Enforce<T = unknown[]>($values: EnforceableValue[], $inquiries: EnforceableInquiry[]): Promise<T>;
export declare function Enforce(values: any, inquiries: any): void;
export {};
//# sourceMappingURL=Enforcement.d.ts.map