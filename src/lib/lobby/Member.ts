import { LolLobbyLobbyParticipantDto } from '../../lcu/generated/LolLobbyLobbyParticipantDto';
import { LolLobbyLobbyPositionPreferences } from '../../lcu/generated/LolLobbyLobbyPositionPreferences';
import Instance from '../../sys/Instance';
import { User } from '../user/User';

export default class Member implements User {
  private instance: Instance;

  private resource: LolLobbyLobbyParticipantDto;

  public constructor(instance: Instance, resource: LolLobbyLobbyParticipantDto) {
    this.instance = instance;
    this.resource = resource;
  }

  get name() { return this.resource.summonerName; }

  get icon() { return this.resource.summonerIconId; }

  get sid() { return this.resource.summonerId; }

  getPositionPreferences(): LolLobbyLobbyPositionPreferences {
    return {
      firstPreference: this.resource.firstPositionPreference,
      secondPreference: this.resource.secondPositionPreference,
    };
  }

  getMemberResource(): LolLobbyLobbyParticipantDto {
    return this.resource;
  }
}
