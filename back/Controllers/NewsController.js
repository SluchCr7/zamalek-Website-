const { News, validateNews, validateUpdateNews } = require('../Modules/News')
const asyncHandler = require('express-async-handler')
const path = require('path')
const fs = require('fs')
const { v2: cloudinary } = require('cloudinary')

/**-----------------------------------------------
 * @desc    Create New News
 * @route   /api/news/add
 * @method  POST
 * @access  private (admin only)
 ------------------------------------------------*/
const addNews = asyncHandler(async (req, res) => {
    // 1. Validation for text
    const { error } = validateNews(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    // 2. Validation for image
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "Image is required" })
    }

    const image = req.files.image[0]

    // 3. Upload image to cloudinary
    const result = await cloudinary.uploader.upload(image.path, { resource_type: "image" })

    // 4. Create new news and save to DB
    const news = new News({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category || "أخبار الفريق",
        Photo: {
            url: result.secure_url,
            publicId: result.public_id
        },
        author: req.user._id
    })
    await news.save()

    // 5. Send response
    res.status(201).json(news)

    // 6. Remove image from local server
    fs.unlinkSync(image.path)
})

/**-----------------------------------------------
 * @desc    Get All News
 * @route   /api/news/all
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const getAllNews = asyncHandler(async (req, res) => {
    const news = await News.find().sort({ createdAt: -1 }).populate("author", "name username profilePhoto")
    res.status(200).json(news)
})

/**-----------------------------------------------
 * @desc    Get News By Id
 * @route   /api/news/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const getNewById = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id).populate("author", "name username profilePhoto")
    if (!news) return res.status(404).json({ message: "News not found" })
    res.status(200).json(news)
})

/**-----------------------------------------------
 * @desc    Delete News
 * @route   /api/news/delete/:id
 * @method  DELETE
 * @access  private (admin only)
 ------------------------------------------------*/
const deleteNews = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id)
    if (!news) return res.status(404).json({ message: "News not found" })

    // Delete image from cloudinary
    if (news.Photo && news.Photo.publicId) {
        await cloudinary.uploader.destroy(news.Photo.publicId)
    }

    await News.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "News Deleted Successfully" })
})

/**-----------------------------------------------
 * @desc    Update News
 * @route   /api/news/update/:id
 * @method  PUT
 * @access  private (admin only)
 ------------------------------------------------*/
const updateNew = asyncHandler(async (req, res) => {
    const { error } = validateUpdateNews(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const news = await News.findById(req.params.id)
    if (!news) return res.status(404).json({ message: "News not found" })

    const updatedNews = await News.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title || news.title,
            content: req.body.content || news.content,
            category: req.body.category || news.category
        }
    }, { new: true })

    res.status(200).json(updatedNews)
})

module.exports = {
    addNews,
    getAllNews,
    deleteNews,
    updateNew,
    getNewById
}