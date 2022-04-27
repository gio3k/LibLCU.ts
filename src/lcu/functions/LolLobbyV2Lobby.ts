/**
 * LolChatV1Lobby functions for use with TypeScript
 * Accurate as of 27/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolLobbyLobbyDto } from '../generated/LolLobbyLobbyDto';
import { LolLobbyLobbyChangeGameDto } from '../generated/LolLobbyLobbyChangeGameDto';

export async function GetLolLobbyV2Lobby(instance: Instance): Promise<LolLobbyLobbyDto> {
  const result = await instance.http.request('GET', '/lol-lobby/v2/lobby', { expectedResponse: 200 });
  return JSON.parse(result);
}

export async function PostLolLobbyV2Lobby(
  instance: Instance,
  lobbyChange: Partial<LolLobbyLobbyChangeGameDto>,
): Promise<LolLobbyLobbyDto> {
  const result = await instance.http.request('POST', '/lol-lobby/v2/lobby', {
    data: JSON.stringify(lobbyChange),
    expectedResponse: 200,
  });
  return JSON.parse(result);
}

export async function DeleteLolLobbyV2Lobby(instance: Instance) {
  await instance.http.request('DELETE', '/lol-lobby/v2/lobby', {
    expectedResponse: 204,
  });
}

export async function PostLolLobbyV2LobbyMatchmakingSearch(instance: Instance) {
  await instance.http.request('POST', '/lol-lobby/v2/lobby/matchmaking/search', {
    expectedResponse: 204,
  });
}

export async function DeleteLolLobbyV2LobbyMatchmakingSearch(instance: Instance) {
  await instance.http.request('DELETE', '/lol-lobby/v2/lobby/matchmaking/search', {
    expectedResponse: 204,
  });
}
