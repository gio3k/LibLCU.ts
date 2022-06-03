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
  PostLolLobbyV2LobbyMatchmakingSearch,
  PutLolLobbyV2LobbyMembersLocalMemberPositionPreferences,
} from '../../lcu/functions/LolLobbyV2Lobby';
import { PostLolMatchmakingV1ReadyCheckAccept, PostLolMatchmakingV1ReadyCheckDecline } from '../../lcu/functions/LolMatchmakingV1ReadyCheck';
import LolLobbyLobbyDto from '../../lcu/generated/LolLobbyLobbyDto';
import LolLobbyLobbyPositionPreferences from '../../lcu/generated/LolLobbyLobbyPositionPreferences';
import LolLobbyTeamBuilderMatchmakingReadyCheckResource from '../../lcu/generated/LolLobbyTeamBuilderMatchmakingReadyCheckResource';
import LolLobbyTeamBuilderMatchmakingReadyCheckState from '../../lcu/generated/LolLobbyTeamBuilderMatchmakingReadyCheckState';
import QueueIdentifier from '../../lcu/ours/QueueIdentifier';
import Connection from '../../sys/Connection';
import Activity, { ActivityEvents } from '../Activity';

enum Events {
  Update = 'update',
  ReadyCheckInProgress = 'lobby_ready_check_in_progress',
  SearchLocalReadyCheckInProgress = 'lobby_ready_check_in_progress__per_search',
}
export { Events as LobbyEvents };

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
    console.log(data, eventType, uri);
    // DELETE /lol-lobby/v2/lobby
    // Lobby closed
    if (eventType === 'Delete' && uri === '/lol-lobby/v2/lobby') {
      this.call(ActivityEvents.PreDestroy);
      return;
    }

    // UPDATE /lol-lobby/v2/lobby
    // Generic full resource update
    if (eventType === 'Update' && uri === '/lol-lobby/v2/lobby') {
      this.resource = data;
      this.call(Events.Update, data);
    }

    // DELETE /lol-lobby-team-builder/v1/matchmaking
    // Lobby stopped searching
    if (eventType === 'Delete' && uri === '/lol-lobby-team-builder/v1/matchmaking') {
      this.clear(Events.SearchLocalReadyCheckInProgress);
    }

    // UPDATE
    // Generic search update
    if (eventType === 'Update' && uri === '/lol-lobby-team-builder/v1/matchmaking') {
      const { readyCheck } : {
        readyCheck: LolLobbyTeamBuilderMatchmakingReadyCheckResource
      } = data;

      if (readyCheck.state === LolLobbyTeamBuilderMatchmakingReadyCheckState.InProgress) {
        this.call(Events.SearchLocalReadyCheckInProgress, readyCheck);
        this.call(Events.ReadyCheckInProgress);
      }
    }
  };

  get searching() {
    return this.count(Events.SearchLocalReadyCheckInProgress) !== 0;
  }

  async startSearching(
    gameFoundCallback: (arg0: LolLobbyTeamBuilderMatchmakingReadyCheckResource) => void,
  ) {
    this.on(Events.SearchLocalReadyCheckInProgress, gameFoundCallback);
    return PostLolLobbyV2LobbyMatchmakingSearch(this.connection);
  }

  async stopSearching() {
    this.clear(Events.SearchLocalReadyCheckInProgress);
    return PostLolLobbyV2LobbyMatchmakingSearch(this.connection);
  }

  async accept() {
    return PostLolMatchmakingV1ReadyCheckAccept(this.connection);
  }

  async decline() {
    return PostLolMatchmakingV1ReadyCheckDecline(this.connection);
  }

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
  async setQueueId(queueId: QueueIdentifier) {
    return PostLolLobbyV2Lobby(this.connection, { queueId });
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
