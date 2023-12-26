import { SectionEntry } from "./DependencyManager";
export interface IForgeBuildPlugin {
    $start(entry: string, manifest: Record<string, unknown>, BuildOptions: Record<string, unknown>): Promise<void>;
    $header(content: string): Promise<string>;
    $section(content: string, sectionEntry: SectionEntry): Promise<string>;
    $footer(content: string): Promise<string>;
    $complete(content: string): Promise<string>;
}
export declare class ForgeBuildPlugin implements IForgeBuildPlugin {
    private _source;
    constructor(source: string | unknown & object);
    $start(entry: string, inputs: Record<string, unknown>, buildOptions: Record<string, unknown>): Promise<void>;
    $header(content: string): Promise<string>;
    $section(content: string, sectionEntry: SectionEntry): Promise<string>;
    $footer(content: string): Promise<string>;
    $complete(content: string): Promise<string>;
}
//# sourceMappingURL=ForgeBuildPlugin.d.ts.map