import { Serialize } from "../core/Core";
import { Forge } from "./Forge";
import { ActionConfig, IAction } from "./action/ForgeAction";
export type TaskConfig = {
    name: string;
    enabled: boolean;
    actions: ActionConfig[];
};
export declare class ForgeTask {
    private _forge;
    private readonly _iActions;
    private _enabled;
    private _data;
    name: string;
    constructor(forge: Forge, config?: Record<string, unknown>);
    data(): any;
    actions(): Map<string, IAction>;
    $reset(data: Serialize): Promise<Serialize>;
    add(iAction: IAction): this;
    parse(configObj: any): void;
}
//# sourceMappingURL=ForgeTask.d.ts.map