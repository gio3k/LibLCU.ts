import { PostLolChatV1BlockedPlayers } from '../../lcu/functions/LolChatV1BlockedPlayers';
import {
  DeleteLolChatV1FriendsById,
  GetLolChatV1Friends,
  GetLolChatV1FriendsById,
  PutLolChatV1FriendsById,
} from '../../lcu/functions/LolChatV1Friends';
import { LolChatFriendResource } from '../../lcu/redone/LolChatFriendResource';
import Instance from '../../sys/Instance';
import User from './User';

export default class Friend implements User {
  private instance: Instance;

  private resource: LolChatFriendResource;

  private constructor(instance: Instance, resource: LolChatFriendResource) {
    this.instance = instance;
    this.resource = resource;

    instance.subscribe('OnJsonApiEvent_lol-chat_v1_friends', ({ eventType, data }: { eventType: any, data: any }) => {
      if (eventType !== 'Update') {
        console.warn(`unknown event type ${eventType}`);
      }
      this.resource = data;
    });
  }

  get name() { return this.resource.name; }

  get tag() { return this.resource.gameTag; }

  get icon() { return this.resource.icon; }

  get region() { return this.resource.platformId; }

  get patchline() { return this.resource.patchline; }

  get availability() { return this.resource.availability; }

  get status() { return this.resource.statusMessage || ''; }

  get product() { return this.resource.product; }

  get productTitle() { return this.resource.productName; }

  get riotName() { return this.resource.gameName; }

  get id() { return this.resource.id; }

  public getUser() {
    return this.resource;
  }

  public async update() {
    this.resource = await GetLolChatV1FriendsById(this.instance, this.resource.id);
  }

  get note() {
    return this.resource.note;
  }

  set note(note: string) {
    this.resource.note = note;
    PutLolChatV1FriendsById(this.instance, this.resource.id, { note });
  }

  /**
   * Unfriends user
   */
  public async unfriend() {
    await DeleteLolChatV1FriendsById(this.instance, this.resource.id);
  }

  /**
   * Blocks user
   */
  public async block() {
    await PostLolChatV1BlockedPlayers(this.instance, this.resource);
  }

  /**
   * Creates new Friend (this, LibLCU friend instance) from LCU friend resource
   * @param instance Client instance
   * @param resource LCU friend resource
   * @returns Promise<Friend>
   */
  public static async create(instance: Instance, resource: LolChatFriendResource): Promise<Friend> {
    return new Friend(instance, resource);
  }

  /**
   * Retrieves friend from ID and returns new Friend
   * @param instance Client instance
   * @param id Friend ID to get
   * @returns Promise<Friend>
   */
  public static async getFromId(instance: Instance, id: string): Promise<Friend> {
    let friend: LolChatFriendResource;

    // Try to get friend
    try {
      friend = await GetLolChatV1FriendsById(instance, id);
    } catch (e) {
      throw new Error(`Failed to get friend: ${e}`);
    }

    // Make friend class
    return new Friend(instance, friend);
  }

  /**
   * Retrieves all friends and returns array
   * @param instance Client instance
   * @returns Promise<Friend[]>
   */
  public static async getAll(instance: Instance): Promise<Friend[]> {
    let friends: LolChatFriendResource[];

    // Try to get friend
    try {
      friends = await GetLolChatV1Friends(instance);
    } catch (e) {
      throw new Error(`Failed to get friends: ${e}`);
    }

    // Make friends
    return friends.map((friend: LolChatFriendResource) => new Friend(instance, friend));
  }
}
