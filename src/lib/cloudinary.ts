import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process?.env?.CLOUDINARY_CLOUD_NAME,
  api_key: process?.env?.CLOUDINARY_API_KEY,
  api_secret: process?.env?.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "items" }, (error, result) => {
        if (error) return reject(error);
        resolve(result as CloudinaryUploadResult);
      })
      .end(file.buffer);
  });
};
