const { User, validateRegisterUser, validateLoginUser, validateUpdateUser } = require('../Modules/User')
const asyncHandler = require('express-async-handler')
const path = require('path')
const { cloudUpload, cloudRemove } = require('../Config/cloudUpload')
const fs = require('fs')


/**
 * @desc Register New User
 * @route POST /api/auth/register
 * @access Public
 */


const RegisterNewUser = async (req, res) => {
  try {
    // ✅ Validate user input
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // ✅ Check if user exists
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Create user
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    return res.status(201).json({
      message:
        "User Created Successfully and we sent an email now, go to verify your email",
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};


const LoginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(400).json({ message: "Email or Password are not correct" });
  }

  const isPasswordMatch = await user.comparePassword(req.body.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Email or Password are not correct" });
  }


  // ✅ إنشاء التوكن باستخدام الميثود الجديدة
  const token = user.generateAuthToken();

  const { password, ...others } = user._doc;
  others.token = token;

  return res.status(200).json({
    message: "Login successful",
    user: others,
  });
});



// ================== Logout ==================
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })
  res.status(200).json({ message: "Logged out successfully" })
})

// ================== Delete User ==================
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: "User is not Found" })
  }
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({ message: "User Deleted Successfully" })
})

// ================== Get User by ID ==================
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: "User Not Found" })
  }
  res.status(200).json(user)
})

// ================== Get All Users ==================
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// ================== Upload Profile Photo ==================
const uploadPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
  const result = await cloudUpload(imagePath)

  const user = await User.findById(req.user._id)
  if (user.profilePhoto.publicId !== null) {
    await cloudRemove(user.profilePhoto.publicId)
  }

  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id
  }
  await user.save()

  res.status(200).json({
    url: result.secure_url,
    publicId: result.public_id
  })
  fs.unlinkSync(imagePath)
})

// ================== Update User Profile ==================
const updateUserProfile = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        username: req.body.username,
        name: req.body.name,
        bio: req.body.bio,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        favoritePlayer: req.body.favoritePlayer,
        socialLinks: req.body.socialLinks,
      }
    },
    { new: true, runValidators: true }
  ).select("-password");

  res.status(200).json(updatedUser);
});

module.exports = {
  LoginUser,
  RegisterNewUser,
  logoutUser,
  deleteUser,
  getUserById,
  getAllUsers,
  uploadPhoto,
  updateUserProfile
}
