/**
 * LolLobbyV2Lobby functions for use with TypeScript
 * Accurate as of 27/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';
import LolLobbyLobbyDto from '../generated/LolLobbyLobbyDto';
import LolLobbyLobbyChangeGameDto from '../generated/LolLobbyLobbyChangeGameDto';
import LolLobbyLobbyInvitationDto from '../generated/LolLobbyLobbyInvitationDto';
import LolLobbyLobbyPositionPreferences from '../generated/LolLobbyLobbyPositionPreferences';

export async function GetLolLobbyV2Lobby(connection: Connection): Promise<LolLobbyLobbyDto> {
  const result = await connection.request('GET', '/lol-lobby/v2/lobby', {
    expectation: { code: 200 },
  });
  return JSON.parse(result);
}

export async function PostLolLobbyV2Lobby(
  connection: Connection,
  lobbyChange: Partial<LolLobbyLobbyChangeGameDto>,
): Promise<LolLobbyLobbyDto> {
  let result: string;
  try {
    result = await connection.request('POST', '/lol-lobby/v2/lobby', {
      data: JSON.stringify(lobbyChange),
      expectation: { code: 200 },
    });
  } catch (e) {
    throw new Error(`PostLolLobbyV2Lobby request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function DeleteLolLobbyV2Lobby(connection: Connection) {
  return connection.request('DELETE', '/lol-lobby/v2/lobby', {
    expectation: { code: 204 },
  });
}

export async function PostLolLobbyV2LobbyMatchmakingSearch(connection: Connection) {
  return connection.request('POST', '/lol-lobby/v2/lobby/matchmaking/search', {
    expectation: { code: 204 },
  });
}

export async function DeleteLolLobbyV2LobbyMatchmakingSearch(connection: Connection) {
  return connection.request('DELETE', '/lol-lobby/v2/lobby/matchmaking/search', {
    expectation: { code: 204 },
  });
}

export async function GetLolLobbyV2LobbyInvitations(
  connection: Connection,
): Promise<LolLobbyLobbyInvitationDto[]> {
  let result: string;
  try {
    result = await connection.request('GET', '/lol-lobby/v2/lobby/invitations', {
      expectation: { code: 200 },
    });
  } catch (e) {
    throw new Error(`GetLolLobbyV2LobbyInvitations request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function PostLolLobbyV2LobbyInvitations(
  connection: Connection,
  invitations: Partial<LolLobbyLobbyInvitationDto>[],
): Promise<LolLobbyLobbyDto> {
  let result: string;
  try {
    result = await connection.request('POST', '/lol-lobby/v2/lobby/invitations', {
      data: JSON.stringify(invitations),
      expectation: { code: 200 },
    });
  } catch (e) {
    throw new Error(`PostLolLobbyV2LobbyInvitations request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function PutLolLobbyV2LobbyMembersLocalMemberPositionPreferences(
  connection: Connection,
  positionPreferences: LolLobbyLobbyPositionPreferences,
) {
  return connection.request('PUT', '/lol-lobby/v2/lobby/members/localMember/position-preferences', {
    data: JSON.stringify(positionPreferences),
    expectation: { code: 201 },
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdKick(
  connection: Connection,
  summonerId: number,
) {
  return connection.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/kick`, {
    expectation: { code: 200 },
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdPromote(
  connection: Connection,
  summonerId: number,
) {
  return connection.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/promote`, {
    expectation: { code: 200 },
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdGrantInvite(
  connection: Connection,
  summonerId: number,
) {
  return connection.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/grant-invite`, {
    expectation: { code: 200 },
  });
}

export async function PostLolLobbyV2LobbyMembersBySummonerIdRevokeInvite(
  connection: Connection,
  summonerId: number,
) {
  return connection.request('POST', `/lol-lobby/v2/lobby/members/${summonerId}/revoke-invite`, {
    expectation: { code: 200 },
  });
}
