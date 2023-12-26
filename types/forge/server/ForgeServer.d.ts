/// <reference types="node" />
import { Forge } from "../Forge";
import { IForgeModel } from "../model/ForgeModel";
import { IForgeRoute } from "./route/ForgeRoute";
type StoreEntry = {
    mime: string;
    buffer: Buffer;
};
export declare function $ParseRequestBody(request: any): Promise<{
    mime: string;
    buffer: Buffer;
}>;
export declare class RequestBodyParser {
    private _buffers;
    private _request;
    private _$buffer;
    private _onData;
    constructor(request: any);
    private _onEnd;
    $resolve(): Promise<{
        mime: string;
        buffer: Buffer;
    }>;
}
export declare class ForgeRouteRequest {
    private _uri;
    private _urlParsed;
    private _header;
    private _body;
    contructor(uri: string, header: any, body: any): void;
}
export declare class ForgeServer {
    private _forge;
    private _app;
    private _base;
    private _debouncer;
    private readonly _routeSet;
    private readonly _database;
    private _iForgeStorage;
    constructor(forge: Forge, port: number, base: string);
    private _saveBackup;
    private _$setupServer;
    $keys(partitionName: string): Promise<string[]>;
    $save(partitionName: string, key: string, mime: string, buffer: Buffer): Promise<void>;
    $load(partitionName: string, key: string): Promise<StoreEntry>;
    add(overload: IForgeRoute | IForgeModel): this;
    use(delegate: Function): void;
}
export {};
//# sourceMappingURL=ForgeServer.d.ts.map