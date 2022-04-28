/**
 * ClientHTTP, part of LibLCU.ts
 * Classes and methods to communicate with the League Client through HTTP
 * @author lotuspar, 2022
 * @file HTTP.ts
 */

import { IncomingMessage } from 'http';
import https from 'https';
import Lockfile from '../Lockfile';

type RequestExtraParams = {
  data?: string;
  charset?: string;
  extraHeaders?: object;
  expectedResponse?: number;
};

export default class ClientHTTP {
  private lockfile: Lockfile;

  private constructor(lockfile: Lockfile) {
    this.lockfile = lockfile;
  }

  private static async request(
    lockfile: Lockfile,
    method: string,
    path: string,
    {
      data = '', charset = '', extraHeaders = {}, expectedResponse = 0,
    }: RequestExtraParams = {},
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
        hostname: lockfile.host,
        port: lockfile.port,
        rejectUnauthorized: false, // we need this, LCU uses a self-signed certificate!
      }, (result: IncomingMessage) => {
        console.log(path, result.statusCode);
        if (expectedResponse !== 0 && result.statusCode !== expectedResponse) {
          console.error(`error response, ${method} ${path}`);
          console.error(`error data ${buffer}`);
          reject(new Error(`Unexpected response ${result.statusMessage} ${result.statusCode}`));
        }

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

      if (data !== '') {
        request.write(data);
      }

      request.end();
    });
  }

  public async request(
    method: string,
    path: string,
    {
      data, charset = '', extraHeaders = {}, expectedResponse = 0,
    }: RequestExtraParams = {},
  ) {
    return ClientHTTP.request(this.lockfile, method, path, {
      data, charset, extraHeaders, expectedResponse,
    });
  }

  public static async initialize(lockfile: Lockfile): Promise<ClientHTTP> {
    // Make sure we can connect and talk to the League Client
    let response;

    try {
      response = await ClientHTTP.request(lockfile, 'GET', '/plugin-manager/v1/status', { expectedResponse: 200 });
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
