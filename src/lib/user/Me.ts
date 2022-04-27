import { GetLolChatV1Me, PutLolChatV1Me } from '../../lcu/functions/LolChatV1Me';
import { LolChatUserResource } from '../../lcu/generated/LolChatUserResource';
import Instance from '../../sys/Instance';
import User from './User';

export default class Me implements User {
  private instance: Instance;

  private resource: LolChatUserResource;

  private constructor(instance: Instance, resource: LolChatUserResource) {
    this.instance = instance;
    this.resource = resource;

    instance.subscribe('OnJsonApiEvent_lol-chat_v1_me', ({ eventType, data }: { eventType: any, data: any }) => {
      if (eventType !== 'Update') {
        console.warn(`unknown event type ${eventType}`);
      }
      this.resource = data;
    });
  }

  get name() { return this.resource.name; }

  get tag() { return this.resource.gameTag; }

  get icon() { return this.resource.icon; }

  set icon(icon) {
    this.resource.icon = icon;
    PutLolChatV1Me(this.instance, { icon });
  }

  get region() { return this.resource.platformId; }

  get patchline() { return this.resource.patchline; }

  get availability() { return this.resource.availability; }

  set availability(availability) {
    this.resource.availability = availability;
    PutLolChatV1Me(this.instance, { availability });
  }

  get status() { return this.resource.statusMessage || ''; }

  set status(statusMessage) {
    this.resource.statusMessage = statusMessage;
    PutLolChatV1Me(this.instance, { statusMessage });
  }

  get product() { return this.resource.product; }

  get productTitle() { return this.resource.productName; }

  get riotName() { return this.resource.gameName; }

  get id() { return this.resource.id; }

  public getUser() {
    return this.resource;
  }

  public async update() {
    this.resource = await GetLolChatV1Me(this.instance);
  }

  /**
   * Creates new Me (this, LibLCU current / self user instance)
   * @param instance Client instance
   * @returns Promise<Me>
   */
  public static async create(instance: Instance): Promise<Me> {
    return new Me(instance, await GetLolChatV1Me(instance));
  }
}
