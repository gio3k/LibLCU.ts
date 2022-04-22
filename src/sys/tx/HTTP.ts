/**
 * ClientHTTP, part of LibLCU.ts
 * Classes and methods to communicate with the League Client through HTTP
 * @author lotuspar, 2022
 * @file HTTP.ts
 */

import { IncomingMessage } from 'http';
import https from 'https';
import { Lockfile } from '../Lockfile';

export default class ClientHTTP {
  lockfile: Lockfile;

  private constructor(lockfile: Lockfile) {
    this.lockfile = lockfile;
  }

  static async request(
    lockfile: Lockfile,
    method: string,
    path: string,
    { data, charset, extraHeaders } = { data: null, charset: '', extraHeaders: {} },
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let buffer = '';
      const request = https.request({
        method,
        path,
        headers: {
          Charset: charset,
          Authorization: lockfile.basic,
          ...extraHeaders,
        },
        hostname: '127.0.0.1',
        port: lockfile.port,
        rejectUnauthorized: false, // we need this, LCU uses a self-signed certificate!
      }, (result: IncomingMessage) => {
        result.on('data', (packet) => {
          buffer += packet;
        });

        result.on('end', () => {
          resolve(buffer);
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      if (data != null) {
        request.write(data);
      }

      request.end();
    });
  }

  async request(
    method: string,
    path: string,
    { data, charset, extraHeaders } = { data: null, charset: '', extraHeaders: {} }
  ) {
    return ClientHTTP.request(this.lockfile, method, path, { data, charset, extraHeaders });
  }

  static async initialize(lockfile: Lockfile): Promise<ClientHTTP> {
    // Make sure we can connect and talk to the League Client
    let response;

    try {
      response = await ClientHTTP.request(lockfile, 'GET', '/plugin-manager/v1/status');
    } catch (e) {
      throw new Error('Failed connection to League Client using HTTP.');
    }

    if (response !== '{"state":"PluginsInitialized"}') {
      console.warn('Got unknown result from League Client, trying to parse it...');

      if (JSON.parse(response).state !== 'PluginsInitialized') {
        throw new Error('Unknown response from League Client while initializing HTTP client.');
      }
    }

    return new ClientHTTP(lockfile);
  }
}
