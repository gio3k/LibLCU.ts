import {
  DeleteLolLobbyV2LobbyMatchmakingSearch,
  GetLolLobbyV2Lobby, PostLolLobbyV2Lobby,
  PostLolLobbyV2LobbyInvitations,
  PostLolLobbyV2LobbyMatchmakingSearch,
  PostLolLobbyV2LobbyMembersBySummonerIdGrantInvite,
  PostLolLobbyV2LobbyMembersBySummonerIdKick,
  PostLolLobbyV2LobbyMembersBySummonerIdPromote,
  PostLolLobbyV2LobbyMembersBySummonerIdRevokeInvite,
  PutLolLobbyV2LobbyMembersLocalMemberPositionPreferences,
} from '../../lcu/functions/LolLobbyV2Lobby';
import { LolLobbyLobbyDto } from '../../lcu/generated/LolLobbyLobbyDto';
import { LolLobbyLobbyParticipantDto } from '../../lcu/generated/LolLobbyLobbyParticipantDto';
import { LolLobbyLobbyPositionPreferences } from '../../lcu/generated/LolLobbyLobbyPositionPreferences';
import LobbyQueueId from '../../lcu/ours/QueueIdentifier';
import Instance from '../../sys/Instance';
import Friend from '../user/friend/Friend';
import Member from './Member';

export default class Lobby {
  private instance: Instance;

  private lobby: LolLobbyLobbyDto;

  private constructor(instance: Instance, lobby: LolLobbyLobbyDto) {
    this.instance = instance;
    this.lobby = lobby;

    instance.subscribe('OnJsonApiEvent_lol-lobby_v2_lobby', ({ eventType, data }: { eventType: any, data: any }) => {
      // /lol-lobby/v2/lobby
      // /lol-lobby/v2/lobby/members
      // /lol-lobby/v2/lobby/matchmaking/search-state
    });
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
    if (!this.lobby.canStartActivity) {
      throw new Error('Unable to start search, lobby not ready. ');
    }

    return PostLolLobbyV2LobbyMatchmakingSearch(this.instance);
  }

  /**
   * Stop queuing for a game
   */
  public async stopSearching() {
    return DeleteLolLobbyV2LobbyMatchmakingSearch(this.instance);
  }

  /**
   * Set local position / lane preferences
   * @param positionPreferences New position preferences
   * @returns Promise
   */
  public async setLocalPositionPreferences(positionPreferences: LolLobbyLobbyPositionPreferences) {
    return PutLolLobbyV2LobbyMembersLocalMemberPositionPreferences(
      this.instance,
      positionPreferences,
    );
  }

  /**
   * Kick member from party
   * @param member Member to kick
   * @returns Promise
   */
  public async kick(member: Member) {
    if (!this.lobby.localMember.allowedKickOthers) {
      throw new Error('Local user is not allowed to kick members.');
    }

    if (member.sid === this.lobby.localMember.summonerId) {
      throw new Error("Can't kick local user.");
    }

    return PostLolLobbyV2LobbyMembersBySummonerIdKick(this.instance, member.sid);
  }

  /**
   * Promote member in party
   * @param member Member to promote
   * @returns Promise
   */
  public async promote(member: Member) {
    return PostLolLobbyV2LobbyMembersBySummonerIdPromote(this.instance, member.sid);
  }

  /**
   * Allow member to invite players
   * @param member Member to grant invite permission
   * @returns Promise
   */
  public async grantInvites(member: Member) {
    if (!this.lobby.localMember.allowedToggleInvite) {
      throw new Error('Local user is not allowed to grant invite permissions.');
    }

    if (member.sid === this.lobby.localMember.summonerId) {
      throw new Error("Can't change permissions of local user.");
    }

    return PostLolLobbyV2LobbyMembersBySummonerIdGrantInvite(this.instance, member.sid);
  }

  /**
   * Block member from inviting players
   * @param member Member to deny invite permission
   * @returns Promise
   */
  public async denyInvites(member: Member) {
    if (!this.lobby.localMember.allowedToggleInvite) {
      throw new Error('Local user is not allowed to deny invite permissions.');
    }
    
    if (member.sid === this.lobby.localMember.summonerId) {
      throw new Error("Can't change permissions of local user.");
    }

    return PostLolLobbyV2LobbyMembersBySummonerIdRevokeInvite(this.instance, member.sid);
  }

  /**
   * Invites friend to lobby
   * @param friend Friend to invite
   * @returns Promise
   */
  public async invite(friend: Friend) {
    return PostLolLobbyV2LobbyInvitations(this.instance, [{ toSummonerId: friend.sid }]);
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
