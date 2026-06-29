const {Photo ,validatePhoto} = require('../Modules/Photos')
const asyncHandler = require('express-async-handler')
const path = require('path')
const { cloudUpload, cloudRemove } = require('../Config/cloudUpload')
const fs = require('fs')
const { photoUpload } = require('../Middelwares/uploadPhoto')
const {v2} = require('cloudinary')
const addPhoto = async (req, res) => {
    try {
        const { caption } = req.body
        const image = req.files.image
        const result = await v2.uploader.upload(image[0].path , {resource_type : "image"})
        const photo = new Photo({
            caption,
            Photo: {
                url: result.secure_url,
                publicId: result.public_id
            }
        })
        await photo.save()    
        res.status(201).json(photo)
        fs.unlinkSync(image[0].path)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllPhotos = asyncHandler(async (req, res) => {
    const photos = await Photo.find()
    res.status(200).json(photos)
})

const getPhotoById = asyncHandler(async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    if (!photo) return res.status(404).json({ message: "photo is Not found" })
    res.status(200).json(photo)
})

const deletePhoto = asyncHandler(async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    if (!photo) return res.status(404).json({ message: "Photo is Not found" })
    await Photo.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Photo Deleted Successfully" })
})


module.exports = {
    addPhoto,
    getAllPhotos,
    getPhotoById,
    deletePhoto
}