/**
 * EventDistributor, part of LibLCU.ts
 * Callback handling / callback handling functionality
 * @author lotuspar, 2022
 * @file EventDistributor.ts
 */

type Callback = (...args: any[]) => void;

export enum EventDistributorEvent {
  CLEAN = 300,
  EVENT_KEY_REMOVED = 301,
}

export default class EventDistributor {
  private events: Map<string | EventDistributorEvent, (WeakRef<Callback> | Callback)[]>;

  private finalizer: FinalizationRegistry<string | EventDistributorEvent>;

  private dirty: (string | EventDistributorEvent)[] = [];

  public eventDistributorSettings = {
    // Requires keys to be registered
    enforceEventRegistration: true,

    // Changes type of reference being made when none provided
    assumeWeak: false,

    // Amount of keys in the dirty array to hold before forcing a clean
    forceCleanThreshold: 3,
  };

  constructor() {
    this.events = new Map();
    this.finalizer = new FinalizationRegistry((key: string | EventDistributorEvent) => {
      this.pushDirty(key);
    });

    this.on(EventDistributorEvent.CLEAN, () => {
      this.clean();
    });
  }

  /**
   * Register events
   * @param keys Event keys to register
   */
  public registerEvents(keys: (string | EventDistributorEvent)[]) {
    keys.forEach((key) => {
      if (!this.events.has(key)) {
        this.events.set(key, []);
      }
    });
  }

  /**
   * Get event keys
   * @returns Event keys
   */
  public getEvents() {
    return this.events.keys();
  }

  /**
   * Add callback for event key
   * @param key Event key
   * @param callback Event callback
   * @param weak Store callback reference weakly? (lets the callback be GCd)
   */
  public on(key: string | EventDistributorEvent, callback: Callback, weak?: boolean): void {
    if (!this.events.has(key)) {
      if (this.eventDistributorSettings.enforceEventRegistration) {
        throw new Error(`Unknown event key ${key}`);
      }
      this.events.set(key, []);
    }

    this.finalizer.register(callback, key);
    this.events.get(key)!.push(
      (weak || this.eventDistributorSettings.assumeWeak) ? new WeakRef(callback) : callback,
    );
  }

  /**
   * Call event callbacks
   * @param key Event key
   * @param args Event args
   */
  public call(key: string | EventDistributorEvent, ...args: any[]): void {
    this.events.get(key)?.forEach((callback) => {
      if (!(callback instanceof WeakRef)) {
        callback(args);
      } else {
        const deref = callback.deref();
        if (deref === undefined) {
          this.pushDirty(key);
        } else {
          deref(args);
        }
      }
    });
  }

  /**
   * Sweep event map for broken references and clean up
   */
  private clean(): void {
    if (this.dirty.length === 0) {
      return;
    }

    // For each dirty event name...
    // note: the Set stops duplicate keys from being cleaned
    [...new Set(this.dirty)].forEach((dirtyKey: string | EventDistributorEvent) => {
      // Make sure event exists...
      if (this.events.has(dirtyKey)) {
        // Event exists.
        // Filter out broken references from event callbacks.
        const cleaned = this.events.get(dirtyKey)!.filter((callback) => {
          // If callback isn't a weak reference then just let it through
          if (!(callback instanceof WeakRef)) {
            return true;
          }

          // If callback is a weak reference only let active references through
          return (callback.deref() !== undefined);
        });

        // Check for empty callback array:
        if (cleaned.length === 0) {
          // No callbacks after clean
          // First call key empty event:
          this.call(EventDistributorEvent.EVENT_KEY_REMOVED, dirtyKey);

          // Remove callback key from map
          this.events.delete(dirtyKey);
        } else {
          // Still callbacks
          // Update event
          this.events.set(dirtyKey, cleaned);
        }
      }
    });
  }

  private pushDirty(key: string | EventDistributorEvent) {
    this.dirty.push(key);
    if (this.dirty.length >= this.eventDistributorSettings.forceCleanThreshold) {
      this.call(EventDistributorEvent.CLEAN);
    }
  }
}
