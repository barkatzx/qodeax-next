export async function submitApplication(
  applicationData: unknown,
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
  } catch (error: unknown) {
    console.error("❌ Submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Submission failed",
    };
  }
}
