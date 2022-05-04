/**
 * Type LolLobbyTeamBuilderMatchmakingSearchResource automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyTeamBuilderMatchmakingDodgeData from './LolLobbyTeamBuilderMatchmakingDodgeData';
import LolLobbyTeamBuilderMatchmakingLowPriorityData from './LolLobbyTeamBuilderMatchmakingLowPriorityData';
import LolLobbyTeamBuilderMatchmakingReadyCheckResource from './LolLobbyTeamBuilderMatchmakingReadyCheckResource';
import LolLobbyTeamBuilderMatchmakingSearchErrorResource from './LolLobbyTeamBuilderMatchmakingSearchErrorResource';
import LolLobbyTeamBuilderMatchmakingSearchState from './LolLobbyTeamBuilderMatchmakingSearchState';

export default interface LolLobbyTeamBuilderMatchmakingSearchResource {
  queueId: number;
  isCurrentlyInQueue: boolean;
  lobbyId: string;
  searchState: LolLobbyTeamBuilderMatchmakingSearchState;
  timeInQueue: number; // float
  estimatedQueueTime: number; // float
  readyCheck: LolLobbyTeamBuilderMatchmakingReadyCheckResource;
  dodgeData: LolLobbyTeamBuilderMatchmakingDodgeData;
  lowPriorityData: LolLobbyTeamBuilderMatchmakingLowPriorityData;
  errors: LolLobbyTeamBuilderMatchmakingSearchErrorResource[];
}
