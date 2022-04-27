/**
 * LolChatV1Friends functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolChatFriendResource } from '../redone/LolChatFriendResource';

export async function GetLolChatV1Friends(instance: Instance): Promise<LolChatFriendResource[]> {
  let result: string;
  try {
    result = await instance.http.request('GET', '/lol-chat/v1/friends', { expectedResponse: 200 });
  } catch (e) {
    throw new Error(`GetLolChatV1Friends request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function GetLolChatV1FriendsById(
  instance: Instance,
  id: string,
): Promise<LolChatFriendResource> {
  let result: string;
  try {
    result = await instance.http.request('GET', `/lol-chat/v1/friends/${id}`, { expectedResponse: 200 });
  } catch (e) {
    throw new Error(`GetLolChatV1FriendsById request error: ${e}`);
  }
  return JSON.parse(result);
}

export async function DeleteLolChatV1FriendsById(
  instance: Instance,
  id: string,
) {
  return instance.http.request('DELETE', `/lol-chat/v1/friends/${id}`, { expectedResponse: 200 });
}

export async function PutLolChatV1FriendsById(
  instance: Instance,
  id: string,
  contact: Partial<LolChatFriendResource>,
) {
  return instance.http.request('PUT', `/lol-chat/v1/friends/${id}`, {
    data: JSON.stringify(contact),
    expectedResponse: 201,
  });
}
