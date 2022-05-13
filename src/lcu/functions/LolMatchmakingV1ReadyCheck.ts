/**
 * LolMatchmakingV1ReadyCheck functions for use with TypeScript
 * Accurate as of 27/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';

export async function PostLolMatchmakingV1ReadyCheckAccept(connection: Connection) {
  return connection.request('POST', '/lol-matchmaking/v1/ready-check/accept', {
    expectation: { code: 204 },
  });
}

export async function PostLolMatchmakingV1ReadyCheckDecline(connection: Connection) {
  return connection.request('POST', '/lol-matchmaking/v1/ready-check/decline', {
    expectation: { code: 204 },
  });
}
