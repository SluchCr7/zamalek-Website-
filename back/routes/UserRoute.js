const express = require('express')
const route = express.Router()
const {
    LoginUser,
    RegisterNewUser,
    logoutUser,
    deleteUser,
    getUserById,
    getAllUsers,
    uploadPhoto,
    updateUserProfile
} = require('../Controllers/UserController')
const photoUpload = require('../Middelwares/uploadPhoto')
const { protect } = require('../Middelwares/authMiddelware')
route.route('/register')
    .post(RegisterNewUser)

route.route('/login')
    .post(LoginUser)

route.route('/profile-update')
    .put(protect, updateUserProfile)

route.route('/delete/:id')
    .delete(deleteUser)

route.route('/all')
    .get(getAllUsers)

route.route('/:id')
    .get(getUserById)
route.route('/logout')
    .post(logoutUser)

route.route('/upload')
    .post(protect, photoUpload.single("image"), uploadPhoto)

module.exports = route