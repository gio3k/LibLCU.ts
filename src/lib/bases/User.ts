/**
 * User main base type
 * For LibLCU.ts (https://github.com/lotuspar/liblcu.ts)
 * @author lotuspar, 2022
 */

import LolChatUserResource from '../../lcu/generated/LolChatUserResource';
import Connection from '../../sys/Connection';
import { KnownUser } from './UserTypes';

export default abstract class User implements KnownUser {
  protected readonly connection: Connection;

  protected resource: any;

  private user: LolChatUserResource;

  public readonly regionalAccountId: string;

  public readonly globalId: string;

  public readonly summonerId: number;

  constructor(
    connection: Connection,
    resource: LolChatUserResource,
  ) {
    this.connection = connection;
    this.resource = resource;
    this.user = this.resource;

    this.regionalAccountId = this.resource.id;
    this.globalId = this.resource.puuid;
    this.summonerId = this.resource.summonerId;
  }

  get name() {
    return this.resource.name;
  }

  get icon() {
    return this.resource.icon;
  }

  get productId() {
    return this.resource.product;
  }

  get productName() {
    return this.resource.productName;
  }

  get platform() {
    return this.resource.platformId;
  }

  get patchline() {
    return this.resource.patchline;
  }

  get status() {
    return this.resource.statusMessage ?? '';
  }

  get riotName() {
    return this.resource.gameName;
  }

  get riotTag() {
    return this.resource.gameTag;
  }
}
