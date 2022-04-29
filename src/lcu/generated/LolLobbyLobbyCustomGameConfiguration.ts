/**
 * Type LolLobbyLobbyCustomGameConfiguration automatically converted to TypeScript
 * Converted for LibLCU.ts
 * Accurate as of 22/04/2022
 * @author TypeToType generator by lotuspar, original type by Riot Games
 */

import LolLobbyQueueCustomGameSpectatorPolicy from './LolLobbyQueueCustomGameSpectatorPolicy';
import LolLobbyQueueGameTypeConfig from './LolLobbyQueueGameTypeConfig';

export default interface LolLobbyLobbyCustomGameConfiguration {
  mapId: number;
  gameMode: string;
  mutators: LolLobbyQueueGameTypeConfig;
  gameTypeConfig: LolLobbyQueueGameTypeConfig;
  spectatorPolicy: LolLobbyQueueCustomGameSpectatorPolicy;
  teamSize: number;
  maxPlayerCount: number;
  tournamentGameMode: string;
  tournamentPassbackUrl: string;
  tournamentPassbackDataPacket: string;
  gameServerRegion: string;
}
