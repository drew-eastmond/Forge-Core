/// <reference types="node" />
import { Serialize } from "../core/Core";
import { Subscription } from "../core/Subscription";
import { IServiceAdapter } from "./service/AbstractServiceAdapter";
interface IClientDelegate {
    $execute(...data: Serialize[]): Promise<Serialize>;
}
declare class AbstractDelegate implements IClientDelegate {
    protected _$delegate: Function;
    constructor($delegate: Function);
    $execute(...data: Serialize[]): Promise<Serialize>;
}
export declare class ResetDelegate extends AbstractDelegate {
}
export declare class ExecuteDelegate extends AbstractDelegate {
}
export declare class RouteDelegate extends AbstractDelegate {
}
export declare class ForgeClient extends Subscription {
    protected _race: number;
    protected _executing: boolean;
    protected _queue: [];
    protected _routeRoot: string;
    protected _iServiceAdapter: IServiceAdapter;
    protected _filters: Set<string>;
    protected _delegates: Set<{}>;
    constructor(key: string, data: Record<string, unknown>, options?: {
        race?: number;
    });
    private _$raceDispatch;
    private _$subscribeMessage;
    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
    $reset(data: Serialize, race: number): Promise<Serialize>;
    $execute(signal: string, data: Serialize, race: number): Promise<Serialize>;
    $watch(data: Serialize, race: number): Promise<Serialize>;
    $route(route: string, parameters: Serialize[], race: number): Promise<{
        mime: string;
        contents: Buffer;
    }>;
}
export {};
//# sourceMappingURL=ForgeClient.d.ts.map