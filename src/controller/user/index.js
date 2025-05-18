import getUserById from './getUserById.js';
import registerUser from './registerUser.js';
import getAllUsers from './getAllUsers.js';
import saveUserProfile from './saveUserProfile.js';
import updateUserProfile from './updateUserProfile.js';
import updatedUserProfilePic from './updatedUserProfilePic.js';

export class UserCtrl {
  static registerUser = registerUser;
  static saveUserProfile = saveUserProfile;
  static getAllUsers = getAllUsers;
  static getUserById = getUserById;
  static updateUserProfile = updateUserProfile;
  static updatedUserProfilePic = updatedUserProfilePic;
}
