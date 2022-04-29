/**
 * Type LolChatFriendResource converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022, based on LolChatUserResource
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolChatUserResource from '../generated/LolChatUserResource';

export default interface LolChatFriendResource extends LolChatUserResource {
  note: string;
  isP2PConversationMuted: boolean;
  groupId: number;
  displayGroupId: number;
  groupName: string;
  displayGroupName: string;
}
