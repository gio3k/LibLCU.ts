/**
 * LolChatV1ConversationsByIdMessages functions for use with TypeScript
 * Accurate as of 25/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolChatConversationMessageResource } from '../generated/LolChatConversationMessageResource';

export async function GetLolChatV1ConversationsByIdMessages(
  instance: Instance,
  id: string,
): Promise<LolChatConversationMessageResource[]> {
  const result = await instance.http.request('GET', `/lol-chat/v1/conversations/${id}/messages`);
  return JSON.parse(result);
}

export async function PostLolChatV1ConversationsByIdMessages(
  instance: Instance,
  id: string,
  message: Partial<LolChatConversationMessageResource>,
) {
  await instance.http.request('POST', `/lol-chat/v1/conversations/${id}/messages`, {
    data: JSON.stringify(message),
    expectedResponse: 200,
  });
}
