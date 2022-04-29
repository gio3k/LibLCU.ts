/**
 * Type LolLobbyLobbyChangeGameDto automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyLobbyCustomGameLobby from './LolLobbyLobbyCustomGameLobby';

export default interface LolLobbyLobbyChangeGameDto {
  queueId: number;
  isCustom: boolean;
  customGameLobby?: LolLobbyLobbyCustomGameLobby;
  gameCustomization?: Map<string, string>;
}
