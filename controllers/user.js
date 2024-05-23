import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { tryCatch } from "../utils/features.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { imageUpload } from "../config/cloudinary.js";

// NEW USER
export const newUser = tryCatch(async (req, res, next) => {
    const { name, email, password, confirmPassword} = req.body;
    const profilePicture = req.files?.profilePicture;
    
    if (!name || !email || !password || !confirmPassword) {
        return next(new ErrorHandler("Please fill all dtails", 401));
    }

    if (password != confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 401));
    }

    if (await User.findOne({ email })) {
        return next(new ErrorHandler("Email already in use", 401));
    }

    // Uploading Image To Cloudinary
    const response = await imageUpload(profilePicture, "unwind", 8, next);

    // const token = jwt.sign({ data: password }, process.env.JWT_SECRET_KEY, { algorithm: 'HS256' });
    const hashPassword = bcryptjs.hashSync(password, 10);

    const userRegistered = await User.create({
        name, email, password: hashPassword, profilePicture: response.secure_url,
    });

    const { password: doNotSend, ...user } = userRegistered._doc;

    return res.status(200).json({
        success: true,
        message: "User created successfully",
        user,
    })
});


// TEST API
export const testApi = (req, res) => {
    res.json("Api testing is successful");
}