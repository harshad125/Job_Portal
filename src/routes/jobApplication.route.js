import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createJobForm, deleteForm, getJobById, getMyJobForm, updateJobForm } from "../controller/jobApplicationController.js";


const jobRouter = Router();

jobRouter.route('/createjob').post(verifyJWT, createJobForm)
jobRouter.route('/updatejob/:id').patch(verifyJWT, updateJobForm)
jobRouter.route('/deletejob/:id').delete(verifyJWT, deleteForm)
jobRouter.route('/getmyjob').get(verifyJWT, getMyJobForm)
jobRouter.route('/getjob/:id').get(verifyJWT, getJobById)

export default jobRouter