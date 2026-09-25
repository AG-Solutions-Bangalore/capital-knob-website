/**
 * Image URL Configuration
 *
 * Easily switch between local and server images:
 * - Toggle `USE_SERVER_IMAGES = true` to use the remote server
 * - Toggle `USE_SERVER_IMAGES = false` to use local `public/images`
 * - Or set `VITE_USE_SERVER_IMAGES=true` in your `.env`
 *
 * Server URLs are derived from the single source of truth `env.apiBaseUrl`
 * (see `@/shared/lib/env` → `VITE_API_BASE_URL`), so switching the API host
 * automatically switches image hosts. `VITE_IMAGE_BASE_URL` /
 * `VITE_BLOG_IMAGE_BASE_URL` can still override per environment.
 */
import { env } from '@/shared/lib/env';

/** `http://host/crmapi/public/api` → `http://host/crmapi/public` */
function apiAssetRoot(): string {
  return env.apiBaseUrl.replace(/\/api\/?$/, '');
}

export const LOCAL_IMAGE_BASE_URL = '/images';
export const SERVER_IMAGE_BASE_URL = `${apiAssetRoot()}/assets/images/web_images`;
export const BLOG_IMAGE_BASE_URL = `${apiAssetRoot()}/assets/images/blog_images`;

// 🔀 SWITCH HERE: change to `true` to use server, `false` to use local
export const USE_SERVER_IMAGES =
  import.meta.env.VITE_USE_SERVER_IMAGES === "false" ? false : true;

// Active base URL used across the application
export const IMAGE_BASE_URL = USE_SERVER_IMAGES
  ? ((import.meta.env.VITE_IMAGE_BASE_URL as string | undefined) || SERVER_IMAGE_BASE_URL)
  : LOCAL_IMAGE_BASE_URL;

// Blog banner images live next to web_images on the same asset host.
export const ACTIVE_BLOG_IMAGE_BASE_URL =
  (import.meta.env.VITE_BLOG_IMAGE_BASE_URL as string | undefined) || BLOG_IMAGE_BASE_URL;

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

