/**
 * LolChatV1Lobby functions for use with TypeScript
 * Accurate as of 27/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolLobbyLobbyDto } from '../generated/LolLobbyLobbyDto';
import { LolLobbyLobbyChangeGameDto } from '../generated/LolLobbyLobbyChangeGameDto';
import { LolLobbyLobbyInvitationDto } from '../generated/LolLobbyLobbyInvitationDto';
import { LolLobbyLobbyPositionPreferences } from '../generated/LolLobbyLobbyPositionPreferences';

export async function GetLolLobbyV2Lobby(instance: Instance): Promise<LolLobbyLobbyDto> {
  const result = await instance.http.request('GET', '/lol-lobby/v2/lobby', { expectedResponse: 200 });
  return JSON.parse(result);
}

export async function PostLolLobbyV2Lobby(
  instance: Instance,
  lobbyChange: Partial<LolLobbyLobbyChangeGameDto>,
): Promise<LolLobbyLobbyDto> {
  let result: string;
  try {
    result = await instance.http.request('POST', '/lol-lobby/v2/lobby', {
      data: JSON.stringify(lobbyChange),
      expectedResponse: 200,
    });
  } catch (e) {
    throw new Error(`PostLolLobbyV2Lobby request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function DeleteLolLobbyV2Lobby(instance: Instance) {
  return instance.http.request('DELETE', '/lol-lobby/v2/lobby', {
    expectedResponse: 204,
  });
}

export async function PostLolLobbyV2LobbyMatchmakingSearch(instance: Instance) {
  return instance.http.request('POST', '/lol-lobby/v2/lobby/matchmaking/search', {
    expectedResponse: 204,
  });
}

export async function DeleteLolLobbyV2LobbyMatchmakingSearch(instance: Instance) {
  return instance.http.request('DELETE', '/lol-lobby/v2/lobby/matchmaking/search', {
    expectedResponse: 204,
  });
}

export async function GetLolLobbyV2LobbyInvitations(
  instance: Instance,
): Promise<LolLobbyLobbyInvitationDto[]> {
  let result: string;
  try {
    result = await instance.http.request('GET', '/lol-lobby/v2/lobby/invitations', { expectedResponse: 200 });
  } catch (e) {
    throw new Error(`GetLolLobbyV2LobbyInvitations request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function PostLolLobbyV2LobbyInvitations(
  instance: Instance,
  invitations: Partial<LolLobbyLobbyInvitationDto>[],
): Promise<LolLobbyLobbyDto> {
  let result: string;
  try {
    result = await instance.http.request('POST', '/lol-lobby/v2/lobby/invitations', {
      data: JSON.stringify(invitations),
      expectedResponse: 200,
    });
  } catch (e) {
    throw new Error(`PostLolLobbyV2LobbyInvitations request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function PutLolLobbyV2LobbyMembersLocalMemberPositionPreferences(
  instance: Instance,
  positionPreferences: LolLobbyLobbyPositionPreferences,
) {
  return instance.http.request('PUT', '/lol-lobby/v2/lobby/members/localMember/position-preferences', {
    data: JSON.stringify(positionPreferences),
    expectedResponse: 201,
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdKick(
  instance: Instance,
  summonerId: number,
) {
  return instance.http.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/kick`, {
    expectedResponse: 200,
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdPromote(
  instance: Instance,
  summonerId: number,
) {
  return instance.http.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/promote`, {
    expectedResponse: 200,
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdGrantInvite(
  instance: Instance,
  summonerId: number,
) {
  return instance.http.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/grant-invite`, {
    expectedResponse: 200,
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdRevokeInvite(
  instance: Instance,
  summonerId: number,
) {
  return instance.http.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/revoke-invite`, {
    expectedResponse: 200,
  });
}
