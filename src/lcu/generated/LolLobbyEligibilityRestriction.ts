/**
 * Type LolLobbyEligibilityRestriction automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyEligibilityRestrictionCode from './LolLobbyEligibilityRestrictionCode';

export interface LolLobbyEligibilityRestriction {
  restrictionCode: LolLobbyEligibilityRestrictionCode;
  restrictionArgs: Map<string, string>;
  expiredTimestamp: number;
  summonerIds: number[];
  summonerIdsString: string;
}
