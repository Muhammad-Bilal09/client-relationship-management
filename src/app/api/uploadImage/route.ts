import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process?.env?.CLOUDINARY_CLOUD_NAME,
  api_key: process?.env?.CLOUDINARY_API_KEY,
  api_secret: process?.env?.CLOUDINARY_API_SECRET,
});

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request?.formData();
    const file = formData?.get("image") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        })
        .end(file?.stream());
    });

    const imageUrl = (uploadResponse as any)?.secure_url;
    return new NextResponse(JSON.stringify({ imageUrl }), { status: 200 });
  } catch (error) {
    return new NextResponse(`Image upload failed`, {
      status: 500,
    });
  }
};
