export declare class Tree<T = unknown> {
    private _instanceSet;
    private _parentMap;
    private _childMap;
    private _traversalSet;
    [Symbol.iterator](): Iterator<T>;
    traverse(instance: T, traversal?: Set<T>): Set<T>;
    add(instance: T): this;
    add(instance: T, parent: T): this;
    remove(instance: T): this;
    parent(child: T, parent: T): this;
    children(instance: T): Set<T>;
    siblings(instance: T): Set<T>;
    compile(): void;
    ancestry(instance: T): T[];
    depth(): number;
    has(instance: T): boolean;
    clear(): T[];
}
//# sourceMappingURL=Tree.d.ts.map