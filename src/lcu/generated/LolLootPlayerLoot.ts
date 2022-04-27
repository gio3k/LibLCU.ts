/**
 * Type LolLootPlayerLoot automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

export enum LolLootItemOwnershipStatus {
  NONE = 0,
  FREE = 1,
  RENTAL = 2,
  OWNED = 3,
}

export enum LolLootRedeemableStatus {
  UNKNOWN = 0,
  REDEEMABLE = 1,
  REDEEMABLE_RENTAL = 2,
  NOT_REDEEMABLE = 3,
  NOT_REDEEMABLE_RENTAL = 4,
  ALREADY_OWNED = 5,
  ALREADY_RENTED = 6,
  CHAMPION_NOT_OWNED = 7,
  SKIN_NOT_OWNED = 8,
}

export interface LolLootPlayerLoot {
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
