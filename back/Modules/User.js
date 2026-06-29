const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        default : "@zsc_user",
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"],
        lowercase: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId: null
        }
    },
    coverPhoto: {
        type: Object,
        default: {
            url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            publicId: null
        }
    },
    bio: {
        type: String,
        maxlength: [200, "Bio cannot exceed 200 characters"],
        default: "Zamalek SC Fan | White Knight 🏹"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other", "prefer not to say"],
        default: "prefer not to say"
    },
    birthDate: {
        type: Date,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    location: {
        country: { type: String, default: "Egypt" },
        city: { type: String },
    },
    membershipStatus: {
        type: String,
        enum: ["fan", "member", "vip", "official"],
        default: "fan"
    },
    membershipID: {
        type: String,
        unique: true,
        sparse: true,
    },
    favoritePlayer: {
        type: String,
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    socialLinks: {
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        youtube: { type: String, default: "" },
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    accountStatus: {
        type: String,
        enum: ["active", "suspended", "banned"],
        default: "active"
    },
    verificationToken: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Pre-save hook to hash password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare Password Method
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate Auth Token Method
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, isAdmin: this.isAdmin, role: this.membershipStatus },
        process.env.TOKEN_SECRET,
        { expiresIn: '30d' }
    );
};

const User = mongoose.model("User", UserSchema);

// Joi Validations
const validateRegisterUser = (obj) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required().trim().lowercase().messages({
            'string.min': 'Username must be at least 3 characters',
            'string.empty': 'Username is required'
        }),
        name: joi.string().min(2).max(50).required().trim(),
        email: joi.string().email().required().trim().lowercase(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(obj);
};

const validateLoginUser = (obj) => {
    const schema = joi.object({
        email: joi.string().email().required().trim().lowercase(),
        password: joi.string().required(),
    });
    return schema.validate(obj);
};

const validateUpdateUser = (obj) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).trim().lowercase(),
        name: joi.string().min(2).max(50).trim(),
        email: joi.string().email().trim().lowercase(),
        bio: joi.string().max(200),
        gender: joi.string().valid("male", "female", "other", "prefer not to say"),
        birthDate: joi.date(),
        phoneNumber: joi.string().allow(""),
        location: joi.object({
            country: joi.string(),
            city: joi.string()
        }),
        favoritePlayer: joi.string(),
        socialLinks: joi.object({
            twitter: joi.string().allow(""),
            facebook: joi.string().allow(""),
            instagram: joi.string().allow(""),
            youtube: joi.string().allow(""),
        })
    });
    return schema.validate(obj);
};

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    // Add old names as aliases to avoid immediate breaking
    ValidateUser: validateRegisterUser,
    LoginValidate: validateLoginUser
};