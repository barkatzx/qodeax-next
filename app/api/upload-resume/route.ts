// app/api/upload-resume/route.ts
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("🚀 Upload API called");

  try {
    // Log environment variables (but hide the full token)
    console.log("📊 Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log("📊 Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log("🔑 Token exists:", !!process.env.SANITY_API_TOKEN);
    console.log("🔑 Token length:", process.env.SANITY_API_TOKEN?.length);

    // Check if token starts correctly (first few chars)
    if (process.env.SANITY_API_TOKEN) {
      console.log(
        "🔑 Token prefix:",
        process.env.SANITY_API_TOKEN.substring(0, 10) + "...",
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("📄 File received:", file.name, file.size, file.type);

    // Create Sanity client
    const serverClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN?.trim(), // Add trim()
      useCdn: false,
    });

    // Test token by trying a simple query first
    try {
      console.log("🧪 Testing token with a simple query...");
      const testQuery = await serverClient.fetch(
        'count(*[_type == "careers"])',
      );
      console.log("✅ Token works for queries! Found", testQuery, "careers");
    } catch (queryError: any) {
      console.error("❌ Token FAILED for query:", {
        message: queryError.message,
        statusCode: queryError.statusCode,
      });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Sanity
    console.log("⬆️ Attempting to upload to Sanity...");
    const asset = await serverClient.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    console.log("✅ Upload successful:", asset._id);
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
        error: error.message || "Upload failed",
        details: error.details || "No additional details",
      },
      { status: 500 },
    );
  }
}
