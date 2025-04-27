import { uploadOnCloudinary } from '../../helper/cloudinary.js';
import utlis from '../../helper/utlis.js';
import * as userErrors from '../../helper/userError.js';
import { UserProfile } from '../../model/userProfile.model.js';

export default async function saveUserProfile(req, res, next) {
  try {
    const profilePath = req.files?.profilePicture?.[0];
    if (!profilePath) {
      return next(new userErrors.BadRequestError(null, 'profile pic is not upload.'));
    }
    const profile = await uploadOnCloudinary(profilePath.path, 'single');
    const createUserProfile = await UserProfile.create({
      name: 'sajan',
      email: 'sajan@gmail.com',
      contact: '9328182025',
      address: 'amroli,surat',
      profilePicture: profile.url,
      education: {
        degree: 'b.tech',
        institution: 'ddu',
        fieldOfStudy: 'cs',
        graduationYear: '2024',
      },
      skill: ['development', 'aws'],
      achievement: ['goldmedalist', 'certificated', 'hackthon'],
      socialMediaProfile: ['linked.com', 'codechef.com', 'codeforces.com'],
      userId: '666971e02346deb79fe9c918',
    });

    const createdUser = await UserProfile.findById(createUserProfile._id);
    if (!createdUser) {
      return next(new userErrors.BadRequestError(null, 'user profile is not created.'));
    }
    return utlis.returnHttpSuccessResponse(res, createdUser);
  } catch (error) {
    console.log(error);
  }
}
