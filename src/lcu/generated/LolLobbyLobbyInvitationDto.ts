/**
 * Type LolLobbyLobbyInvitationDto automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyInvitationType from './LolLobbyInvitationType';
import LolLobbyLobbyInvitationState from './LolLobbyLobbyInvitationState';

export interface LolLobbyLobbyInvitationDto {
  invitationId: string;
  toSummonerId: number;
  state: LolLobbyLobbyInvitationState;
  timestamp: string;
  toSummonerName: string;
  invitationType: LolLobbyInvitationType;
}
