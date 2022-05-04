/**
 * LolChatV1ConversationsByIdMessages functions for use with TypeScript
 * Accurate as of 25/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';
import { RequestError } from '../../sys/tx/HTTPUtils';
import LolChatConversationMessageResource from '../generated/LolChatConversationMessageResource';

export async function GetLolChatV1ConversationsByIdMessages(
  connection: Connection,
  id: string,
): Promise<LolChatConversationMessageResource[]> {
  let result: string;
  try {
    result = await connection.request('GET', `/lol-chat/v1/conversations/${id}/messages`, {
      expectation: { code: 200 },
    });
  } catch (e: any) {
    throw new RequestError(`GetLolChatV1ConversationsByIdMessages request error: ${e}`, e.code);
  }
  return JSON.parse(result);
}

export async function PostLolChatV1ConversationsByIdMessages(
  connection: Connection,
  id: string,
  message: Partial<LolChatConversationMessageResource>,
): Promise<LolChatConversationMessageResource> {
  let result: string;
  try {
    result = await connection.request('POST', `/lol-chat/v1/conversations/${id}/messages`, {
      data: JSON.stringify(message),
      expectation: { code: 200 },
    });
  } catch (e: any) {
    throw new RequestError(`PostLolChatV1ConversationsByIdMessages request error: ${e}`, e.code);
  }
  return JSON.parse(result);
}
