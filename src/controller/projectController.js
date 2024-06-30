import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



export const makeProject = asyncHandler(async (req, res) => {
    try {
        const { title, description, technology, features, projectLink, userId } = req.body;
        const project = await Project.create({
            title, description, technology, features, projectLink, userId
        })
        const createdProject = await Project.findById(project._id);
        if (!createdProject) {
            throw new ApiError(500, "something want to wrong will creating project ")
        }
        res.status(200).json(new ApiResponse(200, createdProject, "project make successfully"))
    } catch (error) {
        console.log(error);
    }
})


export const uploadScreenShot = asyncHandler(async (req, res) => {
    const ProfileLocalPath = req.files.screenshot;

    if (ProfileLocalPath.length <= 0) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment
    // console.log(ProfileLocalPath)
    const filepath = ProfileLocalPath.map((item) => {
        return item.path
    })

    const avatar = await uploadOnCloudinary(filepath, 'multiple')

    if (avatar.length <= 0) {
        throw new ApiError(400, "Error while uploading on avatar")
    }
    console.log(avatar)
    const project = await Project.findOneAndUpdate(
        { userId: req.user?._id }, {
        $set: {
            screenShot: avatar
        }
    },
        { new: true }
    );
    console.log(project)
    return res
        .status(200)
        .json(
            new ApiResponse(200, project, "Avatar image updated successfully")
        )
})

export const getProjectById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new ApiError(404, "id not found");
        }
        const project = await Project.findById({ _id: id });
        if (!project) {
            throw new ApiError(404, "project not found");
        }

        res.status(200).json(new ApiResponse(200, project, "get project successfully"))
    } catch (error) {

    }
})

export const getAllProject = asyncHandler(async (req, res) => {
    try {
        const allProjects = await Project.find();
        if (!allProjects) {
            throw new ApiError(500, "can't get any project")
        }
        res.status(200).json(new ApiResponse(200, allProjects, "get all projects"))
    } catch (error) {
        console.log(error);
    }
})


export const getMyProject = asyncHandler(async (req, res) => {
    try {
        const myProject = await Project.find({ userId: req.user?._id })
        if (!myProject) {
            throw new ApiError(404, "project Not found")
        }
        res.status(200).json(new ApiResponse(200, myProject, "get own project"));
    } catch (error) {
        console.log(error);
    }
})

export const updateProject = asyncHandler(async (req, res) => {
    const { title, description, technology, features, projectLink } = req.body;
    const id = req.params.id;
    try {
        const updatedProject = await Project.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    title: title,
                    description: description,
                    technology: technology,
                    features: features,
                    projectLink: projectLink
                }
            }, {
            new: true
        }
        )
        res.status(200).json(new ApiResponse(200, updatedProject, "update project successfully"));
    } catch (error) {
        console.log(error);
    }
})

export const deleteProject = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            throw new ApiError(404, "project not found")
        }
        const deleteProject = await Project.findByIdAndDelete({
            _id: id
        })
        res.status(200).json(new ApiResponse(200, deleteProject, "delete project successfully"))
    } catch (error) {
        console.log(error);
    }
})

