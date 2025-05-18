import { Router } from 'express';
// import {
//     deleteUser,
//     findUsers,
//     getAllUsers,
//     getUserById,
//     loginUser,
//     logoutUser,
//     makeUserProfile,
//     registerUser,
//     updateUserProfile,
//     updateUserProfilePic,
// } from "../controller/userController.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import { UserCtrl } from '../controller/user/index.js';
import authenticationCtrl from '../server/authenticationCtrl.js';
import { fileUploadCtrl } from '../server/fileUploadCtrl.js';
import enums from '../helper/enums.js';
// import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.get('/user/users', [authenticationCtrl], async (req, res, next) =>
  UserCtrl.getAllUsers(req, res, next)
);

router.get('/user/:userId', [authenticationCtrl], async (req, res, next) =>
  UserCtrl.getUserById(req, res, next)
);

router.post('/user/register', [], async (req, res, next) => UserCtrl.registerUser(req, res, next));

router.post(
  '/user/profile',
  [authenticationCtrl, fileUploadCtrl(enums.fileUploadType.multiple)],
  async (req, res, next) => UserCtrl.saveUserProfile(req, res, next)
);

router.patch('/user/update-profile', [authenticationCtrl], async (req, res, next) =>
  UserCtrl.updateUserProfile(req, res, next)
);

router.patch(
  '/user/avatar',
  [authenticationCtrl, fileUploadCtrl(enums.fileUploadType.single)],
  async (req, res, next) => UserCtrl.updatedUserProfilePic(req, res, next)
);
// router.route('/updateprofile').patch(verifyJWT, updateUserProfile);
// router.route("/avatar").patch(verifyJWT, upload.single("profilePicture"), updateUserProfilePic)
// router.route('/deleteuser/:id').delete(verifyJWT, deleteUser)
// it will implement for cookie and session testing
// router.route("/test").get(testGetUsers)
// router.route("/getuser").get(getUsers)

export default router;
