/**
 * ClientWebSocket, part of LibLCU.ts
 * Classes and methods to communicate with the League Client through WebSockets
 * @author lotuspar, 2022
 * @file WebSocket.ts
 */

import ws from 'ws';
import { Lockfile } from '../Lockfile';

export default class ClientWebSocket {
  lockfile: Lockfile;

  private constructor(lockfile: Lockfile) {
    this.lockfile = lockfile;
  }

  static async initialize(lockfile: Lockfile): Promise<ClientWebSocket> {
    // Make sure we can connect to the League Client
    return new ClientWebSocket(lockfile);
  }
}
