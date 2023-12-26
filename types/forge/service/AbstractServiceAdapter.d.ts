/// <reference types="node" />
import { $Promise, Serialize } from "../../core/Core";
import { ISubscription, Subscription } from "../../core/Subscription";
declare enum StdioOption {
    Pipe = "pipe",
    Inherit = "inherit",
    Silent = "silent"
}
export type ServiceConfig = {
    command?: string;
    debounce?: number;
    stdio?: string;
    race?: number | Record<string, number>;
    key?: string;
    reboot?: boolean;
    route_root?: string;
};
export interface IServiceAdapter extends ISubscription {
    read(message: [string, Record<string, unknown>, Serialize]): void;
    write(header: Record<string, unknown>, data: Serialize): void;
    resolve(header: Record<string, unknown>, data: Serialize): void;
    reject(header: Record<string, unknown>, data: Serialize): void;
    $reset(data: Serialize): Promise<Serialize>;
    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
    $reboot(): any;
}
export declare class AbstractServiceAdapter extends Subscription implements IServiceAdapter {
    protected _name: string;
    protected _key: string;
    protected _reboot: boolean;
    protected _stdio: StdioOption;
    protected readonly _race: Map<RegExp, number>;
    protected readonly _sessions: Map<string, $Promise<unknown>>;
    protected readonly _bindings: Map<Function, Function>;
    constructor(name: string, config: ServiceConfig);
    protected _getRace(signal: string): number;
    protected _pipeStdio(message: string): void;
    protected _pipeError(message: string): void;
    read(message: [string, Record<string, unknown>, Serialize]): boolean;
    write(header: Record<string, unknown>, data: Serialize): void;
    resolve(header: Record<string, unknown>, data: Serialize): void;
    reject(header: Record<string, unknown>, data: Serialize): void;
    $reset(data: Serialize): Promise<Serialize>;
    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
    $reboot(): Promise<void>;
    $route(route: string, params: Serialize): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
export {};
//# sourceMappingURL=AbstractServiceAdapter.d.ts.map