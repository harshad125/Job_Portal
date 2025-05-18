// import _ from "lodash";

import enums from '../../helper/enums.js';
import utlis from '../../helper/utlis.js';
import { User } from '../../model/user.model.js';
import * as userError from '../../helper/userError.js';
import { Otp } from '../../model/otp.model.js';

export default async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: { $regex: `^${email}\\b`, $options: 'i' },
    }).exec();

    if (!user) {
      return next(new userError.NotFoundError('email', 'user not found based on this email.'));
    }

    const isValidPassword = await user.isPasswordCorrect(password);
    if (!isValidPassword) {
      return next(new userError.BadRequestError('password', 'password is incorrect.'));
    }

    const otp = utlis.generateRandomDigit();
    if (otp) {
      //send to system TO DO
      try {
        const newOtp = new Otp({
          userId: user._id,
          otp: '9999',
        });

        await newOtp.save();
      } catch (error) {
        return next(new userError.BadRequestError('otp', 'otp is not created.'));
      }
    }

    const token = {
      sessionToken: await utlis.generateJwtToken(enums.jwtTokenType.session, user),
      refreshToken: await utlis.generateJwtToken(enums.jwtTokenType.refresh, user),
    };
    return utlis.returnHttpSuccessResponse(res, token);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
