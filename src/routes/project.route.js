import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  deleteProject,
  getAllProject,
  getMyProject,
  getProjectById,
  makeProject,
  updateProject,
  uploadScreenShot,
} from '../controller/projectController.js';

const projectRouter = Router();

projectRouter.route('/newproject').get(verifyJWT, makeProject);
projectRouter.route('/screenshot').patch(
  verifyJWT,
  upload.fields([
    {
      name: 'screenshot',
      maxCount: 10,
    },
  ]),
  uploadScreenShot
);
projectRouter.route('/getallproject').get(verifyJWT, getAllProject);
projectRouter.route('/getmyproject').get(verifyJWT, getMyProject);
projectRouter.route('/getprojectbyid/:id').get(verifyJWT, getProjectById);
projectRouter.route('/updateproject/:id').patch(verifyJWT, updateProject);
projectRouter.route('/deleteproject/:id').delete(verifyJWT, deleteProject);

export default projectRouter;
