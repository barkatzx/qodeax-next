export interface SanityImage {
  asset?: {
    url?: string;
  };
}

export interface SanityBlock {
  _type: string;
  children?: Array<{ _type: string; text?: string }>;
}

export interface Project {
  _id: string;
  title: string;
  mainImage?: SanityImage;
  categories?: string[];
  technologies?: string[];
  features?: string[];
  slug: { current: string };
  liveLink?: string;
  clientRepo?: string;
  serverRepo?: string;
  body?: SanityBlock[];
}

export interface BlogCategory {
  title: string;
  _id?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: BlogCategory[];
  author?: {
    name?: string;
    image?: unknown;
    bio?: unknown;
  };
  estimatedReadingTime?: number;
}
