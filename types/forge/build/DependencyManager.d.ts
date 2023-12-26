type ImportEntrty = {
    path: string;
    kind: "require-call" | "import-statement";
    original?: string;
    external?: boolean;
};
export type SectionEntry = {
    file: string;
    code: string;
    bytes: number;
    imports: ImportEntrty[];
    format: "cjs" | "esm";
};
export declare class DependencyManager {
    private _fileManifest;
    private _dependencyHelper;
    private _inputs;
    entry: string;
    header: string;
    footer: string;
    private readonly _sectionMap;
    get sections(): SectionEntry[];
    constructor(entry: string, inputs: Record<string, unknown>);
    private _sanitizeFileUrl;
    set code(val: string);
    has(file: string): boolean;
    load(dependencies: Record<string, unknown>[]): this;
}
export {};
//# sourceMappingURL=DependencyManager.d.ts.map