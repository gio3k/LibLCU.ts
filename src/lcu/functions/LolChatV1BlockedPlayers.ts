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
  const result = await instance.http.request('GET', '/lol-chat/v1/blocked-players', { expectedResponse: 200 });
  const json: LolChatBlockedPlayerResource[] = JSON.parse(result);
  return json;
}

export async function PostLolChatV1BlockedPlayers(
  instance: Instance,
  blocked: LolChatBlockedPlayerResource,
) {
  await instance.http.request('POST', '/lol-chat/v1/blocked-players', {
    data: JSON.stringify(blocked),
    expectedResponse: 204,
  });
}

export async function DeleteLolChatV1BlockedPlayersById(
  instance: Instance,
  id: string,
) {
  await instance.http.request('DELETE', `/lol-chat/v1/blocked-players/${id}`, {
    expectedResponse: 204,
  });
}

export async function GetLolChatV1BlockedPlayersById(
  instance: Instance,
  id: string,
): Promise<LolChatBlockedPlayerResource> {
  const result = await instance.http.request('GET', `/lol-chat/v1/blocked-players/${id}`, { expectedResponse: 200 });
  const json: LolChatBlockedPlayerResource = JSON.parse(result);
  return json;
}
