import { Router } from "express";
import {
    deleteUser,
    findUsers,
    getAllUsers,
    getUserById,
    loginUser,
    logoutUser,
    makeUserProfile,
    registerUser,
    updateUserProfile,
    updateUserProfilePic,
} from "../controller/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route('/login').post(loginUser)
router.route('/getalluser').get(verifyJWT, getAllUsers)
router.route('/getuser/:id').get(verifyJWT, getUserById)
router.route('/findusers').get(verifyJWT, findUsers)
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/userprofile').post(upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    }
]), makeUserProfile)
router.route('/updateprofile').patch(verifyJWT, updateUserProfile);
router.route("/avatar").patch(verifyJWT, upload.single("profilePicture"), updateUserProfilePic)
router.route('/deleteuser/:id').delete(verifyJWT, deleteUser)
// it will implement for cookie and session testing
// router.route("/test").get(testGetUsers)
// router.route("/getuser").get(getUsers)

export default router