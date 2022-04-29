/**
 * LolChatV1Me functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';
import LolChatUserResource from '../generated/LolChatUserResource';

export async function GetLolChatV1Me(connection: Connection): Promise<LolChatUserResource> {
  let result: string;
  try {
    result = await connection.request('GET', '/lol-chat/v1/me', {
      expectation: { code: 200 },
    });
  } catch (e) {
    throw new Error(`GetLolChatV1Me request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function PutLolChatV1Me(connection: Connection, me: Partial<LolChatUserResource>) {
  return connection.request('PUT', '/lol-chat/v1/me', {
    data: JSON.stringify(me),
    expectation: { code: 201 },
  });
}
