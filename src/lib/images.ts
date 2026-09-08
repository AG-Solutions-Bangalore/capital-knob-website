// Change domain here only — single source of truth for remote images.
export const IMAGE_BASE_URL = "https://agsdemo.in/ck/api/assets/images";

export function imageUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\/+/, "").replace(/^images\//, "");
  return `${IMAGE_BASE_URL}/${clean}`;
}

export default IMAGE_BASE_URL;
