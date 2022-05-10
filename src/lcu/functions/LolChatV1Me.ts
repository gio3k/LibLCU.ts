/**
 * LolChatV1Me functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import { PartialDeep } from 'type-fest';
import Connection from '../../sys/Connection';
import { RequestError } from '../../sys/HTTPUtils';
import LolChatUserResource from '../generated/LolChatUserResource';

export async function GetLolChatV1Me(connection: Connection): Promise<LolChatUserResource> {
  let result: string;
  try {
    result = await connection.request('GET', '/lol-chat/v1/me', {
      expectation: { code: 200 },
    });
  } catch (e: any) {
    throw new RequestError(`GetLolChatV1Me request error: ${e}`, e.code);
  }
  return JSON.parse(result);
}

export async function PutLolChatV1Me(connection: Connection, me: PartialDeep<LolChatUserResource>) {
  try {
    await connection.request('PUT', '/lol-chat/v1/me', {
      data: JSON.stringify(me),
      expectation: { code: 201 },
    });
  } catch (e: any) {
    if (e.code === 451) {
      throw new RequestError("Status message can't contain offensive words.", e.code);
    }

    throw new RequestError(`Unknown PutLolChatV1Me error: ${e.message}`, e.code);
  }
}
