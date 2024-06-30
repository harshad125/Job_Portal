import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const ApplicationSchema = new Schema(
    {
        status: {
            type: String,
            enum: ['Approved', 'Pending', 'Reject'],
            required: true
        },
        resume: {
            type: String,
            required: true
        },
        workExperience: {
            type: String
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

export const Application = mongoose.model('Application', ApplicationSchema)
