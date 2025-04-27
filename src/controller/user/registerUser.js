import { User } from '../../model/user.model.js';
import * as userErrors from '../../helper/userError.js';
import utlis from '../../helper/utlis.js';

export default async function registerUser(req, res, next) {
  try {
    const { name, email, password, contact, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return next(new userErrors.BadRequestError('email', 'user is aleady exist.'));
    }

    const newUser = await User.create({
      name,
      email,
      password,
      contact,
      role,
    });

    const user = await User.findOne(newUser._id).select('-password -refreshToken');

    if (!user) {
      return next(new userErrors.NotFoundError(null, 'user is not created.'));
    }

    return utlis.returnHttpSuccessResponse(res, user);
  } catch (error) {
    console.log(error);
  }
}
