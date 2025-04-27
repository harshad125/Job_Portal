import getUserById from './getUserById.js';
import registerUser from './registerUser.js';
import getAllUsers from './getAllUsers.js';
import saveUserProfile from './saveUserProfile.js';

export class UserCtrl {
  static registerUser = registerUser;
  static saveUserProfile = saveUserProfile;
  static getAllUsers = getAllUsers;
  static getUserById = getUserById;
}
