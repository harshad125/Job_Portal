import { User } from '../../model/user.model.js';
import * as userError from '../../helper/userError.js';
import { Otp } from '../../model/otp.model.js';
import dateUtils from '../../helper/dateUtils.js';
import utlis from '../../helper/utlis.js';

export default async function verifyOtp(req, res, next) {
  try {
    const { otp, email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new userError.NotFoundError('email', 'user is not valid.'));
    }

    const verifyOtp = await Otp.findOne({ userId: user._id }).sort({ updatedAt: -1 });

    if (!verifyOtp) {
      return next(new userError.NotFoundError('otp', 'otp is not found.'));
    }

    if (verifyOtp.otp !== otp) {
      return next(new userError.NotFoundError('otp', 'otp is invalid.'));
    }
    const diffMinutes = dateUtils.getDateDifferent(verifyOtp.updatedAt);

    if (diffMinutes > 10) {
      return next(new userError.BadRequestError('otp', 'otp time is out.please resend it.'));
    }

    return utlis.returnHttpSuccessResponse(res, verifyOtp);
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
