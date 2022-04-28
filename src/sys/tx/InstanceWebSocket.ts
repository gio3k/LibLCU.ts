/**
 * ClientWebSocket, part of LibLCU.ts
 * Classes and methods to communicate with the League Client through WebSockets
 * @author lotuspar, 2022
 * @file WebSocket.ts
 */

import { WebSocket } from 'ws';
import Lockfile from '../Lockfile';

export type SubscriptionCallbackFunction = ((...args: any[]) => void) | undefined;

export class ClientWebSocket {
  private lockfile: Lockfile;

  private websocket: WebSocket;

  private subscriptions: Map<string, SubscriptionCallbackFunction[]>;

  private constructor(lockfile: Lockfile, websocket: WebSocket) {
    this.lockfile = lockfile;
    this.websocket = websocket;

    this.subscriptions = new Map<string, SubscriptionCallbackFunction[]>();

    // Initialize receive function
    this.websocket.on('message', (data) => {
      if (data == null || `${data}` === '') {
        return;
      }

      const json = JSON.parse(`${data}`);
      const keys = Object.keys(json);

      if (keys == null) {
        console.log(`keys == null unknown ${data}`);
        return;
      }

      keys.forEach((key) => {
        const value = json[key];

        // Get callback functions for this event
        const callbacks: SubscriptionCallbackFunction[] | undefined = this.subscriptions.get(key);
        if (typeof callbacks === 'undefined') {
          return;
        }

        // Call functions
        callbacks.forEach((callback) => {
          if (typeof callback !== 'undefined') {
            callback(value);
          }
        });
      });
    });
  }

  public subscribe(name: string, callback: SubscriptionCallbackFunction) {
    // Subscribe to event
    this.websocket.send(`Subscribe ${name}`);

    // Make sure we can add callbacks
    if (!this.subscriptions.has(name)) {
      this.subscriptions.set(name, []);
    }

    // Add event
    const array: SubscriptionCallbackFunction[] | undefined = this.subscriptions.get(name);
    if (typeof array !== 'undefined') {
      array.push(callback);
    }
  }

  public clear(name: string) {
    if (this.subscriptions.has(name)) {
      this.subscriptions.delete(name);
    }
  }

  public static async initialize(lockfile: Lockfile): Promise<ClientWebSocket> {
    return new Promise((resolve, reject) => {
      // Create WebSocket connection
      const websocket = new WebSocket(`wss://${lockfile.host}:${lockfile.port}`, {
        origin: `https://${lockfile.host}:${lockfile.port}`,
        rejectUnauthorized: false,
        headers: {
          Authorization: lockfile.basic,
        },
      });

      // Attempt connection to the client
      websocket.on('open', () => {
        // Connection success
        resolve(new ClientWebSocket(lockfile, websocket));
      });

      websocket.on('error', (err) => {
        // Connection failure
        reject(err);
      });
    });
  }
}
