declare module "@onyx-ignition/forge-core" {
	export declare class Accessor {
	    private _source;
	    private _seperator;
	    private _entries;
	    constructor(source: Record<string, unknown>, seperator?: string);
	    /**
	     * Iterates via Object.entries(...) on the internal _args property
	     *
	     * @generator
	     * @yields {[string, unknown]}
	     */
	    [Symbol.iterator](): Iterator<{
	        access: string;
	        value: unknown;
	    }>;
	    has(accessor: string[]): boolean;
	    extract(accessor: string[]): unknown;
	    parse(query: string): unknown;
	    inject(input: string, regExp: RegExp, delegate?: (match: string, access: string) => string): string;
	}
	
		/**
	 * Use to store data about how to parse an argument
	 *
	 * @typedef {Object} ValidationEntry
	 *
	 * @property {(unknown|undefined)}  default - The default value if none is provided.
	 * @property {(boolean|undefined)}  required - Is this argument required. Provide an error if `undefined`.
	 * @property {(error|undefined)}  error - Overrides the default error message.
	 * @property {(Function|undefined)}  sanitize - (optional) A callback to transform the supplied value for an aurgument.
	 * @property {(Function|undefined)}  validate - (optional) A callback to evaluate if the value if valid otherwise it will provide a error.
	 *
	 */
	type ValidationEntry = {
	    default?: unknown;
	    required?: boolean;
	    error?: string;
	    sanitize?: (value: unknown, args: Record<string, unknown>) => unknown;
	    validate?: (value: unknown, args: Record<string, unknown>) => boolean | Error;
	};
	export interface IArguments {
	    get(): unknown;
	    get(key?: string): unknown;
	    get(key?: string): unknown;
	    add(key: string, config: ValidationEntry): this;
	    compile(): void;
	}
	/**
	 * Provides a base to store validation data and arguments formatted as a Record.
	 * After the subclass populates the arguments store, and add validation for each key.
	 * The `compile` member will test each key, and throw an error before resolving all validation queries.
	 *
	 */
	declare class AbstractArguments implements IArguments {
	    protected readonly _args: Record<string, unknown>;
	    protected readonly _validationMap: Map<string | RegExp, ValidationEntry>;
	    protected readonly _errors: string[];
	    constructor();
	    /**
	     * Iterates via Object.entries(...) on the internal _args property
	     *
	     * @generator
	     * @yields {[string, unknown]}
	     */
	    [Symbol.iterator](): Iterator<[string, unknown]>;
	    /**
	     * This function will
	     *      1. Inject a default if no value is provided
	     *      2. Test if it is a required parameter, or add to internal errors
	     *      3. Sanitize the value via the `validation.validator` delegate
	     *
	     * @param key {string} The key extracted from parsing
	     * @param value {unknown} The value extracted from parsing
	     * @param validation {ValidationEntry} Provides info for default, is required, and a validator to sanitize the
	     * @returns {unknown} If the `validation` param has a delegate then it will sanitize value.
	     */
	    protected _validate(key: string | RegExp, value: unknown, validation: ValidationEntry): unknown;
	    /**
	     * Find the requested key in the internal args members. Can evaluate using `String` or `RegExp`
	     *
	     * @param key {string|RegExp} Optional
	     * @returns {boolean}
	     */
	    has(key: string | RegExp): boolean;
	    /**
	     * Getter that will return the value associated with the key, or the arguments collection {Record<string, unknown>)
	     * if a RegExp the is passed then this function will returnt he first value that matches.
	     * if a string is pass then the value of the indexed value will be returned.
	     * if no value is passed then the whole arg object is returned.
	     *
	     * @param key {string|RegExp|undefined} Optional
	     * @returns {unknown} DO l really need to explain this
	     */
	    get(): unknown;
	    get(key: string | RegExp): unknown;
	    /**
	     * Assigns a validation check to specific arguments via the key provided
	     *
	     * @param key {string|RegExp} A string or RegExp to match the Arguments and dispatch delegate
	     * @param validationEntry {ValidationEntry}
	     * @returns {this} return this so you can daisy chain calls
	     */
	    add(key: string | RegExp, validationEntry: ValidationEntry): this;
	    /**
	     * Subclasses are responsible for assigning a data source (CLI, .Env, Remote/Server) into a arguments {Record<string, unknown>}
	     *      1. After using `add` member to set all the validation entries.
	     *      2. `compile` will validate/sanitize each entry. If there any errors then join all errors messages into a single Error and throw it!
	     */
	    compile(): void;
	}
	/**
	 * Populates the arguments store based on values parsed from the CommandLine Interface.
	 * Parses the `process.argv` using the follwoing formats
	 *      1. {{KEY}} BASE_64_JSON : the second parameter will be auto encoded to a base64 encoded JSON
	 *      2. --KEY : will resolve to a true value if present
	 *      3. --KEY-- VALUE : second paramter resolve into a string. Probably needs to be sanitized in `compile`
	 *
	 * @class
	 */
	export declare class CLIArguments extends AbstractArguments {
	    compile(): void;
	}
	/**
	 * Populates the arguments store based on values parsed from the a .env file
	 * Parses the .env file based on the a simple splitting algorithm
	 *
	 * @class
	 */
	export declare class EnvArguments extends AbstractArguments {
	    /**
	     * Override the base `get` member to fetch values from a combination of the internal argument store and `process.env`
	     * @params key {string} I
	     */
	    get(): unknown;
	    get(key?: string): unknown;
	    /**
	     * Simple split alorithm to populate the arguemnt store
	     * @param contents {string} Content pulled from a .env or similiar formatted content; or you know... DIY if your a smart ass!
	     * @returns {this} Daisy chain this bad boi!
	     */
	    parse(contents: string): this;
	}
	/**
	 * Combines the `CLIArgument` and `EnvArgument` into a composite so development becomes easier. The priority is
	 * CLIArguments then EnvArguments. It's important to call the `parse` memeber for `EnvArgument`
	 * @class
	 */
	export declare class CompositeArguments extends AbstractArguments {
	    private readonly _cliArguments;
	    private readonly _envArguments;
	    compile(): void;
	    /**
	     * Invokes the `EnvArgument.parse ( ... )`
	     *
	     * @param contents
	     * @returns {this}
	     */
	    parse(contents: string): this;
	}
	
	
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
	
		export type Attributes = Record<string, unknown>;
	export type IntervalClear = ReturnType<typeof setInterval>;
	export type TimeoutClear = ReturnType<typeof setTimeout>;
	export type Serialize = Record<string, unknown>;
	export declare function EmptyFunction(): void;
	export declare function EncodeBase64(json: Record<string, unknown>): string;
	export declare function DecodeBase64(value: string): any;
	export declare function FlattenObject(obj: any, accessor?: string): {
	    access: string;
	    value: unknown;
	}[];
	export declare function QuickHash(): string;
	export type $Promise<Resolve = unknown, Reject = unknown> = [Promise<Resolve>, Function | ((resolve?: Resolve) => unknown), Function | ((resolve?: Reject) => unknown)];
	export declare function $UsePromise<Resolve = unknown, Reject = unknown>(): $Promise<Resolve, Reject>;
	export declare function $UseRace<Resolve = unknown, Reject = unknown>(delay: number, capture?: (error: unknown) => unknown): $Promise<Resolve, Reject>;
	
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
	
	
		type EnforceableValue = unknown | Promise<unknown>;
	type EnforceableInquiry = Promise<unknown> | (($value: EnforceableValue) => Promise<unknown>);
	export declare function $Enforce<T = unknown[]>($values: EnforceableValue[], $inquiries: EnforceableInquiry): Promise<T>;
	export declare function $Enforce<T = unknown[]>($values: EnforceableValue[], $inquiries: EnforceableInquiry[]): Promise<T>;
	export declare function Enforce(values: any, inquiries: any): void;
	
	
		export interface IPoolable {
	    init(...rest: unknown[]): void;
	    reclaim(): void;
	}
	export declare class PoolManager {
	    private static __ClassMap;
	    static Instantiate<T>(constructor: Function | (new () => T), ...rest: unknown[]): T;
	    static Reclaim(instance: any): void;
	}
	
		import { IPoolable } from "./PoolManager";
	export type Notification = string | RegExp | unknown;
	export interface ISubscription {
	    hasSubscription(value: Notification): boolean;
	    subscribe(notify: Notification, callback: Function, once?: number): void;
	    unsubscribe(callback: Function): void;
	    notify(notify: Notification, ...rest: unknown[]): void;
	    $notify(notify: Notification, ...rest: unknown[]): Promise<void>;
	    clear(): void;
	    $listen(notify: unknown, callback: Function, race: number): Promise<unknown>;
	}
	/**
	 * If this class is returned from any notifcation dispatch then unsubscribe.
	 *
	 * @class
	 */
	export declare const Unsubscribe: unknown;
	/**
	 * The Subscription class is a core class for implementing the notification pattern via `subscribe` and `notify` members.
	 * This class also has other utility members like $listen for waiting for an notification, and async versions of critical members
	 *
	 * @class
	 */
	export declare class Subscription implements ISubscription, IPoolable {
	    private readonly _subscriberMap;
	    private readonly _countMap;
	    private readonly _unsubscribeSet;
	    /**
	     * Called by the `PoolManager.instantiate(...) to retrieve an instance
	     *
	     * @param rest {...unknown[]} I used the ...rest parameter for inheritance
	     * @implements {IPoolable}
	     */
	    init(...rest: unknown[]): void;
	    /**
	     * Allows the intsance to be return to a pool.
	     *
	     * @param rest {...unknown[]} I used the ...rest parameter for inheritance
	     * @implements {IPoolable}
	     */
	    reclaim(): void;
	    /**
	     * Checks the subscriber store for the
	     * `hasSubscription` is mindful of subclasses that use `has` member
	     *
	     * @param value {Notification} Value to cast to string and compare.
	     * @returns {boolean}
	     */
	    hasSubscription(value: Notification): boolean;
	    /**
	     *
	     *
	     * @param notify {Notification} A key used to invoke the supplied delegate.
	     * @param delegate {Function} The delegate called
	     * @param once {boolean} Deletes the notication entry once it been dispatched
	     */
	    subscribe(notify: Notification, delegate: Function, count?: number): void;
	    unsubscribe(delegate: Function): void;
	    notify(notify: Notification, ...rest: unknown[]): void;
	    $notify(notify: Notification, ...rest: unknown[]): Promise<void>;
	    clear(): void;
	    $listen(notify: unknown, callback: Function): Promise<unknown>;
	    $listen(notify: unknown, callback: Function, race: number): Promise<unknown>;
	}
	
		export declare class Debouncer {
	    private readonly _callbackMap;
	    constructor();
	    debounce(delegate: Function, parameters: unknown[], delay: number): void;
	    reset(): void;
	    clear(): void;
	}
	
		/// <reference types="node" />import { Subscription } from "../../core/Subscription";import { ForgeTask } from "../ForgeTask";import { IServiceAdapter } from "../service/AbstractServiceAdapter";/**
	 * The raw data from a JSON for action data. Pulled from a `.Forge` or supplied from a developer
	 *
	 * @typedef {Object} ActionData
	 *
	 * @property {TriggerData[]}  triggers - An array of data to instantiate a set of `IForgeTriggers`.
	 * @property {string}  service - Binds this action to a service provided by the `Forge` instance.
	 * @property {(string|undefined)}  name - (optional) the default error message.
	 * @property {(boolean|undefined)}  enabled - (optional) A callback to transform the supplied value for an aurgument.
	 * @property {(number|undefined)}  race - (optional) The alloted time to finish an action.
	 * @property {(boolean|undefined)}  route - (optional) Used by `ForgeServer` to determine if an `IAction` should attempt to route a `signal`.
	 *
	 */
	export type ActionData = {
	    triggers: TriggerData[];
	    service: string;
	    name?: string;
	    enabled?: boolean;
	    race?: number;
	    route?: RouteConfig;
	};
	/**
	 * The raw data from a JSON for action data. Pulled from a `.Forge` or supplied from a developer
	 *
	 * @typedef {Object} ActionConfig
	 *
	 * @property {(string|undefined)}  name - (optional) the default error message.
	 * @property {(boolean|undefined)}  enabled - (optional) A callback to transform the supplied value for an aurgument.
	 * @property {(number|undefined)}  race - (optional) The alloted time to finish an action.
	 * @property {({service: string}|{local: string}|{remote: string})}  route - (optional) Used by `ForgeServer` to determine if an `IAction` should attempt to route a `signal`.
	 *
	 */
	export type ActionConfig = {
	    name?: string;
	    enabled: boolean;
	    race: number;
	    route: RouteConfig;
	};
	export interface IAction {
	    name: string;
	    task: ForgeTask;
	    route: IForgeRoute;
	    $reset(data: Serialize): Promise<Serialize>;
	    $trigger(forgeStream: ForgeStream): Promise<boolean>;
	    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
	    $stream(stdoutCallback: (message: string | string[]) => void, stderrCallback?: (error: string | string[]) => void): Promise<void>;
	    $route(url: string, request: any): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	    write(...rest: Serialize[]): void;
	    add(overload: IForgeTrigger): this;
	}
	/**
	 * ForgeAction is the base class to eval signal dispatching from triggers, dispatch `$signals`, route requests, or stream output during `ForgeStream.$signal( ... )`
	 *
	 */
	export declare class ForgeAction extends Subscription implements IAction {
	    static Parse(iServiceAdapter: IServiceAdapter, actionData: ActionData, data: Record<string, unknown>): IAction;
	    protected _iServiceAdapter: IServiceAdapter;
	    protected _data: any;
	    protected _startTime: number;
	    protected _race: number;
	    protected _cancelable: boolean;
	    protected readonly _bindings: Map<Function, Function>;
	    protected _iForgeTriggers: Set<IForgeTrigger>;
	    stdout: [string, number][];
	    stderr: [string, number][];
	    name: string;
	    enabled: boolean;
	    task: ForgeTask;
	    route: IForgeRoute;
	    constructor(iServiceAdapter: IServiceAdapter, actionConfig: ActionConfig, data: Record<string, unknown>);
	    protected _subscribeBroadcast(notify: string, header: any, data: any): void;
	    protected _subscribeMessage(notify: string, header: Record<string, unknown>, ...data: Serialize[]): void;
	    add(overload: IForgeTrigger): this;
	    $trigger(forgeStream: ForgeStream): Promise<boolean>;
	    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
	    $reset(data: Serialize): Promise<Serialize>;
	    $stream(stdoutCallback: (message: string | string[]) => void, stderrCallback?: (error: string | string[]) => void): Promise<void>;
	    write(header: Record<string, unknown>, data: Serialize): void;
	    $route(route: string, params: Serialize): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	
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
	
	
		import { IForgeBuildExtension } from "./ForgeBuildExtension";
	export declare class ExportExtension implements IForgeBuildExtension {
	    private _base;
	    private _namespace;
	    constructor();
	    $start(entry: string, inputs: Record<string, unknown>, buildOptions: Record<string, unknown>): Promise<void>;
	    $header(content: string): Promise<string>;
	    $section(content: any, sectionData: any): Promise<string>;
	    $footer(content: string): Promise<string>;
	    $complete(output: any): Promise<string>;
	}
	
		import { SectionEntry } from "../dependency/DependencyManager";
	export interface IForgeBuildExtension {
	    $start(entry: string, manifest: Record<string, unknown>, BuildOptions: Record<string, unknown>): Promise<void>;
	    $header(content: string): Promise<string>;
	    $section(content: string, sectionEntry: SectionEntry): Promise<string>;
	    $footer(content: string): Promise<string>;
	    $complete(content: string): Promise<string>;
	}
	export declare class ForgeBuildExtension implements IForgeBuildExtension {
	    private _source;
	    constructor(source: string | unknown & object);
	    $start(entry: string, inputs: Record<string, unknown>, buildOptions: Record<string, unknown>): Promise<void>;
	    $header(content: string): Promise<string>;
	    $section(content: string, sectionEntry: SectionEntry): Promise<string>;
	    $footer(content: string): Promise<string>;
	    $complete(content: string): Promise<string>;
	}
	
		import { Serialize } from "../core/Core";import { ForgeServer } from "./server/ForgeServer";export declare class Forge {
	    static Search(glob: string): void;
	    private _forgeServer;
	    private readonly _taskMap;
	    private readonly _ignoreArr;
	    private readonly _forgeStream;
	    readonly services: Map<string, IServiceAdapter>;
	    constructor();
	    private _buildService;
	    parse(input: string, options?: {}): Record<string, unknown>;
	    tasks(): Map<string, ForgeTask>;
	    add(forgeTask: ForgeTask): this;
	    spawn(name: string, config?: ServiceConfig): IServiceAdapter;
	    fork(name: string, config?: ServiceConfig): IServiceAdapter;
	    worker(name: string, config: ServiceConfig): IServiceAdapter;
	    exec(name: string, config: ServiceConfig): IServiceAdapter;
	    plugin(name: string, config: ServiceConfig): IServiceAdapter;
	    watch(glob: string[], options: {
	        ignore: string[];
	        debounce?: number;
	        throttle?: number;
	    }): void;
	    $reset(data: Serialize, race?: number): Promise<Serialize>;
	    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
	    abort(): void;
	    $serve(port: number, base: string): Promise<ForgeServer>;
	    $load(): Promise<void>;
	    $save(): Promise<void>;
	}
	
		/// <reference types="node" />import { Subscription } from "../core/Subscription";interface IClientDelegate {
	    $execute(...data: Serialize[]): Promise<Serialize>;
	}
	declare class AbstractDelegate implements IClientDelegate {
	    protected _$delegate: Function;
	    constructor($delegate: Function);
	    $execute(...data: Serialize[]): Promise<Serialize>;
	}
	export declare class ResetDelegate extends AbstractDelegate {
	}
	export declare class ExecuteDelegate extends AbstractDelegate {
	}
	export declare class RouteDelegate extends AbstractDelegate {
	}
	export declare class ForgeClient extends Subscription {
	    protected _race: number;
	    protected _executing: boolean;
	    protected _queue: [];
	    protected _routeRoot: string;
	    protected _iServiceAdapter: IServiceAdapter;
	    protected _filters: Set<string>;
	    protected _delegates: Set<{}>;
	    constructor(key: string, data: Record<string, unknown>, options?: {
	        race?: number;
	    });
	    private _$raceDispatch;
	    private _$subscribeMessage;
	    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
	    $reset(data: Serialize, race: number): Promise<Serialize>;
	    $execute(signal: string, data: Serialize, race: number): Promise<Serialize>;
	    $watch(data: Serialize, race: number): Promise<Serialize>;
	    $route(route: string, parameters: Serialize[], race: number): Promise<{
	        mime: string;
	        contents: Buffer;
	    }>;
	}
	
	
		import { Serialize } from "../core/Core";import { ForgeTask } from "./ForgeTask";
	export declare class ForgeStream {
	    private readonly _tasks;
	    private readonly _iActions;
	    private readonly _bindings;
	    private _signal;
	    private _data;
	    readonly settled: Set<IAction>;
	    readonly resolves: Set<IAction>;
	    readonly rejections: Set<IAction>;
	    constructor();
	    private _thenRaced$Execute;
	    private _$catchRaced$Execute;
	    get actions(): Iterable<[string, IAction]>;
	    get signal(): string;
	    get data(): Serialize;
	    add(forgeTask: ForgeTask): this;
	    find(taskName: string, actionName: string): IAction;
	    $reset(): Promise<Serialize>;
	    $signal(signal: string, data?: Serialize, race?: number): Promise<Serialize>;
	}
	
		import { Serialize } from "../core/Core";import { ActionConfig, IAction } from "./action/ForgeAction";
	export type TaskConfig = {
	    name: string;
	    enabled: boolean;
	    actions: ActionConfig[];
	};
	export declare class ForgeTask {
	    private _forge;
	    private readonly _iActions;
	    private _enabled;
	    private _data;
	    name: string;
	    constructor(forge: Forge, config?: Record<string, unknown>);
	    data(): any;
	    actions(): Map<string, IAction>;
	    $reset(data: Serialize): Promise<Serialize>;
	    add(iAction: IAction): this;
	    parse(configObj: any): void;
	}
	
		declare const spawn: any, fork: any, exec: any, execSync: any;
	declare class ForgeGit {
	    static $IsWorkingTree(): Promise<boolean>;
	    static $Clone(url: string): Promise<boolean>;
	    static $Submodule(url: string, target: string): Promise<boolean>;
	    static $Place(url: string, target: string): Promise<boolean>;
	}
	
		/// <reference types="node" />
	declare class ForgeFile {
	    static $FileExist(file: string): Promise<boolean>;
	    static $DirectoryExists(path: string): Promise<boolean>;
	    static $MakeDirectory(path: string): Promise<boolean>;
	    static $Read(path: string, encoding: string): Promise<Buffer>;
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
	
	
		/// <reference types="node" />import { ForgeStore } from "./ForgeModel";
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
	
		import { ForgeServer } from "../server/ForgeServer";export declare class SimpleForgeStorage extends ForgeModel {
	    private _routeSave;
	    connect(forgeServer: ForgeServer): this;
	}
	
		/// <reference types="node" />import { IForgeModel } from "../model/ForgeModel";type StoreEntry = {
	    mime: string;
	    buffer: Buffer;
	};
	export declare function $ParseRequestBody(request: any): Promise<{
	    mime: string;
	    buffer: Buffer;
	}>;
	export declare class RequestBodyParser {
	    private _buffers;
	    private _request;
	    private _$buffer;
	    private _onData;
	    constructor(request: any);
	    private _onEnd;
	    $resolve(): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	export declare class ForgeRouteRequest {
	    private _uri;
	    private _urlParsed;
	    private _header;
	    private _body;
	    contructor(uri: string, header: any, body: any): void;
	}
	export declare class ForgeServer {
	    private _forge;
	    private _app;
	    private _base;
	    private _debouncer;
	    private readonly _routeSet;
	    private readonly _database;
	    private _iForgeStorage;
	    constructor(forge: Forge, port: number, base: string);
	    private _saveBackup;
	    private _$setupServer;
	    $keys(partitionName: string): Promise<string[]>;
	    $save(partitionName: string, key: string, mime: string, buffer: Buffer): Promise<void>;
	    $load(partitionName: string, key: string): Promise<StoreEntry>;
	    add(overload: IForgeRoute | IForgeModel): this;
	    use(delegate: Function): void;
	}
	
	
		declare class AbstractBox<T> {
	    protected _value: T;
	    constructor(value: T);
	    parse(): void;
	}
	
		/// <reference types="node" />type RequestDelegate = Function;
	declare enum RequestMethod {
	    Post = 0,
	    Get = 1,
	    All = 2
	}
	export interface IForgeRoute {
	    authorize(uri: string): boolean;
	    $resolve(request: any, response: any, next: Function): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	export declare class RouteConfig {
	    request: string | RegExp;
	    method: RequestMethod;
	    race: number;
	    action: IAction;
	    remote: {
	        url: string;
	        get: Record<string, string | number>;
	        post: Record<string, string | number>;
	    };
	    local: string;
	    $delegate: Function;
	    constructor(configData: Record<string, unknown>);
	}
	declare class RouteResolver {
	    private _value;
	    private _cache;
	    constructor(value: string | RegExp);
	    resolve(uri: string): boolean;
	}
	export declare class GenericRoute implements IForgeRoute {
	    static Parse(configData: Record<string, unknown>): IForgeRoute;
	    protected _resolver: RouteResolver;
	    protected _method: RequestMethod;
	    protected _$delegate: RequestDelegate;
	    protected _race: number;
	    constructor(config: RouteConfig, ...rest: unknown[]);
	    set $delegate($delegate: Function);
	    protected _$parseRequest(request: any): Promise<{
	        get: Record<string, unknown>;
	        post: Record<string, unknown>;
	        request: Record<string, unknown>;
	    }>;
	    authorize(uri: string): boolean;
	    $resolve(request: any, response: any, next: Function): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	export declare class ActionRoute extends GenericRoute {
	    private _iAction;
	    action(iAction: IAction): this;
	    $resolve(request: any, response: any, next: Function): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	export declare class DelegateRoute extends GenericRoute {
	    constructor(config: RouteConfig, $delegate: RequestDelegate, simplifyParams?: boolean);
	}
	export declare class RemoteRoute extends GenericRoute {
	    private _base;
	    base(base: string): this;
	    $resolve(request: any, response: any, next: Function): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	export declare class LocalRoute extends GenericRoute {
	    private _base;
	    base(route: RouteConfig, base: string): this;
	    $resolve(request: any, response: any, next: Function): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	
	
		import { IForgeRoute } from "./ForgeRoute";
	export declare class ForgeRouter {
	    protected _routes: IForgeRoute[];
	}
	
		/// <reference types="node" />import { ISubscription, Subscription } from "../../core/Subscription";
	declare enum StdioOption {
	    Pipe = "pipe",
	    Inherit = "inherit",
	    Silent = "silent"
	}
	export type ServiceConfig = {
	    command?: string;
	    debounce?: number;
	    stdio?: string;
	    race?: number | Record<string, number>;
	    key?: string;
	    reboot?: boolean;
	    route_root?: string;
	};
	export interface IServiceAdapter extends ISubscription {
	    read(message: [string, Record<string, unknown>, Serialize]): void;
	    write(header: Record<string, unknown>, data: Serialize): void;
	    resolve(header: Record<string, unknown>, data: Serialize): void;
	    reject(header: Record<string, unknown>, data: Serialize): void;
	    $reset(data: Serialize): Promise<Serialize>;
	    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
	    $reboot(): any;
	}
	export declare class AbstractServiceAdapter extends Subscription implements IServiceAdapter {
	    protected _name: string;
	    protected _key: string;
	    protected _reboot: boolean;
	    protected _stdio: StdioOption;
	    protected readonly _race: Map<RegExp, number>;
	    protected readonly _sessions: Map<string, $Promise<unknown>>;
	    protected readonly _bindings: Map<Function, Function>;
	    constructor(name: string, config: ServiceConfig);
	    protected _getRace(signal: string): number;
	    protected _pipeStdio(message: string): void;
	    protected _pipeError(message: string): void;
	    read(message: [string, Record<string, unknown>, Serialize]): boolean;
	    write(header: Record<string, unknown>, data: Serialize): void;
	    resolve(header: Record<string, unknown>, data: Serialize): void;
	    reject(header: Record<string, unknown>, data: Serialize): void;
	    $reset(data: Serialize): Promise<Serialize>;
	    $signal(signal: string, data: Serialize, race?: number): Promise<Serialize>;
	    $reboot(): Promise<void>;
	    $route(route: string, params: Serialize): Promise<{
	        mime: string;
	        buffer: Buffer;
	    }>;
	}
	
	
		import { Serialize } from "../../core/Core";export declare class ExecService extends AbstractServiceAdapter {
	    private _source;
	    private _command;
	    private _config;
	    constructor(name: string, config: ServiceConfig);
	    private _injectCommand;
	    write(header: Serialize, data: Serialize): void;
	    $signal(signal: string, data: Serialize, race: number): Promise<Serialize>;
	}
	
		import { Serialize } from "../../core/Core";export declare class ForkService extends AbstractServiceAdapter {
	    private _source;
	    private _commands;
	    constructor(name: string, config: ServiceConfig, source?: any);
	    private _onExit;
	    write(header: Serialize, data: Serialize): void;
	}
	
		import { Serialize } from "../../core/Core";export declare class PluginService extends AbstractServiceAdapter {
	    private _source;
	    private _commands;
	    constructor(name: string, config: ServiceConfig, source?: any);
	    write(header: Serialize, data: Serialize): void;
	    $reset(data: Serialize, race?: number): Promise<Serialize>;
	    $signal(signal: string, data: Serialize, race: number): Promise<Serialize>;
	}
	
		import { Serialize } from "../../core/Core";export declare class RestService extends AbstractServiceAdapter {
	    private _source;
	    private _command;
	    private _config;
	    constructor(name: string, config: ServiceConfig);
	    private _injectCommand;
	    write(header: Serialize, data: Serialize): void;
	    $signal(signal: string, data: Serialize, race: number): Promise<Serialize>;
	}
	
		import { Serialize } from "../../core/Core";export declare class SpawnService extends AbstractServiceAdapter {
	    private _source;
	    private _commands;
	    constructor(name: string, config: ServiceConfig, source?: any);
	    private _onExit;
	    write(header: Serialize, ...data: Serialize[]): void;
	}
	
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
	
	
		
	
	
}