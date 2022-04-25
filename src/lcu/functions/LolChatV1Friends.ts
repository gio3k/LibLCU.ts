/**
 * LolChatV1Friends functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolChatFriendResource } from '../redone/LolChatFriendResource';

async function GetLolChatV1Friends(instance: Instance): Promise<LolChatFriendResource[]> {
  const result = await instance.http.request('GET', '/lol-chat/v1/friends');
  const json: LolChatFriendResource[] = JSON.parse(result);
  return json;
}
export default GetLolChatV1Friends;
