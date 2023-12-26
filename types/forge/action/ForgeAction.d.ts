/// <reference types="node" />
import { Serialize } from "../../core/Core";
import { Subscription } from "../../core/Subscription";
import { ForgeStream } from "../ForgeStream";
import { ForgeTask } from "../ForgeTask";
import { IForgeRoute, RouteConfig } from "../server/route/ForgeRoute";
import { IServiceAdapter } from "../service/AbstractServiceAdapter";
import { IForgeTrigger, TriggerData } from "./ForgeTrigger";
/**
 * The raw data from a JSON for action data. Pulled from a `.Forge` or supplied from a developer
 *
 * @typedef {Object} ActionData
 *
 * @property {TriggerData[]}  triggers - An array of data to instantiate a set of `IForgeTriggers`.
 * @property {string}  service - Binds this action to a service provided by the `Forge` instance.
 * @property {(string|undefined)}  name - (optional) the default error message.
 * @property {(boolean|undefined)}  enabled - (optional) A callback to transform the supplied value for an aurgument.
 * @property {(number|undefined)}  race - (optional) The alloted time to finish an action.
 * @property {(boolean|undefined)}  route - (optional) Used by `ForgeServer` to determine if an `IAction` should attempt to route a `signal`.
 *
 */
export type ActionData = {
    triggers: TriggerData[];
    service: string;
    name?: string;
    enabled?: boolean;
    race?: number;
    route?: RouteConfig;
};
/**
 * The raw data from a JSON for action data. Pulled from a `.Forge` or supplied from a developer
 *
 * @typedef {Object} ActionConfig
 *
 * @property {(string|undefined)}  name - (optional) the default error message.
 * @property {(boolean|undefined)}  enabled - (optional) A callback to transform the supplied value for an aurgument.
 * @property {(number|undefined)}  race - (optional) The alloted time to finish an action.
 * @property {({service: string}|{local: string}|{remote: string})}  route - (optional) Used by `ForgeServer` to determine if an `IAction` should attempt to route a `signal`.
 *
 */
export type ActionConfig = {
    name?: string;
    enabled: boolean;
    race: number;
    route: RouteConfig;
};
export interface IAction {
    name: string;
    task: ForgeTask;
    route: IForgeRoute;
    $reset(data: Serialize): Promise<Serialize>;
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
    $stream(stdoutCallback: (message: string | string[]) => void, stderrCallback?: (error: string | string[]) => void): Promise<void>;
    $route(url: string, request: any): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
    write(...rest: Serialize[]): void;
    add(overload: IForgeTrigger): this;
}
/**
 * ForgeAction is the base class to eval signal dispatching from triggers, dispatch `$signals`, route requests, or stream output during `ForgeStream.$signal( ... )`
 *
 */
export declare class ForgeAction extends Subscription implements IAction {
    static Parse(iServiceAdapter: IServiceAdapter, actionData: ActionData, data: Record<string, unknown>): IAction;
    protected _iServiceAdapter: IServiceAdapter;
    protected _data: any;
    protected _startTime: number;
    protected _race: number;
    protected _cancelable: boolean;
    protected readonly _bindings: Map<Function, Function>;
    protected _iForgeTriggers: Set<IForgeTrigger>;
    stdout: [string, number][];
    stderr: [string, number][];
    name: string;
    enabled: boolean;
    task: ForgeTask;
    route: IForgeRoute;
    constructor(iServiceAdapter: IServiceAdapter, actionConfig: ActionConfig, data: Record<string, unknown>);
    protected _subscribeBroadcast(notify: string, header: any, data: any): void;
    protected _subscribeMessage(notify: string, header: Record<string, unknown>, ...data: Serialize[]): void;
    add(overload: IForgeTrigger): this;
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
    $reset(data: Serialize): Promise<Serialize>;
    $stream(stdoutCallback: (message: string | string[]) => void, stderrCallback?: (error: string | string[]) => void): Promise<void>;
    write(header: Record<string, unknown>, data: Serialize): void;
    $route(route: string, params: Serialize): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
//# sourceMappingURL=ForgeAction.d.ts.map