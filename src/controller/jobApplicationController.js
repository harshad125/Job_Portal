import { JobApplication } from "../model/jobApplication";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createJobForm = asyncHandler(async (req, res) => {
    const { description, requirement, jobSpecification, location, role, skill, conditions, salaryStructure, benefits, startDate, endDate } = req.body;
    try {
        const createdForm = await JobApplication.create({ description, requirement, jobSpecification, location, role, skill, conditions, salaryStructure, benefits, startDate, endDate })
        const formData = await JobApplication.findById(createdForm._id);
        if (!formData) {
            throw new ApiError(500, "form is failed to created")
        }
        res.status(200).json(new ApiResponse(200, formData, "form is created successfully"));
    } catch (error) {
        console.log(error)
    }
})