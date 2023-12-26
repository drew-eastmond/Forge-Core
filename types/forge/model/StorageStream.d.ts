/// <reference types="node" />
import { Tree } from "../../core/collection/Tree";
import { ForgeStore } from "./ForgeModel";
export interface IForgeStorageStream {
}
export declare class FileStorageStream {
    private _$buffer;
    constructor(file: string, options: {
        format: string;
    });
    $resolve(tree: Tree): Promise<Iterable<ForgeStore>>;
    $write(buffer: Buffer): Promise<void>;
}
//# sourceMappingURL=StorageStream.d.ts.map