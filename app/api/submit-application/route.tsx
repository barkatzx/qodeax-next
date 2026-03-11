// app/api/submit-application/route.ts
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // This runs on the server - token is available here!
  console.log("🚀 API: Starting application submission");
  console.log("🔑 Server token present:", !!process.env.SANITY_API_TOKEN);

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

    // Create server-side Sanity client (token works here!)
    const serverClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    // Upload resume if provided
    let resumeAsset = null;
    if (resumeFile) {
      console.log("📤 Uploading resume:", resumeFile.name);
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      resumeAsset = await serverClient.assets.upload("file", buffer, {
        filename: resumeFile.name,
        contentType: resumeFile.type,
      });
      console.log("✅ Resume uploaded, ID:", resumeAsset._id);
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
    console.log("✅ Application created, ID:", result._id);

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
        error: error.message || "Failed to submit application",
      },
      { status: 500 },
    );
  }
}

// NEW: Function to submit application via API
export async function submitApplication(
  applicationData: any,
  resumeFile: File | null,
) {
  try {
    console.log("📤 Sending to API...");

    const formData = new FormData();
    formData.append("application", JSON.stringify(applicationData));
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    const response = await fetch("/api/submit-application", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Submission failed");
    }

    console.log("✅ API success:", result);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("❌ Submission error:", error);
    return { success: false, error: error.message };
  }
}
