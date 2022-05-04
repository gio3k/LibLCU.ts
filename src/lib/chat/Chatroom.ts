import { PostLolChatV1ConversationsByIdMessages } from '../../lcu/functions/LolChatV1ConversationsByIdMessages';
import Connection from '../../sys/Connection';

export default class Chatroom {
  protected readonly connection: Connection;

  protected readonly id: string;

  constructor(connection: Connection, id: string) {
    this.connection = connection;
    this.id = id;
  }

  public async send(body: string) {
    return PostLolChatV1ConversationsByIdMessages(this.connection, this.id, { body });
  }
}
