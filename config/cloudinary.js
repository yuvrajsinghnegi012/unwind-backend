import {v2 as cloudinary} from 'cloudinary';
import ErrorHandler from '../utils/ErrorHandler.js';
import { tryCatch } from '../utils/features.js';

export const cloudinaryConnect = () =>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    })
};

export const cloudinaryUploader = async (file, folder, quality, next) => {
    const options = {
        resource_type: "auto",
    }
    if(folder) {
        options.folder = folder;
    }
    if(quality) {
        options.quality = quality;
    }

    // Uploading the image
    const response = await cloudinary.uploader.upload(file.tempFilePath, options);
    if(!response) return next(new ErrorHandler("Something went wrong while uploading the file"));

    return response;
}

export const imageUpload = async (file, folder, quality, next) => {
    const extension = file.name.split(".").pop();
    const supportedExtensions = ["png", "jpg", "jpeg", "webp"];
    if(!supportedExtensions.includes(extension)){
        return next(new ErrorHandler("File type not supported: ", 400));
    }

    const response = await cloudinaryUploader(file, folder, quality, next);
    return response;
};