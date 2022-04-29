/**
 * LolChatV1BlockedPlayers functions for use with TypeScript
 * Accurate as of 27/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';
import LolChatBlockedPlayerResource from '../generated/LolChatBlockedPlayerResource';

export async function GetLolChatV1BlockedPlayers(
  connection: Connection,
): Promise<LolChatBlockedPlayerResource[]> {
  let result: string;
  try {
    result = await connection.request('GET', '/lol-chat/v1/blocked-players', {
      expectation: { code: 200 },
    });
  } catch (e) {
    throw new Error(`GetLolChatV1BlockedPlayers request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function PostLolChatV1BlockedPlayers(
  connection: Connection,
  blocked: LolChatBlockedPlayerResource,
) {
  return connection.request('POST', '/lol-chat/v1/blocked-players', {
    data: JSON.stringify(blocked),
    expectation: { code: 204 },
  });
}

export async function DeleteLolChatV1BlockedPlayersById(
  connection: Connection,
  id: string,
) {
  return connection.request('DELETE', `/lol-chat/v1/blocked-players/${id}`, {
    expectation: { code: 204 },
  });
}

export async function GetLolChatV1BlockedPlayersById(
  connection: Connection,
  id: string,
): Promise<LolChatBlockedPlayerResource> {
  let result: string;
  try {
    result = await connection.request('GET', `/lol-chat/v1/blocked-players/${id}`, {
      expectation: { code: 200 },
    });
  } catch (e) {
    throw new Error(`GetLolChatV1BlockedPlayersById request error: ${e}`);
  }
  return JSON.parse(result);
}
