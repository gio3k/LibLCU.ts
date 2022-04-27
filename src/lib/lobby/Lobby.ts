import {
  DeleteLolLobbyV2LobbyMatchmakingSearch,
  GetLolLobbyV2Lobby, PostLolLobbyV2Lobby,
  PostLolLobbyV2LobbyMatchmakingSearch,
} from '../../lcu/functions/LolLobbyV2Lobby';
import { LolLobbyLobbyDto } from '../../lcu/generated/LolLobbyLobbyDto';
import LobbyQueueId from '../../lcu/ours/QueueIdentifier';
import Instance from '../../sys/Instance';

export default class Lobby {
  private instance: Instance;

  private lobby: LolLobbyLobbyDto;

  private constructor(instance: Instance, lobby: LolLobbyLobbyDto) {
    this.instance = instance;
    this.lobby = lobby;
  }

  /** Get queue ID */
  get queueId(): LobbyQueueId {
    return this.lobby.gameConfig.queueId;
  }

  /** Set queue ID */
  set queueId(queueId: LobbyQueueId) {
    PostLolLobbyV2Lobby(this.instance, { queueId });
  }

  /**
   * Start queuing for a game
   */
  public async startSearching() {
    return PostLolLobbyV2LobbyMatchmakingSearch(this.instance);
  }

  /**
   * Stop queuing for a game
   */
  public async stopSearching() {
    return DeleteLolLobbyV2LobbyMatchmakingSearch(this.instance);
  }

  /**
   * Creates a new game lobby and returns new Lobby
   * @param instance Client instance
   * @param queueId Queue / game ID to create lobby for
   * @returns Promise<Lobby>
   */
  public static async create(instance: Instance, queueId: LobbyQueueId): Promise<Lobby> {
    let lobby: LolLobbyLobbyDto;

    // Try to create lobby
    try {
      lobby = await PostLolLobbyV2Lobby(instance, { queueId });
    } catch (e) {
      throw new Error(`Failed to create lobby: ${e}`);
    }

    // Make lobby class
    return new Lobby(instance, lobby);
  }

  /**
   * Retrieves current lobby and returns new Lobby
   * @param instance Client instance
   * @returns Promise<Lobby>
   */
  public static async get(instance: Instance): Promise<Lobby> {
    let lobby: LolLobbyLobbyDto;

    // Try to get lobby
    try {
      lobby = await GetLolLobbyV2Lobby(instance);
    } catch (e) {
      throw new Error(`Failed to get lobby: ${e}`);
    }

    // Make lobby class
    return new Lobby(instance, lobby);
  }
}
export { LobbyQueueId };
