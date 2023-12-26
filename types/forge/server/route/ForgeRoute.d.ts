/// <reference types="node" />
import { IAction } from "../../action/ForgeAction";
type RequestDelegate = Function;
declare enum RequestMethod {
    Post = 0,
    Get = 1,
    All = 2
}
export interface IForgeRoute {
    $install(express: any): Promise<void>;
    authorize(uri: string): boolean;
    $resolve(request: any, response: any, next: Function): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
export declare class RouteConfig {
    request: string | RegExp;
    method: RequestMethod;
    race: number;
    action: IAction;
    remote: {
        url: string;
        get: Record<string, string | number>;
        post: Record<string, string | number>;
    };
    local: string;
    $delegate: Function;
    constructor(configData: Record<string, unknown>);
}
declare class RouteResolver {
    private _value;
    private _cache;
    constructor(value: string | RegExp);
    resolve(uri: string): boolean;
}
export declare class GenericRoute implements IForgeRoute {
    static Parse(configData: Record<string, unknown>): IForgeRoute;
    protected _resolver: RouteResolver;
    protected _method: RequestMethod;
    protected _$delegate: RequestDelegate;
    protected _race: number;
    constructor(config: RouteConfig, ...rest: unknown[]);
    set $delegate($delegate: Function);
    protected _$parseRequest(request: any): Promise<{
        get: Record<string, unknown>;
        post: Record<string, unknown>;
        request: Record<string, unknown>;
    }>;
    $install(express: any): Promise<void>;
    authorize(uri: string): boolean;
    $resolve(request: any, response: any, next: Function): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
export declare class ActionRoute extends GenericRoute {
    private _iAction;
    action(iAction: IAction): this;
    $resolve(request: any, response: any, next: Function): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
export declare class DelegateRoute extends GenericRoute {
    constructor(config: RouteConfig, $delegate: RequestDelegate, simplifyParams?: boolean);
}
export declare class RemoteRoute extends GenericRoute {
    private _base;
    base(base: string): this;
    $resolve(request: any, response: any, next: Function): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
export declare class LocalRoute extends GenericRoute {
    private _base;
    base(route: RouteConfig, base: string): this;
    $resolve(request: any, response: any, next: Function): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
export {};
//# sourceMappingURL=ForgeRoute.d.ts.map