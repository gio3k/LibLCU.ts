/**
 * Type LolLobbyLobbyParticipantDto automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyLobbyBotDifficulty from './LolLobbyLobbyBotDifficulty';

export interface LolLobbyLobbyParticipantDto {
  summonerId: number;
  summonerIconId: number;
  summonerName: string;
  summonerInternalName: string;
  puuid: string;
  summonerLevel: number;
  allowedStartActivity: boolean;
  allowedChangeActivity: boolean;
  allowedToggleInvite: boolean;
  allowedKickOthers: boolean;
  allowedInviteOthers: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  teamId: number;
  firstPositionPreference: string;
  secondPositionPreference: string;
  ready: boolean;
  showGhostedBanner: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForStreaking: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  isBot: boolean;
  botId: string;
  botDifficulty: LolLobbyLobbyBotDifficulty;
  botChampionId: number;
}
