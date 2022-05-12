/**
 * Client
 * Starting point for interfacing with the LCU
 *
 * For LibLCU.ts (https://github.com/lotuspar/liblcu.ts)
 * @author lotuspar, 2022
 */

// Lobby
import Lobby from './lobby/Lobby';
import QueueIdentifier from '../lcu/ours/QueueIdentifier';

// Client Core
import Connection from '../sys/Connection';
import Lockfile from '../sys/Lockfile';

export default class Client {
  public readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  /* Core */
  public static async connect(src: string): Promise<Client> {
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

  /* Lobby */
  /**
   * Create / start new client lobby
   * @param queueId Queue identifier to start lobby with
   * @returns Promise<Lobby>
   */
  public async createLobby(queueId: QueueIdentifier): Promise<Lobby> {
    return Lobby.create(this.connection, queueId);
  }

  /**
   * Get current client lobby
   * @returns Promise<Lobby>
   */
  public async getLobby(): Promise<Lobby> {
    return Lobby.getCurrentLobby(this.connection);
  }
}
