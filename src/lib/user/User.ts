import { LolChatUserResource } from '../../lcu/generated/LolChatUserResource';

export interface User {
  readonly name: string;
  icon: number;

  readonly sid: number;
}

export interface KnownUser extends User {
  getUser(): LolChatUserResource;

  readonly tag: string;

  readonly region: string;
  readonly patchline: string;

  /* User activity status ["away", "chat", "offline", "mobile", "dnd", etc...] */
  availability: string;

  /* User status message shown to friends on the League Client */
  status: string;

  /* Identifier for product user is playing ["league_of_legends", "valorant", etc...] */
  readonly product: string;

  /* Display name for product user is playing ["League of Legends", "VALORANT", etc...] */
  readonly productTitle: string;

  /* User display name for other(?) games (seemingly this is the user's VALORANT name) */
  readonly riotName: string;

  readonly id: string;
}
