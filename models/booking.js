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
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
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