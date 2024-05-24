import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter property name"],
        },
        price: {
            type: Number,
            required: [true, "Please enter property price"],
        },
        location: {
            type: String,
            required: [true, "Please enter property location"],
        },
        images: {
            type: [
                {
                    type: String,
                }
            ],
            default: [],
        },
        guests: {
            type: String,
            required: [true, "Please enter guests number"],
        },
        bedrooms: {
            type: String,
            required: [true, "Please enter bedrooms number"],
        },
        beds: {
            type: String,
            required: [true, "Please enter beds number"],
        },
        baths: {
            type: String,
            required: [true, "Please enter baths number"],
        },
        desc: {
            type: String,
            required: [true, "Please enter a property description"],
        },
        highlight: {
            type: String,
            required: [true, "Please enter a property highlight"],
        },
        highlightDesc: {
            type: String,
            required: [true, "Please enter a property highlight description"],
        },
        facilities: {
            type: [
                {
                    type: Number,
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