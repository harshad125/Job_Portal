import mongoose, { Schema } from 'mongoose';
import { appDB } from '../server/mongoDbCtrl.js';

const OtpSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    otp: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Otp = appDB.model('Otp', OtpSchema);
