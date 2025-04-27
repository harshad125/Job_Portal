import login from './login.js';
import renewSession from './renewSession.js';

class AuthCtrl {
  static login = login;
  static renewSession = renewSession;
}

export default AuthCtrl;
