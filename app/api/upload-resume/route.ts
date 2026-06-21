// app/api/upload-resume/route.ts
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

const getSanityWriteToken = () => {
  const token = process.env.SANITY_API_TOKEN?.trim();

  if (!token) {
    throw new Error("Missing SANITY_API_TOKEN");
  }

  return token;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const token = getSanityWriteToken();

    const serverClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const asset = await serverClient.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({
      success: true,
      assetId: asset._id,
      url: asset.url,
    });
  } catch (error: any) {
    console.error("❌ Upload error details:", {
      message: error.message,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      details: error.details,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: "Resume upload failed. Please try again later.",
      },
      { status: 500 },
    );
  }
}
