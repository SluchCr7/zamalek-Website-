const express = require('express')
const route = express.Router()
const {addPhoto,
    getAllPhotos,
    getPhotoById,
    deletePhoto
} = require('../Controllers/PhotoController')
const photoUpload = require('../Middelwares/uploadPhoto')
route.route("/add")
    .post(photoUpload.fields([{ name: 'image', maxCount: 1 }]),addPhoto)

route.route("/delete/:id")
    .delete(deletePhoto)

route.route('/all')
    .get(getAllPhotos)

route.route('/:id')
    .get(getPhotoById)
module.exports = route