import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Booking = mongoose.model("Booking", schema);