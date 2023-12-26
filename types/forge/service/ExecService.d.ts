import { Serialize } from "../../core/Core";
import { AbstractServiceAdapter, ServiceConfig } from "./AbstractServiceAdapter";
export declare class ExecService extends AbstractServiceAdapter {
    private _source;
    private _command;
    private _config;
    constructor(name: string, config: ServiceConfig);
    private _injectCommand;
    write(header: Serialize, data: Serialize): void;
    $signal(signal: string, data: Serialize, race: number): Promise<Serialize>;
}
//# sourceMappingURL=ExecService.d.ts.map