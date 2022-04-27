import Friend from './src/lib/user/friend/Friend';
import LocalUser from './src/lib/user/LocalUser';
import { User, KnownUser } from './src/lib/user/User';
import Member from './src/lib/lobby/Member';
import Lobby from './src/lib/lobby/Lobby';
import Chatroom from './src/lib/chat/Chatroom';
import Instance from './src/sys/Instance';
import { Lockfile } from './src/sys/Lockfile';

export {
  /* Core */
  /* Connection interfaces */
  Instance, Lockfile,

  /* Client function and classes */
  User, KnownUser, // User data interfaces

  Member, // User types

  /* Main exports / creators */
  Lobby, Friend, LocalUser,

  /* Types */
  Chatroom,
};
