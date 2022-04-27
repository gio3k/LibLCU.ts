import { PostLolChatV1ConversationsByIdMessages } from '../../lcu/functions/LolChatV1ConversationsByIdMessages';
import Instance from '../../sys/Instance';

export default class Chatroom {
  private instance: Instance;

  private id: string;

  private constructor(instance: Instance, id: string) {
    this.instance = instance;
    this.id = id;
  }

  public async send(body: string) {
    return PostLolChatV1ConversationsByIdMessages(this.instance, this.id, { body });
  }
}
