// app/api/submit-application/route.ts
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

const getSanityWriteToken = () => {
  const token =
    process.env.SANITY_API_TOKEN?.trim() ||
    process.env.NEXT_PUBLIC_SANITY_API_TOKEN?.trim();

  if (!token) {
    throw new Error("Missing SANITY_API_TOKEN");
  }

  if (!process.env.SANITY_API_TOKEN && process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
    console.warn(
      "SANITY_API_TOKEN is not set. Using NEXT_PUBLIC_SANITY_API_TOKEN as a temporary fallback. Rename it to SANITY_API_TOKEN to keep the token server-only.",
    );
  }

  return token;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const applicationJson = formData.get("application") as string;

    if (!applicationJson) {
      return NextResponse.json(
        { error: "No application data provided" },
        { status: 400 },
      );
    }

    const applicationData = JSON.parse(applicationJson);
    const resumeFile = formData.get("resume") as File | null;

    const token = getSanityWriteToken();

    const serverClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    // Upload resume if provided
    let resumeAsset = null;
    if (resumeFile) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      resumeAsset = await serverClient.assets.upload("file", buffer, {
        filename: resumeFile.name,
        contentType: resumeFile.type,
      });
    }

    // Create the job application
    const application = {
      _type: "jobApplication",
      job: {
        _type: "reference",
        _ref: applicationData.job._ref,
      },
      applicantName: applicationData.applicantName,
      email: applicationData.email,
      phone: applicationData.phone || "",
      location: applicationData.location || "",
      portfolio: applicationData.portfolio || "",
      linkedin: applicationData.linkedin || "",
      github: applicationData.github || "",
      yearsOfExperience: applicationData.yearsOfExperience || "",
      currentCompany: applicationData.currentCompany || "",
      currentRole: applicationData.currentRole || "",
      noticePeriod: applicationData.noticePeriod || "",
      expectedSalary: applicationData.expectedSalary,
      skills: applicationData.skills || [],
      coverLetter: applicationData.coverLetter,
      howDidYouHear: applicationData.howDidYouHear || "",
      referral: applicationData.referral || "",
      resume: resumeAsset
        ? {
            _type: "file",
            asset: { _type: "reference", _ref: resumeAsset._id },
          }
        : undefined,
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    const result = await serverClient.create(application);

    return NextResponse.json({
      success: true,
      applicationId: result._id,
    });
  } catch (error: any) {
    console.error("❌ API Error:", {
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    });

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not submit your application right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
