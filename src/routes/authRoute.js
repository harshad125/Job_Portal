import { Router } from "express";
import AuthCtrl from "../controller/auth/index.js";
import authenticationCtrl from "../server/authenticationCtrl.js";

const router = Router();

router.post('/auth/login',[],
    async(req, res ,next) => AuthCtrl.login(req,res,next)
)


export default router;