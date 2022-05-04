/**
 * Type LolLobbyTeamBuilderMatchmakingSearchState automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

enum LolLobbyTeamBuilderMatchmakingSearchState {
  Invalid = 0,
  AbandonedLowPriorityQueue = 1,
  Canceled = 2,
  Searching = 3,
  Found = 4,
  Error = 5,
  ServiceError = 6,
  ServiceShutdown = 7,
}
export default LolLobbyTeamBuilderMatchmakingSearchState;
