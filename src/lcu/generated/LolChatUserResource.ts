/**
 * Type LolChatUserResource automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 23/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

export interface LolChatUserResource {
  summonerId: number;
  id: string;
  name: string;
  pid: string;
  puuid: string;
  gameName: string;
  gameTag: string;
  icon: number;
  availability: string;
  platformId: string;
  patchline: string;
  product: string;
  productName: string;
  summary: string;
  time: number;
  statusMessage?: string;
  lastSeenOnlineTimestamp?: string;
  lol: Map<string, string>;
}
