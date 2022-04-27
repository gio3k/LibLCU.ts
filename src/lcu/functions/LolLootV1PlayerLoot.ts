/**
 * LolLootV1PlayerLoot functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolLootPlayerLoot } from '../generated/LolLootPlayerLoot';

async function GetLolLootV1PlayerLoot(instance: Instance): Promise<LolLootPlayerLoot[]> {
  let result: string;
  try {
    result = await instance.http.request('GET', '/lol-loot/v1/player-loot');
  } catch (e) {
    throw new Error(`GetLolLootV1PlayerLoot request error: ${e}`);
  }
  return JSON.parse(result);
}
export default GetLolLootV1PlayerLoot;
