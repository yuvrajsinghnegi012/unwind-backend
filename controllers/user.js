import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { cookieGenerator, tokenGenerator, tryCatch } from "../utils/features.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { imageUpload } from "../config/cloudinary.js";
import jwt from "jsonwebtoken";

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

// LOGIN
export const login = tryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please fill all details", 401));
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
        return next(new ErrorHandler("User not found", 401));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
        return next(new ErrorHandler("Either email or password is wrong", 401));
    }

    const token = tokenGenerator(validUser);
    const cookie1 = cookieGenerator(token);
    cookie1(res);
    
    const {password: notToSend, ...user } = validUser;

    return res.status(200).json({
        success: true,
        message: `Welcome ${validUser.name.split(" ")[0]}`,
        validUser,
        user,
    })
});

// LOGOUT
export const logout = tryCatch((req, res, next)=>{
    return res.clearCookie("access_token").status(200).json({
        success: true,
        message: "Logout successful",
    });
});

// GET SINGLE USER
export const getSingleUser = tryCatch(async(req, res, next)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user,
    })
});

// GET ALL USERS
export const getAllUsers = tryCatch(async(req, res, next)=>{
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        message: "Successfully retrieved all users",
        users,
    })
});

// TEST API
export const testApi = (req, res) => {
    res.json("Api testing is successful");
}