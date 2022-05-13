/**
 * Activity (class)
 *
 * For LibLCU.ts (https://github.com/lotuspar/liblcu.ts)
 * @author lotuspar, 2022
 */

import Connection from '../sys/Connection';
import EventDistributor from '../sys/EventDistributor';

enum Events {
  PreDestroy = 'activity_predestroy',
}
export { Events as ActivityEvents };

export default abstract class Activity extends EventDistributor {
  protected resource: any;

  protected connection: Connection;

  public ready: boolean = false;

  constructor(connection: Connection) {
    super();
    this.registerEvents(Object.values(Events));

    this.eventDistributorSettings.assumeWeak = false;
    this.connection = connection;
  }

  get active() {
    return this.resource !== null && this.resource !== undefined;
  }

  getResource<T>(): T {
    return this.resource;
  }
}
