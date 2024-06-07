import dotenv from "dotenv";
import path from "path";
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname,  "../../config.env") });
import * as cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

// cloudinary upload image
export const cloudinaryUploadImage = async (fileUpload: string): Promise<cloudinary.UploadApiResponse> => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileUpload, { resource_type: "auto", folder: "Zef-Hotel-Booking" });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("internal server error cloudinary");
  }
};

// cloudinary Remove image
export const cloudinaryRemoveImage = async (ImagePublicId: string) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(ImagePublicId);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("internal server error cloudinary");
  }
};

// cloudinary Remove multiple image
export const cloudinaryRemoveMultipleImage = async (publicIds: string[]) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("internal server error cloudinary");
  }
};