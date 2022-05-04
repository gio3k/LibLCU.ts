/**
 * Type LolLobbyTeamBuilderMatchmakingSearchErrorResource automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

export default interface LolLobbyTeamBuilderMatchmakingSearchErrorResource {
  id: number;
  errorType: string;
  penalizedSummonerId: number;
  penaltyTimeRemaining: number; // double
  message: string;
}
