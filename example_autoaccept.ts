import Client from './src/lib/Client';
import { LobbyEvents } from './src/lib/lobby/Lobby';

Client.connect('c:/riot games/league of legends/lockfile')
  .then((client) => client.getLobby())
  .then((lobby) => {
    lobby.on(
      LobbyEvents.ReadyCheckInProgress,
      () => {
        setTimeout(() => { lobby.accept(); }, 2000);
      },
    );
  });
