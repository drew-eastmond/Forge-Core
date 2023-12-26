import { Serialize } from "../core/Core";
import { IAction } from "./action/ForgeAction";
import { ForgeTask } from "./ForgeTask";
export declare class ForgeStream {
    private readonly _tasks;
    private readonly _iActions;
    private readonly _bindings;
    private _signal;
    private _data;
    readonly settled: Set<IAction>;
    readonly resolves: Set<IAction>;
    readonly rejections: Set<IAction>;
    constructor();
    private _thenRaced$Execute;
    private _$catchRaced$Execute;
    get actions(): Iterable<[string, IAction]>;
    get signal(): string;
    get data(): Serialize;
    add(forgeTask: ForgeTask): this;
    find(taskName: string, actionName: string): IAction;
    $reset(): Promise<Serialize>;
    $signal(signal: string, data?: Serialize, race?: number): Promise<Serialize>;
}
//# sourceMappingURL=ForgeStream.d.ts.map