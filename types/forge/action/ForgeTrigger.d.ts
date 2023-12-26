import { ForgeStream } from "../ForgeStream";
export declare enum ResolverValues {
    Any = "any",
    All = "all"
}
type ActionSearch = {
    task?: string | undefined;
    action: string;
};
export type TriggerData = ({
    signal: string[];
} | {
    watch: (RegExp | string)[];
} | {
    "resolves:any": ActionSearch[];
} | {
    "resolves:all": ActionSearch[];
});
export interface IForgeTrigger {
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
}
export declare function ParseTrigger(triggerData: TriggerData): IForgeTrigger;
export declare class SignalTrigger implements IForgeTrigger {
    private _signals;
    constructor(signal: string[]);
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
}
export declare class WatchTrigger implements IForgeTrigger {
    static ParseWatch(watch: string | RegExp): RegExp;
    private _regExps;
    constructor(regExps: RegExp[]);
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
}
export declare class ResolveTrigger implements IForgeTrigger {
    private _resolver;
    private _resolves;
    constructor(resolver: ResolverValues, resolves: {
        task?: string | undefined;
        action: string;
    }[]);
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
}
export declare class RejectTrigger implements IForgeTrigger {
    private _resolver;
    private _resolves;
    constructor(resolver: ResolverValues, resolves: {
        task?: string | undefined;
        action: string;
    }[]);
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
}
export declare class SettledTrigger implements IForgeTrigger {
    private _resolver;
    private _allSettled;
    constructor(resolver: ResolverValues, resolves: {
        task?: string | undefined;
        action: string;
    }[]);
    $trigger(forgeStream: ForgeStream): Promise<boolean>;
}
export {};
//# sourceMappingURL=ForgeTrigger.d.ts.map