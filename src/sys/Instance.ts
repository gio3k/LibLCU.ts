/**
 * Instance, part of LibLCU.ts
 * Controller and manager for connection to the League Client
 * @author lotuspar, 2022
 * @file Instance.ts
 */

import { Lockfile } from './Lockfile';
import ClientHTTP from './tx/HTTP';
import ClientWebSocket from './tx/WebSocket';

export default class Instance {
  lockfile: Lockfile;

  http: ClientHTTP;

  websocket: ClientWebSocket;

  private constructor(lockfile: Lockfile, http: ClientHTTP, websocket: ClientWebSocket) {
    this.lockfile = lockfile;
    this.http = http;
    this.websocket = websocket;
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
