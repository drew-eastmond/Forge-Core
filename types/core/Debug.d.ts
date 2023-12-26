declare global {
    interface Console {
        parse(...rest: unknown[]): void;
    }
}
export declare enum DebugForeground {
    Black = "\u001B[30m",
    Red = "\u001B[31m",
    Green = "\u001B[32m",
    Yellow = "\u001B[33m",
    Blue = "\u001B[34m",
    Magenta = "\u001B[35m",
    Cyan = "\u001B[36m",
    White = "\u001B[37m",
    Bright = "\u001B[1m",
    Dim = "\u001B[2m",
    Underscore = "\u001B[4m",
    Blink = "\u001B[5m",
    Reverse = "\u001B[7m",
    Hidden = "\u001B[8m",
    BrightBlack = "\u001B[30m;1m",
    BrightRed = "\u001B[31m;1m",
    BrightGreen = "\u001B[32m;1m",
    BrightYellow = "\u001B[33m;1m",
    BrightBlue = "\u001B[34m;1m",
    BrightMagenta = "\u001B[35m;1m",
    BrightCyan = "\u001B[36m;1m",
    BrightWhite = "\u001B[37m;1m"
}
export declare enum DebugBackground {
    Black = "\u001B[40m",
    Red = "\u001B[41m",
    Green = "\u001B[42m",
    Yellow = "\u001B[43m",
    Blue = "\u001B[44m",
    Magenta = "\u001B[45m",
    Cyan = "\u001B[46m",
    White = "\u001B[47m",
    Grey = "\u001B[40m",
    BrightBlack = "\u001B[40;1m",
    BrightRed = "\u001B[41;1m",
    BrightGreen = "\u001B[42;1m",
    BrightYellow = "\u001B[43;1m",
    BrightBlue = "\u001B[44;1m",
    BrightMagenta = "\u001B[45;1m",
    BrightCyan = "\u001B[46;1m",
    BrightWhite = "\u001B[47;1m"
}
export declare const ColourFormattingReset: string;
declare class ColourFormatting<T> {
    private _debugFormatter;
    private stack;
    private _defaultColour;
    constructor(debugFormatter: DebugFormatter);
    constructor(debugFormatter: DebugFormatter, defaultColour: string);
    size(): number;
    current(): string | T;
    clear(): void;
    push(value: T | "\u001b[0m"): DebugFormatter;
    pop(): DebugFormatter;
}
export declare class DebugFormatter {
    static Init(options: {
        platform: "node" | "browser";
        "default"?: {
            "foreground"?: string;
            background?: string;
        };
    }): void;
    foreground: ColourFormatting<DebugForeground>;
    fg: ColourFormatting<DebugForeground>;
    background: ColourFormatting<DebugBackground>;
    bg: ColourFormatting<DebugBackground>;
    stream: string;
    constructor();
    clear(): this;
    write(value: string): this;
    reset(): this;
    parse(input: string): this;
}
export {};
//# sourceMappingURL=Debug.d.ts.map