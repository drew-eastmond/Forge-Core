import { Serialize } from "../../core/Core";
import { AbstractServiceAdapter, ServiceConfig } from "./AbstractServiceAdapter";
export declare class SpawnService extends AbstractServiceAdapter {
    private _source;
    private _commands;
    constructor(name: string, config: ServiceConfig, source?: any);
    private _onExit;
    write(header: Serialize, ...data: Serialize[]): void;
}
//# sourceMappingURL=SpawnService.d.ts.map