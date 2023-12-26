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
export {};
//# sourceMappingURL=Argument.d.ts.map