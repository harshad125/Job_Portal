import utlis from '../../helper/utlis.js';
import { UserProfile } from '../../model/userProfile.model.js';

export default async function updateUserProfile(req, res, next) {
  try {
    const { name, email, contact, address, education, skill, achievement, socialMediaProfile } =
      req.body;
    const user = await UserProfile.findOneAndUpdate(
      {
        userId: req.user.id,
      },
      {
        $set: {
          name: name,
          email: email,
          contact: contact,
          address: address,
          education: education,
          skill: skill,
          achievement: achievement,
          socialMediaProfile: socialMediaProfile,
        },
      },
      {
        new: true,
      }
    );
    return utlis.returnHttpSuccessResponse(res, user);
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
