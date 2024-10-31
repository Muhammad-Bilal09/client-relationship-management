import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { prisma } from "@/config/prisma";

cloudinary.v2.config({
  cloud_name: process?.env?.CLOUDINARY_CLOUD_NAME,
  api_key: process?.env?.CLOUDINARY_API_KEY,
  api_secret: process?.env?.CLOUDINARY_API_SECRET,
});

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const image = formData?.get("image") as string;
    const userId = formData?.get("userId") as string;

    if (!image || !userId) {
      return new NextResponse("Missing image or userId", { status: 400 });
    }

    const uploadResponse = await cloudinary?.v2?.uploader?.upload(image);

    const imageUrl = uploadResponse?.secure_url;
    await prisma?.user?.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return new NextResponse(JSON.stringify({ imageUrl }), { status: 200 });
  } catch (error) {
    return new NextResponse(`Error uploading image`, {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
};
