/**
 * Type LolLobbyLobbyGameConfigDto automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyLobbyParticipantDto from './LolLobbyLobbyParticipantDto';
import LolLobbyQueueCustomGameSpectatorPolicy from './LolLobbyQueueCustomGameSpectatorPolicy';

export default interface LolLobbyLobbyGameConfigDto {
  gameMode: string;
  mapId: number;
  queueId: number;
  pickType: string;
  maxTeamSize: number;
  maxLobbySize: number;
  maxHumanPlayers: number;
  allowablePremadeSizes: number[];
  premadeSizeAllowed: boolean;
  isTeamBuilderManaged: boolean;
  isCustom: boolean;
  showPositionSelector: boolean;
  isLobbyFull: boolean;
  customLobbyName: string;
  customMutatorName: string;
  customTeam100: LolLobbyLobbyParticipantDto[];
  customTeam200: LolLobbyLobbyParticipantDto[];
  customSpectators: LolLobbyLobbyParticipantDto[];
  customSpectatorPolicy: LolLobbyQueueCustomGameSpectatorPolicy;
  customRewardsDisabledReasons: string[];
}
