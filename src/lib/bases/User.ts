/**
 * User
 * User base instance functions
 *
 * For LibLCU.ts (https://github.com/lotuspar/liblcu.ts)
 * @author lotuspar, 2022
 */

import LolChatUserResource from '../../lcu/generated/LolChatUserResource';
import Connection from '../../sys/Connection';
import Activity from '../Activity';

enum Events {
  Update = 'update',
}
export { Events as UserEvents };

export default abstract class User extends Activity {
  resource: LolChatUserResource;

  constructor(connection: Connection, resource: LolChatUserResource) {
    super(connection);

    this.resource = resource;
  }
}
