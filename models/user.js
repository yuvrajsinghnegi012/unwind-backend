import mongoose from 'mongoose';
import validator from 'validator';

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
            trim: true,
            unique: true,
            validate: validator.default.isEmail,
        },
        password: {
            type: String,
            required: [true, "Please enter password"],
        },
        profilePicture: {
            type: String,
            default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
        },
        tripList: {
            type: Array,
            default: [],
        },
        wishList: {
            type: Array,
            default: [],
        },
        propertyList: {
            type: Array,
            default: [],
        },
        reservationList: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true
    }
)

export const User = new mongoose.model("User", schema);