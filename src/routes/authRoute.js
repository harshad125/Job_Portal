import { Router } from 'express';
import AuthCtrl from '../controller/auth/index.js';
import authenticationCtrl from '../server/authenticationCtrl.js';

const router = Router();

router.post('/auth/login', [], async (req, res, next) => AuthCtrl.login(req, res, next));

router.post('/auth/token/renew', [], async (req, res, next) =>
  AuthCtrl.renewSession(req, res, next)
);

export default router;
