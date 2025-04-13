import utlis from '../../helper/utlis.js';
import { User } from '../../model/user.model.js';

export default async function getUserById(req, res, next) {
  try {
    const { userId } = req.params;
    const users = await User.findById(userId).exec();
    utlis.returnHttpSuccessResponse(res, users);
  } catch (error) {
    return next(error);
  }
}
