const mongoose = require('mongoose')
const joi = require('joi')

const PhotoSchema = new mongoose.Schema({
    caption : {
        type : String,
        required : true
    },
    Photo: {
        type: Array,
        required: true
    },
},{timestamps: true})

const Photo = mongoose.model('Photo', PhotoSchema)

const validatePhoto = (obj) => {
    const schema = joi.object({
        caption : joi.string().required(),
    })
    return schema.validate(obj)
}
module.exports = {Photo , validatePhoto}