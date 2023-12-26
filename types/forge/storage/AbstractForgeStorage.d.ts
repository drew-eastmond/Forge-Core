import { Serialize } from "../../core/Core";
interface IForgeStorage {
}
export declare class ForgeStorage implements IForgeStorage {
    private _in;
    private _out;
    private _$ready;
    constructor();
    [Symbol.asyncIterator](): AsyncGenerator<Serialize, any, unknown>;
    $write(serialize: Serialize): Promise<void>;
    $read(): Promise<Serialize>;
    $flush(): Promise<this>;
}
export {};
//# sourceMappingURL=AbstractForgeStorage.d.ts.map