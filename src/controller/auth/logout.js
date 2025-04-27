import utlis from '../../helper/utlis.js';
import { User } from '../../model/user.model.js';

export default async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    return utlis.returnHttpSuccessResponse(res, true);
  } catch (error) {
    console.log(error);
  }
}
