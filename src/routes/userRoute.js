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
import { upload } from '../middlewares/multer.middleware.js';
import { UserCtrl } from '../controller/user/index.js';
import authenticationCtrl from '../server/authenticationCtrl.js';

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
  // [
  // authenticationCtrl,
  upload.fields([
    {
      name: 'profilePicture',
      maxCount: 1,
    },
  ]),
  // ],
  async (req, res, next) => UserCtrl.saveUserProfile(req, res, next)
);

// router.route("/register").post(registerUser)
// router.route('/login').post(loginUser)
// router.route('/getalluser').get(verifyJWT, getAllUsers)
// router.route('/getuser/:id').get(verifyJWT, getUserById)
// router.route('/findusers').get(verifyJWT, findUsers)
// router.route('/logout').post(verifyJWT, logoutUser)
// router.route('/userprofile').post(upload.fields([
//     {
//         name: "profilePicture",
//         maxCount: 1
//     }
// ]), makeUserProfile)
// router.route('/updateprofile').patch(verifyJWT, updateUserProfile);
// router.route("/avatar").patch(verifyJWT, upload.single("profilePicture"), updateUserProfilePic)
// router.route('/deleteuser/:id').delete(verifyJWT, deleteUser)
// it will implement for cookie and session testing
// router.route("/test").get(testGetUsers)
// router.route("/getuser").get(getUsers)

export default router;
