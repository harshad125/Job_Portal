import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { newApplicationForm } from '../controller/applicationController.js';

const applicationRoute = Router();

applicationRoute.route('/applicationform').post(
  verifyJWT,
  upload.fields([
    {
      name: 'docs',
      maxCount: 1,
    },
  ]),
  newApplicationForm
);

export default applicationRoute;
