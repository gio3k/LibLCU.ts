/**
 * Type LolLobbyTeamBuilderMatchmakingReadyCheckResource automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyTeamBuilderMatchmakingDodgeWarning from './LolLobbyTeamBuilderMatchmakingDodgeWarning';
import LolLobbyTeamBuilderMatchmakingReadyCheckResponse from './LolLobbyTeamBuilderMatchmakingReadyCheckResponse';
import LolLobbyTeamBuilderMatchmakingReadyCheckState from './LolLobbyTeamBuilderMatchmakingReadyCheckState';

export default interface LolLobbyTeamBuilderMatchmakingReadyCheckResource {
  state: LolLobbyTeamBuilderMatchmakingReadyCheckState;
  playerResponse: LolLobbyTeamBuilderMatchmakingReadyCheckResponse;
  dodgeWarning: LolLobbyTeamBuilderMatchmakingDodgeWarning;
  timer: number; // float
  declinerIds: number[];
}
