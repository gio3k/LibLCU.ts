/**
 * HTTPUtils, part of LibLCU.ts
 * Methods to communicate with the League Client through HTTP
 * @author lotuspar, 2022
 * @file HTTPUtils.ts
 */

import { IncomingMessage } from 'http';
import https from 'https';
import Lockfile from '../Lockfile';

export type RequestExtraParams = {
  data?: string;
  charset?: string;
  extraHeaders?: object;
  expectation?: ResponseExpectation;
};

export interface ResponseExpectation {
  code: number;
  contents?: string;
}

const rejectUnauthorized = false; // we need this, LCU uses a self-signed certificate

export async function clientBackendRequest(
  lockfile: Lockfile,
  method: string,
  path: string,
  extra: RequestExtraParams = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const request = https.request({
      method,
      path,
      headers: {
        Charset: extra.charset,
        Authorization: lockfile.basic,
        ...extra.extraHeaders || {},
      },
      hostname: lockfile.host,
      port: lockfile.port,
      rejectUnauthorized,
    }, (result: IncomingMessage) => {
      if (extra.expectation?.code !== result.statusCode) {
        reject(new Error(`Unexpected response ${result.statusMessage} ${result.statusCode}`));
      }

      result.on('data', (packet) => {
        // this is called on receiving a data packet
        buffer += packet;
      });

      result.on('end', () => {
        // this is called when no more response active
        if (extra.expectation?.contents === buffer) {
          reject(new Error(`Unexpected response content ${buffer} (needed ${extra.expectation.contents})`));
        }
        resolve(buffer);
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    if (typeof extra.data !== 'undefined') {
      request.write(extra.data);
    }

    request.end();
  });
}
