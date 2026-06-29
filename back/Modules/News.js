const mongoose = require('mongoose')
const joi = require('joi')

const NewsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim: true
    },
    content : {
        type : String,
        required : true
    },
    Photo: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    category: {
        type: String,
        default: "أخبار الفريق"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

const News = mongoose.model('News', NewsSchema)

const validateNews = (obj) => {
    const schema = joi.object({
        title : joi.string().min(5).max(200).required(),
        content : joi.string().min(10).required(),
        category: joi.string()
    })
    return schema.validate(obj)
}

const validateUpdateNews = (obj) => {
    const schema = joi.object({
        title : joi.string().min(5).max(200),
        content : joi.string().min(10),
        category: joi.string()
    })
    return schema.validate(obj)
}
module.exports = {News, validateNews , validateUpdateNews}