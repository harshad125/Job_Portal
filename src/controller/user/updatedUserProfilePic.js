import { deleteOnCloudinary, uploadOnCloudinary } from '../../helper/cloudinary.js';
import utlis from '../../helper/utlis.js';
import { UserProfile } from '../../model/userProfile.model.js';
import * as userError from '../../helper/userError.js';

export default async function updatedUserProfilePic(req, res, next) {
  try {
    const ProfileLocalPath = req.file?.path;

    console.log(ProfileLocalPath);

    if (!ProfileLocalPath) {
      return next(new userError.NotFoundError('profilePic', 'file path is not found.'));
    }

    const avatar = await uploadOnCloudinary(ProfileLocalPath);

    if (!avatar.url) {
      return next(new userError.NotFoundError('profilePic', 'Error while uploading on avatar'));
    }
    const oldImage = await UserProfile.findOne({ userId: req.user?.id }).select(
      'profilePicture -_id'
    );
    console.log(oldImage);
    if (oldImage) {
      const result = await deleteOnCloudinary(oldImage.profilePicture);
      console.log(result);
    }
    const user = await UserProfile.findOneAndUpdate(
      { userId: req.user?.id },
      {
        $set: {
          profilePicture: avatar.url,
        },
      },
      { new: true }
    );

    return utlis.returnHttpSuccessResponse(res, user);
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
