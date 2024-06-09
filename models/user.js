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
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Booking",
                }
            ],
            default: [],
        },
        wishList: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Property",
                }
            ],
            default: [],
        },
        propertyList: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Property",
                }
            ],
            default: [],
        },
        reservationList: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Property",
                }
            ],
            default: [],
        },
    },
    {
        timestamps: true
    }
)

export const User = new mongoose.model("User", schema);