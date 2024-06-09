import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { cookieGenerator, tokenGenerator, tryCatch } from "../utils/features.js";
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

    const details = {};
    details.name = name;
    details.email = email;
    if(profilePicture){   
        // Uploading Image To Cloudinary
        const response = await imageUpload(profilePicture, "unwind", 8, next);
        details.profilePicture = response.secure_url
    }
    
    const hashPassword = bcryptjs.hashSync(password, 10);
    details.password = hashPassword;

    const userRegistered = await User.create(details);

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
    
    const {password: notToSend, ...user } = validUser._doc;

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
    if(!user){
        return next(new ErrorHandler("User not found", 401));
    }
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user,
    })
});

// GET ALL USERS
export const getAllUsers = tryCatch(async (req, res, next)=>{
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        message: "Successfully retrieved all users",
        users,
    })
});

// TOGGLE PROPERTY IN WISHLIST
export const toggleWishlist = tryCatch(async (req, res, next)=>{
    const { userId } = req.params;
    const { propertyId } = req.params;

    const user = await User.findById(userId);
    if(!user) return next(new ErrorHandler("Invalid User ID", 403));

    const propertyIndex = user.wishList.indexOf(propertyId);

    if(propertyIndex === -1){
        //Add to wishlist
        user.wishList.push(propertyId);
    }
    else{
        // Remove from wishlist
        user.wishList.splice(propertyIndex, 1);
    }
    // Saving into the DB
    const updatedUser = await user.save();
    return res.status(200).json({
        success: true,
        message: "Property toggled into wishlist",
        updatedUser,
    })

})

// Get Wishlist
export const getWishlist = tryCatch(async (req, res, next)=>{
    const { id } = req.params;
    const user = await User.findById(id).populate("wishList");
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        wishlist: user.wishList,
    })
});

// Get Properties
export const getProperties = tryCatch(async (req, res, next)=>{
    const { id } = req.params;
    const user = await User.findById(id).populate("propertyList");
    return res.status(200).json({
        success: true,
        message: "Properties fetched successfully",
        properties: user.propertyList,
    })
});
// Get Triplist
export const getTriplist = tryCatch(async (req, res, next)=>{
    const { id } = req.params;
    const user = await User.findById(id).populate("tripList");
    return res.status(200).json({
        success: true,
        message: "Triplist fetched successfully",
        triplist: user.tripList,
    })
});