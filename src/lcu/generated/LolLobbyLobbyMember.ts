/**
 * Type LolLobbyLobbyMember automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyLobbyBotDifficulty from './LolLobbyLobbyBotDifficulty';
import LolLobbyLobbyPositionPreferences from './LolLobbyLobbyPositionPreferences';

export default interface LolLobbyLobbyMember {
  id: number;
  isOwner: boolean;
  isSpectator: boolean;
  canInviteOthers: boolean;
  positionPreferences: LolLobbyLobbyPositionPreferences;
  excludedPositionPreference?: string;
  summonerInternalName: string;
  showPositionExcluder: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForStreaking: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  isBot: boolean;
  botDifficulty: LolLobbyLobbyBotDifficulty;
  botChampionId: number;
}
