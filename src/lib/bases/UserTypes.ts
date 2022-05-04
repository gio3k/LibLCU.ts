/**
 * User base types / interfaces
 * For LibLCU.ts (https://github.com/lotuspar/liblcu.ts)
 * @author lotuspar, 2022
 */

/*
  Alternate type names
  summonerIconId, icon (LCU) -> icon (LibLCU)
  summonerName (LCU) -> name (LibLCU)

  puuid (LCU) -> globalId (LibLCU)
    // PUUID is a globally unique (with regional context) identifier
    // Doesn't change when transferring region etc.

  summonerId (LCU) -> summonerId (LibLCU)
    // Summoner ID is a regionally unique identifier
    // Number (uint64) form identifier

  id (LCU) -> regionalAccountId (LibLCU)
    // Regionally unique identifier
    // Seems to be in the form of <globalId>@<platformId>.pvp.net

  Resources
  https://riot-api-libraries.readthedocs.io/en/latest/ids.html
  https://www.riotgames.com/en/DevRel/player-universally-unique-identifiers-and-a-new-security-layer
*/

export interface BasicUser {
  readonly name: string; // name (LCU)
  icon: number; // icon (LCU)

  // puuid (LCU) -> globalId (LibLCU)
  readonly globalId: string;

  // summonerId (LCU) -> summonerId (LibLCU)
  readonly summonerId: number;
}

export interface KnownUser extends BasicUser {
  // productId: "valorant", "league_of_legends", "ritoplus" (Riot Mobile)
  readonly productId: string; // product (LCU) -> productId (LibLCU)
  readonly productName: string; // productName (LCU)

  readonly platform: string; // platformId (LCU) -> platform (LibLCU)
  readonly patchline: string; // patchline (LCU)

  // id (LCU) -> regionalAccountId (LibLCU)
  readonly regionalAccountId: string;

  // statusMessage (LCU) -> status (LibLCU)
  status: string;

  // Attributes relating to other Riot games
  readonly riotName: string; // gameName (LCU) -> riotName (LibLCU)
  readonly riotTag: string; // gameTag (LCU) -> riotTag (LibLCU)
}

export interface FriendUser extends KnownUser {
  note: string; // note (LCU)
}
