/**
 * LolLootV1PlayerLoot functions for use with TypeScript
 * Accurate as of 23/04/2022
 * @author lotuspar, original functions by Riot Games
 */

import Connection from '../../sys/Connection';
import { RequestError } from '../../sys/tx/HTTPUtils';
import LolLootPlayerLoot from '../generated/LolLootPlayerLoot';

async function GetLolLootV1PlayerLoot(connection: Connection): Promise<LolLootPlayerLoot[]> {
  let result: string;
  try {
    result = await connection.request('GET', '/lol-loot/v1/player-loot', {
      expectation: { code: 200 },
    });
  } catch (e: any) {
    throw new RequestError(`GetLolLootV1PlayerLoot request error: ${e}`, e.code);
  }
  return JSON.parse(result);
}
export default GetLolLootV1PlayerLoot;
