const express = require('express')
const route = express.Router()
const { addNews, deleteNews, updateNew, getAllNews, getNewById } = require('../Controllers/NewsController')
const photoUpload = require('../Middelwares/uploadPhoto')
const { protect, adminOnly } = require('../Middelwares/authMiddelware')

route.route("/add")
    .post(protect, adminOnly, photoUpload.fields([{ name: 'image', maxCount: 1 }]), addNews)

route.route("/delete/:id")
    .delete(protect, adminOnly, deleteNews)

route.route("/update/:id")
    .put(protect, adminOnly, updateNew)

route.route('/all')
    .get(getAllNews)

route.route('/:id')
    .get(getNewById)

module.exports = route