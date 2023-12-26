/// <reference types="node" />
declare class ForgeFile {
    static $FileExist(file: string): Promise<boolean>;
    static $DirectoryExists(path: string): Promise<boolean>;
    static $MakeDirectory(path: string): Promise<boolean>;
    static $Read(path: string): Promise<Buffer>;
    static $Write(path: string, contents: any): Promise<boolean>;
}
declare class ForgeWeb {
    static $Fetch(url: string, options: Record<string, unknown>): Promise<Response>;
}
export declare class ForgeIO {
    static readonly File: typeof ForgeFile;
    static readonly Web: typeof ForgeWeb;
    $FileExist(file: string): Promise<boolean>;
    static $DirectoryExists(path: string): Promise<boolean>;
    static $MakeDirectory(path: string): Promise<boolean>;
    static $Download(url: string, file: string): Promise<boolean>;
    static $UnZip(compressedData: Uint8Array, directory: string): Promise<boolean>;
}
export {};
//# sourceMappingURL=ForgeIO.d.ts.map