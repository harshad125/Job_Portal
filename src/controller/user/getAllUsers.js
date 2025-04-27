import utlis from '../../helper/utlis.js';
import { User } from '../../model/user.model.js';

export default async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});
    return utlis.returnHttpSuccessResponse(res, users);
  } catch (error) {
    console.log(error);
  }
}
