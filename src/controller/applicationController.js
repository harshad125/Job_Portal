import { Application } from "../model/application.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";




export const newApplicationForm = asyncHandler(async (req, res) => {
    const { status, workExperience, projectLink, socialMediaProfile, userId, companyId, jobId } = req.body;
    const docsPath = req.files?.docs[0]?.path;
    try {
        if (!docsPath) {
            throw new ApiError(400, "resume not found");
        }
        const resume = await uploadOnCloudinary(docsPath, 'single');
        const createdForm = await Application.create({ status, resume: resume.url, workExperience, projectLink, socialMediaProfile, userId, companyId, jobId })
        const formData = await Application.findById(createdForm._id);
        if (!formData) {
            throw new ApiError(500, "form is failed to created")
        }
        res.status(200).json(new ApiResponse(200, formData, "form is created successfully"));
    } catch (error) {
        console.log(error)
    }
})

export const uploadResume = asyncHandler(async(req,res) => {
    const docsPath = req.files?.docs[0]?.path;
    if(!docsPath) {
        throw new ApiError(400,"resume not found");
    }
    const resume = await uploadOnCloudinary(docsPath, 'single');
})