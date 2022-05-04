import QueueIdentifier from '../lcu/ours/QueueIdentifier';
import Connection from '../sys/Connection';
import Lockfile from '../sys/Lockfile';
import Lobby from './lobby/Lobby';
import LocalUser from './user/LocalUser';

export default class Client {
  public readonly connection: Connection;

  constructor(connection: Connection) {
    if (connection === undefined) {
      throw new Error('Client requires a connection passed to the constructor. Try using .connect()');
    }

    this.connection = connection;
  }

  public async getLocalUser() {
    return LocalUser.get(this.connection);
  }

  public async getLobby() {
    return Lobby.get(this.connection);
  }

  public async createLobby(queueId: QueueIdentifier) {
    return Lobby.create(this.connection, queueId);
  }

  public static async connect(src: string) {
    let lockfile: Lockfile;
    let connection: Connection;

    try {
      lockfile = await Lockfile.read(src);
    } catch (e) {
      throw new Error(`Failed to read lockfile! ${e}`);
    }

    try {
      connection = await Connection.initialize(lockfile);
    } catch (e) {
      throw new Error(`Failed to connect to client! ${e}`);
    }

    return new Client(connection);
  }
}
