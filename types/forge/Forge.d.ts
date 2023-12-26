import { Serialize } from "../core/Core";
import { ForgeTask } from "./ForgeTask";
import { ForgeServer } from "./server/ForgeServer";
import { IServiceAdapter, ServiceConfig } from "./service/AbstractServiceAdapter";
export declare class Forge {
    static Search(glob: string): void;
    private _forgeServer;
    private readonly _taskMap;
    private readonly _ignoreArr;
    private readonly _forgeStream;
    readonly services: Map<string, IServiceAdapter>;
    constructor();
    private _buildService;
    parse(input: string, options?: {}): Record<string, unknown>;
    tasks(): Map<string, ForgeTask>;
    add(forgeTask: ForgeTask): this;
    spawn(name: string, config?: ServiceConfig): IServiceAdapter;
    fork(name: string, config?: ServiceConfig): IServiceAdapter;
    worker(name: string, config: ServiceConfig): IServiceAdapter;
    exec(name: string, config: ServiceConfig): IServiceAdapter;
    plugin(name: string, config: ServiceConfig): IServiceAdapter;
    watch(glob: string[], options: {
        ignore: string[];
        debounce?: number;
        throttle?: number;
    }): void;
    $reset(data: Serialize, race?: number): Promise<Serialize>;
    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
    abort(): void;
    $serve(port: number, base: string): Promise<ForgeServer>;
    $load(): Promise<void>;
    $save(): Promise<void>;
}
//# sourceMappingURL=Forge.d.ts.map