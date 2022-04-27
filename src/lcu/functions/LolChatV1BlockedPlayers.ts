/**
 * LolChatV1BlockedPlayers functions for use with TypeScript
 * Accurate as of 27/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolChatBlockedPlayerResource } from '../generated/LolChatBlockedPlayerResource';

export async function GetLolChatV1BlockedPlayers(
  instance: Instance,
): Promise<LolChatBlockedPlayerResource[]> {
  let result: string;
  try {
    result = await instance.http.request('GET', '/lol-chat/v1/blocked-players', { expectedResponse: 200 });
  } catch (e) {
    throw new Error(`GetLolChatV1BlockedPlayers request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function PostLolChatV1BlockedPlayers(
  instance: Instance,
  blocked: LolChatBlockedPlayerResource,
) {
  return instance.http.request('POST', '/lol-chat/v1/blocked-players', {
    data: JSON.stringify(blocked),
    expectedResponse: 204,
  });
}

export async function DeleteLolChatV1BlockedPlayersById(
  instance: Instance,
  id: string,
) {
  return instance.http.request('DELETE', `/lol-chat/v1/blocked-players/${id}`, {
    expectedResponse: 204,
  });
}

export async function GetLolChatV1BlockedPlayersById(
  instance: Instance,
  id: string,
): Promise<LolChatBlockedPlayerResource> {
  let result: string;
  try {
    result = await instance.http.request('GET', `/lol-chat/v1/blocked-players/${id}`, { expectedResponse: 200 });
  } catch (e) {
    throw new Error(`GetLolChatV1BlockedPlayersById request error: ${e}`);
  }
  return JSON.parse(result);
}
