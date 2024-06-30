import mongoose, { Schema } from "mongoose";

const userProfileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        contact: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ''
        },
        education: {
            degree: {
                type: String,
                required: true
            },
            institution: {
                type: String,
                required: true
            },
            fieldOfStudy: {
                type: String,
                required: true
            },
            graduationYear: {
                type: Number,
                required: true
            }
        },
        skill: [{
            type: String
        }],
        achievement: [{
            type: String
        }],
        socialMediaProfile: [{
            type: String
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

export const userProfile = mongoose.model('userProfile', userProfileSchema)
