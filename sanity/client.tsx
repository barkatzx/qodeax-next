import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not defined!");
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("NEXT_PUBLIC_SANITY_DATASET is not defined!");
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-01-01",
  useCdn: true,
});

// Image builder helper
interface SanityImageSource {
  asset: {
    _ref: string;
    _type: string;
  };
  [key: string]: unknown;
}

export const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(client).image(source);

// Types based on your schemas
export interface Career {
  _id: string;
  _type: "careers";
  title: string;
  slug: {
    current: string;
  };
  department:
    | "engineering"
    | "design"
    | "marketing"
    | "sales"
    | "product"
    | "operations";
  location: "remote" | "hybrid" | "onsite";
  employmentType: "fulltime" | "parttime" | "contract" | "internship";
  experienceLevel?: "entry" | "mid" | "senior" | "lead" | "manager";
  salary?: {
    min?: number;
    max?: number;
    currency?: "USD" | "BDT";
  };
  summary: string;
  description: any[];
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
  skills?: string[];
  publishedAt: string;
  closingDate?: string;
  featured?: boolean;
  active?: boolean;
  applicationsCount?: number;
  hiringManager?: {
    _ref: string;
    _type: "reference";
  };
}

export interface JobApplication {
  _id?: string;
  _type: "jobApplication";
  job: {
    _type: "reference";
    _ref: string;
  };
  applicantName: string;
  email: string;
  phone?: string;
  location?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  yearsOfExperience?: "0-1" | "1-3" | "3-5" | "5-8" | "8plus";
  currentCompany?: string;
  currentRole?: string;
  noticePeriod?: "immediate" | "1week" | "2weeks" | "1month" | "2plus";
  expectedSalary?: {
    amount?: number;
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    period?: "year" | "month" | "hour";
  };
  skills?: string[];
  coverLetter: string;
  resume?: any;
  additionalDocs?: any[];
  howDidYouHear?:
    | "linkedin"
    | "indeed"
    | "website"
    | "referral"
    | "jobboard"
    | "social"
    | "other";
  referral?: string;
  status?:
    | "new"
    | "review"
    | "shortlisted"
    | "interview"
    | "test"
    | "offered"
    | "hired"
    | "rejected"
    | "hold";
  submittedAt?: string;
  ipAddress?: string;
}

// Helper functions
export async function getJobListings(filters?: {
  department?: string;
  location?: string;
  employmentType?: string;
}): Promise<Career[]> {
  try {
    let query = `*[_type == "careers" && active == true`;

    if (filters?.department) {
      query += ` && department == "${filters.department}"`;
    }
    if (filters?.location) {
      query += ` && location == "${filters.location}"`;
    }
    if (filters?.employmentType) {
      query += ` && employmentType == "${filters.employmentType}"`;
    }

    query += `] | order(featured desc, publishedAt desc) {
      _id,
      title,
      slug,
      department,
      location,
      employmentType,
      experienceLevel,
      summary,
      publishedAt,
      closingDate,
      featured,
      skills,
      salary,
      "applicationsCount": count(*[_type == "jobApplication" && job._ref == ^._id])
    }`;

    const data = await client.fetch(query);
    return data || [];
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return []; // Return empty array instead of throwing
  }
}

export async function getJobBySlug(slug: string): Promise<Career | null> {
  try {
    const query = `*[_type == "careers" && slug.current == $slug && active == true][0] {
      ...,
      "applicationsCount": count(*[_type == "jobApplication" && job._ref == ^._id])
    }`;

    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching job by slug:", error);
    return null;
  }
}

// export async function submitJobApplication(
//   application: Omit<JobApplication, "_type" | "submittedAt">,
// ) {
//   try {
//     const result = await client.create({
//       _type: "jobApplication",
//       ...application,
//       submittedAt: new Date().toISOString(),
//       status: "new",
//     });
//     return { success: true, data: result };
//   } catch (error) {
//     console.error("Error submitting application:", error);
//     return { success: false, error };
//   }
// }

// export async function uploadResume(file: File) {
//   try {
//     const asset = await client.assets.upload("file", file, {
//       filename: file.name,
//       contentType: file.type,
//     });
//     return asset;
//   } catch (error) {
//     console.error("Error uploading resume:", error);
//     throw error;
//   }
// }

// @/sanity/client.ts - Update these functions

export async function uploadResume(file: File) {
  try {
    console.log("📤 Starting resume upload for:", file.name);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-resume", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }

    const data = await response.json();
    console.log("✅ Resume uploaded successfully:", data.assetId);

    return { _id: data.assetId, url: data.url };
  } catch (error: any) {
    console.error("❌ Error uploading resume:", error);
    throw error;
  }
}

export async function submitJobApplication(application: any) {
  try {
    console.log("📝 Submitting application...");

    const response = await fetch("/api/submit-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Submission failed");
    }

    const data = await response.json();
    console.log("✅ Application submitted:", data.data._id);

    return { success: true, data: data.data };
  } catch (error: any) {
    console.error("❌ Error submitting application:", error);
    return { success: false, error };
  }
}
