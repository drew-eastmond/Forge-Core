import { Serialize } from "../../core/Core";
import { AbstractServiceAdapter, ServiceConfig } from "./AbstractServiceAdapter";
export declare class PluginService extends AbstractServiceAdapter {
    private _source;
    private _commands;
    constructor(name: string, config: ServiceConfig, source?: any);
    write(header: Serialize, data: Serialize): void;
    $reset(data: Serialize, race?: number): Promise<Serialize>;
    $signal(signal: string, data: Serialize, race: number): Promise<Serialize>;
}
//# sourceMappingURL=PluginService.d.ts.map