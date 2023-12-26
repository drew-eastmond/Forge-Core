declare const spawn: any, fork: any, exec: any, execSync: any;
declare class ForgeGit {
    static $IsWorkingTree(): Promise<boolean>;
    static $Clone(url: string): Promise<boolean>;
    static $Submodule(url: string, target: string): Promise<boolean>;
    static $Place(url: string, target: string): Promise<boolean>;
}
//# sourceMappingURL=ForgeGit.d.ts.map