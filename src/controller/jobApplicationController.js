import { JobApplication } from "../model/jobApplication.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createJobForm = asyncHandler(async (req, res) => {
    const { description, requirement, jobSpecification, location, role, skill, salaryStructure, benefits, startDate, endDate, userId} = req.body;
    try {
        const createdForm = await JobApplication.create({ description, requirement, jobSpecification, location, role, skill, salaryStructure, benefits, startDate, endDate, userId })
        const formData = await JobApplication.findById(createdForm._id);
        if (!formData) {
            throw new ApiError(500, "form is failed to created")
        }
        res.status(200).json(new ApiResponse(200, formData, "form is created successfully"));
    } catch (error) {
        console.log(error)
    }
})

export const updateJobForm = asyncHandler(async(req,res) => {
    const id = req.params.id;
    const { description, requirement, jobSpecification, location, role, skill, salaryStructure, benefits, startDate, endDate } = req.body;
    try {
        if (!id) {
            throw new ApiError(404, "form not found");
        }
        const updatedForm = await JobApplication.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    description: description,
                    requirement: requirement,
                    jobSpecification: jobSpecification,
                    location: location,
                    role: role,
                    skill: skill,
                    salaryStructure: salaryStructure,
                    benefits: benefits,
                    startDate: startDate,
                    endDate: endDate,
                }
            }, {
            new: true
        }
        )
        res.status(200).json(new ApiResponse(200, updatedForm, "update jobApplication Form successfully"));
    } catch (error) {
        console.log(error)
    }
})

export const deleteForm = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            throw new ApiError(404, "project not found")
        }
        const deletedForm = await JobApplication.findByIdAndDelete({
            _id: id
        })
        res.status(200).json(new ApiResponse(200, deletedForm, "delete job Form successfully"))
    } catch (error) {
        console.log(error);
    }
})

export const getMyJobForm = asyncHandler(async(req,res) => {
    try {
        const allMyJob = await JobApplication.find({userId:req.user?._id})
        if(!allMyJob) {
            throw new ApiError(404, "job form is not found")
        }
        res.status(200).json(new ApiResponse(200,allMyJob,"get all my jobs"))
    } catch (error) {
        console.log(error);
    }
})

export const getJobById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new ApiError(404, "id not found");
        }
        const jobForm = await JobApplication.findById({ _id: id });
        if (!jobForm) {
            throw new ApiError(404, "job not found");
        }

        res.status(200).json(new ApiResponse(200, jobForm, "get job successfully"))
    } catch (error) {
        console.log(error)
    }
})