import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../model/user.model.js';
import { deleteOnCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import generateToken from '../utils/generateToken.js';
import { userProfile } from '../model/userProfile.model.js';
import { sendEmail } from '../utils/emailSender.js';

const generateAccessAndRefreshTokens = async (userData) => {
  try {
    let accessToken = '',
      refreshToken = '';
    const user = await User.findById(userData._id);
    await generateToken(userData, 'AccessToken').then((result) => {
      accessToken = result;
    });
    await generateToken(userData, 'RefreshToken').then((result) => {
      refreshToken = result;
    });
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating refresh and access token');
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact, role } = req.body;
  //console.log("email: ", email);

  if ([name, email, password, contact, role].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { contact }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }
  //console.log(req.files);
  const user = await User.create({
    name,
    email,
    password,
    contact,
    role,
  });

  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  return res.status(201).json(new ApiResponse(200, createdUser, 'User registered Successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, 'username or email is required');
  }

  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")

  // }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid user credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);

  const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

  const options = {
    httpOnly: true,
    secure: true,
  };
  // sendEmail(email, "Login to application", "you have successfully login to job portal.")
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User logged In Successfully'
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged Out'));
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const usersList = await userProfile.find();
    res.status(200).json(new ApiResponse(200, usersList, 'get all users'));
  } catch (error) {
    console.log(error);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const user = await userProfile.findById({ _id: userId });
      if (user) {
        res.status(200).json(new ApiResponse(200, user, 'get user successfully'));
      }
    }
  } catch (error) {
    return new ApiError(500, 'internal server error');
  }
});

const makeUserProfile = asyncHandler(async (req, res) => {
  const profilePath = req.files?.profilePicture[0]?.path;
  if (!profilePath) {
    throw new ApiError(400, 'profile pic is required');
  }
  const profile = await uploadOnCloudinary(profilePath, 'single');
  const createUserProfile = await userProfile.create({
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

  const createdUser = await userProfile.findById(createUserProfile._id);
  if (!createdUser) {
    throw new ApiError(500, 'somethings want to wrong while creating userprofile');
  }
  return res.status(201).json(new ApiResponse(200, createdUser, 'userProfile is created'));
});

const updateUserProfilePic = asyncHandler(async (req, res) => {
  const ProfileLocalPath = req.file?.path;

  if (!ProfileLocalPath) {
    throw new ApiError(400, 'Avatar file is missing');
  }

  //TODO: delete old image - assignment
  // console.log(ProfileLocalPath)
  const avatar = await uploadOnCloudinary(ProfileLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, 'Error while uploading on avatar');
  }
  const oldImage = await userProfile
    .findOne({ userId: req.user?._id })
    .select('profilePicture -_id');
  console.log(oldImage);
  if (oldImage) {
    const result = await deleteOnCloudinary(oldImage.profilePicture);
    console.log(result);
  }
  const user = await userProfile.findOneAndUpdate(
    { userId: req.user?._id },
    {
      $set: {
        profilePicture: avatar.url,
      },
    },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, user, 'Avatar image updated successfully'));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { name, email, contact, address, education, skill, achievement, socialMediaProfile } =
      req.body;
    const user = await userProfile.findOneAndUpdate(
      {
        userId: req.user?._id,
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
    res.status(200).json(new ApiResponse(200, user, 'userprofile updated successfully'));
  } catch (error) {
    return new ApiError(500, 'internal server error');
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    if (userId) {
      const user = await userProfile.findByIdAndDelete({ _id: userId });
      if (user) {
        res.status(200).json(new ApiResponse(200, user, 'user delete successfully'));
      }
    }
  } catch (error) {
    return new ApiError(500, 'api fail to delete user');
  }
});

const findUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user?._id } });
  res.send(users);
});
// const testGetUsers = asyncHandler(async(req,res)=>{

//     // res.cookie("hello","world",{maxAge:10000,signed:true})
//     req.session.visited = true
//     console.log(req.session.id)
//     return res.status(200).send({msg:"set cookies"})

//     // console.log(req);

// })

// const getUsers = asyncHandler(async(req,res)=>{

//     console.log(req.session.id)
//     req.sessionStore.get(req.session.id,(error,data)=>{
//         console.log(data)
//     })
//    return res.send({mag:"getuse called"})

//     // console.log(req);

// })
export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  deleteUser,
  makeUserProfile,
  updateUserProfilePic,
  updateUserProfile,
  findUsers,
};
