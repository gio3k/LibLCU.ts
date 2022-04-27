/**
 * Type LolLobbyLobbyCustomGameLobby automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import { LolLobbyLobbyCustomGameConfiguration } from './LolLobbyLobbyCustomGameConfiguration';
import { LolLobbyLobbyMember } from './LolLobbyLobbyMember';

export interface LolLobbyLobbyCustomGameLobby {
  lobbyName: string;
  lobbyPassword: string;
  configuration: LolLobbyLobbyCustomGameConfiguration; // LolLobbyLobbyCustomGameConfiguration
  teamOne: LolLobbyLobbyMember[]; // vector of LolLobbyLobbyMember
  teamTwo: LolLobbyLobbyMember[]; // vector of LolLobbyLobbyMember
  spectators: LolLobbyLobbyMember[]; // vector of LolLobbyLobbyMember
  practiceGameRewardsDisabledReasons: string[];
  gameId: number;
}
