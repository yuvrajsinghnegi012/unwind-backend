import { Property } from "../models/property.js";
import { User } from "../models/user.js";
import { tryCatch } from "../utils/features.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { imageUpload } from "../config/cloudinary.js";

// New Property
export const newProperty = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, location, guests, bedrooms, beds, baths, desc, highlight, highlightDesc, facilities } = req.body;
  const { images: propertyImages } = req.files;
  
  if (!name || !price || !location || !desc || !highlight || !highlightDesc) {
    return next(new ErrorHandler("Please fill all fields", 401));
  }
  if (!propertyImages) {
    return next(new ErrorHandler("Please upload property images", 401));
  }
  
  // Accessing User
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("Invalid userID", 401));
  }

  // Uploading Images In Cloudinary
  const uploadedImages = await Promise.all(propertyImages.map(async (image)=>{
    const uploadedImage = await imageUpload(image, "unwind", 10, next);
    return uploadedImage;
  }));

  if(!uploadedImages){
    return next(new ErrorHandler("Image Upload failed", 404));
  }

  // Storing the uploaded images url in an images array
  const images = uploadedImages.map((image)=>image.secure_url);

  // Registering the property
  const property = await Property.create({
    name, price, location, host: id, guests, bedrooms, beds, baths, desc, highlight, highlightDesc, facilities, images
  });
  
  // Updating PropertyList in User
  user.propertyList.push(property._id);
  const updatedUser = await user.save();

  return res.status(200).json({
    success: false,
    message: "Property added successfully",
    property,
    updatedUser,
  })
});

// GET SINGLE USER
export const getSingleProperty = tryCatch(async(req, res, next)=>{
  const { id } = req.params;
  const property = await Property.findById(id).populate("host");
  return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      property,
  })
});

// GET ALL USERS
export const getAllProperties = tryCatch(async(req, res, next)=>{
  const properties = await Property.find({});
  return res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
      properties,
  })
});