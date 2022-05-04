/**
 * LolChatV1Friends functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';
import { RequestError } from '../../sys/HTTPUtils';
import LolChatFriendResource from '../redone/LolChatFriendResource';

export async function GetLolChatV1Friends(
  connection: Connection,
): Promise<LolChatFriendResource[]> {
  let result: string;
  try {
    result = await connection.request('GET', '/lol-chat/v1/friends', {
      expectation: { code: 200 },
    });
  } catch (e: any) {
    throw new RequestError(`GetLolChatV1Friends request error: ${e}`, e.code);
  }
  return JSON.parse(result);
}

export async function GetLolChatV1FriendsById(
  connection: Connection,
  id: string,
): Promise<LolChatFriendResource> {
  let result: string;
  try {
    result = await connection.request('GET', `/lol-chat/v1/friends/${id}`, {
      expectation: { code: 200 },
    });
  } catch (e: any) {
    throw new RequestError(`GetLolChatV1FriendsById request error: ${e}`, e.code);
  }
  return JSON.parse(result);
}

export async function DeleteLolChatV1FriendsById(
  connection: Connection,
  id: string,
) {
  return connection.request('DELETE', `/lol-chat/v1/friends/${id}`, {
    expectation: { code: 204 },
  });
}

export async function PutLolChatV1FriendsById(
  connection: Connection,
  id: string,
  contact: Partial<LolChatFriendResource>,
) {
  return connection.request('PUT', `/lol-chat/v1/friends/${id}`, {
    data: JSON.stringify(contact),
    expectation: { code: 201 },
  });
}
