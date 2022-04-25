/**
 * LolLootV1PlayerLoot functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Instance from '../../sys/Instance';
import { LolLootPlayerLoot } from '../generated/LolLootPlayerLoot';

async function GetLolLootV1PlayerLoot(instance: Instance): Promise<LolLootPlayerLoot[]> {
  const result = await instance.http.request('GET', '/lol-loot/v1/player-loot');
  const json: LolLootPlayerLoot[] = JSON.parse(result);
  return json;
}
export default GetLolLootV1PlayerLoot;
