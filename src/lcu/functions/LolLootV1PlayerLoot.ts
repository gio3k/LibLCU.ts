/**
 * LolLootV1PlayerLoot functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';
import LolLootPlayerLoot from '../generated/LolLootPlayerLoot';

async function GetLolLootV1PlayerLoot(connection: Connection): Promise<LolLootPlayerLoot[]> {
  let result: string;
  try {
    result = await connection.request('GET', '/lol-loot/v1/player-loot', {
      expectation: { code: 200 },
    });
  } catch (e) {
    throw new Error(`GetLolLootV1PlayerLoot request error: ${e}`);
  }
  return JSON.parse(result);
}
export default GetLolLootV1PlayerLoot;
