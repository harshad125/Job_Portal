import mongoose, { Schema } from "mongoose";
import { appDB } from "../server/mongoDbCtrl.js";


const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        technology: [{
            type: String,
            required: true
        }],
        features: [{
            type: String,
            required: true
        }],
        screenShot: [{
            type: String,
        }],
        projectLink: [{
            type: String,
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

export const Project = appDB.model('Project', ProjectSchema)