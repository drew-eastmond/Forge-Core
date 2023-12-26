type NodeData = {
    id: string;
    title: string;
    children: NodeData[];
};
/**
 * @constructor { NodeData[] } - dependencies
 */
export declare class DependencySorter {
    private _dependencies;
    private _count;
    constructor(dependencies?: NodeData[]);
    [Symbol.iterator](): Iterator<NodeData>;
    private _has;
    private _indexOf;
    private _spliceDependency;
    /**
     * intersect :
     *
     *
     * @param { string[] } inputs - This is supplied from the esbuild/typescript during each build step
     */
    intersect(inputs: string[]): NodeData[];
    remove(file: string): void;
    load(dependencies: NodeData[]): this;
}
export {};
//# sourceMappingURL=DependencySorter.d.ts.map