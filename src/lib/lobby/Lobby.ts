import { GetLolLobbyV2Lobby, PostLolLobbyV2Lobby } from '../../lcu/functions/LolLobbyV2Lobby';
import LolLobbyLobbyDto from '../../lcu/generated/LolLobbyLobbyDto';
import QueueIdentifier from '../../lcu/ours/QueueIdentifier';
import Connection from '../../sys/Connection';
import Chatroom from '../chat/Chatroom';
import CallbackHandler, { BasicCallback } from '../../sys/CallbackHandler';

export default class Lobby {
  protected readonly connection: Connection;

  protected resource: any;

  private lobby: LolLobbyLobbyDto;

  private callbacks: CallbackHandler; // searchstate, matchmaking, readycheck

  public readonly chatroom: Chatroom | null;

  constructor(
    connection: Connection,
    resource: LolLobbyLobbyDto,
  ) {
    this.connection = connection;
    this.resource = resource;
    this.lobby = this.resource;

    this.connection.websocket.subscribe('OnJsonApiEvent_lol-lobby_v2_lobby', this.update);
    this.connection.websocket.subscribe('OnJsonApiEvent_lol-lobby-team-builder_v1_matchmaking', this.update);

    this.callbacks = new CallbackHandler();

    try {
      this.chatroom = new Chatroom(connection, this.lobby.chatRoomId);
    } catch (e: any) {
      if (e.code !== 404) {
        throw new Error(`Failed to get lobby chatroom! ${e}`);
      }
      this.chatroom = null;
    }
  }

  /**
   * Add event handler
   * @param event Event to handle
   * @param callback Event handler
   */
  public on(event: string, callback: BasicCallback) {
    this.callbacks.add(event, callback);
  }

  /**
   * Update lobby from WebSocket event
   * @param param0 Event params
   */
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
      return;
    }

    if (eventType === 'Update' && uri === '/lol-lobby/v2/lobby/members') {
      this.lobby.members = data;
      return;
    }

    if (eventType === 'Update' && uri === '/lol-lobby/v2/lobby/matchmaking/search-state') {
      return;
    }

    if (eventType === 'Update' && uri === '/lol-lobby-team-builder/v1/matchmaking') {
      return;
    }

    if (uri === '/lol-lobby/v2/lobby/custom/available-bots' || uri === '/lol-lobby/v2/lobby/custom/bots-enabled') {
      return;
    }

    console.warn(`Unknown lobby event ${eventType} ${uri}`);
    console.log(data);
  };

  /** Get queue ID */
  get queueId(): QueueIdentifier {
    return this.lobby.gameConfig.queueId;
  }

  /** Set queue ID */
  set queueId(queueId: QueueIdentifier) {
    PostLolLobbyV2Lobby(this.connection, { queueId });
  }

  /**
   * Creates a new game lobby and returns new Lobby
   * @param connection Client connection
   * @param queueId Queue / game ID to create lobby for
   * @returns Promise
   */
  public static async create(connection: Connection, queueId: QueueIdentifier): Promise<Lobby> {
    let lobby: LolLobbyLobbyDto;

    // Try to create lobby
    try {
      lobby = await PostLolLobbyV2Lobby(connection, { queueId });
    } catch (e) {
      throw new Error(`Failed to create lobby: ${e}`);
    }

    // Make lobby class
    return new Lobby(connection, lobby);
  }

  /**
   * Retrieves current lobby and returns new Lobby
   * @param connection Client connection
   * @returns Promise
   */
  public static async get(connection: Connection): Promise<Lobby> {
    let lobby: LolLobbyLobbyDto;

    // Try to get lobby
    try {
      lobby = await GetLolLobbyV2Lobby(connection);
    } catch (e) {
      throw new Error(`Failed to get lobby: ${e}`);
    }

    // Make lobby class
    return new Lobby(connection, lobby);
  }
}
