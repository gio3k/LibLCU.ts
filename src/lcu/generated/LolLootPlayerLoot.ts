/**
 * Type LolLootPlayerLoot automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLootItemOwnershipStatus from './LolLootItemOwnershipStatus';
import LolLootRedeemableStatus from './LolLootRedeemableStatus';

export default interface LolLootPlayerLoot {
  lootName: string;
  lootId: string;
  refId: string;
  localizedName: string;
  localizedDescription: string;
  itemDesc: string;
  displayCategories: string;
  rarity: string;
  tags: string;
  type: string;
  asset: string;
  tilePath: string;
  splashPath: string;
  shadowPath: string;
  upgradeLootName: string;
  upgradeEssenceName: string;
  disenchantLootName: string;
  localizedRecipeTitle: string;
  localizedRecipeSubtitle: string;
  itemStatus: LolLootItemOwnershipStatus;
  parentItemStatus: LolLootItemOwnershipStatus;
  redeemableStatus: LolLootRedeemableStatus;
  count: number;
  rentalGames: number;
  storeItemId: number;
  parentStoreItemId: number;
  value: number;
  upgradeEssenceValue: number;
  disenchantValue: number;
  expiryTime: number;
  rentalSeconds: number;
  isNew: boolean;
  isRental: boolean;
}
