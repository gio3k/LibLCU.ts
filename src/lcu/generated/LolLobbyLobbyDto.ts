/**
 * Type LolLobbyLobbyDto automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import { LolLobbyEligibilityRestriction } from './LolLobbyEligibilityRestriction';
import { LolLobbyLobbyGameConfigDto } from './LolLobbyLobbyGameConfigDto';
import { LolLobbyLobbyInvitationDto } from './LolLobbyLobbyInvitationDto';
import { LolLobbyLobbyParticipantDto } from './LolLobbyLobbyParticipantDto';

export interface LolLobbyLobbyDto {
  partyId: string;
  partyType: string;
  members: LolLobbyLobbyParticipantDto[];
  localMember: LolLobbyLobbyParticipantDto;
  invitations: LolLobbyLobbyInvitationDto[];
  canStartActivity: boolean;
  restrictions?: LolLobbyEligibilityRestriction[];
  warnings?: LolLobbyEligibilityRestriction[];
  gameConfig: LolLobbyLobbyGameConfigDto;
  chatRoomId: string;
  chatRoomKey: string;
}
