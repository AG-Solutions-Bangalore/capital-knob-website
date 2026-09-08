// Change domain here only — single source of truth for remote images.
export const IMAGE_BASE_URL = "https://agsdemo.in/ck/api/assets/images";

// Local responsive images (public/images/…) — used ONLY for the measured
// LCP banner so mobile/desktop download ~40KB/80KB instead of the full
// remote file. All other images stay remote to limit scope.
export const LOCAL_IMAGE_BASE = "/images";

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
