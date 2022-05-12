/**
 * Lobby
 * Lobby current instance functions
 *
 * For LibLCU.ts (https://github.com/lotuspar/liblcu.ts)
 * @author lotuspar, 2022
 */

import {
  GetLolLobbyV2Lobby,
  PostLolLobbyV2Lobby,
  PutLolLobbyV2LobbyMembersLocalMemberPositionPreferences,
} from '../../lcu/functions/LolLobbyV2Lobby';
import LolLobbyLobbyDto from '../../lcu/generated/LolLobbyLobbyDto';
import LolLobbyLobbyPositionPreferences from '../../lcu/generated/LolLobbyLobbyPositionPreferences';
import QueueIdentifier from '../../lcu/ours/QueueIdentifier';
import Connection from '../../sys/Connection';
import Activity from '../Activity';

export enum Events {
  ReadyCheck = 'lobby_ready_check',
  Update = 'lobby_update',
}

export default class Lobby extends Activity {
  resource: LolLobbyLobbyDto;

  constructor(connection: Connection, resource: LolLobbyLobbyDto) {
    super(connection);
    this.resource = resource;

    this.registerEvents(Object.values(Events));

    this.connection.subscribe('OnJsonApiEvent_lol-lobby_v2_lobby', this.update);
    this.connection.subscribe('OnJsonApiEvent_lol-lobby-team-builder_v1_matchmaking', this.update);
  }

  private update = ({ eventType, data, uri }: { eventType: any, data: any, uri: string }) => {
    // /lol-lobby/v2/lobby
    //   LolLobbyLobbyDto
    // /lol-lobby/v2/lobby/members
    //   array of LolLobbyLobbyParticipantDto
    // /lol-lobby/v2/lobby/custom/available-bots
    //   array
    // /lol-lobby/v2/lobby/custom/bots-enabled
    //   boolean
    // /lol-lobby/v2/lobby/matchmaking/search-state
    //   { errors, lowPriorityData, searchState }
    // /lol-lobby/v2/lobby/countdown
    //   { countdown, enabled }

    if (eventType === 'Update' && uri === '/lol-lobby/v2/lobby') {
      this.resource = data;
      this.call(Events.Update, data);
      return;
    }
  };

  /**
   * Return current queue ID / game mode
   * @returns QueueIdentifier Current queue ID
   */
  getQueueId(): QueueIdentifier {
    return this.resource.gameConfig.queueId;
  }

  /**
   * Set current queue ID / gamemode
   * @param queueId New queue ID
   */
  setQueueId(queueId: QueueIdentifier) {
    PostLolLobbyV2Lobby(this.connection, { queueId });
  }

  /**
   * Get local lane / position preferences
   * @returns Current position preferences
   */
  public getLocalPositionPreferences(): LolLobbyLobbyPositionPreferences {
    return {
      firstPreference: this.resource.localMember.firstPositionPreference,
      secondPreference: this.resource.localMember.secondPositionPreference,
    };
  }

  /**
   * Set local lane / position preferences
   * @param positionPreferences New preferences
   * @returns Promise
   */
  public async setLocalPositionPreferences(positionPreferences: LolLobbyLobbyPositionPreferences) {
    return PutLolLobbyV2LobbyMembersLocalMemberPositionPreferences(
      this.connection,
      positionPreferences,
    );
  }

  /* Creation of instance */
  /**
   * Start new lobby and create Lobby from it
   * @param connection Client connection
   * @param queueId Queue identifier to start lobby with
   */
  public static async create(connection: Connection, queueId: QueueIdentifier, extra?: Object) {
    let resource: LolLobbyLobbyDto;

    // Attempt to create lobby
    try {
      resource = await PostLolLobbyV2Lobby(connection, { queueId, ...extra });
    } catch (e) {
      throw new Error(`Failed to create lobby: ${e}`);
    }

    // Make lobby instance
    return new Lobby(connection, resource);
  }

  /**
   * Get current lobby
   * @param connection Client connection
   */
  public static async getCurrentLobby(connection: Connection) {
    let resource: LolLobbyLobbyDto;

    // Attempt to get lobby
    try {
      resource = await GetLolLobbyV2Lobby(connection);
    } catch (e) {
      throw new Error(`Failed to get lobby: ${e}`);
    }

    // Make lobby instance
    return new Lobby(connection, resource);
  }
}
