import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { appDB } from '../server/mongoDbCtrl.js';

const JobApplicationSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    requirement: [
      {
        type: String,
        required: true,
      },
    ],
    jobSpecification: {
      eduction: [{ type: String }],
      experience: [{ type: String }],
      jobType: [{ type: String }],
    },
    location: {
      type: String,
      required: true,
    },
    role: [
      {
        type: String,
        required: true,
      },
    ],
    skill: {
      type: String,
      required: true,
    },
    conditions: [
      {
        type: String,
      },
    ],
    salaryStructure: [
      {
        role: { type: String, required: true },
        salary: { type: Number, required: true },
      },
    ],
    benefits: [
      {
        type: String,
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const JobApplication = appDB.model('JobApplication', JobApplicationSchema);
