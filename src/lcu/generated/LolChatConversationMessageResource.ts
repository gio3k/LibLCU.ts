/**
 * Type LolChatConversationMessageResource automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 25/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

export interface LolChatConversationMessageResource {
  id: string;
  type: string;
  fromSummonerId: number;
  fromId: string;
  fromPid: string;
  body: string;
  timestamp: string;
  isHistorical: boolean;
}
