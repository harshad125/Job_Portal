import { User } from '../../model/user.model.js';
import * as userErros from '../../helper/userError.js';
import utlis from '../../helper/utlis.js';

export default async function renewSession(req, res, next) {
  try {
    const { email, refreshToken } = req.body;
    const user = await User.findOne({
      email: email,
    }).exec();

    if (!user) {
      return next(new userErros.NotFoundError('email', `Email address ${email} is invalid`));
    }
    const sessionToken = await utlis.generateRenewSessionToken(user, refreshToken);
    return utlis.returnHttpSuccessResponse(res, sessionToken);
  } catch (error) {
    console.log(error);
  }
}
