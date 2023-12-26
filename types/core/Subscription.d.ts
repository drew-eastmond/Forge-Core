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
//# sourceMappingURL=Subscription.d.ts.map