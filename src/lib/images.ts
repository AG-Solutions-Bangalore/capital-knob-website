/**
 * Image URL Configuration
 *
 * Easily switch between local and server images:
 * - Toggle `USE_SERVER_IMAGES = true` to use the remote server
 * - Toggle `USE_SERVER_IMAGES = false` to use local `public/images`
 * - Or set `VITE_USE_SERVER_IMAGES=true` in your `.env`
 */
export const LOCAL_IMAGE_BASE_URL = "/images";
export const SERVER_IMAGE_BASE_URL = "https://agsdemo.in/ckapi/public/assets/images/web_images";

// 🔀 SWITCH HERE: change to `true` to use server, `false` to use local
export const USE_SERVER_IMAGES =
  import.meta.env.VITE_USE_SERVER_IMAGES === "false" ? false : true;

// Active base URL used across the application
export const IMAGE_BASE_URL = USE_SERVER_IMAGES
  ? (import.meta.env.VITE_IMAGE_BASE_URL || SERVER_IMAGE_BASE_URL)
  : LOCAL_IMAGE_BASE_URL;

// Local responsive images (public/images/…)
export const LOCAL_IMAGE_BASE = LOCAL_IMAGE_BASE_URL;

export function imageUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\/+/, "").replace(/^images\//, "");
  return `${IMAGE_BASE_URL}/${clean}`;
}

export function localImageUrl(path: string): string {
  const clean = path.replace(/^\/+/, "").replace(/^images\//, "");
  return `${LOCAL_IMAGE_BASE}/${clean}`;
}

export default IMAGE_BASE_URL;

