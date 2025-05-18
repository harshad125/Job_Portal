import login from './login.js';
import renewSession from './renewSession.js';
import verifyOtp from './verifyOtp.js';

class AuthCtrl {
  static login = login;
  static renewSession = renewSession;
  static verifyOtp = verifyOtp;
}

export default AuthCtrl;
