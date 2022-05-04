/**
 * CallbackHandler, part of LibLCU.ts
 * Class / base class for callback handling / callback handling functionality
 * @author lotuspar, 2022
 * @file CallbackHandler.ts
 */

export type BasicCallback = ((...args: any[]) => void);
export type CallbackMap = Map<string, WeakRef<BasicCallback>[]>;

export default class CallbackHandler {
  protected callbacks: Map<string, WeakRef<BasicCallback>[]>;

  protected onEmptyKey?: ((key: string) => void);

  constructor() {
    this.callbacks = new Map<string, WeakRef<BasicCallback>[]>();
  }

  /**
   * Set event to call when a key is emptied
   * @param event Event to call
   */
  public setOnEmptyKeyEvent(event: ((key: string) => void)) {
    this.onEmptyKey = event;
  }

  /**
   * Add callback for provided key
   * @param key Key
   * @param callback Callback to add
   */
  public add(key: string, callback: BasicCallback) {
    if (!this.callbacks.has(key)) {
      this.callbacks.set(key, []);
    }

    this.callbacks.get(key)?.push(new WeakRef(callback));
  }

  /**
   * Call all callbacks for provided key
   * @param key Key
   * @param data Data to pass to callback
   */
  public call(key: string, data: any) {
    this.callbacks.get(key)?.forEach((callback: WeakRef<BasicCallback>) => {
      const ref = callback.deref();
      if (ref === undefined) {
        // call clean
      } else {
        ref(data);
      }
    });
  }

  /**
   * Clean broken references
   */
  protected clean() {
    // For each callback group... (per key / event name)
    this.callbacks.forEach((value: WeakRef<BasicCallback>[], key: string) => {
      let group = value;

      // Clean callback group by removing broken references
      group = group.filter((callback: WeakRef<BasicCallback>) => callback.deref() !== undefined);

      // Check for empty callback group...
      if (group.length === 0) {
        // Group empty, call key empty function
        this.onEmptyKey?.(key);

        // Delete callback group from map
        this.callbacks.delete(key);
      } else {
        // Group has callbacks, update callback group in map
        this.callbacks.set(key, group);
      }
    });
  }
}
