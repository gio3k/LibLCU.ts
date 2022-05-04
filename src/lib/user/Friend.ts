import { PostLolChatV1BlockedPlayers } from '../../lcu/functions/LolChatV1BlockedPlayers';
import { DeleteLolChatV1FriendsById, PutLolChatV1FriendsById } from '../../lcu/functions/LolChatV1Friends';
import LolChatFriendResource from '../../lcu/redone/LolChatFriendResource';
import Connection from '../../sys/Connection';
import { FriendUser } from '../bases/UserTypes';
import User from '../bases/User';

export default class Friend extends User implements FriendUser {
  private friend: LolChatFriendResource;

  constructor(
    connection: Connection,
    resource: LolChatFriendResource,
  ) {
    super(connection, resource);
    this.friend = this.resource;

    connection.websocket.subscribe('OnJsonApiEvent_lol-chat_v1_friends', this.update);
  }

  public get note() {
    return this.friend.note;
  }

  public set note(note: string) {
    this.friend.note = note;
    PutLolChatV1FriendsById(this.connection, this.regionalAccountId, { note });
  }

  /**
   * Update user from WebSocket event
   * @param param0 Event params
   */
  private update = ({ eventType, data }: { eventType: any, data: any }) => {
    if (eventType !== 'Update') {
      throw new Error(`Unknown event type ${eventType}`);
    }
    this.resource = data;
  };

  /**
   * Unfriend user
   * @returns Promise
   */
  public async unfriend() {
    return DeleteLolChatV1FriendsById(this.connection, this.regionalAccountId);
  }

  /**
   * Block user
   * @returns Promise
   */
  public async block() {
    return PostLolChatV1BlockedPlayers(this.connection, this.friend);
  }
}
