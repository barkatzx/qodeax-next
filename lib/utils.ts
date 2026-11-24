import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(value));
}

/**
 * Sanity image URLs already point at the CDN. Appending transform params keeps
 * the original asset pipeline while letting us request an appropriately sized
 * crop for each card or hero surface.
 */
export function sanityImageUrl(
  imageUrl: string | undefined | null,
  width: number,
  height: number,
) {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    url.searchParams.set("w", String(width));
    url.searchParams.set("h", String(height));
    url.searchParams.set("fit", "crop");
    url.searchParams.set("auto", "format");
    return url.toString();
  } catch {
    return imageUrl;
  }
}

export function truncate(text: string, wordLimit = 28) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= wordLimit) return text;
  return `${words.slice(0, wordLimit).join(" ")}…`;
}

export function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
