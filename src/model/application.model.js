import mongoose, { Schema } from "mongoose";
import { appDB } from "../server/mongoDbCtrl.js";


const ApplicationSchema = new Schema(
    {
        status: {
            type: String,
            enum: ['Approved', 'Pending', 'Reject'],
            default:"Pending",
            required: true
        },
        resume: {
            type: String,
            required: true
        },
        workExperience: {
            company: { type: String },
            year: { type: Number },
        },
        projectLink: {
            type: String,
        },
        socialMediaProfile: [{
            type: String
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobApplication'
        }

    },
    {
        timestamps: true
    }
)

export const Application = appDB.model('Application', ApplicationSchema)
