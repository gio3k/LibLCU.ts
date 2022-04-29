/**
 * Type LolLobbyQueueGameTypeConfig automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

export default interface LolLobbyQueueGameTypeConfig {
  id: number;
  name: string;
  maxAllowableBans: number;
  allowTrades: boolean;
  exclusivePick: boolean;
  duplicatePick: boolean;
  teamChampionPool: boolean;
  crossTeamChampionPool: boolean;
  advancedLearningQuests: boolean;
  battleBoost: boolean;
  deathMatch: boolean;
  doNotRemove: boolean;
  learningQuests: boolean;
  onboardCoopBeginner: boolean;
  reroll: boolean;
  mainPickTimerDuration: number;
  postPickTimerDuration: number;
  banTimerDuration: number;
  pickMode: string;
  banMode: string;
  gameModeOverride?: string;
  numPlayersPerTeamOverride?: number;
}
