/**
 * Instance, part of LibLCU.ts
 * Controller and manager for connection to the League Client
 * @author lotuspar, 2022
 * @file Instance.ts
 */

import { Lockfile } from './Lockfile';
import ClientHTTP from './tx/InstanceHTTP';
import { SubscriptionCallbackFunction, ClientWebSocket } from './tx/InstanceWebSocket';

export default class Instance {
  private lockfile: Lockfile;

  public http: ClientHTTP;

  public websocket: ClientWebSocket;

  private constructor(lockfile: Lockfile, http: ClientHTTP, websocket: ClientWebSocket) {
    this.lockfile = lockfile;
    this.http = http;
    this.websocket = websocket;
  }

  public subscribe(name: string, callback: SubscriptionCallbackFunction) {
    this.websocket.subscribe(name, callback);
  }

  static async initialize(lockfile: Lockfile): Promise<Instance> {
    let connections;

    try {
      connections = await Promise.all([
        ClientHTTP.initialize(lockfile),
        ClientWebSocket.initialize(lockfile),
      ]);
    } catch (e) {
      throw new Error(`Error while initializing Instance connections: ${e}`);
    }

    return new Instance(lockfile, connections[0], connections[1]);
  }
}
