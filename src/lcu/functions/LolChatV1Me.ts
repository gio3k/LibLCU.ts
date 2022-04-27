/**
 * LolChatV1Me functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolChatUserResource } from '../generated/LolChatUserResource';

export async function GetLolChatV1Me(instance: Instance): Promise<LolChatUserResource> {
  const result = await instance.http.request('GET', '/lol-chat/v1/me', { expectedResponse: 200 });
  return JSON.parse(result);
}

export async function PutLolChatV1Me(instance: Instance, me: Partial<LolChatUserResource>) {
  await instance.http.request('PUT', '/lol-chat/v1/me', {
    data: JSON.stringify(me),
    expectedResponse: 201,
  });
}
