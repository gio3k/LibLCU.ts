import Connection from '../../sys/Connection';
import User from '../bases/User';
import LolChatUserResource from '../../lcu/generated/LolChatUserResource';
import { GetLolChatV1Me, PutLolChatV1Me } from '../../lcu/functions/LolChatV1Me';

export default class LocalUser extends User {
  constructor(
    connection: Connection,
    resource: LolChatUserResource,
  ) {
    super(connection, resource);

    connection.websocket.subscribe('OnJsonApiEvent_lol-chat_v1_me', this.update);
  }

  public set icon(icon: number) {
    this.resource.icon = icon;
    PutLolChatV1Me(this.connection, { icon });
  }

  public set availability(availability: string) {
    this.resource.availability = availability;
    PutLolChatV1Me(this.connection, { availability });
  }

  public set status(statusMessage: string) {
    this.resource.statusMessage = statusMessage;
    PutLolChatV1Me(this.connection, { statusMessage });
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
   * Creates new LocalUser (this, LibLCU current / self user instance)
   * @param connection Client connection
   * @returns Promise
   */
  public static async get(connection: Connection): Promise<LocalUser> {
    return new LocalUser(connection, await GetLolChatV1Me(connection));
  }
}
